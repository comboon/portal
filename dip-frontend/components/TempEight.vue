<script>
export default {
  name: 'TempEight',

  props: {
    data: {
      type: Object,
      required: true
    },

    type: {
      // product || solutions
      type: String,
      required: true
    }
  },

  computed: {
    list () {
      let list = []
      switch (this.type) {
        case 'product':
          list = this.data.productservicedetailitemCfgList
          break

        case 'solutions':
          list = this.data.solutiondetailitemCfgList
          break
      }
      if (list.length > 4) {
        return list.slice(0, 4)
      }
      return list
    }
  },

  methods: {
    showImg (src) {
      return process.env.NUXT_ENV + src
    }
  }
}
</script>

<template>
  <div class="temp-wrapper">
    <div class="title">{{ data.type }}</div>
    <div class="content">
      <div class="content-item" v-for="(item, index) of list" :key="index">
        <div class="content-item-title">
          <i class="icon fa" v-if="item.iconType === 1" :class="item.iconFont"></i>
          <el-image class="icon" v-if="item.iconType === 2" :src="showImg(item.iconPic)" />
          <span>{{ item.title }}</span>
        </div>

        <div class="content-item-desc">
          <span>{{ item.desc }}</span>
          <!-- <span v-for="i of (index + 1)" :key="i">大数据(big data)，或称巨量资料，指的是所涉及的资料量规模透过主流软件工具在合理时间内达到撷取的资讯。</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.temp-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 60px 0px;
}

.title {
  font-size: 32px;
  font-family: Microsoft YaHei;
  color: #333333;
  text-align: center;
  margin-bottom: 50px;
}

.content {
  display: flex;

  &-item {
    flex: 1;
    margin-right: 83px;
    background: #F5F8FA;
    box-sizing: border-box;
    padding: 36px;

    &:last-child {
      margin-right: 0;
    }

    &-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      color: #333333;
      margin-bottom: 10px;

      .el-image {
        width: 64px;
        height: 64px;
        flex: 0 0 64px;
        margin-bottom: 10px;
      }

      .icon {
        font-size: 64px;
        margin-bottom: 10px;
        color: #02A570;
      }
    }

    &-desc {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
    }
  }
}
</style>
