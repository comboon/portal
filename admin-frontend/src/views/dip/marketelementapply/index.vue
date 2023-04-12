<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-position="left"
    >
      <el-form-item label="市场元素名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入市场元素名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请人" prop="applyUser">
        <el-input
          v-model="queryParams.applyUser"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyTime">
        <el-date-picker
          v-model="daterangeApplyTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
<!--      <el-form-item label="审核状态" prop="applyStatus">
        <el-select
          v-model="queryParams.applyStatus"
          placeholder="请选择审核状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in dict.type.dip_audit_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:marketelementapply:add']"
        >新增</el-button>
      </el-col>-->
      <!-- <el-col :span="1.5">     <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleAudit"
          v-hasPermi="['dip:marketelementapply:audit']"
        >审核</el-button>
      </el-col>-->
      <!--      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['dip:marketelementapply:remove']"
        >删除</el-button>
      </el-col>
      </el-col>-->
      <!--
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dip:marketelementapply:export']"
        >导出</el-button>
      </el-col>
      -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="marketelementapplyList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="元素主图" align="center" prop="imageUrl">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" class="logoImg" />
        </template>
      </el-table-column>
      <el-table-column label="市场元素名称" align="center" prop="name" />
      <el-table-column label="购买方式" align="center" prop="purchaseType" />
      <el-table-column label="价格" align="center" prop="price" />
      <el-table-column
        label="申请时间"
        align="center"
        width="180"
        prop="applyTime"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.applyTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center" prop="applyUser" />
      <el-table-column
        label="申请人电话号码"
        align="center"
        prop="applyUserPhone"
      />
<!--      <el-table-column label="审核状态" align="center" prop="applyStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dip_audit_status"
            :value="scope.row.applyStatus"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="审核时间"
        align="center"
        width="180"
        prop="auditTime"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.auditTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核意见" align="center" prop="opinion" />
      <el-table-column label="审核人" align="center" prop="auditUser" />-->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleAudit(scope.row)"
            v-hasPermi="['dip:marketelementapply:audit']"
            v-show="scope.row.applyStatus !== 1"
            >查看</el-button
          >
          <!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:marketelementapply:remove']"
          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改后台服务市场元素申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="元素主图" prop="imageUrl">
              <imageUpload v-model="form.imageUrl" :limit="1" disabled :isShowTip="false"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市场元素名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入市场元素名称"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="购买方式" prop="purchaseType">
              <el-select
                v-model="form.purchaseType"
                placeholder="请选择购买方式"
                disabled
              >
                <el-option
                  v-for="dict in dict.type.dip_expense_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="应用规格">
              <el-input v-model="form.plainName" placeholder="请输入应用规格" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="24">
           <el-col :span="12">
            <el-form-item label="付费方式">
              <el-input v-model="form.unit" placeholder="请输入付费方式" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="price">
              <el-input v-model="form.price" placeholder="请输入价格" disabled/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="申请人" prop="applyUser">
              <el-input
                v-model="form.applyUser"
                placeholder="请输入申请人"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="applyUserPhone">
              <el-input
                v-model="form.applyUserPhone"
                placeholder="请输入联系电话"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>

<!--        <el-form-item label="审核意见" prop="opinion">
          <el-input
            v-model="form.opinion"
            placeholder="请输入审核意见"
            type="textarea"
            show-word-limit
            :rows="4"
            maxlength="200"
          />
        </el-form-item>-->
      </el-form>
<!--      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm(2)">拒绝</el-button>
        <el-button type="primary" @click="submitForm(1)">通过</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import {
  listMarketelementapply,
  getMarketelementapply,
  delMarketelementapply,
  addMarketelementapply,
  updateMarketelementapply,
  auditMarketelementapply,
} from "@/api/dip/marketelementapply";

export default {
  name: "Marketelementapply",
  dicts: ["dip_audit_status", "dip_buy_unit_type"],
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
      // 后台服务市场元素申请表格数据
      marketelementapplyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 审核意见时间范围
      daterangeApplyTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        applyUser: null,
        applyTime: null,
        auditUser: null,
        applyStatus: null,
      },
      // 表单参数
      form: {
        plainName:null,   //规格名称
        unit:null,  //付费方式
      },
      // 表单校验
      rules: {
        opinion: [
          { required: true, message: "审核意见不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    if(this.$route.query.applyStatus){
      this.queryParams.applyStatus=this.$route.query.applyStatus;
    }

    this.getList();
    //this.queryParams.applyStatus="0";
  },
  methods: {
    /** 查询后台服务市场元素申请列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeApplyTime && "" != this.daterangeApplyTime) {
        this.queryParams.params["beginApplyTime"] = this.daterangeApplyTime[0];
        this.queryParams.params["endApplyTime"] = this.daterangeApplyTime[1];
      }
      listMarketelementapply(this.queryParams).then((response) => {
        this.marketelementapplyList = response.rows;
        this.marketelementapplyList.forEach((item) => {
          item.imageUrl = process.env.VUE_APP_BASE_API + item.imageUrl;
          item.price = item.price == null ? "-" : item.price;
          item.auditTime = item.auditTime == null ? "-" : item.auditTime;
          item.opinion = item.opinion == null ? "-" : item.opinion;
          item.auditUser = item.auditUser == null ? "-" : item.auditUser;
        });
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
        elementId: null,
        imageUrl: null,
        name: null,
        purchaseType: null,
        price: null,
        unit: null,
        applyUser: null,
        applyUserPhone: null,
        applyTime: null,
        auditUser: null,
        auditTime: null,
        opinion: null,
        applyStatus: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null,
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
      this.daterangeApplyTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加后台服务市场元素申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getMarketelementapply(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改后台服务市场元素申请";
      });
    },
    /** 详情按钮操作 */
    handleAudit(row) {
      this.reset();
      const id = row.id || this.ids;
      getMarketelementapply(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "市场元素订单详情";
        console.log(this.form);
        let choosePlanList=this.form.choosePlanList[0];
        let planId=choosePlanList.planId;    //规格id
        let unitIds=parseInt( choosePlanList.unitIds);   //付费方式
        console.log(`规格id${planId}`);
        this.form.planCfgList.forEach(item=>{
          if(item.id==planId){
            this.form.plainName=item.name;
            item.marketelementunitCfgList.forEach(i=>{
              if(i.id==unitIds){
                 this.form.unit=i.unit;
              }
            })
          }
        })
       console.log( this.form.planCfgList);
      });
    },
    /** 提交按钮 */
    submitForm(type) {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            this.form.auditType = type;
            auditMarketelementapply(this.form).then((response) => {
              this.$modal.msgSuccess("审核成功");
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
      this.$modal
        .confirm(
          '确认删除该条数据？'
        )
        .then(function () {
          return delMarketelementapply(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "dip/marketelementapply/export",
        {
          ...this.queryParams,
        },
        `marketelementapply_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
<style>
.logoImg {
  width: 80px;
  height: 80px;
}
</style>
