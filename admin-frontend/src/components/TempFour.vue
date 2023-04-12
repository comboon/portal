<script>
export default {
  name: 'TempFour',

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
      current: '0',
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

    <el-button-group>
      <el-button v-for="(item, index) of list" :key="item.id" :class="{ success: current === `${index}` }" @click="current = `${index}`">{{ item.title }}</el-button>
    </el-button-group>

    <div class="content">
      <div class="list">
        <div class="list-item" v-for="_item of list[current].list" :key="_item.id">
          <p>
            <i class="circle"></i>
            <span>{{ _item.content }}</span>
          </p>
        </div>
      </div>

      <el-image :src="showImg(list[current].img)" />
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

.el-button-group {
  width: 100%;
  display: flex;

  .el-button {
    flex: 1;
    border: none !important;
    border-radius: 0 !important;
    height: 50px;
    background: #B3B3B3;
    font-size: 20px;
    color: #fff;
    margin-right: 0 !important;

    &.success {
      background: #26A371;
    }

    &:hover {
      border: none !important;
    }
  }
}

.content {
  box-sizing: border-box;
  padding: 50px 70px;
  background: #F2F2F2;
}

.el-image {
  width: 100%;
  margin-top: 30px;
}

.list {
  font-size: 14px;
  color: #666666;
  line-height: 30px;

  &-item {
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #26A371;
      border-radius: 50%;
      margin-right: 12px;
    }
  }
}
</style>
