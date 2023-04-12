<script>
export default {
  name: 'TempTwo',

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
      let map = {}
      item[itemType]?.forEach(({type, content}) => {
        map[type] = map[type] || []
        map[type].push(content)
      })
      let list = []
      for (const type in map) {
        list.push({
          type: type,
          contentList: map[type]
        })
      }

      if (list.length > 2) {
        list = list.slice(0, 2)
      }
      return {
        ...item,
        list
      }
    })

    this.list = list
  },

  methods: {
    handleClick (index) {
      console.log(index)
      // this.tab = index
    },

    showImg (src) {
      return process.env.VUE_APP_BASE_API + src
    }
  }
}
</script>

<template>
  <div class="temp-wrapper">
    <div class="title">{{ data.type }}</div>

    <el-tabs v-model="current" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) of list" :key="item.id" :label="item.title" :name="`${index}`">
        <el-image :src="showImg(item.img)" />

        <div class="feature">
          <div class="feature-item" v-for="_item of item.list" :key="_item.type">
            <div class="feature-item-type">{{ _item.type }}</div>
            <div class="feature-item-content" v-for="content of _item.contentList" :key="content"><i class="circle"></i> {{ content }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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

.el-tabs {
  ::v-deep .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;

    .el-tabs__nav {
      width: auto;
      // transform: translateX(-50%) !important;
    }

    .el-tabs__item {
      width: 200px;
      font-size: 20px;
      color: #666666;
      text-align: center;
      line-height: 20px;

      &:hover {
        color: #26A371;
      }

      &.is-active {
        color: #26A371;
      }
    }
  }
}

.el-image {
  width: 100%;
}

.feature {
  display: flex;
  flex-wrap: wrap;

  &-item {
    width: 50%;
    box-sizing: border-box;
    padding: 12px;

    &-type {
      font-size: 16px;
      position: relative;
      margin-bottom: 20px;
    }

    &-content {
      color: #666666;
      line-height: 30px;
      font-size: 14px;

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
}
</style>
