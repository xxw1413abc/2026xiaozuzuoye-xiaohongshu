<template>
  <view class="safe-page">
    <view class="panel">
      <text class="title">发布笔记</text>
      <view class="uploader" @tap="chooseImage">
        <image v-if="image" class="preview" :src="image" mode="aspectFill" />
        <text v-else class="upload-text">选择图片</text>
      </view>
      <input v-model="title" class="input" placeholder="填写标题" />
      <textarea v-model="content" class="textarea" placeholder="分享你的生活经验" />
      <button class="primary-button" @tap="submit">发布笔记</button>
    </view>
    <BottomNav active="note" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { saveLocalNote } from '../../common/mock.js'
import BottomNav from '../../components/BottomNav/BottomNav.vue'

const image = ref('')
const title = ref('')
const content = ref('')

function chooseImage() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      image.value = res.tempFilePaths[0]
    }
  })
}

function submit() {
  if (!title.value.trim()) {
    uni.showToast({ title: '请填写标题', icon: 'none' })
    return
  }
  saveLocalNote({
    title: title.value,
    content: content.value,
    cover: image.value || 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80'
  })
  title.value = ''
  content.value = ''
  image.value = ''
  uni.showToast({
    title: '已保存到本地',
    icon: 'success'
  })
  setTimeout(() => uni.redirectTo({ url: '/pages/index/index' }), 600)
}
</script>

<style scoped>
.safe-page {
  padding-bottom: 160rpx;
  background: #f7f7f7;
}

.panel {
  padding: 24rpx;
  border-radius: 20rpx;
  background: #fff;
}

.title {
  display: block;
  margin-bottom: 24rpx;
  font-size: 36rpx;
  font-weight: 700;
}

.uploader {
  height: 420rpx;
  margin-bottom: 24rpx;
  border-radius: 16rpx;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview {
  width: 100%;
  height: 100%;
}

.upload-text {
  color: #888;
}

.input,
.textarea {
  width: 100%;
  margin-bottom: 22rpx;
  padding: 22rpx;
  border-radius: 12rpx;
  background: #f6f6f6;
  box-sizing: border-box;
  font-size: 28rpx;
}

.input {
  height: 88rpx;
}

.textarea {
  min-height: 220rpx;
}
</style>
