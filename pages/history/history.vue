<template>
  <view class="page">
    <view class="nav">
      <view class="back-icon" @tap="goBack" />
      <text class="title">浏览记录</text>
      <view class="manage"><view class="list-icon" />管理</view>
    </view>

    <view class="tabs">
      <text class="active">笔记</text>
      <text>直播</text>
    </view>

    <text class="today">今天</text>

    <view class="empty">
      <view class="doc-icon">
        <view class="paper" />
        <view class="image-dot" />
        <view class="image-mountain" />
      </view>
      <text>没有任何浏览记录</text>
    </view>
  </view>
</template>

<script setup>
function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/me/me' }) })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  max-width: 750rpx;
  margin: 0 auto;
  background: #fff;
  color: #222;
}

.nav {
  height: 128rpx;
  display: grid;
  grid-template-columns: 100rpx 1fr 150rpx;
  align-items: center;
  padding: 0 28rpx;
  box-sizing: border-box;
}

.back-icon {
  position: relative;
  width: 54rpx;
  height: 54rpx;
}

.back-icon::before {
  content: "";
  position: absolute;
  left: 18rpx;
  top: 12rpx;
  width: 28rpx;
  height: 28rpx;
  border-left: 6rpx solid #222;
  border-bottom: 6rpx solid #222;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 850;
}

.manage {
  height: 62rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  border: 2rpx solid #555;
  border-radius: 36rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.list-icon {
  width: 24rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #333;
  box-shadow: 0 -10rpx 0 #333, 0 10rpx 0 #333;
}

.tabs {
  height: 78rpx;
  display: flex;
  justify-content: center;
  gap: 220rpx;
  color: #888;
  font-size: 34rpx;
  font-weight: 800;
}

.tabs text {
  position: relative;
}

.tabs .active {
  color: #222;
}

.tabs .active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -10rpx;
  width: 70rpx;
  height: 7rpx;
  border-radius: 8rpx;
  background: #ff2442;
  transform: translateX(-50%);
}

.today {
  display: block;
  margin: 34rpx 0 0 36rpx;
  font-size: 38rpx;
  font-weight: 900;
}

.empty {
  height: 640rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 28rpx;
}

.doc-icon {
  position: relative;
  width: 130rpx;
  height: 118rpx;
  margin-bottom: 30rpx;
}

.paper {
  position: absolute;
  left: 28rpx;
  top: 0;
  width: 76rpx;
  height: 96rpx;
  border: 6rpx solid #ddd;
  border-radius: 10rpx;
  box-sizing: border-box;
}

.paper::before {
  content: "";
  position: absolute;
  right: -6rpx;
  top: -6rpx;
  width: 26rpx;
  height: 26rpx;
  border-left: 6rpx solid #ddd;
  border-bottom: 6rpx solid #ddd;
  background: #fff;
  box-sizing: border-box;
}

.paper::after {
  content: "";
  position: absolute;
  left: -20rpx;
  bottom: -18rpx;
  width: 124rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #ddd;
}

.image-dot {
  position: absolute;
  left: 55rpx;
  top: 34rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ddd;
}

.image-mountain {
  position: absolute;
  left: 48rpx;
  top: 55rpx;
  width: 48rpx;
  height: 22rpx;
  background: #ddd;
  clip-path: polygon(0 100%, 34% 30%, 55% 68%, 75% 44%, 100% 100%);
}
</style>
