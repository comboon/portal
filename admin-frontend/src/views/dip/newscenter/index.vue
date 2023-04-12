<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-position="left" >
      <el-form-item label="标题" prop="title" >
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
           size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发布者" prop="publishUser">
        <el-input
          v-model="queryParams.publishUser"
          placeholder="请输入发布者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类" >
         <el-select v-model="queryParams.menuId" placeholder="请选择"  size="small">
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.menuName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="是否置顶" >
         <el-select v-model="queryParams.top" placeholder="请选择"  size="small">
             <el-option
              v-for="option in optionsList"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="createdAt">
         <el-date-picker
             size="small"
            v-model="startAndEndTime"
            type="daterange"
              style="width: 240px"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getCheckedTime"
            >
       </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="删除人" prop="deletedBy">
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

    </el-form>
    <el-row :gutter="10" class="mb8">
       <el-col :span="1.5">
          <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:newscenter:add']"
        >新增</el-button>
       </el-col>

       <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-success"
          size="mini"
          :disabled="multiple"
          @click="handlePublish"
          v-hasPermi="['dip:newscenter:publish']"
          >上架</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-warning"
          size="mini"
          :disabled="multiple"
          @click="handleUnPublish"
          v-hasPermi="['dip:newscenter:unpublish']"
          >下架</el-button
        >
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="newscenterList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="新闻中心Id" align="center" prop="id" />-->
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="发布者" align="center" prop="publishUser" />
      <el-table-column label="新闻分类" align="center"  >
            <template slot-scope="scope">
               <span>{{scope.row.menuName}}</span>
            </template>
      </el-table-column>
      <el-table-column align="center" label="语言" prop="lanType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.dip_global_language" :value="scope.row.lanType"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否置顶" prop="lanType">
        <template slot-scope="scope">
         {{scope.row.top===0 ? '否' : '是'}}
        </template>
      </el-table-column>
       <el-table-column align="center" label="发布状态" prop="lanType">
         <template slot-scope="scope">
           <dict-tag
             :options="dict.type.dip_publish_status"
             :value="scope.row.publishStatus"
           />
         </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center" prop="createdAt" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.publishStatus!==1">{{ parseTime(scope.row.publishTime, '{y}-{m}-{d}') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="删除人" align="center" prop="deletedBy" />
      <el-table-column label="删除时间" align="center" prop="deletedAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.deletedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width" width="240px">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            class="privew-btn"
            @click="handNewsDetail(scope.row)"
             v-if="scope.row.publishStatus!==0"
          >查看详情</el-button>

          <template v-if="scope.row.publishStatus!==2">
            <el-divider direction="vertical" v-if="scope.row.publishStatus!==0"></el-divider>
            <el-button
              type="primary"
              size="mini"
              class="line-btn"
              :class="{noborder:scope.row.publishStatus!==2}"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['dip:newscenter:edit']"
              v-if="scope.row.publishStatus!==2"
            >修改</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="danger"
              size="mini"
              class="delete-btn-span"
              @click="handleDelete(scope.row)"
              v-hasPermi="['dip:newscenter:remove']"
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

    <!-- 添加或修改门户核心服务新闻中心配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
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
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入新闻标题" style="width:223.6px"/>
        </el-form-item>
        <el-form-item label="分类" prop="menuId">
          <el-select v-model="form.menuId" placeholder="请选择分类" >
            <el-option
              v-for="menu in menuList"
              :key="menu.id"
              :label="menu.menuName"
              :value="parseInt(menu.id)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发布者" prop="publishUser">
          <el-input v-model="form.publishUser" placeholder="请输入发布者" style="width:223.6px" />
        </el-form-item>

       <el-form-item label="是否置顶" prop="top">
           <el-select v-model="form.top" placeholder="请设置是否置顶" >
            <el-option
              v-for="option in optionsList"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="新闻图片"  v-if="form.top===1" prop="img">
          <imageUpload v-model="form.img" :limit="1"/>
        </el-form-item>

         <el-form-item label="新闻概述" prop="overview">
         <el-input v-model="form.overview" type="textarea" placeholder="请输入新闻概述"  maxlength="255"
          show-word-limit/>
        </el-form-item>
        <el-form-item label="新闻内容" prop="description">
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
        <el-button @click="submitForm('add')">保 存</el-button>
        <el-button type="primary" @click="submitForm('publish')">发布</el-button>
      </div>
    </el-dialog>
    <news-detail ref="newDetail"></news-detail>
  </div>
</template>

<script>
import { listNewscenter,
 getNewscenter,
 delNewscenter,
  addNewscenter,
  updateNewscenter,
  listModuleMenu,
  publishNews,
  unpublishNews,
  } from "@/api/dip/newscenter";
import newsDetail from "./detailPage/index.vue"
export default {
  name: "Newscenter",
  dicts:['dip_global_language','dip_publish_status'],
  components:{
    newsDetail
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
      // 门户核心服务新闻中心配置表格数据
      newscenterList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      startAndEndTime:null, //选中的时间段
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        menuId: null,
        lanType: null,
        title: null,
        publishUser: null,
        top:null,
        img:null,
        deletedBy: null,
        deletedAt: null,
        checkedType:null, //选中的分类
        startTime:null, //开始时间
        endTime:null,    //结束时间
      },
      // 表单参数
      form: {
        menuId:null,
        lanType:null,
        overview:null,
        top:0,
        img:null,
        publish:1,
      },
      optionsList:[
        {label:"是",value:1},
        {label:"否",value:0}
      ],
      // 表单校验
      rules: {
        lanType: [
          { required: true, message: "语言不能为空", trigger: "change" }
        ],
        title: [
          { required: true, message: "新闻标题不能为空", trigger: "blur" },
          { max: 255, message: '请输255个字节以内的新闻标题', trigger: 'blur' }
        ],
        menuId:[
          { required: true, message: "分类不能为空", trigger: "change"}
        ],
        description:[
          { required: true, message: "新闻内容不能为空", trigger: "blur"}
        ],
        publishUser:[
           { max: 20, message: '请输20个字节以内的发布者信息', trigger: 'blur' }
        ],
        top:[
            { required: true, message: '请设置是否置顶', trigger: 'blur' }
        ],

        img:[
          { required: true, message: "置顶图片不能为空", trigger: "blur" }
        ],
        overview:[
           { required: true, message: "新闻概述不能为空", trigger: "blur" },
           { max: 255, message: '请输255个字节以内的新闻概述', trigger: 'blur' }
        ]
      },
      menuList:[],
      value: ''
    };
  },
  async created() {
    await this.getMenuList();
     this.getList();
  },
  methods: {
    /** 查询门户核心服务新闻中心配置列表 */
    getList() {
      this.loading = true;
      this.newscenterList=[];
      listNewscenter(this.queryParams).then(response => {
         response.rows.forEach(item=>{
           this.menuList.forEach(i=>{
             if(item.menuId===i.id){
               item={...item,menuName:i.menuName}
               this.newscenterList.push({...item,menuName:i.menuName})
             }
           })
         })
        this.total = response.total;
        this.loading = false;
      });
    },
  getMenuList(){
     listModuleMenu().then(response =>{
        this.menuList = response.data;
      });
    },
    /**获取选中的搜索日期时间段 */
    getCheckedTime(val){
      if(val){
        if(val[0]!==val[1]){
            this.queryParams.startTime=val[0];
            this.queryParams.endTime=val[1];
        }else{
            this.queryParams.startTime=val[0];
            this.queryParams.endTime=val[1]+" 23:59:59";
        }
      }else{
        this.queryParams.startTime=null;
        this.queryParams.endTime=null;
      }
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
        title: null,
        publishUser: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null,
        top:0,
        img:null,
        checkedType:null, //选中的分类
        startTime:null, //开始时间
        endTime:null ,  //结束时间
        overview:null,
        publish:1,
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
      this.queryParams={
        pageNum: 1,
        pageSize: 10,
        menuId: null,
        lanType: null,
        title: null,
        publishUser: null,
        deletedBy: null,
        deletedAt: null,
        checkedType:null, //选中的分类
        startTime:null, //开始时间
        endTime:null,    //结束时间
        overview:null
      };
      this.startAndEndTime=null, //选中的时间段
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
      this.title = "添加新闻配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getNewscenter(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改新闻配置";
      });
    },
    /** 提交按钮 */
    submitForm(type) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (type === "publish") {
            this.form.publish = 1;
          }
          if (type === "add") {
            this.form.publish = 0;
          }

          if (this.form.id != null) {
            updateNewscenter(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNewscenter(this.form).then(response => {
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
        return delNewscenter(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dip/newscenter/export', {
        ...this.queryParams
      }, `newscenter_${new Date().getTime()}.xlsx`)
    },
    /**上架新闻操作 */
    handlePublish(){
       const ids = this.ids;
      this.$modal
        .confirm('是否确认上此架新闻？')
        .then(function () {
          return publishNews(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("上架成功");
        })
        .catch(() => {});
    },
    /**下架操作 */
    handleUnPublish(){
       const ids = this.ids;
      this.$modal
        .confirm('是否确认下此架新闻?')
        .then(function () {
          return unpublishNews(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("下架成功");
        })
        .catch(() => {});
    },
    handNewsDetail(row){
      this.$refs.newDetail.init(row.id);
    }

  }
};
</script>
<style scoped>

.app-container .noborder{
  border-left:none;
}
</style>
