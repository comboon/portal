<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="产品服务分类" prop="menuId">
        <el-select v-model="queryParams.menuId" placeholder="请选择产品服务分类"  size="small">
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.menuName"
            :value="parseInt(item.id)"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="产品服务名称" prop="serviceName">
        <el-input
          v-model="queryParams.serviceName"
          placeholder="请输入产品服务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否首页展示" prop="isShow">
        <el-select
          v-model="queryParams.isShow"
          placeholder="请选择展示状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in dict.type.dip_pdandsolu_index_show"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
      <el-form-item class="addBtn-right">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:productservice:add']"
          >添加产品服务</el-button
        >
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">

      </el-col> -->
    <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dip:productservice:edit']"
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
          v-hasPermi="['dip:productservice:remove']"
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
          v-hasPermi="['dip:productservice:export']"
        >导出</el-button>
      </el-col>
      -->
    <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    <!-- </el-row> -->

    <el-table
      v-loading="loading"
      :data="productserviceList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="产品服务分类" align="center" prop="menuName">
      </el-table-column>
      <el-table-column label="产品服务名称" align="center" prop="serviceName" />
      <el-table-column label="是否首页展示" align="center" prop="isShow">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dip_pdandsolu_index_show"
            :value="scope.row.isShow"
          />
        </template>
      </el-table-column>
      <el-table-column label="语言" align="center" prop="lanType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dip_global_language"
            :value="scope.row.lanType"
          />
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="sortOrder" />
      <!--<el-table-column label="背景图" align="center" prop="bgImgUrl"/>
      <el-table-column label="背景图描述" align="center" prop="bgImgDescription"/>
      <el-table-column label="是否关联市场元素" align="center" prop="isConfig">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_relation_markerele" :value="scope.row.isConfig"/>
        </template>
      </el-table-column>
      <el-table-column label="市场元素" align="center" prop="elementId"/>
      <el-table-column label="详情形态" align="center" prop="showType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_description_type" :value="scope.row.showType"/>
        </template>
      </el-table-column>
      <el-table-column label="外部链接" align="center" prop="outUrl"/>
      <el-table-column label="删除人" align="center" prop="deletedBy"/>
      <el-table-column label="删除时间" align="center"width="180" prop="deletedAt">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deletedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        label="操作"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.showType===1">
            <el-button
              type="success"
              size="mini"
              class="privew-btn"
              @click="showDetail(scope.row)"
            >查看详情</el-button>
            <el-divider direction="vertical"></el-divider>
          </template>
          <el-button
            type="primary"
            size="mini"
            class="line-btn"
            :class="{'no-boder': scope.row.showType===2 || scope.row.showType===null || scope.row.showType===0}"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dip:productservice:edit']"
            >修改</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="danger"
            size="mini"
            class="delete-btn-span"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dip:productservice:remove']"
            >删除</el-button
          >
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

    <!-- 添加或修改门户核心服务产品服务配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
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
        <el-form-item label="产品服务分类" prop="menuId">
          <treeselect
            v-model="form.menuId"
            :options="menuOptions"
            :normalizer="normalizer"
            :show-count="true"
            disable-branch-nodes
            placeholder="请选择产品服务"
            style="width:223.6px"
            @select="selectNode"
          />
<!--          <el-select v-model="form.menuId" placeholder="请选择产品服务" style="width:223.6px">-->
<!--            <el-option-->
<!--              v-for="item in menuList"-->
<!--              :key="item.id"-->
<!--              :label="item.menuName"-->
<!--              :value="parseInt(item.id)"-->
<!--            ></el-option>-->
<!--          </el-select>-->
        </el-form-item>
        <el-form-item label="产品服务名称" prop="serviceName">
          <el-input
            v-model="form.serviceName"
            placeholder="请输入产品服务名称"
            style="width:223.6px"
          />
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序值" type="number" style="width:223.6px" />
        </el-form-item>
        <el-form-item label="首页展示" prop="isShow">
          <el-select v-model="form.isShow" placeholder="请选择" style="width:223.6px">
            <el-option
              v-for="dict in dict.type.dip_pdandsolu_index_show"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="背景图" prop="bgImgUrl"  v-if="form.isShow===0">
          <imageUpload v-model="form.bgImgUrl" :limit="1"/>
        </el-form-item>
        <el-form-item label="背景图描述" prop="bgImgDescription"  v-if="form.isShow===0">
          <el-input
            v-model="form.bgImgDescription"
             :autosize="{ minRows: 2, maxRows: 4}"
             type="textarea"
              maxlength="200"
              show-word-limit
            placeholder="请输入背景图描述"
            style="width:223.6px"
          />
        </el-form-item>
        <el-form-item label="是否关联市场元素" prop="isConfig">
          <el-select
            v-model="form.isConfig"
            placeholder="请选择是否关联市场元素"
            style="width:223.6px"
            @change="changeVal"
          >
            <el-option
              v-for="dict in dict.type.dip_relation_markerele"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.isConfig === 0"
          label="市场元素"
          prop="elementId"
        >
          <el-select v-model="form.elementId" placeholder="请选择市场元素" style="width:223.6px">
            <el-option
              v-for="item in elementList"
              :key="item.id"
              :label="item.name"
              :value="parseInt(item.id)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情形态" prop="showType"  v-if="form.isConfig !==0">
          <el-select v-model="form.showType" placeholder="请选择详情形态"  @change="changeVal" style="width:223.6px">
            <el-option
              v-for="dict in dict.type.dip_description_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.isConfig !==0 && form.showType == 2" label="外部链接" prop="outUrl">
          <el-input
            v-model="form.outUrl"
            style="width:223.6px"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          v-if="form.isConfig !==0 && form.showType == 1"
          label="详情展示内容"
          prop="description"
        >
           <editor v-model="form.description" :min-height="192"/>
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


    <detail-page ref="detail"></detail-page>
  </div>
</template>

<script>
import {
  listProductservice,
  getProductservice,
  delProductservice,
  addProductservice,
  updateProductservice,
  listModuleMenu,
  getAllServiceType,
  getAllPublishElement,
} from "@/api/dip/productservice";
import detailPage from "@/components/publicDetailPage/detail";
import {listModulemenu} from "@/api/dip/modulemenu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Productservice",
  components: { detailPage,Treeselect },
  dicts: [
    "dip_global_language",
    "dip_pdandsolu_index_show",
    "dip_relation_markerele",
    "dip_description_type",
  ],
  data() {
     var validateDesc = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入详情内容'));
        }
          callback();
      };
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
      menuList: [],
      // 菜单树选项
      menuOptions: [],
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
      // 门户核心服务产品服务配置表格数据
      productserviceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //选中菜单层级
      level:0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        menuId: null,
        lanType: null,
        id: null,
        sortOrder: null,
        isShow: null,
        bgImgUrl: null,
        bgImgDescription: null,
        isConfig: null,
        elementId: null,
        showType: null,
        outUrl: null,
        deletedBy: null,
        deletedAt: null,
      },
      // 表单参数
      form: {
        isShow: 0,
        sortOrder:-1
      },
      // 表单校验
      rules: {
        menuId: [
          {
            required: true,
            message: "产品服务分类不能为空",
            trigger: "change",
          },
        ],
        lanType: [
          { required: true, message: "语言不能为空", trigger: "change" },
        ],
        showType: [
          { required: true, message: "请选择展示类型", trigger: "change" },
        ],
          elementId: [
          { required: true, message: "市场元素不能为空", trigger: "change" },
        ],
        serviceName: [
          { required: true, message: "产品服务名称不能为空", trigger: "blur" },
          { max: 64, message: '请输64个字节以内的服务名称', trigger: 'blur' }
        ],
         bgImgUrl: [
          { required: true, message: "背景图不能为空", trigger: "blur" }
        ],
         bgImgDescription: [
          { required: true, message: "背景图描述不能为空", trigger: "blur" },
         { max: 255, message: '请输入255个字节以内的描述信息', trigger: 'blur' }
        ],
        outUrl: [
          { required: true, message: "外部链接不能为空", trigger: "blur" },
          {max: 500, message: '请输500个字节以内的链接地址', trigger: 'blur' }
        ],
        // description: [
        //   { validator: validateDesc, trigger: "blur" },
        // ],
        description: [
          { required: true, message: "详情描述不能为空", trigger: "blur" },
        ],
        sortOrder: [
          { required: true,validator: validateSorder, trigger: "blur" },
        ],
        isShow: [
          {
            required: true,
            message: "首页展示1不展示不能为空",
            trigger: "change",
          },
        ],
        isConfig: [
          {
            required: true,
            message: "是否关联市场元素不能为空",
            trigger: "change",
          },
        ],
      },
      menuName: null,
      servicTypes:[],
    };
  },
  async mounted() {
   await this.getMenuList();
    this.getList();
    this.getPublishElements();
    this.getAllServices();
  },
  methods: {
    /** 查询门户核心服务产品服务配置列表 */
    getList() {
      this.loading = true;
      listProductservice(this.queryParams).then((response) => {
        this.productserviceList = response.rows;
        this.productserviceList.forEach((item) => {
          this.menuList.forEach((menu) => {
            if (item.menuId === menu.id) {
              item.menuName = menu.menuName;
            }
          });

        });
        this.total = response.total;
        this.loading = false;
      });
    },
    //获取所有的产品服务
    getAllServices(){
      getAllServiceType().then(res=>{
        this.servicTypes=res.data;
      })
    },
    getMenuList() {
       listModuleMenu().then((response) => {
        this.menuList = response.data;
      });
    },
    getPublishElements() {
      getAllPublishElement().then((response) => {
        this.elementList = response.data;
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
        menuId: null,
        lanType: null,
        sortOrder: null,
        isShow: null,
        bgImgUrl: null,
        bgImgDescription: null,
        isConfig: null,
        elementId: null,
        showType: null,
        outUrl: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null,
      };
      this.level=0
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.id=null;
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    getTreeselect(row) {
      listModulemenu({"type":0,"lanType":row.lanType}).then(response => {
        this.menuOptions = [];
        let children = this.handleTree(response.data, "id");
        this.menuOptions.push(children[0]);
      });
    },
    /**选中某个菜单*/
    selectNode(node, instanceId){
      this.level=node.level;
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
    /** 新增按钮操作 */
    handleAdd() {
      this.$router.push({path: "/productservice/addService", params:{} })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.$router.push({path:'/productservice/editService',query:{id:row.id}})
      return
      this.reset();
      this.getTreeselect(row);
      const id = row.id || this.ids;
      getProductservice(id).then((response) => {
        this.form = response.data;
        if(this.form.menuLevel){
          this.level=this.form.menuLevel;
        }
        this.form.elementId=parseInt(this.form.elementId);
        this.open = true;
        this.title = "修改产品服务配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if(this.level!==3){
            this.$modal.msgError("产品服务分类只能选择第三级");
            return;
          }
          if (this.form.id != null) {
            updateProductservice(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProductservice(this.form).then((response) => {
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
      this.$modal
        .confirm(
          '确认删除该条数据？'
        )
        .then(function () {
          return delProductservice(ids);
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
        "dip/productservice/export",
        {
          ...this.queryParams,
        },
        `productservice_${new Date().getTime()}.xlsx`
      );
    },
    //切换展实类型的时候，要把上次的选项的值置为空
    changeVal(val){
      console.log(val);
      if(val===0){
         this.form.outUrl = null;
         this.form.description = null;
         this.form.showType=0;
      }
      if (val === 1) {
        this.form.elementId=null;
        this.form.outUrl = null;
         this.form.showType=1;
      }
      if (val === 2) {
        this.form.elementId=null;
        this.form.description = null;
      }
    },
     //查看详情
    showDetail(row){
      getProductservice(row.id).then((res) => {
        let list = res.data.productservicedetailCfgList
        this.$refs.detail.getDetailData(list,'product')
      });
    },
  },
};
</script>
