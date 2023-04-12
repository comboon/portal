<script>
export default {
  name: 'TempNine',

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
  }
}
</script>

<template>
  <div class="temp-wrapper">
    <div class="title">{{ data.type }}</div>
    <div class="content">
      <div class="content-item" v-for="item of list" :key="item.id">
        <div class="content-item-title">
          <i class="icon"></i>
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
  flex-wrap: wrap;

  &-item {
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
    // margin-right: 42px;

    // &:last-child {
    //   margin-right: 0;
    // }

    &-title {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #262626;

      .icon {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-right: 20px;
        background: #02A570;
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
