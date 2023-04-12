<template>
      <div id="newsDetail">
          <el-dialog title="新闻详情页面" :visible.sync="open"  width="1000px" append-to-body>
              <div class="title-warrper">
                  <h1>{{form.title}}</h1>
              </div>
              <div v-html="form.description" class="infor-wrapper description"></div>
          </el-dialog>
      </div>
</template>
<script>
import { getNewscenter } from "@/api/dip/newscenter";
export default {
   name:"newsDetail",
   data(){
       return {
           open:false,
           form:{
               title:null
           }
       }
   },
   methods:{
       init(id){
           this.open=true;
           this.getNewDetails(id);
       },
       getNewDetails(id){
        getNewscenter(id).then(response => {
            this.form = response.data;
        });
       }
   }
}
</script>
<style scoped lang="scss">
.title-warrper{
    h1{
        text-align: center;
        font-size:24px;
    }
}
.infor-wrapper{
    img{
    width:100px;
    height:100px;
}
}

</style>
