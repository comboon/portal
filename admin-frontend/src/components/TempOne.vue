<script>
export default {
  name: 'TempOne',

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

      if (list.length > 2) {
        return list.slice(0, 2)
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
        <i class="icon fa" v-if="item.iconType === 1" :class="item.iconFont"></i>
        <el-image class="icon" v-if="item.iconType === 2" :src="showImg(item.iconPic)" />

        <div>
          <div class="content-item-title">
            <span>{{ item.title }}</span>
          </div>

          <div class="content-item-desc">
            <span>{{ item.desc }}</span>
          </div>
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
    margin-right: 86px;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 50px;
    box-shadow: 0px 5px 32px 0px rgba(51, 51, 51, 0.1);
    display: flex;

    &:last-child {
      margin-right: 0;
    }

    .el-image {
      width: 60px;
      height: 60px;
      flex: 0 0 60px;
      margin-right: 36px;
      margin-top: 10px;
    }

    .icon {
      font-size: 60px;
      flex: 0 0 60px;
      margin-right: 36px;
      margin-top: 10px;
      color: #26A371;
    }

    &-title {
      font-size: 16px;
      color: #333333;
      margin-bottom: 1em;
    }

    &-desc {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
    }
  }
}
</style>
