<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="能力名称" prop="capName">
        <el-input
          v-model="queryParams.capName"
          placeholder="请输入能力名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <!--      <el-form-item label="创建人" prop="createdBy">
              <el-input
                v-model="queryParams.createdBy"
                placeholder="请输入创建人"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="创建时间" prop="createdAt">
              <el-date-picker
                v-model="daterangeCreatedAt"
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>-->
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
          v-hasPermi="['dip:platformcapability:add']"
        >添加平台能力
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
          v-hasPermi="['dip:platformcapability:add']"
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
          v-hasPermi="['dip:platformcapability:edit']"
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
          v-hasPermi="['dip:platformcapability:remove']"
        >删除</el-button>
      </el-col> -->
    <!--
    <el-col :span="1.5">
      <el-button
        type="warning"
        plain
        icon="el-icon-download"
        size="mini"
        @click="handleExport"
        v-hasPermi="['dip:platformcapability:export']"
      >导出</el-button>
    </el-col>
    -->
    <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
  </el-row> -->

    <el-table v-loading="loading" :data="platformcapabilityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="平台主图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="logoImg">
        </template>
      </el-table-column>
      <el-table-column label="能力名称" align="center" prop="capName"/>
      <el-table-column label="平台能力描述" align="center" prop="description"/>
      <el-table-column label="语言" align="center" prop="lanType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
        </template>
      </el-table-column>
      <el-table-column label="排序值" align="center" prop="sortOrder"/>
      <el-table-column label="创建人" align="center" prop="createdBy"/>
      <el-table-column label="创建时间" align="center" width="180" prop="createdAt">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.showType===1"
                     type="success"
                     size="mini"
                     class="privew-btn"
                     @click="showDetail(scope.row)"
          >查看详情
          </el-button>

          <el-divider v-if="scope.row.showType === 1" direction="vertical"></el-divider>

          <el-button
            type="primary"
            size="mini"
            class="line-btn"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dip:platformcapability:edit']"
          >修改
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="danger"
            size="mini"
            class="delete-btn-span"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:platformcapability:remove']"
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

    <!-- 添加或修改平台能力配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="语言" prop="lanType">
          <el-select v-model="form.lanType" placeholder="请选择语言" style="width:223.6px">
            <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台主图" prop="icon">
          <imageUpload v-model="form.icon" :limit="1"/>
        </el-form-item>
        <el-form-item label="能力名称" prop="capName">
          <el-input v-model="form.capName" placeholder="请输入能力名称" style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序值" type="number" style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="平台能力描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="详情形态" prop="showType">
          <el-select v-model="form.showType" placeholder="请选择详情形态" @change="changeVal" style="width:223.6px">
            <el-option
              v-for="dict in dict.type.dip_description_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情展示内容" prop="detail" v-if="form.showType===1">
          <editor v-model="form.detail" :min-height="192"/>
        </el-form-item>
        <el-form-item label="外部链接地址" prop="outUrl" v-if="form.showType===2">
          <el-input v-model="form.outUrl" placeholder="请输入外部链接地址" style="width:223.6px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <detail-page ref="detailPage"></detail-page>
  </div>
</template>

<script>
import {
  listPlatformcapability,
  getPlatformcapability,
  delPlatformcapability,
  addPlatformcapability,
  updatePlatformcapability
} from '@/api/dip/platformcapability'
import detailPage from './detailPage/index'

export default {
  name: 'Platformcapability',
  dicts: ['dip_global_language', 'dip_description_type'],
  components: {
    detailPage
  },
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
      // 平台能力配置表格数据
      platformcapabilityList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 外部链接地址时间范围
      daterangeCreatedAt: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lanType: null,
        capName: null,
        showType: null,
        createdBy: null,
        createdAt: null
      },
      // 表单参数
      form: {
        showType: 1,
        detail: null,
        outUrl: null
      },
      // 表单校验
      rules: {
        lanType: [
          { required: true, message: '语言不能为空', trigger: 'change' }
        ],
        icon: [
          { required: true, message: '平台主图不能为空', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '详情内容不能为空', trigger: 'blur' }
        ],
        outUrl: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' },
          {
            pattern: '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\*\\+,;=.]+$',
            message: '请输入正确的网络地址',
            trigger: 'blur'
          }
        ],
        capName: [
          { required: true, message: '平台能力名称不能为空', trigger: 'blur' },
          { max: 64, message: '请输64个字节以内的平台能力名称', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true, validator: validateSorder, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '平台能力描述不能为空', trigger: 'blur' }
        ],
        showType: [
          { required: true, message: '详情形态不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询平台能力配置列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreatedAt && '' != this.daterangeCreatedAt) {
        this.queryParams.params['beginCreatedAt'] = this.daterangeCreatedAt[0]
        this.queryParams.params['endCreatedAt'] = this.daterangeCreatedAt[1]
      }
      listPlatformcapability(this.queryParams).then(response => {
        this.platformcapabilityList = response.rows
        this.platformcapabilityList.forEach(item => {
          item.icon = process.env.VUE_APP_BASE_API + item.icon
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
        icon: null,
        capName: null,
        sortOrder: null,
        description: null,
        showType: null,
        detail: null,
        outUrl: null,
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
      this.daterangeCreatedAt = []
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
      this.title = '新增平台能力'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPlatformcapability(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改平台能力配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePlatformcapability(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addPlatformcapability(this.form).then(response => {
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
      this.$modal.confirm('确认删除该条数据？').then(function() {
        return delPlatformcapability(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/platformcapability/export', {
        ...this.queryParams
      }, `platformcapability_${new Date().getTime()}.xlsx`)
    },
    //查看详情
    showDetail(row) {
      getPlatformcapability(row.id).then(response => {
        this.$refs.detailPage.init(response.data.detail)
      })
    },
    //切换展实类型的时候，要把上次的选项的值置为空
    changeVal(val) {
      if (val === 1) {
        this.form.outUrl = null
        this.$refs.form.clearValidate()
      }
      if (val === 2) {
        this.form.detail = null
        this.$refs.form.clearValidate()
      }
    }
  }
}
</script>
<style scoped>
.logoImg {
  width: 80px;
  height: 80px;
}
</style>
