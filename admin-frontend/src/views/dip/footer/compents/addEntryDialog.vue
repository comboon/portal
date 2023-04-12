<template>
  <div class="addEntry-dialog" v-if="showDialog">
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="370px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="入口名称" prop="footerName">
          <el-input v-model="form.footerName" placeholder="请输入入口名称"/>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入链接地址"/>
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序值" type="number"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "addEntry-dialog",
  data() {
    var validateSorder = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('排序值只能是数字,且不能为空!'));
      } else if (value.length > 10) {
        callback(new Error('请输入10字节以内的排序值'));
      } else if (value.indexOf('.') !== -1) {
        callback(new Error('请输入正整数的排序值'));
      } else if (value < 0) {
        callback(new Error('请输入正整数的排序值'));
      }
      callback();
    };
    return {
      title: "",
      showDialog: false,
      open: true,
      form: {
        footerName: null, //入口名称
        url: null, //链接地址
        sortOrder: null, // 排序
        type: 0
      },
      rules: {
        footerName: [
          {required: true, message: "入口名称不能为空", trigger: "blur"},
          {max: 64, message: '请输入64个字节以内的入口名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: "链接地址不能为空", trigger: "blur"},
          {max: 500, message: '请输入500个字节以内的链接地址', trigger: 'blur'},
          {
            pattern: '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\*\\+,;=.]+$',
            message: '请输入正确的网络地址',
            trigger: 'blur'
          }
        ],
        sortOrder: [
          {required: true, validator: validateSorder, trigger: "blur"},
        ],
      },
      oldData: {},
    };
  },
  methods: {
    //显示添加入口的dialog
    init(data = {}, type) {
      type === 'add' ? this.title = "添加入口" : this.title = "编辑入口";
      this.type = type;
      this.showDialog = true;
      this.open = true;
      this.oldData = {};
      if (data.row !== undefined) {
        this.form = data.row;
        this.oldData = data;
      }
    },
    cancel() {
      this.showDialog = false;
      this.open = false;
      this.form = {
        entryName: null, //入口名称
        linkUrl: null, //链接地址
        sortNum: null, // 排序
      };
    },
    //添加一项入口
    handleAdd() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.oldData.row = this.form;
          this.$emit('addEntry', this.oldData);
          this.$message({
            type: "success",
            message: this.type === 'add' ? "添加成功" : "修改成功"
          })
          this.cancel();
        }
      })
    }
  },
};
</script>
