<template>
  <view class="page">
    <view class="nav">
      <view class="back-icon" @tap="goBack" />
      <text class="title">创建群聊</text>
      <text class="done" @tap="finish">完成</text>
    </view>

    <view class="form-card">
      <view class="avatar-box">
        <view class="group-avatar">
          <view />
          <view />
        </view>
        <text>群头像</text>
      </view>

      <view class="form-row">
        <text>群聊名称</text>
        <input v-model="name" placeholder="给群聊起个名字" placeholder-class="placeholder" />
      </view>
      <view class="form-row">
        <text>群介绍</text>
        <input v-model="intro" placeholder="介绍这个群聊" placeholder-class="placeholder" />
      </view>
    </view>

    <view class="invite-card">
      <text class="block-title">邀请好友</text>
      <view v-for="user in users" :key="user.name" class="user-row" @tap="toggle(user)">
        <view class="face" :style="{ background: user.bg }">{{ user.avatar }}</view>
        <view class="user-main">
          <text>{{ user.name }}</text>
          <text>{{ user.desc }}</text>
        </view>
        <view class="check" :class="{ active: user.checked }" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const intro = ref('')
const users = ref([
  { name: '小满', desc: '最近互动', avatar: '满', bg: '#d7a879', checked: true },
  { name: '阿青', desc: '关注的人', avatar: '青', bg: '#7fb0c8', checked: false },
  { name: '南栀', desc: '本地好友', avatar: '南', bg: '#c88a98', checked: false }
])

function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/group/group' }) })
}

function toggle(user) {
  user.checked = !user.checked
}

function finish() {
  uni.showToast({ title: '已创建群聊', icon: 'success' })
  setTimeout(goBack, 650)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  max-width: 750rpx;
  margin: 0 auto;
  background: #f7f7f7;
  color: #222;
}

.nav {
  height: 128rpx;
  display: grid;
  grid-template-columns: 100rpx 1fr 100rpx;
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

.title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 850;
}

.done {
  color: #ff2442;
  text-align: right;
  font-size: 30rpx;
  font-weight: 800;
}

.form-card,
.invite-card {
  margin: 22rpx 24rpx;
  padding: 26rpx;
  border-radius: 18rpx;
  background: #fff;
  box-sizing: border-box;
}

.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
  padding: 24rpx 0 34rpx;
  color: #888;
  font-size: 26rpx;
}

.group-avatar {
  position: relative;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  background: #f1f1f1;
}

.group-avatar view {
  position: absolute;
  width: 44rpx;
  height: 36rpx;
  border: 5rpx solid #999;
  border-radius: 50%;
  box-sizing: border-box;
}

.group-avatar view:first-child {
  left: 22rpx;
  top: 42rpx;
}

.group-avatar view:last-child {
  right: 20rpx;
  top: 30rpx;
  background: #f1f1f1;
}

.form-row {
  min-height: 92rpx;
  display: grid;
  grid-template-columns: 160rpx 1fr;
  align-items: center;
  border-top: 1rpx solid #eee;
  font-size: 30rpx;
}

.form-row input {
  height: 80rpx;
  font-size: 30rpx;
}

.placeholder {
  color: #aaa;
}

.block-title {
  display: block;
  margin-bottom: 16rpx;
  font-size: 32rpx;
  font-weight: 900;
}

.user-row {
  min-height: 104rpx;
  display: flex;
  align-items: center;
  gap: 22rpx;
  border-top: 1rpx solid #f0f0f0;
}

.face {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  color: #fff;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 70rpx;
  text-align: center;
}

.user-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-main text:first-child {
  font-size: 30rpx;
  font-weight: 800;
}

.user-main text:last-child {
  margin-top: 8rpx;
  color: #999;
  font-size: 24rpx;
}

.check {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  border: 2rpx solid #ddd;
  border-radius: 50%;
  box-sizing: border-box;
}

.check.active {
  border-color: #ff2442;
  background: #ff2442;
}

.check.active::after {
  content: "";
  position: absolute;
  left: 11rpx;
  top: 7rpx;
  width: 16rpx;
  height: 24rpx;
  border-right: 5rpx solid #fff;
  border-bottom: 5rpx solid #fff;
  transform: rotate(45deg);
  box-sizing: border-box;
}
</style>
