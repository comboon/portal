<template>
    <div id="marketelement-detail" v-if="showDetail">
        <el-dialog :title="dataInfor.displayName" :visible.sync="open" width="1200px" append-to-body @close="cancel" >
             <!-- <div v-html="details"></div> -->
             <div class="top-wrap">
                 <div class="top-left-box">
                      <div class="left-flex-box">
                          <div class="logoImg-box">
                              <img :src="dataInfor.icon" alt="">
                          </div>
                          <div class="text-infor-box">
                            <h3>{{dataInfor.name}}</h3>
                            <p class="desc-p">{{dataInfor.description}}</p>
                               <div class="formItem">
                                 <div>规格:{{specification}}</div>
                                 <div>付费方式:{{payMethod}}</div>
                                </div>
                          </div>
                      </div>
                 </div>
                 <div class="top-right-box">
                        <div class="auther-wrap">
                            <p>
                              <i class="el-icon-user-solid developIcon"></i>
                              <span class="developer-span">{{dataInfor.developer}} </span>
                            </p>
                        </div>
                        <div class="auther-infor">
                          <p>
                            产品分类: <span>{{dataInfor.productTypeName}}</span>
                          </p>
                            <p>
                              行业分类: <span>{{dataInfor.industryTypeName}}</span>
                            </p>
                             <p>
                              领域分类: <span>{{serverType}}</span>
                            </p>
                             <p>
                              交付方式: <span>{{dataInfor.deliveryMethodName}}</span>
                            </p>
                             <p>
                              上架时间: <span>{{dataInfor.publishTime}}</span>
                            </p>
                        </div>
                 </div>
             </div>
             <div class="main-wrap">
                 <ul class="navBarList">
                     <li v-for="(item,index) in tabbarList"
                      :key="item.id"
                      @click="handleClick(index)"
                      :class="{active:activeIndex===index}"
                      :label="item.type">{{item.type}}</li>
                 </ul>
                 <div class="description" v-html="activeObj.description"></div>
             </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"marketelement-detail",
    dicts: [
      'dip_domain_type',
      'dip_specification',
      'dip_pay_method'
    ],
    data(){
        return {
            open:false,
            showDetail:false,
            details:null,
            activeName:"产品介绍",
            dataInfor:{},
            tabbarList:[],
            yearNum:1,
            serverType:null,
            specification:null,
            payMethod:null,
             formData:{
                selectedSpecifications:"", //选中的规格
                payMentMethods:'1', //付费方式
            },
            activeIndex:0,
            activeObj:{},
            payList:[],
             planId:-1,
            totalPrice:null, //总价
        }
    },

    methods:{
        //初始化组件
        init(data){
            this.showDetail=true;
            this.open=true;
            this.dataInfor=data;
            console.log(this.dataInfor);
            this.tabbarList=this.dataInfor.marketelementdetaillCfgList;
            this.activeObj=this.tabbarList[this.activeIndex]
            this.tabbarList.forEach(item=>{
                item.id=parseInt(item.id)
            })
            this.dataInfor.icon=process.env.VUE_APP_BASE_API+this.dataInfor.imageUrl;
            this.dict.type.dip_domain_type.forEach(item=>{
                if(this.dataInfor.domainType==item.value){
                    this.serverType=item.label
                }
            })
          this.dict.type.dip_specification.forEach(item=>{
            if(this.dataInfor.specification==item.value){
              this.specification=item.label
            }
          })
          this.dict.type.dip_pay_method.forEach(item=>{
            if(this.dataInfor.payMethod==item.value){
              this.payMethod=item.label
            }
          })
        },
        //取消操作
        cancel(){
            this.showDetail=false;
            this.open=false;
            this.details=null;
        },
         //获取选中的规格
            handleChange(){
            this.dataInfor.marketServicePlanCfgList.forEach(item=>{
            if(item.name===this.formData.selectedSpecifications){
                this.payList=item.marketelementunitCfgList
                this.planId=item.id;
                }
             })

            this.payList.forEach(item=>{
                item.price=JSON.parse(item.price)
            })

            },
          //获取选中的付费方式
            handleChangePay(){
            this.totalPrice=this.formData.payMentMethods.price['CNY'];
            },
        //tabs切换
        handleClick(index) {
            this.activeIndex=index;
           this.activeObj=this.tabbarList[this.activeIndex]
        }
    }
}
</script>
<style scoped lang="scss">
.top-wrap,.main-wrap{
    border:1px solid #e5e5e5;
    padding: 10px 10px;
}
.main-wrap{
    min-height: 400px;
}
.top-wrap{
    margin-bottom: 20px;
    display: flex;
    .top-left-box{
        flex: 0 0 65%;
        height:100%;
        .left-flex-box{
            display: flex;
            .logoImg-box{
                flex:0 0 30%;
                img{
                    width:148px;
                    height:148px;
                }
            }
            .text-infor-box{
                flex:0 0 70%;
                padding: 0 10px;
                h3{
                    padding:  0;
                    margin: 0;
                }
                .desc-p{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    font-size:12px;
                    color:#606266;
                }
                div{
                    height:30px;
                    line-height: 30px;
                    color:#5D5D5D;
                    .yearInput{
                        width:40px;
                        height:28px;
                        line-height: 28px;
                        text-align: center;
                    }
                }
                .btn-group{
                    margin:5px 0;
                }
            }
        }
    }
   .top-right-box{
        flex: 1;
        background: #F5F5F5;
        padding: 0 10px;
        p{
          padding: 0;
          margin:0;
        }
        .auther-wrap{
          border-bottom:1px solid #E6E6E6;
          height:40px;
          line-height: 40px;
          margin-bottom: 12px;
          .developIcon{
              color:#2375C7;
              font-size:16px;
              margin-right:10px;
          }
          .developer-span{
              color:#252525;
              font-size:16px;
              font-weight: bold;
          }
        }
        .auther-infor{
            p{
                color:#353535;
                font-size:14px;
                padding: 7px;
            }
        }
    }
}
.formItem{
    margin-bottom: 50px;
}
.navBarList{
    list-style: none;
    display: flex;
    justify-content: center;
    border-bottom: 2px solid #e5e5e5;
    li{
        padding: 5px 5px;
        margin-right:20px;
        cursor: pointer;
    }
    .active{
        color:#1890ff;
        border-bottom: 2px solid #1890ff;
    }
}
</style>
<style>
.marketelement-detail .el-input--small .el-input__inner {
    height: 22px !important;
    width:40px !important;
    line-height: 32px !important;
}
</style>
