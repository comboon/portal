<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-position="left">
      <el-form-item label="语言" prop="footerName">
        <el-select v-model="queryParams.lanType" placeholder="请选择语言"  size="small">
         <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
        </el-select>
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
      <el-form-item class="addBtn-right">
        <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleUpdate"
            v-hasPermi="['dip:footericon:add']"
          >添加页脚配置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">

      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dip:footericon:edit']"
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
          v-hasPermi="['dip:footericon:remove']"
        >删除</el-button>
      </el-col>
     <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dip:footericon:export']"
        >导出</el-button>
      </el-col>
       <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="footerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="id" align="center" prop="id" />-->
      <el-table-column align="center" label="语言" prop="lanType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
        </template>
      </el-table-column>
      <!--<el-table-column label="删除人" align="center" prop="deletedBy" />
      <el-table-column label="删除时间" align="center" prop="deletedAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deletedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            class="privew-btn"
            @click="gotoDetailPage(scope.row,'see')"
          >查看详情</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="primary"
            size="mini"
            class="line-btn"
            @click="handleUpdate(scope.row,'edit')"
            v-hasPermi="['dip:footericon:edit']"
          >修改</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="danger"
            size="mini"
            class="delete-btn-span"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:footericon:remove']"
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
    <footer-detail ref="fDetail"></footer-detail>
    <footer-detail ref="editFooterInfor" :isEdit="true" :title="title"></footer-detail>
  </div>
</template>

<script>
import { listFooter, getFooter, delFooter, addFooter, updateFooter } from "@/api/dip/footer";
import footerDetail from "./detailPage/index.vue"
export default {
  name: "Footer",
  dicts: ['dip_global_language','dip_footer_type'],
  components:{
   footerDetail
  },
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
      // 门户核心服务页脚配置表格数据
      footerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lanType: null,
        footerName: null,
        url: null,
        sortOrder: null,
        type: null,
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
        footerName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
          { min:1,max: 64, message: '请输入255个字节以内的名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: "链接地址不能为空", trigger: "blur" },
          {min:1, max: 255, message: '请输入255个字节以内的链接地址', trigger: 'blur' }
        ],
        type: [
          { required: true, message: "类型0快速入口1相关链接不能为空", trigger: "change" }
        ],
      },
    };
  },
  created() {
    this.getList();
    console.log(window.scrollY,window.scrollX);
  },
  methods: {
    /** 查询门户核心服务页脚配置列表 */
    getList() {
      this.loading = true;
      listFooter(this.queryParams).then(response => {
        this.footerList = response.rows;
        this.total = response.total;
        this.loading = false;
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
        footerName: null,
        url: null,
        sortOrder: null,
        type: null,
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
      this.queryParams.lanType=null;
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
      this.title = "添加门户核心服务页脚配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row,handType) {
      handType===undefined ? this.title="添加页脚配置" :this.title="编辑页脚配置";
      this.reset();
      const id = row.id || this.ids
      this.$refs.editFooterInfor.init(row.id,handType);
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFooter(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFooter(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除本条数据？').then(function() {
        return delFooter(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/footer/export', {
        ...this.queryParams
      }, `footer_${new Date().getTime()}.xlsx`)
    },
    gotoDetailPage(row,handType){
       this.$refs.fDetail.init(row.id,handType);
    }
  }
};
</script>
