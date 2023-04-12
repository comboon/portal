<template>
  <div class="app-container">
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
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable size="small">
          <el-option
            v-for="dict in dict.type.dip_banner_type"
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
          v-hasPermi="['dip:banner:add']"
        >添加横幅
        </el-button>
      </el-form-item>
    </el-form>

    <!--<el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:banner:add']"
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
          v-hasPermi="['dip:banner:edit']"
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
          v-hasPermi="['dip:banner:remove']"
        >删除</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dip:banner:export']"
        >导出</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table v-loading="loading" :data="bannerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="语言" align="center" prop="lanType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_banner_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="背景图片" align="center" prop="img">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="logoImg" style="width:100px;height:100px;"/>
        </template>
      </el-table-column>
      <el-table-column label="排序值" align="center" prop="sortOrder"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            class="line-btn"
            icon="el-icon-edit"
            style="border-left:none;"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dip:banner:edit']"
          >修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="danger"
            size="mini"
            class="delete-btn-span"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:banner:remove']"
          >删除</el-button>
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

    <!-- 添加或修改门户核心服务横幅配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="语言" prop="lanType">
          <el-select v-model="form.lanType" placeholder="请选择语言">
            <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="dict in dict.type.dip_banner_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="背景图片" prop="img">
          <imageUpload v-model="form.img" :limit="1" :fileSize="20"/>
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model.number="form.sortOrder" type="number" placeholder="请输入排序值"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBanner, getBanner, delBanner, addBanner, updateBanner } from '@/api/dip/banner'

export default {
  name: 'Banner',
  dicts: ['dip_global_language', 'dip_banner_type'],
  data() {
    var validateSorder = (rule, value, callback) => {
      value = '' + value
      if (value === '' || value === null || value === undefined) {
        callback(new Error('排序值只能是数字,且不能为空!'))
      } else if (value.length > 10) {
        callback(new Error('请输入10字节以内的排序值'))
      } else if (value.indexOf('.') !== -1) {
        callback(new Error('请输入正整数的排序值'))
      } else if (value < 0) {
        callback(new Error('请输入正整数的排序值'))
      }
      callback()
    }
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 门户核心服务横幅配置表格数据
      bannerList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lanType: null,
        type: null,
        img: null,
        sortOrder: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        lanType: [
          { required: true, message: '语言不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        img: [
          { required: true, message: '背景图片不能为空', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true, validator: validateSorder, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询门户核心服务横幅配置列表 */
    getList() {
      this.loading = true
      listBanner(this.queryParams).then(response => {
        this.bannerList = response.rows
        //process.env.VUE_APP_BASE_API
        this.bannerList.forEach(item => {
          item.img = process.env.VUE_APP_BASE_API + item.img
        })
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
        type: null,
        img: null,
        sortOrder: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null
      }
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
      this.reset()
      this.open = true
      this.title = '添加横幅配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getBanner(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改横幅配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBanner(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addBanner(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除本条数据？').then(function() {
        return delBanner(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/banner/export', {
        ...this.queryParams
      }, `banner_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
<style scoped>
.app-container .el-form-item__label {
  text-align: left !important;;
}
</style>
