<template>
  <el-dialog
    title="查看详情"
    :visible.sync="show"
    width="85%"
  >
<!--    <div v-for="(item,idx) of templateType" :key="item.value">-->
<!--      <h2>{{item.type}}</h2>-->
<!--      <el-image :src="httpUrl + item.dictImg" />-->
<!--    </div>-->
    <div class="content" v-if="solutiondetailCfgList.length">
      <template v-for="item of solutiondetailCfgList">
        <tempOne :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '1'"></tempOne>
        <tempTwo :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '2'"></tempTwo>
        <tempThree :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '3'"></tempThree>
        <tempFour :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '4'"></tempFour>
        <tempFive :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '5'"></tempFive>
        <tempSix :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '6'"></tempSix>
        <tempSeven :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '7'"></tempSeven>
        <tempEight :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '8'"></tempEight>
        <tempNine :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '9'"></tempNine>
        <tempTen :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '10'"></tempTen>
        <tempeEleven :id="`${tempType}${item.id}`" :key="item.id" :type="tempType" :data="item" v-if="item.templateType === '11'"></tempeEleven>
      </template>
    </div>
  </el-dialog>
</template>

<script>
// import { getDicts } from '@/api/system/dict/data'

import tempOne from '@/components/TempOne'
import tempTwo from '@/components/TempTwo'
import tempThree from '@/components/TempThree'
import tempFour from '@/components/TempFour'
import tempFive from '@/components/TempFive'
import tempSix from '@/components/TempSix'
import tempSeven from '@/components/TempSeven'
import tempEight from '@/components/TempEight'
import tempNine from '@/components/TempNine'
import tempTen from '@/components/TempTen'
import tempeEleven from '@/components/TempEleven'

export default {
  name: 'detail',
  components:{
    tempOne,
    tempTwo,
    tempThree,
    tempFour,
    tempFive,
    tempSix,
    tempSeven,
    tempEight,
    tempNine,
    tempTen,
    tempeEleven
  },
  dicts: [
    'template_type'
  ],
  data(){
    return{
      show:false,
      solutiondetailCfgList:[],
      templateType:[],
      httpUrl: process.env.VUE_APP_BASE_API,
      tempType:null,
    }
  },
  methods:{
    getDetailData(row,type){
      // console.log(row)
      // console.log(type)
      this.show = true
      this.tempType = type;
      this.solutiondetailCfgList = row
      // let template = []
      // getDicts('template_type').then(res =>{
      //   if(res.code == 200){
      //     let dataList = res.data
      //     for (let i = 0; i < row.length; i++) {
      //       let isExist = false;
      //       for (let j = 0; j < dataList.length; j++) {
      //         if (row[i].templateType == dataList[j].value) {
      //           isExist = true;
      //           break;
      //         }
      //       }
      //       if (!isExist) {
      //         dataList[i].type = row[i].type
      //         template.push(dataList[i]);
      //       }
      //     }
      //   }
      // })
      // console.log(template)
      // this.templateType = template
    },
  }
}
</script>

<style scoped lang="scss">
h2{
  text-align: center;
  font-weight: bold;
  font-size: 21px;
}
</style>
