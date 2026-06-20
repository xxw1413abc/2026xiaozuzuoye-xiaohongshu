<template>
  <view class="page">
    <view class="nav">
      <view class="back-icon" @tap="goBack" />
      <view class="tab-title">
        <text class="active">我创建的</text>
        <text>我加入的</text>
      </view>
      <view class="create-link" @tap="openCreate"><view class="plus-chat" />创建</view>
    </view>

    <view class="empty">
      <view class="chat-empty">
        <view class="bubble" />
        <view class="shadow" />
      </view>
      <text>创建你的第一个群聊吧</text>
      <button @tap="openCreate">创建群聊</button>
    </view>
  </view>
</template>

<script setup>
function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/me/me' }) })
}

function openCreate() {
  uni.navigateTo({ url: '/pages/group-create/group-create' })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  max-width: 750rpx;
  margin: 0 auto;
  background: #f8f8f8;
  color: #222;
}

.nav {
  height: 128rpx;
  display: grid;
  grid-template-columns: 86rpx 1fr 130rpx;
  align-items: center;
  padding: 0 30rpx;
  background: #fff;
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

.tab-title {
  display: flex;
  justify-content: center;
  gap: 62rpx;
  color: #999;
  font-size: 32rpx;
  font-weight: 800;
}

.tab-title text {
  position: relative;
}

.tab-title .active {
  color: #222;
}

.tab-title .active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -18rpx;
  width: 132rpx;
  height: 7rpx;
  border-radius: 8rpx;
  background: #ff2442;
  transform: translateX(-50%);
}

.create-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8rpx;
  font-size: 30rpx;
  font-weight: 800;
}

.plus-chat {
  position: relative;
  width: 34rpx;
  height: 30rpx;
  border: 5rpx solid #222;
  border-radius: 50%;
  box-sizing: border-box;
}

.plus-chat::before,
.plus-chat::after {
  content: "";
  position: absolute;
  left: 8rpx;
  top: 10rpx;
  width: 14rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #222;
}

.plus-chat::after {
  transform: rotate(90deg);
}

.empty {
  height: calc(100vh - 128rpx);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 30rpx;
}

.chat-empty {
  position: relative;
  width: 170rpx;
  height: 126rpx;
  margin-bottom: 28rpx;
}

.bubble {
  position: absolute;
  left: 38rpx;
  top: 0;
  width: 96rpx;
  height: 82rpx;
  border: 6rpx solid #d8d8d8;
  border-radius: 50%;
  box-sizing: border-box;
}

.bubble::before,
.bubble::after {
  content: "";
  position: absolute;
  top: 34rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #d8d8d8;
}

.bubble::before {
  left: 30rpx;
}

.bubble::after {
  right: 30rpx;
}

.shadow {
  position: absolute;
  left: 20rpx;
  bottom: 0;
  width: 130rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #d8d8d8;
}

.empty button {
  width: 210rpx;
  height: 72rpx;
  margin-top: 38rpx;
  border: 2rpx solid #e65a70;
  border-radius: 42rpx;
  background: #fff;
  color: #ff2442;
  font-size: 30rpx;
  font-weight: 800;
  line-height: 68rpx;
}
</style>
