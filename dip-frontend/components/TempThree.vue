<script>
export default {
  name: 'TempThree',

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

    <div class="content" v-for="item of list" :key="item.id">
        <i class="icon fa" v-if="item.iconType === 1" :class="item.iconFont"></i>
        <el-image class="icon" v-if="item.iconType === 2" :src="showImg(item.iconPic)" />

      <div class="content-item">
        <div class="content-item-title">{{ item.title }}</div>
        <div class="content-item-desc">{{ item.desc }}</div>

        <div class="content-item-list">
          <div class="content-item-list-item" v-for="_item of item.list" :key="_item.id">
            <p>
              <i class="circle"></i>
              <span>{{ _item.content }}</span>
            </p>
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

  .el-image {
    width: 60px;
    height: 60px;
    flex: 0 0 60px;
    margin-right: 30px;
  }

  .icon {
    font-size: 60px;
    flex: 0 0 60px;
    margin-right: 30px;
    color: #26A371;
  }

  &-item {
    flex: 1;

    &-title {
      font-size: 20px;
      margin-bottom: 20px;
    }

    &-desc {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
    }

    &-list {
      margin-top: 20px;
      line-height: 30px;

      &-item {
        color: #666666;

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
}
</style>
