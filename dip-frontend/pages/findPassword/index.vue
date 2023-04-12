<template>
    <div id="findPassword">
        <div class="banner-bg">
             <img :src="bannerBg">
             <div class="txt-box">
                   <p class="bigTxt">找回密码</p>
                 <p class="smallTxt">找回个人账户的登录密码。</p>
             </div>
        </div>
        <div class="wrapper">
            <div class="progress-box">
                <div class="gress-item">
                     <div class="itemBox">
                         <span class="rotateSpan" :class="{active:activePro>=1}"></span>
                         <span class="numSpan">1</span>
                         <span class="line-span"></span>
                     </div>
                     <div class="item-txt" :class="{activeTxt:activePro>=1}">
                         验证身份
                     </div>
                </div>
                <div class="gress-item">
                     <div class="itemBox">
                         <span class="rotateSpan"  :class="{active:activePro>=2}"></span>
                         <span class="numSpan">2</span>
                        <span class="line-span"></span>
                     </div>
                     <div class="item-txt" :class="{activeTxt:activePro>=2}">
                         重置登录密码
                     </div>
                </div>
                <div class="gress-item">
                     <div class="itemBox">
                         <span class="rotateSpan"  :class="{active:activePro===3}"></span>
                         <span class="numSpan"  v-if="activePro!==3"> <i class="el-icon-check"></i></span>
                        <i class="el-icon-check numSpan"  :class="{activeTxt:activePro===3}" v-else></i>
                     </div>
                     <div class="item-txt" :class="{activeTxt:activePro===3}">
                         完成
                     </div>
                </div>
            </div>
            <div class="content-wapper">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="elForm"   hide-required-asterisk v-show="activePro===1">
                        <el-form-item label="手机号" prop="phoneNumber">
                            <el-input v-model="form.phoneNumber" type="number" ></el-input>
                        </el-form-item>
                         <el-form-item label="验证码" prop="phoneCode">
                            <div class="code">
                                <el-input v-model="form.phoneCode" class="codeInput"  type="number"></el-input>
                                <div class="codeBox">
                                    <el-button type="primary" v-show="showBtn" @click="handleGetCodeNum" :disabled="showDisabled">获取验证码</el-button>
                                    <el-button type="primary" v-show="!showBtn">{{secondNum}}秒</el-button>
                                </div>
                            </div>
                        </el-form-item>
                         <el-form-item style="margin:50px 0 0 0">
                            <el-button type="primary" class="blockBtn"  @click.native.prevent="handleValidatePhone" style="width:39.66%">确 认</el-button>
                            <el-button class="blockBtn" @click="edit" style="width:39.66%">取 消</el-button>
                         </el-form-item>
                </el-form>


                <el-form ref="pwdForm"
                  :model="pwdForm"
                  :rules="pwdRules"
                  label-width="110px"
                   hide-required-asterisk
                   class="elForm" v-show="activePro===2">
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input v-model="pwdForm.newPassword"   show-password @focus="clearvaliDate(1)"></el-input>
                        </el-form-item>
                         <el-form-item label="确认新密码" prop="comfirmPWd">
                           <el-input v-model="pwdForm.comfirmPWd"   show-password  @focus="clearvaliDate(2)"></el-input>
                        </el-form-item>
                         <el-form-item style="margin:50px 0 0 0">
                            <el-button type="primary" @click="onSubmit" class="blockBtn"  style="width:38%">确 认</el-button>
                         </el-form-item>
                </el-form>
                <div v-if="activePro===3" class="alertTxt">
                   <p> <span class="interNum"> {{seconds}}</span> 秒前往登录页</p>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
    export default {
    name:"findPassword",
    layout: "BaseLayout",
    data(){
        let validatePWd=(rule, value, callback) => {
        if (value === '' || value===null || value===undefined) {
          callback(new Error('新密码不能为空'));
        }else if(value.length<6 || value.length>20){
             callback(new Error('请输6-20个字符的密码'));
        }else if(this.pwdForm.comfirmPWd === '' || this.pwdForm.comfirmPWd ===null || this.pwdForm.comfirmPWd ===undefined){
            //  callback(new Error('确认密码不能为空!'));
            this.$refs['pwdForm'].validateField(['comfirmPWd']);
        }
        else if(value!==this.pwdForm.comfirmPWd){
             callback(new Error('两次输入的密码不一致'));
        }
          callback();
      };
      let validateConfirmPWd=(rule, value, callback) => {
        if (value === '' || value===null || value===undefined) {
          callback(new Error('确认密码不能为空'));
        }else if(value.length<6 || value.length>20){
             callback(new Error('请输6-20个字符的密码'));
        }else if(this.pwdForm.newPassword === '' || this.pwdForm.newPassword ===null || this.pwdForm.newPassword ===undefined){
            this.$refs['pwdForm'].validateField(['newPassword']);
        }
        else if(value!==this.pwdForm.newPassword){
             callback(new Error('两次输入的密码不一致'));
        }
          callback();
      };
      let validatePhone=(rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        callback(new Error("手机号码不能为空"));
      } else {
        let reg= /^1[3|4|5|7|8|9][0-9]\d{8}$/;
        console.log(reg.test(value));
        if(reg.test(value)){
          this.showDisabled=false
        }else{
             callback(new Error("请输入正确的手机号码"));
        }
      }
      callback();
    };
        return{
           bannerBg:require('assets/images/img-zhmm.png'),
            form:{
             phoneNumber:null,
             phoneCode:null
            },
            showDisabled:true,
            rules:{
                phoneNumber:[
                    { required: true,validator:validatePhone,  trigger: 'blur' }
                ],
                 phoneCode:[
                    { required: true, message: "验证码不能为空", trigger: "blur" },
                    { min:6,max: 6, message: '请输6位数字的验证码', trigger: 'blur' }
                ]
            },

            pwdForm:{
                newPassword:null,
                comfirmPWd:null,
            },
            pwdRules:{
                 newPassword:[
                    { required: true,validator: validatePWd, trigger: "blur" },
                ],
                 comfirmPWd:[
                    { required: true,validator: validateConfirmPWd, trigger: "blur" },
                ]
            },
            activePro:1,
            seconds:3,
            inter:null,
            secondNum:60,
            timer:null,
            showBtn:true,
        }
    },
     watch:{
         //记录操作步骤，走到第三步，倒计时完成后，跳转到登录界面
         activePro(val){
             if(val===3){
                 this.inter=setInterval(()=>{
                   this.seconds--;
                     if(this.seconds===0){
                         this.$router.push({
                             name:"login"
                         })
                     }
                 },1000)
             }
         },
        //当计时器为0，重新显示获取验证码的图标 清楚定时器
        secondNum(val){
            if(val===0){
             this.showBtn=true;
             clearInterval(this.timer)
             }
        }
     },
//页面销毁，清楚定时器
 destroyed(){
     clearInterval(this.inter);
     clearInterval(this.timer)
 },
    methods:{
      async  handleGetCodeNum(){
            let resData = await this.$homeApi.article.handleGetphoneCode({phone:this.form.phoneNumber});
            console.log(resData);
            this.secondNum=60;
            if(resData.code===200){
                this.timer=setInterval(() => {
                    this.showBtn=false;
                    if( this.secondNum>0){
                    this.secondNum--;
                    }
                }, 1000);
            }
        },
        //验证电话成功后进入第二步
        handleValidatePhone(){
             this.$refs["form"].validate((valid) =>{
                 if(valid){
                     this.activePro=2;
                 }else{
                     this.$message({
                         type:'warning',
                         message:"信息验证失败"
                     })
                 }
             })
        },
        clearvaliDate(index){
            if(index===1){
                  this.$refs['pwdForm'].clearValidate(['comfirmPWd']);
            }else{
                  this.$refs['pwdForm'].clearValidate(['newPassword']);
            }
        },
        //取消操作，跳转到登录页
        edit(){
            this.$router.push({
                name:"login"
            })
        },
        //提交信息，修改密码
        onSubmit(){
            this.$refs["pwdForm"].validate(async(valid) =>{
                 if(valid){
                     let obj={
                         phone:this.form.phoneNumber,
                         code:this.pwdForm.newPassword,
                         confirmCode:this.pwdForm.comfirmPWd
                     };
                     let resData = await this.$homeApi.article.handleResetPwd(obj);
                     console.log(resData);
                     if(resData.code===200){
                         this.$message({
                             type:"success",
                             message:"操作成功"
                         })
                          this.activePro=3;
                     }
                 }else{

                 }
             })
        },

    },
}
</script>
<style scoped lang="scss">
.banner-bg {
  font-size: 30px;
  text-align: center;
  position: relative;
  margin-top: -2px;
  color: #fff;
   img{
        width:100%;
        height:auto
      }
   .txt-box{
        position: absolute;
        top:0;
        width:100%;
        height:100%;
           .bigTxt{
        font-size: 32px;
        padding-top:131px;
        padding-bottom:31px;
    }
    .tagList li{
      margin-right: 78px;
    }
    .smallTxt{
        font-size: 16px;
    }
  }
  .active {
    color: #00a972;
    border-bottom:2px solid #00a972;
  }
}
@media screen and (min-width: 1440px) and (max-width: 1680px){
.banner-bg{
      .txt-box{
           .bigTxt{
            font-size: 32px;
            padding-top:120px;
            padding-bottom:21px;
            }
      }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
.banner-bg{
    .txt-box{
         .bigTxt{
            padding-top:90px;
            padding-bottom:21px;
            }
    }

  }
}
@media screen and (min-width: 1024px) and (max-width: 1280px){
 .banner-bg{
     .txt-box{
         .bigTxt{
            padding-top:70px;
            padding-bottom:21px;
            }
     }
  }
}
.wrapper{
    width:560px;
    margin:50px auto;
    .progress-box{
       text-align: center;
       margin-bottom: 77px;
        .gress-item{
            display: inline-block;
            height:40px;
            width:180px;
            .itemBox{
                position: relative;
                .rotateSpan{
                    display: inline-block;
                    width:28px;
                    height:28px;
                    text-align: center;
                    transform:rotate(45deg);
                    background: #B3B3B3 ;
                    margin-left:8px;
                    margin-bottom:5px;
                }
                .numSpan{
                    position: absolute;
                    left: 25px;
                    top: 6px;
                    right: 15px;
                    color: #fff;
                    font-size: 14px;
                }
                .line-span{
                    position: absolute;
                    top:13px;
                    left:124px;
                    display: inline-block;
                    height:1px;
                    width:130px;
                    background: #B3B3B3;
                }
                .active{
                    background: #00A972;
                }
            }
            .item-txt{
                margin-top:12px;
                font-size:14px;
            }
            .activeTxt{
                    color:#00A972;
            }
        }
    }
    .elForm{
        width: 520px;
        box-sizing: border-box;
        padding: 0 50px;
        margin: 0 auto;
        // margin-left:20px;
        .codeInput{
            // width:49% !important;
        }
        .codeBox{
               display: inline-block;
            //    width: 31%;
               text-align: center;
            //    margin-left: -4px;

               .el-button {
                margin-top: -2px;
                height: 38px;
               }
        }
    }
    .alertTxt{
        text-align: center;
        font-size:15px;
        color:#B3B3B3;
        .interNum{
            font-size:18px;
            color:#00A972;
        }
    }
}
</style>
<style >
 #findPassword .el-input{
            /* width: 80%; */
        }
 #findPassword .el-button+.el-button{
     margin-left: 0;
     width: 100%;
 }
  #findPassword .el-input__inner:focus{
    border-color: #00a972;
  }
 #findPassword .el-button{
  border-radius: 0;
  width: 100%;
  height:38px;
}
 #findPassword .el-input__inner{
     height:38px;
 }
  #findPassword .el-form-item__label{
      font-size: 18px;
      color: #1A1A1A;
  }
</style>

<style lang="scss" scoped>
.code {
    display: flex;
    // width: calc(100% - 80px);

    .el-input {
        width: 60%;
        float: left;
    }

    .codeBox {
        width: 40%;
        float: right;
    }
}
</style>
