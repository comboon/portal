<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      @close="cancel"
    >
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
        <el-form-item label="公司介绍" prop="companyInfo">
          <editor v-model="form.companyInfo" :min-height="192" v-if=" this.handleType!=='see'" />
          <div v-else v-html="form.companyInfo" class="descBox description"></div>
        </el-form-item>
        <el-form-item label="平台介绍" prop="platformInfo">
          <editor v-model="form.platformInfo" :min-height="192" v-if=" this.handleType!=='see'" />
           <div v-else v-html="form.platformInfo" class="descBox description"></div>
        </el-form-item>
        <!-- <el-divider content-position="center">门户核心服务平台历程配置信息</el-divider> -->
        <el-row :gutter="10" class="mb8">
          <el-col :span="8">
            <span class="plant-span-gress"> 平台发展历程 </span>
          </el-col>
          <el-col :span="16" v-if="isEdit">
            <el-button
              class="addBtn-right"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAddHistoryCfg"
              >添加历程</el-button
            >
          </el-col>
          <!-- <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteHistoryCfg">删除</el-button>
              </el-col> -->
        </el-row>
        <el-table
          :data="historyCfgList"
          :row-class-name="rowHistoryCfgIndex"
          @selection-change="handleHistoryCfgSelectionChange"
          ref="historyCfg"
        >
          <el-table-column type="selection" width="50" align="center" />

          <el-table-column label="年月" prop="period"> </el-table-column>
          <el-table-column label="创建时间" prop="createdAt"> </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
            v-if="isEdit"
          >
            <template slot-scope="scope">
              <!-- <span
                class="privew-btn"
                @click="seeOrEditCourseDetail(scope, 'see')"
                >查看详情</span
              > -->
              <el-button
                type="primary"
                size="mini"
                class="line-btn"
                style="border-left:none;"
                @click="seeOrEditCourseDetail(scope, 'edit')"
                v-hasPermi="['dip:newscenter:edit']"
                >编辑</el-button
              >
              <el-divider direction="vertical"></el-divider>
              <el-button
                type="danger"
                size="mini"
                class="delete-btn-span"
                @click="deleteCourseItem(scope.row)"
                v-hasPermi="['dip:newscenter:remove']"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="footer-wrap" v-if="isEdit">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="coursetitle"
      :visible.sync="openAddCourse"
      width="800px"
      append-to-body
    >
      <el-form
        ref="courseform"
        :model="courseForm"
        :rules="courseRules"
        label-width="80px"
      >
        <el-form-item label="年月" prop="period">
          <el-date-picker
            v-model="courseForm.period"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择年月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="历程图片">
          <imageUpload v-model="courseForm.img" :limit="1"/>
        </el-form-item>
        <el-form-item label="简述历程" prop="description">
          <editor v-model="courseForm.description" :min-height="192" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="editCourse">
        <el-button @click="cancelEditCourse">取 消</el-button>
        <el-button type="primary" @click="saveCourse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { getAbout, addAbout, updateAbout } from "@/api/dip/about";

export default {
  name: "aboutDetail",
  dicts: ["dip_global_language", "dip_footer_type"],
  props: {
    title: {
      type: String,
      default: "新增关于我们配置",
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      open: false,
      // 表单参数
      form: {
        lanType: null,
      },
      // 表单校验
      rules: {
        lanType: [
          { required: true, message: "语言不能为空", trigger: "change" },
        ],
        companyInfo: [
          { required: true, message: "公司介绍不能为空", trigger: "blur" },
        ],
        platformInfo: [
          { required: true, message: "平台介绍不能为空", trigger: "blur" },
        ],
      },
      historyCfgList: [],
      //是否打开新增历程的弹窗
      openAddCourse: false,
      courseForm: {
        period: null,
        description: null,
      },
      courseRules: {
        period: [{ required: true, message: "年月不能为空", trigger: "blur" }],
        description: [
          { required: true, message: "简述历程不能为空", trigger: "blur" },
        ]
      },
      coursetitle: null,
      editCourse: false,
      oldData: {},
      handleType:null,
    };
  },
  methods: {
    init(id,type) {
      this.open = true;
      this.handleType=type;
      if (id != null || id != undefined) {
        this.getSetingsDetail(id);
      }
       this.$nextTick(()=>{
          this.$refs.form.clearValidate();
       })
    },
    //获取配置详情
    getSetingsDetail(id) {
      getAbout(id).then((response) => {
        this.form = response.data;
        this.historyCfgList = response.data.historyCfgList;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.historyCfgList)
          this.form.historyCfgList = this.historyCfgList;
          if (this.form.id != null) {
            updateAbout(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.$parent.getList();
            });
          } else {

            addAbout(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.$parent.getList();
            });
          }
        }
      });
    },
    saveCourse() {
      this.$refs["courseform"].validate((valid) => {
        if (valid) {
          if (this.oldData.$index !== undefined) {
            this.historyCfgList[this.oldData.$index] = this.courseForm;
          } else {
            const time = dayjs().format('YYYY-MM-DD')
            this.courseForm = {
              period: this.courseForm.period,
              img:this.courseForm.img,
              description: this.courseForm.description,
              createdAt: time,
            };
            this.historyCfgList.push(this.courseForm);
          }
          this.openAddCourse = !this.openAddCourse;
        } else {
        }
      });
    },
    /** 门户核心服务平台历程配置添加按钮操作 */
    handleAddHistoryCfg() {
      this.coursetitle = "新增历程";
      this.openAddCourse = true;
      this.editCourse = true;
      this.oldData = {
        row: {
          period: null,
          description: null,
        },
      };
      this.courseForm = this.oldData.row;
    },
    //查看或者编辑   每一个对应的历程信息
    seeOrEditCourseDetail(data, handType) {
      this.oldData = data;
      this.openAddCourse = true;
      this.courseForm = data.row;
      handType === "edit"
        ? (this.editCourse = true)
        : (this.editCourse = false);
      handType === "edit"
        ? (this.coursetitle = "编辑历程")
        : (this.coursetitle = "历程详情");
    },
    //删除历程
    deleteCourseItem(row) {
      this.historyCfgList.splice(row.index - 1, 1);
    },
    //取消新增历程
    cancelEditCourse() {
      this.openAddCourse = !this.openAddCourse;
      this.courseForm = {
        period: null,
        description: null,
      };
    },
    /** 门户核心服务平台历程配置序号 */
    rowHistoryCfgIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 复选框选中数据 */
    handleHistoryCfgSelectionChange(selection) {
      this.checkedHistoryCfg = selection.map((item) => item.index);
    },
    reset() {
      this.form = {
        id: null,
        lanType: null,
        companyInfo: null,
        platformInfo: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null,
      };
      this.historyCfgList = [];
    },
    //取消操作
    cancel() {
      this.open = false;
      this.reset();
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-wrap {
  text-align: right;
  margin-top: 10px;
}

.descBox{
  border-radius: 5px;
  border:1px solid #e5e5e5;
  padding: 0 12px;
}
</style>
