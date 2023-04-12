<template>
  <div class="component-upload-image">
    <el-upload
      ref="upload"
      :action="uploadImgUrl"
      :list-type="listType"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      :disabled="isDisabled"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      name="file"
      :on-remove="handleRemove"
      :show-file-list="true"
      :headers="headers"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :class="{hide: this.fileList.length >= this.limit}"
      v-if="isPic"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <div class="mask" v-if="!isPic">
      <i class="colse el-icon-close" @click="delVideo"></i>
      <i class="el-icon-video-play play"></i>
    </div>

    <!-- 上传提示 -->
    <div class="el-upload__tip" slot="tip" v-if="showTip">
      请上传<span v-if="fileSize">大小不超过<b style="color: #f56c6c">{{ fileSize }}MB</b>格式为<b style="color: #f56c6c">png/jpg/jpeg/gif</b>,不超过<b style="color: #f56c6c">{{videoSize}}MB</b>格式为<b style="color: #f56c6c"> mp4/wmv/avi/flv</b>的文件
      </span>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      title="预览"
      width="800"
      append-to-body
    >
      <img
        :src="dialogImageUrl"
        style="display: block; max-width: 100%; margin: 0 auto"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    value: [String, Object, Array],
    // 图片数量限制
    limit: {
      type: Number,
      default: 5
    },
    // 图片大小限制(MB)
    fileSize: {
      type: Number,
      default: 10
    },
    videoSize: {
      type: Number,
      default: 100
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg', 'gif', 'mp4', 'wmv', 'avi', 'flv']
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      listType: 'picture-card',
      isPic: true,
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.isPic = /\.png|.jp(e)?g|\.gif/.test(val)
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',')
          // 然后将数组转为对象数组
          this.fileList = list.map(item => {
            if (typeof item === 'string') {
              if (item.indexOf(this.baseUrl) === -1) {
                item = { name: this.baseUrl + item, url: this.baseUrl + item }
              } else {
                item = { name: item, url: item }
              }
            }
            return item
          })
        } else {
          this.fileList = []
          return []
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize || this.videoSize)
    }
  },
  methods: {
    // 删除图片
    handleRemove(file, fileList) {
      const findex = this.fileList.map(f => f.name).indexOf(file.name)
      if (findex > -1) {
        this.fileList.splice(findex, 1)
        this.$emit('input', this.listToString(this.fileList))
      }
      this.listType = 'picture-card'
    },
    // 上传成功回调
    handleUploadSuccess(res) {

      let fileExtension = ''
      if (res.fileName.lastIndexOf('.') > -1) {
        fileExtension = res.fileName.slice(res.fileName.lastIndexOf('.') + 1)
      }

      if (fileExtension == 'mp4' || fileExtension == 'wmv' || fileExtension == 'avi' || fileExtension == 'flv') {
        this.listType = 'text'
        this.isPic = false
      } else {
        this.isPic = true
        this.listType = 'picture-card'
      }

      this.fileList.push({ name: res.fileName, url: res.fileName })
      this.$emit('input', this.listToString(this.fileList))
      this.loading.close()
    },
    // 上传前loading加载
    handleBeforeUpload(file) {
      console.log(file)
      let isImg = false
      let isVideo = false
      if (this.fileType.length) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        // 图片
        isImg = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
        // 视频
        isVideo = this.fileType.some(type => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })

      } else {
        isImg = file.type.indexOf('image') > -1
        isVideo = file.type.indexOf('video') > -1
      }

      if (!isImg) {
        this.$message.error(
          `文件格式不正确, 请上传${this.fileType.join('/')}图片格式文件!`
        )
        return false
      }

      if (!isVideo) {
        this.$message.error(
          `文件格式不正确, 请上传${this.fileType.join('/')}视频格式文件!`
        )
        return false
      }
      // 图片大小
      if (isImg && !isVideo && this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传图片大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      // 视频大小
      if (isVideo && this.videoSize) {
        const isLt = file.size / 1024 / 1024 < this.videoSize
        if (!isLt) {
          this.$message.error(`上传视频片大小不能超过 ${this.videoSize} MB!`)
          return false
        }
      }

      this.loading = this.$loading({
        lock: true,
        text: '上传中',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
    },
    // 上传失败
    handleUploadError() {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      this.loading.close()
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = ''
      separator = separator || ','
      for (let i in list) {
        strs += list[i].url.replace(this.baseUrl, '') + separator
      }
      return strs != '' ? strs.substr(0, strs.length - 1) : ''
    },
    // 关闭视频展示框
    delVideo() {
      this.isPic = true
      this.listType = 'picture-card'
      this.fileList = []
      this.$emit('input', this.listToString(this.fileList))
    }
  }
}
</script>
<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
::v-deep.hide .el-upload--picture-card {
  display: none;
}

// 去掉动画效果
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: all 0s;
}

::v-deep .el-list-enter, .el-list-leave-active {
  opacity: 0;
  transform: translateY(0);
}

.mask {
  width: 148px;
  height: 148px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  position: relative;

  .play {
    font-size: 32px;
    color: #fff;
  }

  .colse {
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
    color: #fff;
    cursor: pointer;
  }
}
</style>
