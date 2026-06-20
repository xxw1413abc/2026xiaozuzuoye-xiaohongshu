<template>
  <view class="app-root">
    <slot />
  </view>
</template>

<script>
export default {
  onLaunch() {
    uni.removeStorageSync('token')
    console.log('offline demo app launch')
  }
}
</script>

<style>
.app-root {
  min-height: 100vh;
  max-width: 750rpx;
  margin: 0 auto;
  overflow-x: hidden;
}

page {
  min-height: 100%;
  background: #f7f7f7;
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow-x: hidden;
}

.safe-page {
  min-height: 100vh;
  padding: 24rpx;
  box-sizing: border-box;
}

.primary-button {
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  background: #ff2442;
  color: #fff;
  font-size: 30rpx;
}
</style>
