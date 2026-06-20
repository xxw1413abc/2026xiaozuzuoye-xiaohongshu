<template>
  <view class="page">
    <view class="topbar">
      <view class="back" @tap="goBack" />
      <view class="author-mini">
        <view class="avatar" :style="{ background: note.avatarBg || '#ff2442' }">{{ note.avatar || '我' }}</view>
        <text>{{ note.authorName || '我' }}</text>
      </view>
      <view class="more"><view /><view /><view /></view>
    </view>

    <scroll-view scroll-y class="body">
      <image v-if="note.cover" class="hero-image" :src="note.cover" mode="aspectFill" />
      <view v-else class="hero-poster" :style="{ background: note.bg || '#fff0f2' }">
        <text>{{ note.poster || note.title }}</text>
      </view>

      <view class="content">
        <text class="title">{{ note.title || '未命名笔记' }}</text>
        <text class="text">{{ note.content || '这是一条本地离线笔记。' }}</text>
        <view class="tags">
          <text># 小红书演示</text>
          <text># 本地发布</text>
        </view>
      </view>
    </scroll-view>

    <view class="bottom-actions">
      <view class="comment">说点什么...</view>
      <view class="action-like"><view class="heart-icon" />{{ note.likes || 0 }}</view>
      <view class="star-icon" />
      <view class="share-icon" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const note = ref({})

function goBack() {
  uni.navigateBack({
    fail: () => uni.redirectTo({ url: '/pages/index/index' })
  })
}

onLoad(() => {
  note.value = uni.getStorageSync('current_note') || {}
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.topbar {
  height: 96rpx;
  padding: 0 24rpx;
  display: grid;
  grid-template-columns: 70rpx 1fr 70rpx;
  align-items: center;
  border-bottom: 1rpx solid #f2f2f2;
  background: #fff;
}

.back {
  width: 30rpx;
  height: 30rpx;
  margin-left: 12rpx;
  border-left: 5rpx solid #222;
  border-bottom: 5rpx solid #222;
  transform: rotate(45deg);
}

.author-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  color: #222;
  font-size: 28rpx;
  font-weight: 800;
}

.avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  color: #fff;
  line-height: 44rpx;
  text-align: center;
  font-size: 22rpx;
}

.more {
  display: flex;
  justify-content: flex-end;
  gap: 6rpx;
}

.more view {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #222;
}

.body {
  height: calc(100vh - 190rpx);
}

.hero-image {
  width: 100%;
  height: 760rpx;
  display: block;
  background: #eee;
}

.hero-poster {
  min-height: 680rpx;
  padding: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.hero-poster text {
  color: #222;
  font-size: 56rpx;
  font-weight: 900;
  line-height: 1.4;
  text-align: center;
  white-space: pre-line;
}

.content {
  padding: 30rpx 34rpx 80rpx;
}

.title {
  display: block;
  color: #222;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.4;
}

.text {
  display: block;
  margin-top: 22rpx;
  color: #333;
  font-size: 30rpx;
  line-height: 1.75;
}

.tags {
  margin-top: 30rpx;
  display: flex;
  gap: 18rpx;
  flex-wrap: wrap;
  color: #4169a8;
  font-size: 26rpx;
}

.bottom-actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 94rpx;
  padding: 12rpx 24rpx calc(env(safe-area-inset-bottom) + 12rpx);
  display: grid;
  grid-template-columns: 1fr 90rpx 70rpx 70rpx;
  gap: 10rpx;
  align-items: center;
  border-top: 1rpx solid #f0f0f0;
  background: #fff;
  color: #333;
  font-size: 30rpx;
  box-sizing: content-box;
}

.action-like {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.heart-icon {
  position: relative;
  width: 26rpx;
  height: 24rpx;
  transform: rotate(-45deg);
}

.heart-icon::before,
.heart-icon::after {
  content: "";
  position: absolute;
  width: 15rpx;
  height: 23rpx;
  border: 3rpx solid #333;
  border-bottom: 0;
  border-radius: 15rpx 15rpx 0 0;
  box-sizing: border-box;
}

.heart-icon::before {
  left: 0;
  transform: rotate(45deg);
}

.heart-icon::after {
  right: 0;
  transform: rotate(135deg);
}

.star-icon {
  width: 32rpx;
  height: 32rpx;
  clip-path: polygon(50% 0, 61% 35%, 98% 35%, 68% 56%, 79% 92%, 50% 70%, 21% 92%, 32% 56%, 2% 35%, 39% 35%);
  border: 4rpx solid #333;
  background: transparent;
}

.share-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  border-top: 4rpx solid #333;
  border-right: 4rpx solid #333;
  transform: rotate(45deg);
}

.share-icon::before {
  content: "";
  position: absolute;
  right: -2rpx;
  top: -4rpx;
  width: 24rpx;
  height: 4rpx;
  background: #333;
  transform: rotate(-45deg);
  transform-origin: right center;
}

.comment {
  height: 64rpx;
  padding-left: 28rpx;
  border-radius: 34rpx;
  background: #f5f5f5;
  color: #999;
  line-height: 64rpx;
  font-size: 26rpx;
}
</style>
