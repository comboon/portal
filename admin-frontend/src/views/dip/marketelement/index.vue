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
      <el-form-item label="交付方式" prop="deliveryMethodName">
        <el-input
          v-model="queryParams.deliveryMethodName"
          placeholder="请输入交付方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="产品分类" prop="productType">
        <el-input
          v-model="queryParams.productTypeName"
          placeholder="请输入产品分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行业分类" prop="industryType">
        <el-input
          v-model="queryParams.industryTypeName"
          placeholder="请输入行业分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上架时间" prop="publishTime">
        <el-date-picker
          v-model="daterangePublishTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="publishStatus">
        <el-select
          v-model="queryParams.publishStatus"
          placeholder="请选择状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in dict.type.dip_publish_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="创建人" prop="createdBy">
        <el-input
          v-model="queryParams.createdBy"
          placeholder="请输入创建人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt">
        <el-date-picker
          v-model="daterangeCreatedAt"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置
        </el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dip:marketelement:add']"
        >新增
        </el-button
        >
      </el-col>
      <!--      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dip:marketelement:edit']"
        >修改</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['dip:marketelement:remove']"
        >删除
        </el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-success"
          size="mini"
          :disabled="multiple"
          @click="handlePublish"
          v-hasPermi="['dip:marketelement:publish']"
        >上架
        </el-button
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
          v-hasPermi="['dip:marketelement:unpublish']"
        >下架
        </el-button
        >
      </el-col>
      <!--
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dip:marketelement:export']"
        >导出</el-button>
      </el-col>
      -->
      <!-- <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="marketelementList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="元素主图" align="center" prop="imageUrl">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" class="logoImg"/>
        </template>
      </el-table-column>
      <el-table-column label="市场元素名称" align="center" prop="name" width="160"/>
      <el-table-column label="开发者" align="center" prop="developer"/>
      <el-table-column label="交付方式" align="center" prop="deliveryMethodName">
      </el-table-column>
      <el-table-column label="产品分类" align="center" prop="productTypeName">
      </el-table-column>
      <el-table-column label="行业分类" align="center" prop="industryTypeName">
      </el-table-column>
      <el-table-column label="领域分类" align="center" prop="domainType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dip_domain_type"
            :value="scope.row.domainType"
          />
        </template>
      </el-table-column>
      <el-table-column label="购买方式" align="center" prop="purchaseTypeName">
      </el-table-column>
      <el-table-column label="价格" align="center" prop="price"/>
      <el-table-column label="状态" align="center" prop="publishStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dip_publish_status"
            :value="scope.row.publishStatus"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="上架时间"
        align="center"
        width="180"
        prop="publishTime"
      >
        <template slot-scope="scope">
          <span>{{
              parseTime(scope.row.publishTime, '{y}-{m}-{d} {h}:{i}:{s}')
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="240"
      >
        <template slot-scope="scope">
          <el-button
            class="privew-btn"
            type="success"
            size="mini"
            :class="{hasBorder:scope.row.publishStatus!==2&&scope.row.publishStatus!==3}" @click="showDetail(scope.row)"
            v-if="scope.row.publishStatus!==0"
          >查看详情
          </el-button
          >

          <template v-if="scope.row.publishStatus!==2&&scope.row.publishStatus!==3">
            <!--            <el-divider direction="vertical" v-if="scope.row.publishStatus!==0"></el-divider>-->
            <el-button
              type="primary"
              size="mini"
              class="line-btn"
              :class="{hasBorder:scope.row.publishStatus!==2&&scope.row.publishStatus!==3}"
              @click="handleUpdate(scope.row)"
              style="margin-left: 10px"
              v-hasPermi="['dip:marketelement:edit']"
            >修改
            </el-button>
            <!--            <el-divider direction="vertical"></el-divider>-->
            <el-button
              type="danger"
              size="mini"
              class="delete-btn-span"
              @click="handleDelete(scope.row)"
              style="margin-left: 10px"
              v-hasPermi="['dip:marketelement:remove']"
            >删除
            </el-button
            >
          </template>
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

    <!-- 添加或修改市场元素配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <div class="wrap">
          <div class="left">
            <el-form-item label="元素主图" prop="imageUrl">
              <imageUpload v-model="form.imageUrl" :limit="1"/>
            </el-form-item>

            <el-form-item label="市场元素名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入市场元素名称"
                style="width: 223.6px"
              />
            </el-form-item>

            <el-form-item label="开发者" prop="developer">
              <el-input
                v-model="form.developer"
                placeholder="请输入开发者"
                style="width: 223.6px"
              />
            </el-form-item>

            <el-form-item label="热门标签" prop="hot">
              <el-select
                v-model="form.hot"
                placeholder="请选择是是否位热门标签分类"
                style="width: 223.6px"
              >
                <el-option
                  v-for="item in isHot"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="规格" prop="specification">
              <el-select
                v-model="form.specification"
                placeholder="请选择规格"
                style="width: 223.6px"
              >
                <el-option
                  v-for="dict in dict.type.dip_specification"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="付款方式" prop="payMethod">
              <el-select
                v-model="form.payMethod"
                placeholder="请选择付款方式"
                style="width: 223.6px"
              >
                <el-option
                  v-for="dict in dict.type.dip_pay_method"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="提供方式" required>
              <el-select
                v-model="form.provideType"
                placeholder="请选择提供方式"
                style="width: 223.6px"
                @change="openApi = ''"
              >
                <el-option
                  v-for="item in supplyOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="部署模板" prop="modelId" v-if="form.provideType == 1">
              <el-select
                v-model="form.modelId"
                placeholder="请选择部署模板"
                style="width: 223.6px"
                @change="getVersion(form.modelId)"
              >
                <el-option
                  v-for="item in modelOption"
                  :key="item.modelId"
                  :label="item.modelName"
                  :value="item.modelId"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部署版本" key="versionName" prop="versionName" v-if="form.provideType == 1">
              <el-select
                v-model="versionName"
                placeholder="请选择部署版本"
                style="width: 223.6px"
              >
                <el-option
                  v-for="item in versionOption"
                  :key="item.versionName"
                  :label="item.versionName"
                  :value="item.versionName"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="赋权openapi地址" key="openApi" v-if="form.provideType === 2" prop="openApi">
              <el-input
                v-model="form.openApi"
                placeholder="请输入赋权openapi地址"
                style="width: 223.6px"
              />
            </el-form-item>

            <el-form-item label="产品分类" prop="productType">
              <treeselect
                v-model="form.productType"
                :options="productMenuOptions"
                :normalizer="normalizer"
                show-count
                disable-branch-nodes
                placeholder="选择产品分类"
                style="width:223.6px"
                @select="selectNode"
              />

            </el-form-item>

            <el-form-item label="交付方式" prop="deliveryMethod">
              <treeselect
                v-model="form.deliveryMethod"
                :options="interactionMenuOptions"
                :normalizer="normalizer"
                show-count
                disable-branch-nodes
                placeholder="请选择交付方式"
                style="width:223.6px"
                @select="selectNode"
              />
            </el-form-item>

            <el-form-item label="购买方式" prop="purchaseType">
              <treeselect
                v-model="form.purchaseType"
                :options="expenseMenuOptions"
                :normalizer="normalizer"
                show-count
                disable-branch-nodes
                placeholder="请选择购买方式"
                style="width:223.6px"
                @select="selectNode"
              />
            </el-form-item>

            <el-form-item label="行业分类" prop="industryType">
              <treeselect
                v-model="form.industryType"
                :options="industryMenuOptions"
                :normalizer="normalizer"
                show-count
                disable-branch-nodes
                placeholder="请选择行业分类"
                style="width:223.6px"
                @select="selectNode"
              />
            </el-form-item>

            <el-form-item label="领域分类" prop="domainType">
              <el-select
                v-model="form.domainType"
                placeholder="请选择领域分类"
                style="width: 223.6px"
              >
                <el-option
                  v-for="dict in dict.type.dip_domain_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="parseInt(dict.value)"
                ></el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="市场元素标签" prop="tags">
              <el-tag
                :key="tag"
                v-for="tag in tagList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
            </el-form-item>


          </div>
        </div>


        <el-form-item style="margin-top: 22px;" label="元素描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>

        <el-divider content-position="center">元素详情</el-divider>

      </el-form>

      <div
        v-for="(item, index) in marketelementdetaillCfgList"
        :key="index"
        class="detail-wrap"
      >
        <template>
          <el-row :gutter="24" style="margin-bottom: 12px;">
            <el-col :span="7">
              <el-input
                v-model="item.type"
                placeholder="请输入详情名称"
                v-if="index < 2"
                disabled
              ></el-input>
              <el-input
                v-model="item.type"
                placeholder="请输入详情名称"
                v-else
              ></el-input>
            </el-col>
            <el-col :span="17" v-if="index >= 2" class="addBtn-right delBtn">
              <el-button type="danger" @click="handleDeleteItem(index)" size="mini"
              >删除详情
              </el-button
              >
            </el-col>
          </el-row>
          <editor v-model="item.description" :min-height="192" v-if="open"/>
        </template>
      </div>
      <el-row :gutter="10" class="mb8" style="margin-top: 10px">
        <el-col style="display: flex; justify-content: flex-end;">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAddMarketelementdetaillCfg"
          >添加详情
          </el-button
          >
        </el-col>
        <!-- <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteMarketelementdetaillCfg">删除</el-button>
          </el-col> -->
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm('add')">保 存</el-button>
        <el-button type="primary" @click="submitForm('publish')"
        >发 布
        </el-button
        >
      </div>
    </el-dialog>
    <detail-page ref="detailPage"></detail-page>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { listTag } from '@/api/dip/tag'
import {
  listMarketelement,
  getMarketelement,
  delMarketelement,
  publishMarketelement,
  unpublishMarketelement,
  addMarketelement,
  updateMarketelement,
  getDictInfo,
  getModelList,
  getVersionList,
  getCatalogLists
} from '@/api/dip/marketelement'
import detailPage from './detailPage/index'

export default {
  name: 'Marketelement',
  dicts: [
    'dip_activicy_tag',
    'dip_domain_type',
    'dip_buy_unit_type',
    'dip_publish_status',
    'dip_specification',
    'dip_pay_method'
  ],
  components: {
    Treeselect,
    detailPage
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedMarketelementdetaillCfg: [],
      // 子表选中数据
      checkedMarketelementunitCfg: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 市场元素配置表格数据
      marketelementList: [],
      // 市场元素详情配置表格数据
      marketelementdetaillCfgList: [
        { type: '产品介绍', description: null },
        { type: '使用说明', description: null }
      ],
      // 市场元素单位配置表格数据
      marketelementunitCfgList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 介绍时间范围
      daterangePublishTime: [],
      // 介绍时间范围
      daterangeCreatedAt: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        productTypeName: null,
        industryTypeName: null,
        deliveryMethodName: null,
        domainType: null,
        purchaseTypeName: null,
        publishStatus: null,
        publishTime: null,
        createdBy: null,
        createdAt: null
      },

      inputVisible: false,
      inputValue: '',
      tagList: [],
      // 表单参数
      form: {
        provideType: 1,
        modelId: '',
        modelName: '',
        versionId: '',
        // versionName: '',
        openApi: '',
        hot: 0,
        tags: null,
        marketServicePlanCfgList: []    //元素规格数据
      },
      versionName:'',
      isHot: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      supplyOption: [
        { label: '独占式', value: 1 },
        { label: '共享式', value: 2 }
      ],
      modelOption: [],
      versionOption: [],
      product_type: [],
      industry_type: [],
      delivery_method: [],
      expense_type: [],
      // 表单校验
      rules: {
        openApi: [
          {
            required: true,
            message: '赋权openapi地址不能为空',
            trigger: 'blur'
          }
        ],
        imageUrl: [
          { required: true, message: '元素主图不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '市场元素名称不能为空', trigger: 'blur' },
          { max: 64, message: '请输64个字节以内的市场元素名称', trigger: 'blur' }
        ],
        modelId: [
          { required: true, message: '部署模板不能为空', trigger: 'change' }
        ],
        hot: [
          { required: true, message: '标签热度位选择', trigger: 'change' }
        ],
        developer: [
          { required: true, message: '开发者不能为空', trigger: 'blur' },
          { max: 200, message: '请输64个字节以内开发者信息', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '市场元素标签不能为空', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '产品分类不能为空', trigger: 'change' }
        ],
        industryType: [
          { required: true, message: '行业分类不能为空', trigger: 'change' }
        ],
        deliveryMethod: [
          { required: true, message: '交付方式不能为空', trigger: 'change' }
        ],
        domainType: [
          { required: true, message: '领域分类不能为空', trigger: 'change' }
        ],
        specification: [
          { required: true, message: '规格不能为空', trigger: 'change' }
        ],
        payMethod: [
          { required: true, message: '付款方式不能为空', trigger: 'change' }
        ],
        purchaseType: [
          { required: true, message: '购买方式不能为空', trigger: 'change' }
        ],
        description: [
          { required: true, message: '元素描述不能为空', trigger: 'blur' },
          { max: 500, message: '请输500个字节以内的元素描述', trigger: 'blur' }
        ],
        createdBy: [
          { required: true, message: '创建人不能为空', trigger: 'blur' }
        ],
        createdAt: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ]
      },
      oldArr: [],
      activeCata: -1,  //点击选择的计量方式

      productMenuOptions: [],
      industryMenuOptions: [],
      interactionMenuOptions: [],
      expenseMenuOptions: []

    }
  },

  watch: {
    openApi: {
      handler (val) {
        this.form.openApi = val
      }
    }
  },

  created() {
    this.getList()

    Array.from({ length: 4 }).forEach((item, index) => {
      this.getTreeselect({ 'type': index + 1 })
    })
    getModelList().then((response) => {
      this.modelOption = response.data
    })
    // getDictInfo("zh_CN").then((response) => {
    //   this.product_type = response.data.product_type;
    //   this.industry_type = response.data.industry_type;
    //   this.expense_type = response.data.expense_type;
    //   this.delivery_method = response.data.delivery_method;
    // });
  },
  methods: {
    /** 查询市场元素配置列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (
        null != this.daterangePublishTime &&
        '' != this.daterangePublishTime
      ) {
        this.queryParams.params['beginPublishTime'] =
          this.daterangePublishTime[0]
        this.queryParams.params['endPublishTime'] =
          this.daterangePublishTime[1]
      }
      if (null != this.daterangeCreatedAt && '' != this.daterangeCreatedAt) {
        this.queryParams.params['beginCreatedAt'] = this.daterangeCreatedAt[0]
        this.queryParams.params['endCreatedAt'] = this.daterangeCreatedAt[1]
      }
      listMarketelement(this.queryParams).then((response) => {
        this.marketelementList = response.rows
        this.marketelementList.forEach((item) => {
          item.imageUrl = process.env.VUE_APP_BASE_API + item.imageUrl
          item.price = item.price == null ? '-' : item.price
          item.publishTime = item.publishTime == null ? '-' : item.publishTime
        })
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.tagList = []
      this.form = {
        id: null,
        hot: 0,
        provideType: 1,
        imageUrl: null,
        name: null,
        developer: null,
        tags: null,
        marketServicePlanCfgList: [],
        productType: null,
        industryType: null,
        deliveryMethod: null,
        domainType: null,
        purchaseType: null,
        specification: null,
        payMethod: null,
        unit: null,
        price: null,
        description: null,
        salesVolume: null,
        publishStatus: null,
        publishTime: null,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        deletedBy: null,
        deletedAt: null
      }
      this.versionName = ''
      this.marketelementdetaillCfgList = [
        { type: '产品介绍', description: null },
        { type: '使用说明', description: null }
      ]
      this.marketelementunitCfgList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangePublishTime = []
      this.daterangeCreatedAt = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加市场元素配置'
      if (this.oldArr.length > 0) {
        this.dict.type.dip_buy_unit_type = this.oldArr
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMarketelement(id).then((response) => {
        this.form = response.data
        this.tagList = response.data.tags.split(',')
        this.marketelementdetaillCfgList =
          response.data.marketelementdetaillCfgList
        this.marketelementunitCfgList = response.data.marketelementunitCfgList
        this.open = true
        this.title = '修改市场元素配置'
        this.form.marketServicePlanCfgList.forEach(item => {
          if (item.marketelementunitCfgList.length > 0) {
            item.marketelementunitCfgList.forEach(cata => {
              cata.price = JSON.parse(cata.price)
            })
          }
        })
      })
    },
    /** 提交按钮 */
    submitForm(type) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // if (this.form.purchaseType === "付费") {
          //   if (this.marketelementunitCfgList.length === 0) {
          //     this.$modal.msgError("市场元素单位配置不能为空");
          //     return;
          //   }
          // }

          const data = {
            ...this.form
          }

          if (this.marketelementdetaillCfgList.length === 0) {
            this.$modal.msgError('市场元素详情配置不能为空')
            return
          }

          if(data.provideType === 1&&this.versionName===''){
            this.$modal.msgError('部署版本不能为空')
            return
          }

          if (data.provideType === 2 && this.openApi) {
            this.$modal.msgError('赋权openapi地址不能为空')
            return
          }

          data.versionName = this.versionName
          data.marketelementdetaillCfgList =
            this.marketelementdetaillCfgList
          if (this.openApi) {
            data.openApi = this.openApi
          }
          // data.marketelementunitCfgList = this.marketelementunitCfgList;
          if (type === 'publish') {
            data.publish = true
          }
          if (type === 'add') {
            data.publish = false
          }
          const text = type == 'add' ? '保存成功' : '已提交'

          if (data.id != null) {
            data.marketServicePlanCfgList.forEach(item => {
              if (item.marketelementunitCfgList.length > 0) {
                item.marketelementunitCfgList.forEach(cata => {
                  if ((typeof cata.price) === 'object') {
                    let str = JSON.stringify(cata.price)
                    str = str.replace(/\//g, '')
                    cata.price = str
                  }
                })
              }
            })
            updateMarketelement(data).then((response) => {
              this.$modal.msgSuccess(text)
              this.open = false
              this.openApi = ''
              this.getList()
            })
          } else {
            data.marketServicePlanCfgList.forEach(item => {
              if (item.marketelementunitCfgList.length > 0) {
                item.marketelementunitCfgList.forEach(cata => {
                  cata.price = JSON.stringify(cata.price)
                })
              }
            })

            addMarketelement(data).then((response) => {
              this.$modal.msgSuccess(text)
              this.open = false
              this.openApi = ''
              this.getList()
            })
          }
        }
      })
    },
    getVersion(modelId) {
      // this.form.versionId = ''
      this.versionName = ''

      let item = this.modelOption.find(item => {
        return item.modelId === modelId
      })
      this.form.modelName = item.modelName
      getVersionList(modelId).then((response) => {
        this.versionOption = response.data
      })

    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('确认删除该条数据？')
        .then(function() {
          return delMarketelement(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {
        })
    },
    /** 发布按钮操作 */
    handlePublish() {
      const ids = this.ids
      this.$modal
        .confirm('是否确认上此架市场元素？')
        .then(function() {
          return publishMarketelement(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('已提交')
        })
        .catch(() => {
        })
    },
    /** 下架按钮操作 */
    handleUnPublish() {
      const ids = this.ids
      this.$modal
        .confirm('是否确认下此架市场元素?')
        .then(function() {
          return unpublishMarketelement(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('已提交')
        })
        .catch(() => {
        })
    },
    /** 市场元素详情配置序号 */
    rowMarketelementdetaillCfgIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 市场元素单位配置序号 */
    rowMarketelementunitCfgIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 市场元素详情配置添加按钮操作 */
    handleAddMarketelementdetaillCfg() {
      let obj = {}
      obj.type = null
      obj.description = null

      this.marketelementdetaillCfgList.push(obj)
    },
    /** 市场元素单位配置添加按钮操作 */
    handleAddMarketelementunitCfg() {
      if (this.marketelementunitCfgList.length < 3) {
        let obj = {}
        obj.unit = null
        obj.price = null
        this.marketelementunitCfgList.push(obj)
        this.marketelementunitCfgList.forEach((item) => {
          this.dict.type.dip_buy_unit_type.forEach((i, index) => {
            if (item.unit == i.value) {
              this.dict.type.dip_buy_unit_type.splice(index, 1)
            }
          })
        })
      } else {
        this.$modal.alertWarning('以满足配置总数量')
      }
    },
    //切换付费方式的时候
    changePaymentMethods(val) {
      this.dict.type.dip_buy_unit_type.forEach((i, index) => {
        if (i.value == val) {
          this.dict.type.dip_buy_unit_type.splice(index, 1)
        }
      })
      this.flitterPlayOptions(this.marketelementunitCfgList, this.oldArr)
      this.marketelementunitCfgList.forEach((item) => {
        if (item.unit === val) {
          item.price = null
        }
      })
    },
    flitterPlayOptions(list, oldList) {
      let arr = JSON.parse(JSON.stringify(this.oldArr))
      list.forEach((item) => {
        arr.forEach((oldItem, index) => {
          if (item.unit === parseInt(oldItem.value)) {
            arr.splice(index, 1)
          }
        })
      })
      this.dict.type.dip_buy_unit_type = arr
    },
    //金额保留2为小数
    tofiexdPrice(e) {
      let val = e.target.value
      let index = val.lastIndexOf('.')
      if (index === -1) {
        if (val.length > 10) {
          this.$message({
            type: 'warning',
            message: '请输入10位以内的价格'
          })
        }
        e.target.value = ''
      } else {
        let str = val.substring(0, index)
        if (str.length > 10) {
          this.$message({
            type: 'warning',
            message: '请输入10位以内的价格'
          })
          e.target.value = ''
        } else {
          val = val.substring(0, val.indexOf('.') + 3)
          e.target.value = val
        }

      }

    },
    handleDeleteItem(index) {
      this.marketelementdetaillCfgList.splice(index, 1)
    },
    /** 市场元素单位配置删除按钮操作 */
    handleDeleteMarketelementunitCfg() {
      if (this.checkedMarketelementunitCfg.length == 0) {
        this.$modal.msgError('请先选择要删除的市场元素单位配置数据')
      } else {
        const marketelementunitCfgList = this.marketelementunitCfgList
        const checkedMarketelementunitCfg = this.checkedMarketelementunitCfg
        this.marketelementunitCfgList = marketelementunitCfgList.filter(
          function(item) {
            return checkedMarketelementunitCfg.indexOf(item.index) == -1
          }
        )
      }
      this.flitterPlayOptions(this.marketelementunitCfgList, this.oldArr)
    },
    /** 复选框选中数据 */
    handleMarketelementdetaillCfgSelectionChange(selection) {
      this.checkedMarketelementdetaillCfg = selection.map((item) => item.index)
    },
    /** 复选框选中数据 */
    handleMarketelementunitCfgSelectionChange(selection) {
      this.checkedMarketelementunitCfg = selection.map((item) => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'dip/marketelement/export',
        {
          ...this.queryParams
        },
        `marketelement_${new Date().getTime()}.xlsx`
      )
    },
    // handlePurchaseType(val) {
    //   if (val === "付费") {
    //     let obj = {};
    //     obj.unit = 1;
    //     obj.price = null;
    //     this.marketelementunitCfgList.push(obj);
    //     this.oldArr = JSON.parse(
    //       JSON.stringify(this.dict.type.dip_buy_unit_type)
    //     );
    //   } else {
    //     this.marketelementunitCfgList.length = 0;
    //   }
    // },
    //查看详情
    showDetail(row) {
      getMarketelement(row.id).then((response) => {
        this.$refs.detailPage.init(response.data)
      })
    },
    //展示计量方式的详情内容
    showCataInfor(e, index) {

      e.target.style.display = 'none'
      e.target.nextSibling.style.display = 'inline-block'
      this.activeCata = index
    },
    hiddenCataInfor(e) {
      e.target.style.display = 'none'
      e.target.previousElementSibling.style.display = 'inline-block'
      this.activeCata = -1
    },
    //新增表签，删除标签
    handleClose(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1)
      this.form.tags = this.tagList.join(',')
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tagList.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.form.tags = this.tagList.join(',')
    },

    /** 查询菜单下拉树结构 */
    getTreeselect(param) {
      listTag(param).then(response => {
        let menuOptions = []
        let children = this.handleTree(response.rows, 'id')
        menuOptions = children[0].children

        switch (param.type) {
          case 1:
            menuOptions.forEach(item => {
              item.isDisabled = !item.children?.length
            })
            this.productMenuOptions = menuOptions
            break

          case 2:
            this.industryMenuOptions = menuOptions
            break

          case 3:
            this.interactionMenuOptions = menuOptions
            break

          case 4:
            this.expenseMenuOptions = menuOptions
            break

          default:
            break
        }
      })
    },

    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.typeName,
        children: node.children
      }
    },
    /**选中某个菜单*/
    selectNode(node, instanceId) {
      // this.form.level=node.level+1;
    }
  }
}
</script>
<style scoped>

.logoImg {
  width: 80px;
  height: 80px;
}

.label-span {
  font-size: 14px;
  color: #606266;
  font-weight: bold;
}

.detail-wrap {
  margin-top: 10px;
}

.addBtn-right {
  margin-top: 5px;
  display: flex;
  justify-content: end;
}

.cata-item i {
  cursor: pointer;
}

.cataConten {
  padding-left: 30px;
}

.line-btn {
  border: none;
}

.app-container .hasBorder {
  border-right: 1px solid #e5e5e5;
  display: inline-block;
  padding-right: 10px;
}

.delete-btn-span {
  border: none;
}
</style>
<style lang="scss">
.app-container .el-input.is-disabled .el-input__inner {
  background-color: #fff !important;
  border: none !important;
  color: #606266 !important;
  cursor: not-allowed !important;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  margin-left: 120px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.button-new-tag {
  margin-left: 0;
}

.wrap {
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 50%
  }

  .left {
    .el-form-item:first-child {
      margin-bottom: 45px;
    }
    .el-form-item:last-child {
      margin-bottom: 0px;
    }
    .serverBtn{
      display: flex;
      button{
        margin-left: 10px;
      }
    }
  }

}


</style>
