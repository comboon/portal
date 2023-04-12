<script>
import Player from 'xgplayer'

let playerList = []

const baseOption = {
  videoInit: true,
  volume: 0.3,
  fluid: true,
  loop: true,
  whitelist: [''],
  closePlayVideoFocus: true
}

export default {
  name: 'TempSix',

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
    init () {
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
      console.log(this.data[type])
      this.data[type].forEach(item => {
        playerList.push(new Player({
          ...baseOption,
          id: `mse${item.id}`,
          url: process.env.VUE_APP_BASE_API + item.img
        }))
      })
    }
  },

  mounted () {
    this.init()
  }
}
</script>

<template>
  <div class="temp-wrapper">
    <div class="title">{{ data.type }}</div>

    <div v-for="item of list" :key="item.id">
      <div :id="`mse${item.id}`"></div>
      <div class="content">
        <div class="content-title">{{ item.title }}</div>
        <div class="content-desc" v-if="item.desc">{{ item.desc }}</div>
        <div class="content-item" v-for="_item of item.list" :key="_item.id">
          <p>
            <i class="circle"></i>
            <span>{{ _item.content }}</span>
          </p>
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
  font-size: 32px !important;
  font-family: Microsoft YaHei;
  color: #333333;
  text-align: center;
  margin-bottom: 50px;
}

#mse {
  width: 100%;
  margin-bottom: 20px;
}

.content {
  font-size: 14px;
  color: #666666;
  line-height: 30px;
  background-color: #F2F2F2;
  box-sizing: border-box;
  padding: 20px 35px;

  &-title {
    font-size: 16px;
    line-height: 30px;
  }

  &-desc {
    line-height: 30px;
  }

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
