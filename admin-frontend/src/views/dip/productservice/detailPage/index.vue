<template>
    <div id="productservice-detail" v-if="showDetail">
        <el-dialog  :visible.sync="open" width="1000px" append-to-body @close="cancel">
             <div v-html="details" class="details"></div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"productservice-detail",
    data(){
        return {
            open:false,
            showDetail:false,
            details:null,
        }
    },
    methods:{
        init(html){
            this.showDetail=true;
            this.open=true;
            this.details=html;
        },
        cancel(){
            this.showDetail=false;
            this.open=false;
            this.details=null;
        }
    }
}
</script>
<style scoped>
.details img{
    max-width: 100%;
}
</style>