<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="语言" prop="lanType">
        <el-select @change="getTreeselect" v-model="form.lanType" placeholder="请选择语言" style="width:223.6px">
          <el-option
            v-for="dict in dict.type.dip_global_language"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="解决方案分类" prop="menuId" v-if="form.lanType!=null">
        <treeselect
          v-model="form.menuId"
          :options="menuOptions"
          :normalizer="normalizer"
          :show-count="true"
          disable-branch-nodes
          placeholder="请选择解决方案"
          style="width:223.6px"
          @select="selectNode"
        />
      </el-form-item>

      <el-form-item label="解决方案名称" prop="solutionName">
        <el-input
          v-model="form.solutionName"
          placeholder="请输入解决方案名称"
          style="width:223.6px"
        />
      </el-form-item>
      <el-form-item label="解决方案描述" prop="solutionDes">
        <el-input
          v-model="form.solutionDes"
          placeholder="请输入解决方案描述"
          style="width:223.6px"
        />
      </el-form-item>
      <el-form-item label="排序值" prop="sortOrder">
        <el-input v-model="form.sortOrder" placeholder="请输入排序值" type="number" style="width:223.6px"/>
      </el-form-item>

      <el-form-item label="标签" prop="tag">
        <el-select
          v-model="form.tag"
          placeholder="请选择"
          style="width: 223.6px"
        >
          <el-option
            v-for="dict in dict.type.solution_tag_type"
            :key="dict.value"
            :label="dict.label"
            :value="parseInt(dict.value)"
          ></el-option>
        </el-select>
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

      <el-form-item label="背景图" prop="bgImgUrl" v-if="form.isShow === 0">
        <imageUpload v-model="form.bgImgUrl" :limit="1"/>
      </el-form-item>

      <el-form-item label="背景图描述" prop="bgImgDescription" v-if="form.isShow === 0">
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
          @change="changeVal"
          style="width: 223.6px"
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
            :value="`${item.id}`"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="详情形态"
                    prop="showType"
                    v-if="form.isConfig !==0"
      >
        <el-select v-model="form.showType"
                   placeholder="请选择详情形态"
                   @change="changeVal"
                   style="width:223.6px"
        >
          <el-option
            v-for="dict in dict.type.dip_description_type"
            :key="dict.value"
            :label="dict.label"
            :value="parseInt(dict.value)"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="form.isConfig !== 0 && form.showType == 2" label="外部链接" prop="outUrl" key="outUrl">
        <el-input
          v-model="form.outUrl"
          placeholder="请输入内容"
          style="width: 223.6px"
        />
      </el-form-item>

      <el-form-item
        v-if="form.isConfig !== 0 && form.showType == 1"
        label="模板"
        prop="solutiondetailitemdescCfgList"
        key="solutiondetailitemdescCfgList"
      >
        <div class="template" v-for="(item,idx) of form.solutiondetailCfgList" :key="idx">
          <div class="desc">
            <span>{{ transitionVal(idx + 1) }}</span>
            <el-button type="primary" size="mini" @click="addTemplate" v-if="idx == 0">添加模块</el-button>
            <el-button type="danger" size="mini" @click="delTemplate(idx)" v-if="idx != 0">删除模块</el-button>
          </div>
          <div class="content">
            <div class="top">
              <div>
                <el-form-item
                  label="模块名称"
                  required
                >
                  <el-input
                    v-model="item.type"
                    placeholder="请输入内容"
                    style="width: 150px"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item
                  label="样式模板"
                  required
                >
                  <el-select v-model="item.templateType"
                             placeholder="请选择样式模板"
                             style="width:150px"
                  >
                    <el-option
                      v-for="dict in dict.type.template_type"
                      :key="dict.value"
                      :label="dict.label"
                      :img="dict.dictImg"
                      :value="dict.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="preview">
                <span @click="preview(item.templateType)">【模板预览】</span>
              </div>
            </div>
            <div class="bottom">
              <div class="dataList">
                <div>数据项列表</div>
                <div>
                  <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="addDataList(item, idx)">添加数据项
                  </el-button>
                </div>
              </div>
              <div class="table">
                <el-table
                  :data="item.solutiondetailitemCfgList"
                  :header-cell-style="headStyle"
                  :cell-style="headStyle"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="title"
                    label="标题名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="iconType"
                    label="图标"
                  >
                    <template slot-scope="scope">
                      <i class='fa' :class="scope.row.iconFont" v-if="scope.row.iconType == 1"></i>
                      <el-image
                        class="iconPic"
                        v-else-if="scope.row.iconPic"
                        :src="httpUrl + scope.row.iconPic"
                        :preview-src-list="[httpUrl + scope.row.iconPic]">
                      </el-image>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="img"
                    label="图片/视频"
                  >
                    <template slot-scope="scope" class="test">

                      <div class="pic" v-if="scope.row.img != ''">
                        <el-image
                          :src="httpUrl + scope.row.img"
                          fit="fit"
                        >
                          <div slot="error" class="mask">
                            <i class="el-icon-video-play"></i>
                          </div>
                        </el-image>
                      </div>

                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="url"
                    label="链接地址"
                  >

                  </el-table-column>
                  <el-table-column
                    prop="desc"
                    label="描述"
                  >
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="160"
                  >
                    <template slot-scope="scope">
                      <div class="operation">

                        <el-button
                          type="primary"
                          size="mini"
                          @click="editDataList(scope.row,scope.$index)">编辑</el-button>

                        <el-button
                          type="danger"
                          size="mini"
                          @click="delDatalist(scope.$index)">删除</el-button>
                      </div>
                    </template>
                  </el-table-column>

                </el-table>
              </div>
            </div>
          </div>

          <div class="sortList">
            <span v-if="idx !== 0" @click="templateUp(idx)"><i class="el-icon-arrow-up"></i></span>
            <span v-if="idx < form.solutiondetailCfgList.length - 1" @click="templateDown(idx)"><i class="el-icon-arrow-down"></i></span>
          </div>
        </div>
      </el-form-item>

    </el-form>

    <div class="btnList">
      <div>
        <el-button @click="goBack">返回</el-button>
      </div>
      <div>
        <el-button type="primary" @click="handleAddService">确定</el-button>
      </div>
    </div>

    <!--预览图片-->
    <el-dialog
      title="模板预览"
      :visible.sync="editDialogVisible"
      width="85%"
    >
      <el-image :src="previewTemplate" />
    </el-dialog>

    <!--添加数据项-->
    <el-dialog title="添加数据项" :visible.sync="open" width="700px" destroy-on-close append-to-body>
      <el-form :model="addModel" :rules="rules" label-width="140px">
        <el-form-item label="标题名称">

          <el-input
            v-model="addModel.title"
            placeholder="请输入标题名称"
            style="width:223.6px"
          />
        </el-form-item>

        <el-form-item label="图标">
          <div class="switchBtn">
            <el-switch
              v-model="addModel.iconType"
              active-color="#18b073"
              inactive-color="#18b073"
              :active-value="1"
              :inactive-value="2"
              @change="iconChange"
              active-text="图标库选择"
              inactive-text="自行上传">
            </el-switch>

          </div>
          <div class="iconEl" v-if="addModel.iconType != 2">
            {{addModel.iconFont == '' ? iconBoxHolder : ''}}
            <i class="fa" :class="addModel.iconFont"
               style="color:#606266;font-size: 21px"
               v-if="addModel.iconType != 2">
            </i>
          </div>
          <div v-if="addModel.iconType != 2">
            <iconModel v-model="addModel.iconFont"></iconModel>
          </div>

          <div v-else>
            <imageUpload v-model="addModel.iconPic" :limit="1" />
          </div>
        </el-form-item>

        <el-form-item label="图片/视频">
          <imgAndVideoUpload v-model="addModel.img" :limit="1"/>
        </el-form-item>

        <el-form-item label="链接地址">
          <el-input
            v-model="addModel.url"
            placeholder="请输入链接地址"
            style="width:223.6px"
          />
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            v-model="addModel.desc"
            placeholder="请输入描述"
            style="width:223.6px"
          />
        </el-form-item>
        <el-form-item label="描述项">
          <div class="addDescribe">
            <el-button type="primary" size="mini" @click="handleAddDescribe">添加描述项</el-button>
          </div>
          <div class="addTable">
            <el-table
              :data="addModel.solutiondetailitemdescCfgList"
              :header-cell-style="headStyle"
              :cell-style="headStyle"
              style="width: 100%"
            >
              <el-table-column
                prop="type"
                label="自定义分类"
              >
                <template slot-scope="scope">
                  <el-input placeholder="请输入自定义分类" v-model="scope.row.type"/>
                </template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="描述内容"
              >
                <template slot-scope="scope">
                  <el-input placeholder="请输入描述内容" v-model="scope.row.content"/>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" size="mini"
                             @click="delDescribedelDescribe(scope.$index)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitDataList">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  getAllPublishElement,
} from '@/api/dip/productservice'
import { listModulemenu } from '@/api/dip/modulemenu'
import Treeselect from '@riophae/vue-treeselect'
import iconModel from '@/components/icon/icon'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getSolution, updateSolution } from '@/api/dip/solution'

export default {
  name: 'editSolution',
  components: { Treeselect, iconModel },
  dicts: [
    'dip_global_language',
    'dip_pdandsolu_index_show',
    'dip_relation_markerele',
    'dip_description_type',
    'solution_tag_type',
    'template_type'
  ],
  data() {
    let validateSorder = (rule, value, callback) => {
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
      editDialogVisible: false,
      open: false,
      isEdit: false, // isedit === true ? '新增' ： '编辑'
      isIconFont: false,
      //表单数据
      form: {},
      // 菜单树选项
      menuOptions: [],
      elementList: [],
      level: 0,
      previewTemplate: '',
      currentIdx: '',
      listIdx: '',
      iconBoxHolder: '请选择图标',
      httpUrl: process.env.VUE_APP_BASE_API,
      headStyle: {
        'text-align': 'center'
      },
      addModel: {
        title: '',
        iconType:'2',
        iconFont:'',
        iconPic:'',
        img: '',
        url: '',
        desc: '',
        id:'',
        solutiondetailitemdescCfgList: []
      },
      // 表单校验
      rules: {
        lanType: [
          { required: true, message: '语言不能为空', trigger: 'change' }
        ],
        menuId: [
          {
            required: true,
            message: '解决方案分类不能为空',
            trigger: 'change'
          }
        ],
        solutionName: [
          { required: true, message: '解决方案名称不能为空', trigger: 'blur' },
          { max: 64, message: '请输64个字节以内的解决方案名称', trigger: 'blur' }
        ],
        solutionDes: [
          { required: true, message: '解决方案描述不能为空', trigger: 'blur' },
          { max: 255, message: '请输255个字节以内的解决方案描述', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '标签不能为空', trigger: 'change' }
        ],
        sortOrder: [
          { required: true, validator: validateSorder, trigger: 'blur' }
        ],
        isShow: [
          {
            required: true,
            message: '首页展示不能为空',
            trigger: 'change'
          }
        ],
        bgImgUrl: [
          { required: true, message: '背景图不能为空', trigger: 'blur' }
        ],
        bgImgDescription: [
          { required: true, message: '背景图描述不能为空', trigger: 'blur' },
          { max: 255, message: '请输入255个字节以内的描述信息', trigger: 'blur' }
        ],
        isConfig: [
          {
            required: true,
            message: '是否关联市场元素不能为空',
            trigger: 'change'
          }
        ],
        elementId: [
          { required: true, message: '市场元素不能为空', trigger: 'change' }
        ],
        showType: [
          { required: true, message: '请选择展示类型', trigger: 'change' }
        ],
        outUrl: [
          { required: true, message: '外部链接地址不能为空', trigger: 'blur' },
          {
            pattern: '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\*\\+,;=.]+$',
            message: '请输入正确的网络地址',
            trigger: 'blur'
          }
        ],
        // solutiondetailitemdescCfgList: [
        //   { required: true, message: '请输入解决方案描述', trigger: 'blur'}
        // ]
      }
    }
  },
  async mounted() {
    this.getProductList()
    this.getPublishElements()
    await this.getTreeselect()
  },
  methods: {
    // 获取数据详情
    getProductList() {
      let id = this.$route.query.id
      getSolution(id).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.level = res.data.menuLevel
        }
      })
    },
    getTreeselect() {
      listModulemenu({ 'type': 1, 'lanType': this.form.lanType }).then(response => {
        this.menuOptions = []
        let children = this.handleTree(response.data, 'id')
        this.menuOptions.push(children[0])
      })
    },
    // 选中某个菜单
    selectNode(node, instanceId) {
      this.level = node.level
    },
    // 转换菜单数据结构
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.menuName,
        children: node.children
      }
    },
    getPublishElements() {
      getAllPublishElement().then(res => {
        this.elementList = res.data
      })
    },
    // 预览
    preview(val) {
      let imgUrl = ''
      this.dict.type.template_type.filter(item => {
        if (item.value == val) {
          imgUrl = item.img
        }
      })
      this.previewTemplate = process.env.VUE_APP_BASE_API + imgUrl
      this.editDialogVisible = true
    },
    // 添加模板
    addTemplate() {
      this.form.solutiondetailCfgList.push(
        {
          templateType: '1',
          type: '',
          solutiondetailitemCfgList: []
        }
      )
    },
    // 删除模板
    delTemplate(idx) {
      this.form.solutiondetailCfgList.splice(idx, 1)
    },
    // 模板上移
    templateUp(idx) {
      console.log('templateUp', idx)
      let arr = this.form.solutiondetailCfgList
      arr.splice(idx - 1, 1, ...arr.splice(idx, 1, arr[idx - 1]))
    },
    // 模板下移
    templateDown(idx) {
      console.log('templateDown', idx)
      let arr = this.form.solutiondetailCfgList
      arr.splice(idx, 1, ...arr.splice(idx + 1, 1, arr[idx]))
    },
    // 添加数据项
    addDataList(item, idx) {
      this.open = true
      this.isEdit = true
      this.currentIdx = idx
      this.addModel = {
        title: '',
        iconType:'2',
        iconFont:'',
        iconPic:'',
        img: '',
        url: '',
        desc: '',
        id:'',
        solutiondetailitemdescCfgList: []
      }
    },
    //编辑数据项列表
    editDataList(row, idx) {
      this.open = true
      this.listIdx = idx
      this.isEdit = false
      this.addModel = row  // 数据回显
    },
    // 删除数据项列表
    delDatalist(idx) {
      let parent = this.form.solutiondetailCfgList
      for(let i = 0; i < parent.length; i++){
        parent[i].solutiondetailitemCfgList.splice(idx,1)
      }
      // this.form.solutiondetailCfgList[this.currentIdx].solutiondetailitemCfgList.splice(idx, 1)
    },
    // 添加描述项
    handleAddDescribe() {
      this.addModel.solutiondetailitemdescCfgList.push(
        {
          type: '',
          content: ''
        }
      )
    },
    // 删除描述项
    delDescribedelDescribe(idx) {
      this.addModel.solutiondetailitemdescCfgList.splice(idx, 1)
    },
    // 取消弹出框
    cancel() {
      this.open = false
      this.addModel = {
        title: '',
        iconType:'2',
        iconFont:'',
        iconPic:'',
        img: '',
        url: '',
        desc: '',
        id:'',
        solutiondetailitemdescCfgList: []
      }
    },
    //添加数据项列表
    submitDataList() {
      if (this.isEdit) {
        this.form.solutiondetailCfgList[this.currentIdx].solutiondetailitemCfgList.push(JSON.parse(JSON.stringify(this.addModel)))
      }
      this.open = false
      this.addModel = {
        title: '',
        iconType:'2',
        iconFont:'',
        iconPic:'',
        img: '',
        url: '',
        desc: '',
        id:'',
        solutiondetailitemdescCfgList: []
      }
    },
    changeVal(val) {
      if (val === 0) {
        this.form.outUrl = null
        this.form.description = null
        this.form.showType = 0
      }
      if (val === 1) {
        this.form.elementId = null
        this.form.outUrl = null
        this.form.showType = 1
      }
      if (val === 2) {
        this.form.elementId = null
        this.form.description = null
      }

      if (this.form.isConfig !== 0 && this.form.showType == 1) {
        this.form.solutiondetailCfgList = []
        this.addTemplate()
      }
    },
    //  提交表单
    handleAddService() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // if (this.level !== 2) {
          //   this.$modal.msgError('产品服务分类只能选择第三级')
          //   return
          // }
          if (this.form.isConfig !== 1 || this.form.showType == 2) {
            delete this.form.solutiondetailCfgList
          }
          this.loading = this.$loading({
            lock: true,
            text: '提交中...',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          updateSolution(this.form).then(res => {
            if (res.code == 200) {
              this.loading.close()
              this.$message.success('编辑成功')
              setTimeout(() => {
                this.goBack()
              }, 1000)
            }
          }).catch(() => {
            this.loading.close()
          })
        }
      })
    },

    transitionVal(val) {
      let num = ''
      let chnNumChar = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
        10: '十',
        11: '十一',
        12: '十二',
        13: '十三',
        14: '十四',
        15: '十五',
        16: '十六',
        17: '十七',
        18: '十八',
        19: '十九',
        20: '二十'
      }
      if (val <= 20) {
        for (let x in chnNumChar) {
          num = chnNumChar[val]
        }
      }
      return `模块${num}`
    },
    iconChange(val){
      if(this.addModel.iconType == 2 ){
        this.addModel.iconFont = ''
      }else if(this.addModel.iconType == 1){
        this.addModel.iconPic = ''
      }
    },
    // 返回上一级
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.template {
  width: 780px;
  padding-bottom: 20px;
  position: relative;

  .desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    border: 1px solid #DCDFE6;
    padding: 7px 0 0 0;
    border-radius: 4px;

    .top {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 7px;
      border-bottom: 1px solid #DCDFE6;


      .preview {
        padding-left: 20px;
        color: #1890ff;
        cursor: pointer;
      }
    }

    .bottom {
      .dataList {
        padding: 0 7px;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DCDFE6;
      }
    }
  }


  .sortList {
    position: absolute;
    right: -10%;
    top: 50%;
    transform: translate(10%, -50%);
    width: 70px;
    display: flex;
    justify-content: space-between;

    span {
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background: #18b073;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
    }
  }

}

//.addBtn{
//  width: 780px;
//  //display: flex;
//  //justify-content: end;
//  //padding-bottom: 20px;
//}
.btnList {
  bottom: 10px;
  display: flex;
  justify-content: center;
  background: #fff;

  > div {
    width: 150px;
    margin-right: 20px;
  }

  > div:last-child {
    margin-right: 0;
  }

  button {
    width: 100%;
  }
}

.operation {
  //display: flex;
  //just
  //align-items: center;
  span {
    cursor: pointer;
  }

  span:first-child {
    color: #1890ff;
    padding-right: 10px;
    border-right: 1px solid #DCDFE6;
  }

  span:last-child {
    color: #f56c6c;
    padding-left: 10px;
  }
}

.addDescribe {
  padding-bottom: 10px;
}


.pic {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-image {
    width: 30px;
    height: 30px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}

.switchBtn {
  position: relative;
  bottom: 2px
}

.iconEl {
  width: 224px;
  height: 36px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 0 15px;
  color: #afafaf;
  display: flex;
  align-items: center;
}

.iconPic {
  width: 40px;
  height: 40px;
  display: block;
  margin: 0 auto;
}
</style>
