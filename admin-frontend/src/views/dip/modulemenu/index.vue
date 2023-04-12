<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="功能模块" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择功能模块"  size="small">
          <el-option
            v-for="dict in dict.type.dip_global_module_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
          v-model="queryParams.menuName"
          placeholder="请输入菜单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
<!--       <el-form-item class="addBtn-right">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:modulemenu:add']"
        >添加维护</el-button>
      </el-form-item>-->
    </el-form>

    <el-table
      v-loading="loading"
      :data="modulemenuList"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="菜单名称" header-align="center" prop="menuName" />
      <el-table-column label="图标" align="center" prop="icon">
        <template slot-scope="scope">
          <img v-if="scope.row.icon" :src="scope.row.icon" class="logoImg" style="width:40px;height:40px;" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="语言" prop="lanType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
        </template>
      </el-table-column>
      <el-table-column label="排序值" align="center" prop="sortOrder" />
      <el-table-column
        label="操作"
        align="center"
        width="240"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <template v-if="scope.row.type==='0'?scope.row.level<3:scope.row.level<2">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-edit"
              class="line-btn"
              @click="handleAdd(scope.row)"
              v-hasPermi="['dip:modulemenu:add']"
            >新增</el-button>
          </template>

          <template v-if="scope.row.level!==1">
            <el-divider v-if="scope.row.type==='0'?scope.row.level<3:scope.row.level<2" direction="vertical"></el-divider>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              class="line-btn"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['dip:modulemenu:edit']"
            >修改</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              class="delete-btn-span"
              @click="handleDelete(scope.row)"
              v-hasPermi="['dip:modulemenu:remove']"
            >删除</el-button>
          </template>

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

    <!-- 添加或修改门户核心服务菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="400px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="语言" prop="lanType">
          <el-select v-model="form.lanType" placeholder="请选择语言"  style="width:223.6px">
            <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName" placeholder="请输入菜单名称"  style="width:223.6px" />
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type in ['0','1']?form.level>1:false" prop="icon">
          <imageUpload v-model="form.icon" :limit="1"/>
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序值"  type="number"  style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="简述" prop="remark">
          <el-input v-model="form.remark" placeholder="请简要描述"   style="width:223.6px"/>
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
import { listModulemenu, getModulemenu, delModulemenu, addModulemenu, updateModulemenu } from "@/api/dip/modulemenu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import {listMenu} from "@/api/system/menu";
export default {
  name: "Modulemenu",
  dicts: ['dip_global_language','dip_global_module_type'],
  components: { Treeselect,IconSelect },
  computed:{
  },
  data() {
    var validateSorder = (rule, value, callback) => {
       value=''+value;
        if (value === '' || value===null || value===undefined) {
          callback(new Error('排序值只能是数字,且不能为空!'));
        }else if(value.length>10){
            callback(new Error('请输入10字节以内的排序值'));
        }else if(value.indexOf('.')!==-1){
            callback(new Error('请输入正整数的排序值'));
        }else if(value<0){
            callback(new Error('请输入正整数的排序值'));
        }
          callback();
      };
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
      // 门户核心服务菜单表格数据
      modulemenuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        menuName: null,
        type: null,
        lanType: null,
        deletedBy: null,
        deletedAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
          {  max: 64, message: '请输64个字节以内的菜单名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: "菜单图标不能为空", trigger: "change" }
        ],
        type: [
          { required: true, message: "所属模块不能为空", trigger: "change" }
        ],
        lanType: [
          { required: true, message: "语言不能为空", trigger: "change" }
        ],
        sortOrder: [
          { required: true,validator: validateSorder, trigger: "blur" },
        ],
        createdBy: [
          { required: true, message: "创建人不能为空", trigger: "blur" }
        ],
        createdAt: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        remark:[
           { max: 255, message: '请输255个字节以内的简述', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询门户核心服务菜单列表 */
    getList() {
      this.loading = true;
      listModulemenu(this.queryParams).then(response => {
        response.data.forEach(item=>{
          if(item.icon){
            item.icon=process.env.VUE_APP_BASE_API+item.icon;
          }
        })
        this.modulemenuList = this.handleTree(response.data, "id");
        this.loading = false;

      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.menuName,
        children: node.children
      };
    },
    /**选中某个菜单*/
    selectNode(node, instanceId){
      this.form.level=node.level+1;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        menuName: null,
        parentId: 0,
        level: 1,
        icon: null,
        type: null,
        lanType: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 查询菜单下拉树结构 */
    getTreeselect(param) {
      listModulemenu(param).then(response => {
        this.menuOptions = [];
        let children = this.handleTree(response.data, "id");
        this.menuOptions.push(children[0]);
      });
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.form.type=row.type
      this.getTreeselect({"type":row.type,"lanType":row.lanType});
      this.form.parentId = row.id;
      this.form.level=row.level+1;
      this.open = true;
      this.title = "新增菜单维护配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form.type=row.type
      this.getTreeselect({"type":row.type,"lanType":row.lanType});
      const id = row.id || this.ids
      getModulemenu(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑菜单维护配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.type==='0'){
            if(this.form.level>3){
              this.$modal.msgError("菜单层级超出限制");
              return;
            }
          }else{
            if(this.form.level>2){
              this.$modal.msgError("菜单层级超出限制");
              return;
            }
          }
          if (this.form.id != null) {
            updateModulemenu(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addModulemenu(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('确认删除该条数据？').then(function() {
        return delModulemenu(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/modulemenu/export', {
        ...this.queryParams
      }, `modulemenu_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
.line-btn{
  border-left:none;
}
</style>
