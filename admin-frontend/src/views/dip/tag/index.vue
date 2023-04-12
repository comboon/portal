<template>
  <div class="app-container">
    <!-- <UEDitor :defaultMsg='defaultMsg' :config='config' :id='ue1' ref="ue"></UEDitor>
    <el-button @click="handleUEValue" type="primary" size="small">确定</el-button> -->
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="分类名称" prop="typeName">
        <el-input
          v-model="queryParams.typeName"
          placeholder="请输入分类名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置
        </el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tagList"
      @selection-change="handleSelectionChange"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="分类名称" header-align="center" prop="typeName"/>
      <el-table-column label="排序值" align="center" prop="sortOrder"/>
      <el-table-column label="创建人" align="center" prop="createdBy"/>
      <el-table-column
        label="创建时间"
        align="center"
        width="180"
        prop="createdAt"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="240"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.type==='1'?scope.row.level<3:scope.row.level<2"
                     type="success"
                     size="mini"
                     icon="el-icon-edit"
                     class="line-btn"
                     @click="handleAdd(scope.row)"
                     v-hasPermi="['dip:tag:add']"
          >新增
          </el-button>

          <template v-if="scope.row.level!==1">
            <el-divider direction="vertical" v-if="scope.row.type==='1'?scope.row.level<3:scope.row.level<2"
            ></el-divider>
            <el-button
              type="primary"
              size="mini"
              class="line-btn"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['dip:tag:edit']"
            >修改
            </el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="danger"
              size="mini"
              class="delete-btn-span"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['dip:tag:remove']"
            >删除
            </el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!--    <pagination-->
    <!--      v-show="total > 0"-->
    <!--      :total="total"-->
    <!--      :page.sync="queryParams.pageNum"-->
    <!--      :limit.sync="queryParams.pageSize"-->
    <!--      @pagination="getList"-->
    <!--    />-->

    <!-- 添加或修改门户核心服务标签配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="400px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="语言" prop="lanType">
          <el-select
            v-model="form.lanType"
            placeholder="请选择语言"
            style="width: 223.6px"
          >
            <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="上级菜单">
          <treeselect
            v-model="form.parentId"
            :options="menuOptions"
            :normalizer="normalizer"
            :show-count="true"
            placeholder="选择上级菜单"
            style="width:223.6px"
            @select="selectNode"
          />
        </el-form-item>
        <el-form-item label="分类名称" prop="typeName">
          <el-input
            v-model="form.typeName"
            placeholder="请输入分类名称"
            style="width: 223.6px"
          />
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input
            v-model="form.sortOrder"
            placeholder="请输入排序值"
            style="width: 223.6px"
            type="number"
          />
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { listTag, getTag, delTag, addTag, updateTag } from '@/api/dip/tag'
import { listModulemenu } from '@/api/dip/modulemenu'
import IconSelect from '@/components/IconSelect'

export default {
  name: 'Tag',
  dicts: ['dip_global_language'],
  components: { Treeselect },
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
      // 门户核心服务标签配置表格数据
      tagList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 排序值时间范围
      daterangeCreatedAt: [],
      // 查询参数
      queryParams: {
        typeName: null,
        lanType: null,
        sortOrder: null,
        createdBy: null,
        createdAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        typeName: [
          { required: true, message: '分类名称不能为空', trigger: 'change' }
        ],
        lanType: [
          { required: true, message: '语言不能为空', trigger: 'change' }
        ],
        sortOrder: [
          { required: true, validator: validateSorder, trigger: 'blur' }
        ]
      },

      defaultMsg: '',
      config: {
        initialFrameWidth: 1000,
        initialFrameHeight: 350
      },
      ue1: 'ue1' // 不同编辑器必须不同的id
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleUEValue() {
      console.log(this.$refs.ue.getUEContent())
    },
    /** 查询门户核心服务标签配置列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreatedAt && '' != this.daterangeCreatedAt) {
        this.queryParams.params['beginCreatedAt'] = this.daterangeCreatedAt[0]
        this.queryParams.params['endCreatedAt'] = this.daterangeCreatedAt[1]
      }
      listTag(this.queryParams).then((response) => {
        this.tagList = response.rows
        this.total = response.total
        this.tagList = this.handleTree(response.rows, 'id')
        this.loading = false
      })
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.typeName,
        children: node.children
      }
    },
    /**选中某个菜单*/
    selectNode(node, instanceId) {
      this.form.level = node.level + 1
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
        typeName: null,
        parentId: 0,
        level: 1,
        type: null,
        lanType: null,
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
      this.daterangeCreatedAt = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 查询菜单下拉树结构 */
    getTreeselect(param) {
      listTag(param).then(response => {
        this.menuOptions = []
        let children = this.handleTree(response.rows, 'id')
        this.menuOptions.push(children[0])
      })
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset()
      this.form.type = row.type
      this.getTreeselect({ 'type': row.type })
      this.form.parentId = row.id
      this.form.level = row.level + 1
      this.open = true
      this.title = '添加标签配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      this.form.type = row.type
      this.getTreeselect({ 'type': row.type })
      getTag(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改标签配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (this.form.type === '1') {
          if (this.form.level > 3) {
            this.$modal.msgError('菜单层级超出限制')
            return
          }
        } else {
          if (this.form.level > 2) {
            this.$modal.msgError('菜单层级超出限制')
            return
          }
        }
        if (valid) {
          if (this.form.id != null) {
            updateTag(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addTag(this.form).then((response) => {
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
      this.$modal
        .confirm(
          '是否确认删除本条数据？'
        )
        .then(function() {
          return delTag(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'dip/tag/export',
        {
          ...this.queryParams
        },
        `tag_${new Date().getTime()}.xlsx`
      )
    }
  }
}
</script>
<style scoped>
.line-btn {
  border-left: none;
}
</style>
