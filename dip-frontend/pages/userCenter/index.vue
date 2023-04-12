<template>
  <div class="userCenter">
    <div class="news-content">
      <div class="news-left-nav">
        <ul>
          <li class="active">应用信息</li>
          <li>基本信息</li>
        </ul>
      </div>
      <div class="infor-wrapper">
        <p class="infor-title">已申请应用列表</p>
        <div class="filter-wrapper">
          <div class="filer-item">
            <div class="item-left-box">处理状态</div>
            <div class="item-right-box">
              <ul class="statusUl">
                <li class="active">全部</li>
                <li>待处理</li>
                <li>已处理</li>
              </ul>
            </div>
          </div>
          <div class="filer-item">
            <div class="item-left-box">申请时间</div>
            <div class="item-right-box">
              <el-date-picker
                size="large"
                v-model="value1"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>

          <div class="filer-item">
            <div class="item-left-box">关键字</div>
            <div class="item-right-box">
              <el-input placeholder="请输入内容" v-model="input2" size="medium">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  class="serach-btn"
                ></el-button>
              </el-input>
            </div>
          </div>
        </div>

        <div class="table-box">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="应用名称" width="240">
              <template slot-scope="scope">
                <div class="logoImg">
                  <img :src="newsImg" />
                  <span class="productName">{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="createdAt" label="申请时间" width="180">
            </el-table-column>
            <el-table-column prop="price" label="价格"> </el-table-column>
            <el-table-column label="状态"> 
                <template slot-scope="scope">
                  <span class="productName">{{scope.row.applyStatus}}</span>
              </template>

            </el-table-column>
            <el-table-column prop="address" label="操作"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="pageNation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.pageNum"
        :page-sizes="[10, 15, 20]"
        :page-size="pageObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageObj.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  name: "userCenter",
  data() {
    return {
      newsImg: require("~/assets/images/img-jiejuefangan.png"),
      currentPage4: 4,
      value1: "",
      value2: "",
      input2: "",
      tableData: [
       
      ],
       pageObj: {
        pageNum: 1,
        pageSize: 10,
        total: null,
      },
    };
  },
  //订单中心， 废弃页面，可以不用看
  created(){
    this.handleGetList(this.pageObj.pageNum,this.pageObj.pageSize);
  },
  methods: {
   async handleGetList(pageNum,pageSize){
     let userInfor=JSON.parse(Cookies.get('userInfor'));
     console.log(userInfor.nickname);
     let obj={
       applyUser:userInfor.nickname,
       pageNum,
       pageSize,
     }
     let res =  (await this.$homeApi.article.handleGetPayList(obj)).data;
     console.log(res);
     this.tableData=res.rows;
     this.pageObj.total=res.total
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
       this.handleGetList(this.pageObj.pageNum,val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageObj.pageNum=val
      this.handleGetList(val,this.pageObj.pageSize);
    },
  },
};
</script>
<style scoped lang="scss">
.userCenter {
  margin-bottom: 10px;
  @media screen and (min-width: 1680px) and (max-width: 1920px) {
    .news-content {
      margin: 0 238px;
      display: flex;
      .news-left-nav {
        width: 200px;
        ul {
          li {
            text-align: center;
            width: 140px;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            padding: 10px 0;
          }
          .active {
            color: #00a972;
            font-weight: bold;
            border-bottom: 1px solid #e6e6e6;
          }
        }
      }
      .infor-wrapper {
        flex: 1;
        .infor-title {
          font-size: 20px;
          font-weight: bold;
          margin-top: 20px;
        }
        .filter-wrapper {
          margin-top: 30px;
          .filer-item {
            display: flex;
            margin-bottom: 30px;
            .item-left-box {
              margin-right: 68px;
              width: 80px;
              text-align: left;
              font-size: 20px;
              height: 44px;
              line-height: 44px;
            }
            .item-right-box {
              flex: 1;
              .statusUl {
                li {
                  display: inline-block;
                  margin-right: 47px;
                  font-size: 18px;
                  font-weight: 400;
                  padding: 10px 20px;
                }
                .active {
                  background: #00a972;
                  color: #fff;
                  border-radius: 5px;
                }
              }
              .serach-btn {
                width: 73px;
                height: 52.5px;
                background: #00a972;
                color: #fff;
                font-size: 34px;
                text-align: center;
              }
            }
          }
        }
        .table-box {
          border: 1px solid #e5e5e5;
          border-bottom: none;
          .logoImg {
            display: flex;
            padding: 14px 0;
            img {
              width: 55px;
              height: 62px;
              margin-right: 10px;
            }
            .productName {
              flex: 1;
              font-weight: bold;
              font-size: 16px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .pageNation {
      margin: 20px 238px;
      text-align: right;
    }
  }
  @media screen and (min-width: 1440px) and (max-width: 1680px) {
       .news-content {
      margin: 0 175px;
      display: flex;
      .news-left-nav {
        width: 200px;
        ul {
          li {
            text-align: center;
            width: 140px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            padding: 10px 0;
          }
          .active {
            color: #00a972;
            font-weight: bold;
            border-bottom: 1px solid #e6e6e6;
          }
        }
      }
      .infor-wrapper {
        flex: 1;
        .infor-title {
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
        }
        .filter-wrapper {
          margin-top: 30px;
          .filer-item {
            display: flex;
            margin-bottom: 30px;
            .item-left-box {
              margin-right: 68px;
              width: 80px;
              text-align: left;
              font-size: 18px;
              height: 40px;
              line-height: 40px;
            }
            .item-right-box {
              flex: 1;
              .statusUl {
                li {
                  display: inline-block;
                  margin-right: 44px;
                  font-size: 16px;
                  font-weight: 400;
                  padding: 10px 16px;
                }
                .active {
                  background: #00a972;
                  color: #fff;
                  border-radius: 5px;
                }
              }
              .serach-btn {
                width: 67px;
                height: 50.5px;
                background: #00a972;
                color: #fff;
                font-size: 28px;
                text-align: center;
              }
            }
          }
        }
        .table-box {
          border: 1px solid #e5e5e5;
          border-bottom: none;
          .logoImg {
            display: flex;
            padding: 14px 0;
            img {
              width: 55px;
              height: 62px;
              margin-right: 10px;
            }
            .productName {
              flex: 1;
              font-weight: bold;
              font-size: 14px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .pageNation {
      margin: 20px 238px;
      text-align: right;
    }

  }
  @media screen and (min-width: 1280px) and (max-width: 1440px) {
  .news-content {
      margin: 0 200px;
      display: flex;
      .news-left-nav {
        width: 200px;
        ul {
          li {
            text-align: center;
            width: 140px;
            height: 38px;
            line-height: 38px;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            padding: 10px 0;
          }
          .active {
            color: #00a972;
            font-weight: bold;
            border-bottom: 1px solid #e6e6e6;
          }
        }
      }
      .infor-wrapper {
        flex: 1;
        .infor-title {
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
        .filter-wrapper {
          margin-top: 30px;
          .filer-item {
            display: flex;
            margin-bottom: 30px;
            .item-left-box {
              margin-right: 48px;
              width: 80px;
              text-align: left;
              font-size: 16px;
              height: 38px;
              line-height: 38px;
            }
            .item-right-box {
              flex: 1;
              .statusUl {
                li {
                  display: inline-block;
                  margin-right: 44px;
                  font-size: 14px;
                  font-weight: 400;
                  padding: 10px 16px;
                }
                .active {
                  background: #00a972;
                  color: #fff;
                  border-radius: 5px;
                }
              }
              .serach-btn {
                width: 63px;
                height: 45.5px;
                background: #00a972;
                color: #fff;
                font-size: 25px;
                text-align: center;
              }
            }
          }
        }
        .table-box {
          border: 1px solid #e5e5e5;
          border-bottom: none;
          .logoImg {
            display: flex;
            padding: 14px 0;
            img {
              width: 55px;
              height: 62px;
              margin-right: 10px;
            }
            .productName {
              flex: 1;
              font-weight: bold;
              font-size: 14px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .pageNation {
      margin: 20px 238px;
      text-align: right;
    }
  }
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    .news-content {
      margin: 0 200px;
      display: flex;
      .news-left-nav {
        width: 200px;
        ul {
          li {
            text-align: center;
            width: 140px;
            height: 38px;
            line-height: 38px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            padding: 4px 0;
          }
          .active {
            color: #00a972;
            font-weight: bold;
            border-bottom: 1px solid #e6e6e6;
          }
        }
      }
      .infor-wrapper {
        flex: 1;
        .infor-title {
          font-size: 14px;
          font-weight: bold;
          margin-top: 20px;
        }
        .filter-wrapper {
          margin-top: 30px;
          .filer-item {
            display: flex;
            margin-bottom: 16px;
            .item-left-box {
              margin-right: 48px;
              width: 80px;
              text-align: left;
              font-size: 14px;
              height: 38px;
              line-height: 38px;
            }
            .item-right-box {
              flex: 1;
              .statusUl {
                li {
                  display: inline-block;
                  margin-right: 44px;
                  font-size: 14px;
                  font-weight: 400;
                  padding: 7px 14px;
                }
                .active {
                  background: #00a972;
                  color: #fff;
                  border-radius: 5px;
                }
              }
              .serach-btn {
                width: 60px;
                height: 38px;
                background: #00a972;
                color: #fff;
                font-size: 19px;
                text-align: center;
              }
            }
          }
        }
        .table-box {
          border: 1px solid #e5e5e5;
          border-bottom: none;
          .logoImg {
            display: flex;
            padding: 14px 0;
            img {
              width: 55px;
              height: 62px;
              margin-right: 10px;
            }
            .productName {
              flex: 1;
              font-weight: bold;
              font-size: 13px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .pageNation {
      margin: 20px 238px;
      text-align: right;
    }
  }
}
</style>
<style>
.filer-item .el-input__inner {
  height: 52px !important;
  font-size: 23px;
}
 .el-table{
    font-size: 18px !important;
 }
@media screen and (min-width: 1440px) and (max-width: 1680px){
  .filer-item .el-input__inner {
  height: 48px !important;
  font-size: 20px !important;
  }
  .table-box .el-table thead {
    font-size: 18px !important;
    font-weight: bold;
    color: #000;
    text-align: center;
  }
  .el-table{
    font-size: 16px !important;
  }
}
 @media screen and (min-width: 1280px) and (max-width: 1440px){
     .filer-item .el-input__inner {
        height: 44px !important;
        font-size: 16px !important;
        }
        .table-box .el-table thead {
          font-size: 15px !important;
          font-weight: bold;
          color: #000;
          text-align: center;
        }
        .el-table{
          font-size: 14px !important;
        } 
 }
 @media screen and (min-width: 1024px) and (max-width: 1280px){
    .filer-item .el-input__inner {
        height: 36px !important;
        font-size: 13px !important;
        }
        .table-box .el-table thead {
          font-size: 13px !important;
          font-weight: bold;
          color: #000;
          text-align: center;
        }
         .el-table{
          font-size: 13px !important;
        } 
 }
.table-box .el-table thead {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  text-align: center;
}
.table-box .el-table .el-table__cell {
  text-align: center;
}
</style>

