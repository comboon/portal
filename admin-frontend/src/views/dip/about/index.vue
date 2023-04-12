<template>
  <div class="app-container">
    <div class="table-wrap">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-position="left">
        <el-form-item label="语言" prop="lanType">
          <el-select v-model="queryParams.lanType" placeholder="请选择语言" clearable size="small">
            <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item class="addBtn-right">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['dip:about:add']"
          >添加关于我们配置
          </el-button>
        </el-form-item>
      </el-form>

      <!-- <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['dip:about:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['dip:about:edit']"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['dip:about:remove']"
          >删除</el-button>
        </el-col>

        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['dip:about:export']"
          >导出</el-button>
        </el-col>

        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row> -->

      <el-table v-loading="loading" :data="aboutList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="语言" align="center">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="240"
                         align="center"
                         class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              class="privew-btn"
              @click="handleUpdate(scope.row,'see')"
            >查看
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="primary"
              size="mini"
              class="line-btn"
              @click="handleUpdate(scope.row,'edit')"
              v-hasPermi="['dip:about:edit']"
            >修改
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="danger"
              size="mini"
              class="delete-btn-span"
              @click="handleDelete(scope.row)"
              v-hasPermi="['dip:about:remove']"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <detail-about :title="title" ref="aboutDetail" :isEdit="isEdit"></detail-about>
  </div>
</template>

<script>
import { listAbout, getAbout, delAbout, addAbout, updateAbout } from '@/api/dip/about'
import detailAbout from './aboutDetail/index.vue'

export default {
  name: 'About',
  dicts: ['dip_global_language'],
  components: {
    detailAbout
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedHistoryCfg: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 门户核心服务‘关于我们’配置表格数据
      aboutList: [],
      // 门户核心服务平台历程配置表格数据
      historyCfgList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      //是否打开新增历程的弹窗
      openAddCourse: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lanType: null
      },
      courseForm: {
        period: null,
        description: null
      },
      isEdit: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询门户核心服务‘关于我们’配置列表 */
    getList() {
      this.loading = true
      listAbout(this.queryParams).then(response => {
        this.aboutList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        lanType: null,
        companyInfo: null,
        platformInfo: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null
      }
      this.historyCfgList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$refs.aboutDetail.init()
      this.isEdit = true
      this.title = '添加关于我们配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row, handType) {
      handType === 'edit' ? this.title = '编辑关于我们配置' : this.title = '关于我们配置详情'
      handType === 'edit' ? this.isEdit = true : this.isEdit = false
      this.$refs.aboutDetail.init(row.id, handType)
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除本条数据？').then(function() {
        return delAbout(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 门户核心服务平台历程配置序号 */
    rowHistoryCfgIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 门户核心服务平台历程配置添加按钮操作 */
    handleAddHistoryCfg() {
      this.title = '新增历程'
      this.openAddCourse = true
      // let obj = {};
      // obj.period = "";
      // obj.description = "";
    },
    //新增小历程
    saveCourse() {
      this.historyCfgList.push(this.courseForm)
      this.openAddCourse = !this.openAddCourse
    },
    //取消新增历程
    cancelEditCourse() {
      this.openAddCourse = !this.openAddCourse
      this.courseForm = {
        period: null,
        description: null
      }
    },
    /** 门户核心服务平台历程配置删除按钮操作 */
    handleDeleteHistoryCfg() {
      if (this.checkedHistoryCfg.length == 0) {
        this.$modal.msgError('请先选择要删除的门户核心服务平台历程配置数据')
      } else {
        const historyCfgList = this.historyCfgList
        const checkedHistoryCfg = this.checkedHistoryCfg
        this.historyCfgList = historyCfgList.filter(function(item) {
          return checkedHistoryCfg.indexOf(item.index) == -1
        })
      }
    },
    /** 复选框选中数据 */
    handleHistoryCfgSelectionChange(selection) {
      this.checkedHistoryCfg = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/about/export', {
        ...this.queryParams
      }, `about_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
<style scoped>
.addBtn-right {
  float: right
}

/* .delete-btn-span{
 color:red;
 cursor: pointer;
}
.line-btn,.privew-btn{
  color:#1990FF ;
  cursor: pointer;
}
.line-btn,.delete-btn-span{
  padding-left:6px;
  margin-left:6px;
  border-left:1px solid #e5e5e5;
} */
.form-wrap {
  margin-top: 14px;
  padding: 20px 20px;
  border-radius: 35px;
  border: 1px solid #eeee;
}

.plant-span-gress {
  font-size: 14px;
  color: rgb(96, 98, 102);
  font-weight: bold;
}
</style>
