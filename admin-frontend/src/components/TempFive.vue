<script>
export default {
  name: 'TempFive',

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
      return process.env.VUE_APP_BASE_API + src
    }
  }
}
</script>

<template>
  <div class="temp-wrapper">
    <div class="title">{{ data.type }}</div>
    <div class="content">
      <div class="content-item" v-for="item of list" :key="item.id">
        <div class="content-item-title">
          <i class="icon fa" v-if="item.iconType === 1" :class="item.iconFont"></i>
          <el-image class="icon" v-if="item.iconType === 2" :src="showImg(item.iconPic)" />
          <span>{{ item.title }}</span>
        </div>

        <div class="content-item-desc">
          <span>{{ item.desc }}</span>
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
    margin-right: 30px;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 16px 20px;
    box-shadow: 0px 5px 32px 0px rgba(51, 51, 51, 0.1);

    &:last-child {
      margin-right: 0;
    }

    &-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #333333;
      margin-bottom: 10px;

      .el-image {
        width: 24px;
        height: 24px;
        margin-right: 16px;
      }

      .el-image {
        width: 24px;
        height: 24px;
        flex: 0 0 24px;
        margin-right: 16px;
      }

      .icon {
        font-size: 24px;
        margin-right: 16px;
        color: #26A371;
      }
    }

    &-desc {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
      text-align: justify;
    }
  }
}
</style>
