<script>
export default {
  name: 'TempTen',

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
      <div class="content-item" v-for="item of list" :key="item.id">
        <div class="content-item-box">
          <i class="icon fa" v-if="item.iconType === 1" :class="item.iconFont"></i>
          <el-image class="icon" v-if="item.iconType === 2" :src="showImg(item.iconPic)" />
          <div class="content-item-title">
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
  flex-wrap: wrap;

  &-item {
    width: 50%;
    box-sizing: border-box;
    margin-bottom: 28px;

    &:nth-child(2n+1) {
      padding-right: 60px;
    }

    &:nth-child(2n) {
      padding-left: 60px;
    }

    &:nth-last-child(-n+2) {
      margin-bottom: 0;
    }

    &-box {
      background: #F5F8FA;
      box-sizing: border-box;
      padding: 30px 40px;
      height: 100%;
    }

    .el-image {
      width: 30px;
      height: 30px;
      margin-bottom: 10px;
    }

    .icon {
      font-size: 30px;
      margin-bottom: 10px;
      color: #26A371;
    }

    &-title {
      font-size: 14px;
      color: #262626;
      line-height: 28px;
    }
  }
}
</style>
