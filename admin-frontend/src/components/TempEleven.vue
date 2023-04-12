<script>
export default {
  name: 'TempEleven',

  props: {
    data: {
      type: Object,
      required: true
    },

    type: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      list: []
    }
  },

  created () {
    if (!this.type) {
      return
    }

    let type = ''
    let itemType = ''
    switch (this.type) {
      case 'product':
        type = 'productservicedetailitemCfgList'
        itemType = 'productservicedetailitemdescCfgList'
        break

      case 'solutions':
        type = 'solutiondetailitemCfgList'
        itemType = 'solutiondetailitemdescCfgList'
        break
    }

    const list = this.data[type]?.map(item => {
      return {
        ...item,
        list: item[itemType]
      }
    })

    this.list = list
  }
}
</script>

<template>
  <div class="temp-wrapper">

    <div class="title">{{ data.type }}</div>
    <div class="content">
      <div class="content-item" v-for="(item, index) of list" :key="item.id">
        <div class="step-title">
          <div class="step-title-icon">{{ `${index + 1}`.padStart(2, '0') }}</div>
          <div class="step-title-title">{{ item.title }}</div>
        </div>

        <div class="step-line"></div>

        <div class="step-content">
          {{ item.desc }}
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
  transform: translateX(10px);
  overflow: hidden;

  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;

    &:last-child {
      .step-line {
        width: calc(100% - 25px);
      }
    }

    .step-title {
      display: flex;
      align-items: center;
      // transform: translateX(-10px);

      &-icon {
        width: 30px;
        height: 30px;
        background: #26A371;
        border-radius: 50%;
        font-size: 18px;
        color: #fff;
        line-height: 30px;
        text-align: center;
      }

      &-title {
        margin-left: 14px;
        font-size: 20px;
        color: #333333;
      }
    }

    .step-line {
      width: 100%;
      height: 1px;
      background: #E5E5E5;
      position: relative;
      transform: translateX(15px);
      margin-top: 30px;
      margin-bottom: 30px;

      &:after {
        content: '';
        width: 10px;
        height: 10px;
        background: #E5E5E5;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .step-content {
      font-size: 14px;
      color: #666666;
      line-height: 28px;
      box-sizing: border-box;
      padding-right: 16px;
    }
  }


}

::v-deep .el-steps {
  .el-step {

    &__title {
      position: absolute;
      top: -50px;

      .step-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: #26A371;
        border-radius: 50%;
        font-size: 18px;
        color: #fff;
        line-height: 30px;
        text-align: center;
      }

      .step-title {
        margin-left: 14px;
        font-size: 20px;
        color: #333333;
      }
    }

    &__icon {
      width: 10px;
      height: 10px;
      background: #999999;
      border-radius: 50%;
      color: #999;
    }
  }
}
</style>
