<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-position="left">
      <!-- <el-form-item label="解决方案id" prop="solutionId">
        <el-input
          v-model="queryParams.solutionId"
          placeholder="请输入解决方案id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业名称" prop="firmName">
        <el-input
          v-model="queryParams.firmName"
          placeholder="请输入企业名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入邮箱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="所在城市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入所在城市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="删除人" prop="deletedBy">
        <el-input
          v-model="queryParams.deletedBy"
          placeholder="请输入删除人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="删除时间" prop="deletedAt">
        <el-date-picker clearable size="small"
          v-model="queryParams.deletedAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择删除时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['dip:solutionconsult:add']"
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
          v-hasPermi="['dip:solutionconsult:edit']"
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
          v-hasPermi="['dip:solutionconsult:remove']"
        >删除</el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dip:solutionconsult:export']"
        >导出</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="solutionconsultList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="咨询方案名称" align="center" prop="solutionName"/>
      <el-table-column label="姓名" align="center" prop="userName"/>
      <el-table-column label="联系电话" align="center" prop="phone"/>
      <el-table-column label="企业名称" align="center" prop="firmName"/>
      <el-table-column label="邮箱" align="center" prop="email"/>
      <el-table-column label="所在城市" align="center" prop="city"/>
      <!-- <el-table-column label="咨询内容" align="center" prop="content"/> -->
      <!-- <el-table-column label="删除人" align="center" prop="deletedBy"/> -->
      <!-- <el-table-column label="删除时间" align="center" width="180" prop="deletedAt">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deletedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column label="操作" width="160" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dip:solutionconsult:edit']"
          >修改</el-button> -->

          <el-button
            type="success"
            size="mini"
            v-hasPermi="['dip:solutionconsult:edit']"
            class="privew-btn"
            @click="handleUpdate(scope.row)"
          >查看详情
          </el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:solutionconsult:remove']"
          >删除</el-button> -->

          <el-divider direction="vertical"></el-divider>

          <el-button
            type="danger"
            size="mini"
            class="delete-btn-span"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:solutionconsult:remove']"
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

    <!-- 添加或修改门户核心服务解决方案咨询对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="咨询方案名称" prop="solutionName">
          <el-input v-model="form.solutionName" placeholder="请输入解决方案id" disabled/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.userName" placeholder="请输入姓名" disabled/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" placeholder="请输入联系电话" disabled/>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="form.firmName" placeholder="请输入企业名称" disabled/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" disabled/>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="form.city" disabled/>
        </el-form-item>
        <el-form-item label="咨询内容">
          <el-input v-model="form.content"
                    :rows="6"
                    type="textarea" placeholder="请输入咨询内容"
                    maxlength="200"
                    disabled
                    show-word-limit
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel">取 消</el-button> -->
        <!-- <el-button type="primary" @click="submitForm">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listSolutionconsult,
  getSolutionconsult,
  delSolutionconsult,
  addSolutionconsult,
  updateSolutionconsult
} from '@/api/dip/solutionconsult'

export default {
  name: 'Solutionconsult',
  data() {
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
      // 门户核心服务解决方案咨询表格数据
      solutionconsultList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        solutionId: null,
        userName: null,
        phone: null,
        firmName: null,
        email: null,
        city: null,
        content: null,
        deletedBy: null,
        deletedAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        solutionId: [
          { required: true, message: '解决方案id不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        createdBy: [
          { required: true, message: '创建人不能为空', trigger: 'blur' }
        ],
        createdAt: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询门户核心服务解决方案咨询列表 */
    getList() {
      this.loading = true
      listSolutionconsult(this.queryParams).then(response => {
        this.solutionconsultList = response.rows
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
        solutionId: null,
        userName: null,
        phone: null,
        firmName: null,
        email: null,
        city: null,
        content: null,
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
      this.title = '添加门户核心服务解决方案咨询'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSolutionconsult(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '用户咨询详情'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSolutionconsult(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSolutionconsult(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除该条数据?').then(function() {
        return delSolutionconsult(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/solutionconsult/export', {
        ...this.queryParams
      }, `solutionconsult_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
