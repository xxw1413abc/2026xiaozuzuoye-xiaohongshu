<template>
  <view class="bottom-nav">
    <view class="nav-item" :class="{ active: active === 'home' }" @tap="go('/pages/index/index')">首页</view>
    <view class="nav-item" :class="{ active: active === 'market' }" @tap="go('/pages/market/market')">市集</view>
    <view class="publish" @tap="go('/pages/note/note')">
      <view class="plus-icon" />
    </view>
    <view class="nav-item" :class="{ active: active === 'message' }" @tap="go('/pages/message/message')">消息</view>
    <view class="nav-item" :class="{ active: active === 'me' }" @tap="go('/pages/me/me')">我</view>
  </view>
</template>

<script setup>
defineProps({
  active: {
    type: String,
    default: 'home'
  }
})

function go(url) {
  uni.redirectTo({ url })
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 50%;
  right: auto;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  max-width: 750rpx;
  height: calc(122rpx + env(safe-area-inset-bottom));
  padding: 10rpx 28rpx calc(env(safe-area-inset-bottom) + 10rpx);
  display: grid;
  grid-template-columns: 1fr 1fr 104rpx 1fr 1fr;
  align-items: center;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1rpx solid #f0f0f0;
  box-sizing: border-box;
  pointer-events: auto;
  transform: translateX(-50%);
}

.nav-item {
  height: 104rpx;
  line-height: 104rpx;
  text-align: center;
  color: #8d8d8d;
  font-size: 32rpx;
  font-weight: 600;
  pointer-events: auto;
}

.nav-item.active {
  color: #222;
  font-weight: 800;
}

.publish {
  width: 88rpx;
  height: 72rpx;
  margin: 0 auto;
  border-radius: 22rpx;
  background: #ff2442;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 22rpx rgba(255, 36, 66, 0.22);
  pointer-events: auto;
}

.plus-icon {
  position: relative;
  width: 42rpx;
  height: 42rpx;
}

.plus-icon::before,
.plus-icon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 6rpx;
  background: #fff;
  transform: translate(-50%, -50%);
}

.plus-icon::before {
  width: 42rpx;
  height: 8rpx;
}

.plus-icon::after {
  width: 8rpx;
  height: 42rpx;
}
</style>
