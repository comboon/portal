<template>
  <div id="addOrEditFooter-dialog" v-if="showDialog">
    <el-dialog :title="title" :visible.sync="open" width="770px" append-to-body @close="closeDialog">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="语言" prop="lanType">
          <el-select v-model="form.lanType" placeholder="请选择语言" @change="alertLangType=false" :disabled="!isEdit">
            <el-option
              v-for="dict in dict.type.dip_global_language"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
          <div class="alertxt" style="padding-left:10px" v-if="alertLangType">
            <span>请输入选择语言</span>
          </div>
        </el-form-item>

        <el-form-item label="联系我们" class="top-line">
          <div class="contact-box">
            <div class="contact-item">
              <div class="item-wrap">
                <span>电话:</span>
                <span class="infor-span">
                  <el-input class="infor-input" :disabled="!isEdit" v-model="form.tel" @blur="valiDateTel"></el-input>
                </span>
                <div class="alertxt" v-if="alertTel">
                  <span>请输入正确的电话号码</span>
                </div>
              </div>

              <div class="item-wrap">
                <span> 地址:</span>
                <span class="infor-span">
                  <el-input class="infor-input" :disabled="!isEdit" v-model="form.loc" @blur="valiDateIoc"></el-input>
                </span>
                <div class="alertxt" v-if="alertIoc">
                  地址不能为空，且不能超过255个字节
                </div>
              </div>
              <div class="item-wrap">
                <span> 邮箱:</span>
                <span class="infor-span">
                  <el-input class="infor-input" :disabled="!isEdit" v-model="form.email" @blur="valiDateEmail"
                  ></el-input>
                </span>
              </div>
              <div class="alertxt" v-if="alertEmail">
                请输入正确格式的邮箱，且长度不能超过50字节
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="官方二维码">
          <div class="contact-item">
            <div>
              <imageUpload v-if="this.handType==='edit' || this.handType==='add'"
                           v-model="form.qrcodeUrl"
                           :limit="2"
                           @input="removeImg"
              />
              <div v-if="this.handType==='see'">
                <img :src="item" v-for="(item,index) in imgList" :key="index"
                     style="width:140px;height:140px;margin-left:5px"
                >
              </div>

            </div>

            <div class="alertxt img-alert" v-if="alertImgCode">
              请选择二维码图片
            </div>
          </div>
        </el-form-item>
        <el-form-item label="二维码备注" v-for="(item,index) in remark" :key="index">
          <el-input v-model="item.remark" :disabled="!isEdit" style="width:250px;"></el-input>
        </el-form-item>
        <el-form-item label="快速入口" class="top-line">
          <div style="margin-top: 20px">
            <el-row :gutter="7" style="margin-bottom: 10px" v-if="isEdit">
              <el-col :span="2" :offset="20">
                <el-button type="primary" @click="addEntryItem({},'add')">添加</el-button>
              </el-col>
            </el-row>
            <el-table :data="form.entranceList" style="width: 100%">
              <el-table-column prop="footerName" label="入口名称" width="180">
              </el-table-column>
              <el-table-column prop="url" label="链接地址" width="180">
              </el-table-column>
              <el-table-column prop="sortOrder" label="排序值" align="center"></el-table-column>
              <el-table-column v-if="isEdit" width="140px"
                               label="操作"
                               align="center"
                               class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    class="line-btn"
                    v-hasPermi="['dip:footer:edit']"
                    @click="handEditEntryInfor(scope,'edit')"
                  >修改</el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="danger"
                    size="mini"
                    class="delete-btn-span"
                    v-hasPermi="['dip:footer:remove']"
                    @click=" deleteEntryItem(scope)"
                  >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item label="相关链接" class="top-line">
          <div style="margin-top: 20px">
            <el-row :gutter="7" style="margin-bottom: 10px" v-if="isEdit">
              <el-col :span="2" :offset="20">
                <el-button type="primary" @click="addLinkItem({},'add')">添加</el-button>
              </el-col>
            </el-row>
            <el-table :data="form.linkList" style="width: 100%">
              <el-table-column prop="footerName" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="url" label="链接地址" width="180">
              </el-table-column>
              <el-table-column prop="sortOrder" label="排序值" align="center"></el-table-column>
              <el-table-column v-if="isEdit" width="140px"
                               label="操作"
                               align="center"
                               class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    class="line-btn"
                    v-hasPermi="['dip:footer:edit']"
                    @click="handEditLiknInfor(scope,'edit')"
                  >修改
                  </el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="danger"
                    size="mini"
                    class="delete-btn-span"
                    @click="deleteLinkItem(scope)"
                    v-hasPermi="['dip:footer:remove']"
                  >删除
                  </el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" v-if="isEdit">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <add-entry ref="addEntry" :dataInfor="dataInfor" @addEntry="andOneEntry"></add-entry>
    <add-link ref="addLink" @addLink="andOneLik"></add-link>
  </div>
</template>
<script>
import addEntry from '../compents/addEntryDialog.vue'
import addLink from '../compents/addLinkDialog.vue'
import { listFooter, getFooter, delFooter, addFooter, updateFooter } from '@/api/dip/footer'

export default {
  name: 'addOrEditFooter-dialog',
  dicts: ['dip_global_language', 'dip_footer_type'],
  props: {
    title: {
      type: String,
      default: '页脚配置详情'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    addEntry,
    addLink
  },
  data() {
    return {
      showDialog: false,
      open: true,
      imgList: [],
      form: {
        lanType: null,
        email: null,
        tel: null,
        loc: null,
        qrcodeUrl: null, //二维码url
        remark: '',
        entranceList: [],
        linkList: []
      },
      remark: [
        { remark: '' },
        { remark: '' }
      ],
      dataInfor: null,
      handType: null,
      alertTel: false,
      alertIoc: false,
      alertEmail: false,
      alertImgCode: false,
      alertLangType: false
    }
  },
  watch: {
    // 'form.qrcodeUrl'(newValue, oldValue) {
    //   console.log(newValue);
    //   if(newValue!==null){
    //     let arr=newValue.split(',')
    //     if(arr.length>0){
    //       this.remark.push({remark:null})
    //     }else{
    //       this.remark.pop();
    //     }
    //   }

    //}
  },
  methods: {
    //显示添加入口的dialog
    init(id = null, handType) {
      handType === undefined ? this.handType = 'add' : this.handType = handType
      this.showDialog = true
      this.open = true
      this.alertEmail = false
      this.alertIoc = false
      this.alertTel = false
      if (id !== null) {
        this.getFooterDetail(id)
      }
    },
    //获取详情信息
    getFooterDetail(id) {
      getFooter(id).then(response => {
        this.form = response.data
        let list = []

        let imgL = this.form.qrcodeUrl.split(',')
        imgL.forEach(item => {
          item = process.env.VUE_APP_BASE_API + item
          this.imgList.push(item)
        })
        if (this.form.remark !== null || this.form.remark !== '') {
          list = this.form.remark.split(',')
          let remarkList = []
          list.forEach(item => {
            let obj = { remark: item }
            remarkList.push(obj)
          })
          this.remark = remarkList
        }
        this.open = true
      })
    },
    cancel() {
      this.showDialog = false
      this.form = {
        lanType: null,
        email: null,
        tel: null,
        loc: null,
        qrcodeUrl: null, //二维码url
        entranceList: [],
        linkList: [],
        remark: null,
        imgList: []
      }
      this.remark = [
        { remark: '' },
        { remark: '' }
      ]
      this.imgList = []
    },
    //添加入口
    addEntryItem(data, type) {
      this.$refs.addEntry.init(data, type)
    },
    //编辑一项入口信息
    handEditEntryInfor(row, type) {

      this.$refs.addEntry.init(row, type)
    },
    //添加链接
    addLinkItem(data, type) {
      this.$refs.addLink.init(data, type)
    },
    closeDialog() {
      this.showDialog = false
      this.open = false
      this.cancel()
    },
    //新增或者编辑
    handSubmit() {
      let validateStatus = (this.valiDateForm())
      let str = []
      this.remark.forEach(item => {
        str.push(item.remark)
      })
      this.form.remark = str.join(',')
      if (validateStatus) {
        if (this.handType !== 'edit') {
          addFooter(this.form).then(response => {
            this.$modal.msgSuccess('新增成功')
            this.open = false
            this.$parent.getList()
          })
        } else {
          updateFooter(this.form).then(response => {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.$parent.getList()
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '表都字段缺失或填写有误，请仔细检查!'
        })
      }
    },
    //添加一项入口
    andOneEntry(data) {
      if (data.$index !== undefined) {
        this.form.entranceList[data.$index] = data.row
      } else {
        this.form.entranceList.push(data.row)
      }
    },
    deleteEntryItem(row) {
      this.form.entranceList.splice(row.$index, 1)
    },
    //添加一项链接
    andOneLik(data) {
      if (data.$index !== undefined) {
        this.form.linkList[data.$index] = data.row
      } else {
        this.form.linkList.push(data.row)
      }
    },
    //删除一项链接
    deleteLinkItem(row) {
      this.form.linkList.splice(row.$index, 1)
    },
    //编辑一项链接信息
    handEditLiknInfor(row, type) {
      this.$refs.addLink.init(row, type)
    },
    //验证电话号码
    valiDateTel() {
      var isPhone = /^0[0-9]{2,3}-[0-9]{7,8}$/
      var isMob = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (isPhone.test(this.form.tel) || isMob.test(this.form.tel)) {
        this.alertTel = false
      } else {
        this.alertTel = true
      }
    },
    //验证地址
    valiDateIoc() {
      if (this.form.loc === '' || this.form.loc === null) {
        this.alertIoc = true
      } else if (this.form.loc.length > 255) {
        this.alertIoc = true
      } else {
        this.alertIoc = false
      }
    },
    //验证邮箱
    valiDateEmail() {
      if (this.form.email !== null || this.form.email !== '') {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        reg.test(this.form.email) ? this.alertEmail = false : this.alertEmail = true
      } else {
        this.alertEmail = true
      }
      if (this.form.email.length > 50) {
        this.alertEmail = true
      }
    },
    removeImg(data) {
      if (data === '' || data === null) {
        this.form.qrcodeUrl = null
      }
    },
    /**
     * methods:valiDateForm
     * desc:电话号码，邮箱，地址， 二维码图片必传字段验证
     * return Boolen ：是否验证成功 true or false
     */
    valiDateForm() {
      this.valiDateTel()
      this.valiDateIoc()
      this.valiDateEmail()
      this.form.qrcodeUrl === null ? this.alertImgCode = true : this.alertImgCode = false
      this.form.lanType === null ? this.alertLangType = true : this.alertLangType = false

      if (!this.alertTel && !this.alertIoc && !this.alertEmail && !this.alertImgCode && !this.alertLangType) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.contact-box {
  display: flex;

  .contact-item {
    flex: 1;

    .item-wrap-img {
      display: flex;
      margin-top: 5px;

      span {
        margin-right: 30px;
      }
    }

    .item-wrap {
      padding: 10px 5px;

      .infor-span {
        padding-left: 20px;
        color: #4990ef;
        font-size: 14px;
      }

      .infor-input {
        width: 180px;
      }
    }
  }
}

.top-line {
  border-top: 1px dotted #0e0e0e;
}

.alertxt {
  font-size: 12px;
  color: red;
  padding-left: 60px;
  margin-top: -6px;
}

.img-alert {
  padding-left: 100px;
}

.line-btn {
  border-left: none;
}
</style>
