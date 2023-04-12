<script>
export default {
  name: 'TempSeven',

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
      if (list.length > 3) {
        return list.slice(0, 3)
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
        <el-image :src="showImg(item.img)" />
        <div class="content-item-title">
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
    margin-right: 72px;

    &:last-child {
      margin-right: 0;
    }

    .el-image {
      width: 100%;
      margin-bottom: 20px;
    }

    &-title {
      font-size: 16px;
      color: #333333;
      text-align: center;
    }
  }
}
</style>
