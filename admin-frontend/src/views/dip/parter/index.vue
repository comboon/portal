<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <!--<el-form-item label="语言" prop="lanType">
        <el-select v-model="queryParams.lanType" placeholder="请选择语言" clearable size="small">
          <el-option
            v-for="dict in dict.type.dip_global_language"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="icon url" prop="icon">
        <el-input
          v-model="queryParams.icon"
          placeholder="请输入icon url"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="公司名称" prop="parterName">
        <el-input
          v-model="queryParams.parterName"
          placeholder="请输入公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="排序值" prop="sortOrder">
        <el-input
          v-model="queryParams.sortOrder"
          placeholder="请输入排序值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createdBy">
        <el-input
          v-model="queryParams.createdBy"
          placeholder="请输入创建人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt">
        <el-date-picker clearable size="small"
          v-model="queryParams.createdAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新人" prop="updatedBy">
        <el-input
          v-model="queryParams.updatedBy"
          placeholder="请输入更新人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="updatedAt">
        <el-date-picker clearable size="small"
          v-model="queryParams.updatedAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="删除人" prop="deletedBy">
        <el-input
          v-model="queryParams.deletedBy"
          placeholder="请输入删除人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="删除时间" prop="deletedAt">
        <el-date-picker clearable size="small"
          v-model="queryParams.deletedAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择删除时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item  class="addBtn-right">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:parter:add']"
        >添加合作伙伴</el-button>
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
          v-hasPermi="['dip:parter:add']"
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
          v-hasPermi="['dip:parter:edit']"
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
          v-hasPermi="['dip:parter:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dip:parter:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="parterList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="LOGO" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="logoImg">
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center" prop="parterName" />
      <el-table-column label="链接地址" align="center" prop="websiteUrl" />
      <el-table-column label="语言" align="center" prop="lanType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
        </template>
      </el-table-column>
      <el-table-column label="排序值" align="center" prop="sortOrder" />
      <!--<el-table-column label="创建人" align="center" prop="createdBy" />
      <el-table-column label="创建时间" align="center" prop="createdAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="updatedBy" />
      <el-table-column label="更新时间" align="center" prop="updatedAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="删除人" align="center" prop="deletedBy" />
      <el-table-column label="删除时间" align="center" prop="deletedAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deletedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dip:parter:edit']"
          >修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            size="mini"
            type="danger"
            class="delete-btn-span"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:parter:remove']"
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

    <!-- 添加或修改门户核心服务合作伙伴配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="564px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
        <el-form-item label="LOGO" prop="icon">
          <imageUpload
                  v-model="form.icon"
                  :limit="1"
                />
        </el-form-item>
        <el-form-item label="公司名称" prop="parterName">
          <el-input v-model="form.parterName" placeholder="请输入公司名称" style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="链接地址" prop="websiteUrl">
          <el-input v-model="form.websiteUrl" type="textarea" placeholder="请输入链接地址"  style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序值"  style="width:223.6px"/>
        </el-form-item>
        <!--<el-form-item label="删除人" prop="deletedBy">
          <el-input v-model="form.deletedBy" placeholder="请输入删除人" />
        </el-form-item>
        <el-form-item label="删除时间" prop="deletedAt">
          <el-date-picker clearable size="small"
            v-model="form.deletedAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择删除时间">
          </el-date-picker>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addParter,
    delParter,
    getParter,
    listParter,
    updateParter
  } from "@/api/dip/parter";

  export default {
  name: "Parter",
  dicts: ['dip_global_language'],
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
      // 门户核心服务合作伙伴配置表格数据
      parterList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lanType: null,
        icon: null,
        parterName: null,
        websiteUrl: null,
        sortOrder: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        lanType: [
          { required: true, message: "语言不能为空", trigger: "change" }
        ],
        icon: [
          { required: true, message: "icon url不能为空", trigger: "blur" }
        ],
        parterName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
          { max: 64, message: '请输64个字节以内的公司名称', trigger: 'blur' }
        ],
        sortOrder: [
          { required: true,validator: validateSorder, trigger: "blur" },
        ],
        websiteUrl:[
          { max: 500, message: '请输500个字节以内的链接地址', trigger: 'blur' },
          {
            pattern: '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\*\\+,;=.]+$',
            message: '请输入正确的网络地址',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询门户核心服务合作伙伴配置列表 */
    getList() {
      this.loading = true;
      listParter(this.queryParams).then(response => {
        this.parterList = response.rows;
        this.total = response.total;
        this.loading = false;
          this.parterList.forEach(item=>{
            item.icon= process.env.VUE_APP_BASE_API+item.icon;
          })
      });
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
        lanType: null,
        icon: null,
        parterName: null,
        websiteUrl: null,
        sortOrder: null,
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加合作伙伴配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getParter(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改合作伙伴配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateParter(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addParter(this.form).then(response => {
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
        return delParter(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/parter/export', {
        ...this.queryParams
      }, `parter_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
<style scoped>
.addBtn-right{
  float:right
}
/* .delete-btn-span{
  color:red;
  padding-left:6px;
  margin-left:6px;
  border-left:1px solid #e5e5e5;
  cursor: pointer;
} */
.logoImg{
  width:80px;
  height:80px;
}
</style>
