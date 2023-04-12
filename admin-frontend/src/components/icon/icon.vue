<template>
  <div class="iconBox">
    <div class="" v-for="(item,idx) of iconArrList">
      <i :class="item" class="fa" @click="getIconVal(item)"></i>
    </div>

  </div>
</template>

<script>
import iconList from '@/utils/fontList'
export default {
  name: 'icon',
  data(){
    return{
      iconArrList:[],
    }
  },
  mounted() {
    this.iconArrList = iconList
  },
  methods:{
    getIconVal(val){
      this.$emit('input',val)
    }
  }
}
</script>

<style scoped lang="scss">
.iconBox{
  width: 520px;
  height: 168px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  > div{
    width: 16.6%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    i{
      font-size:21px;
      cursor: pointer;
    }
    i:hover{
      color:#1890ff;
    }
  }
}
</style>
