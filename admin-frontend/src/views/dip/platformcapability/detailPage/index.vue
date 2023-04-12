<template>
    <div id="platformcapability-detail" v-if="showDetail">
        <el-dialog  :visible.sync="open" width="1000px" append-to-body @close="cancel">
             <div class="description" v-html="details"></div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"platformcapability-detail",
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
