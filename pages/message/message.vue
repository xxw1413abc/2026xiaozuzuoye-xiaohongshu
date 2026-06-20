<template>
  <view class="page">
    <view class="title-row">
      <view />
      <text class="page-title">消息</text>
      <view class="actions">
        <view class="search-icon" />
        <view class="circle-plus" />
      </view>
    </view>

    <view class="quick-row">
      <view class="quick-item" @tap="openMessageBox('likes')">
        <view class="quick-icon heart"><view class="heart-shape" /></view>
        <text>赞和收藏</text>
      </view>
      <view class="quick-item" @tap="openMessageBox('follows')">
        <view class="quick-icon follow"><view class="person-shape" /></view>
        <text>新增关注</text>
      </view>
      <view class="quick-item" @tap="openMessageBox('comments')">
        <view class="quick-icon comment"><view class="chat-shape" /></view>
        <text>评论和 @</text>
      </view>
    </view>

    <view class="activity">
      <view class="activity-icon"><view class="message-shape" /></view>
      <view class="activity-main">
        <text class="activity-title">活动消息</text>
        <text class="activity-desc">欢迎登录！一起来探索最近的火爆内容</text>
      </view>
      <view class="activity-side">
        <text>星期日</text>
        <view class="red-dot" />
      </view>
    </view>

    <view class="recommend-head">
      <text>你可能感兴趣的人</text>
      <text>关闭</text>
    </view>
    <view class="user-list">
      <view v-for="user in users" :key="user.name" class="user-row">
        <view class="avatar" :style="{ background: user.bg }">{{ user.avatar }}</view>
        <view class="user-main">
          <view class="name-line">
            <text class="user-name">{{ user.name }}</text>
            <view v-if="user.verified" class="verify-icon" />
          </view>
          <text class="user-desc">{{ user.desc }}</text>
        </view>
        <button class="follow-btn" :class="{ followed: user.followed }" @tap.stop="toggleFollow(user)">
          {{ user.followed ? '已关注' : '关注' }}
        </button>
        <view class="close-icon" />
      </view>
    </view>

    <BottomNav active="message" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from '../../components/BottomNav/BottomNav.vue'
import { mockUsers } from '../../common/mock.js'

const users = ref(mockUsers.map((user) => ({ ...user, followed: false })))

function toggleFollow(user) {
  user.followed = !user.followed
}

function openMessageBox(type) {
  uni.navigateTo({ url: `/pages/message-detail/message-detail?type=${type}` })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding-bottom: 150rpx;
  background: #fff;
}

.title-row {
  height: 118rpx;
  padding: 0 34rpx;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.page-title {
  font-size: 34rpx;
  font-weight: 800;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 34rpx;
}

.search-icon {
  position: relative;
  width: 44rpx;
  height: 44rpx;
  border: 5rpx solid #222;
  border-radius: 50%;
  box-sizing: border-box;
}

.search-icon::after {
  content: "";
  position: absolute;
  right: -10rpx;
  bottom: -6rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #222;
  transform: rotate(45deg);
}

.circle-plus {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  border: 5rpx solid #222;
  border-radius: 50%;
  box-sizing: border-box;
}

.circle-plus::before,
.circle-plus::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 4rpx;
  background: #222;
  transform: translate(-50%, -50%);
}

.circle-plus::before {
  width: 24rpx;
  height: 5rpx;
}

.circle-plus::after {
  width: 5rpx;
  height: 24rpx;
}

.quick-row {
  padding: 42rpx 56rpx 54rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34rpx;
}

.quick-item {
  text-align: center;
  color: #333;
  font-size: 30rpx;
  font-weight: 800;
}

.quick-icon {
  width: 116rpx;
  height: 116rpx;
  margin: 0 auto 24rpx;
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart { background: #ffecec; }
.follow { background: #edf4ff; }
.comment { background: #eafff6; }

.heart-shape {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  background: #ff5a5f;
  transform: rotate(-45deg);
}

.heart-shape::before,
.heart-shape::after {
  content: "";
  position: absolute;
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  background: #ff5a5f;
}

.heart-shape::before {
  left: 0;
  top: -21rpx;
}

.heart-shape::after {
  right: -21rpx;
  top: 0;
}

.person-shape {
  position: relative;
  width: 48rpx;
  height: 54rpx;
}

.person-shape::before {
  content: "";
  position: absolute;
  left: 13rpx;
  top: 0;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #3c8dff;
}

.person-shape::after {
  content: "";
  position: absolute;
  left: 3rpx;
  bottom: 0;
  width: 46rpx;
  height: 30rpx;
  border-radius: 26rpx 26rpx 10rpx 10rpx;
  background: #3c8dff;
}

.chat-shape {
  position: relative;
  width: 52rpx;
  height: 42rpx;
  border-radius: 24rpx 24rpx 24rpx 8rpx;
  background: #35d99c;
}

.chat-shape::before {
  content: "";
  position: absolute;
  left: 14rpx;
  top: 17rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 16rpx 0 0 #fff;
}

.activity {
  padding: 28rpx 38rpx;
  display: flex;
  align-items: center;
  gap: 28rpx;
}

.activity-icon {
  width: 104rpx;
  height: 104rpx;
  border-radius: 52rpx;
  background: #438cff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-shape {
  position: relative;
  width: 54rpx;
  height: 42rpx;
  border-radius: 12rpx;
  background: #fff;
}

.message-shape::before {
  content: "";
  position: absolute;
  left: 12rpx;
  top: 13rpx;
  width: 30rpx;
  height: 5rpx;
  background: #438cff;
  box-shadow: 0 12rpx 0 #438cff;
}

.message-shape::after {
  content: "";
  position: absolute;
  left: 14rpx;
  bottom: -8rpx;
  border-top: 10rpx solid #fff;
  border-right: 12rpx solid transparent;
}

.activity-main {
  flex: 1;
  min-width: 0;
}

.activity-title {
  display: block;
  color: #333;
  font-size: 34rpx;
  font-weight: 800;
}

.activity-desc {
  display: block;
  margin-top: 8rpx;
  color: #999;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activity-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 28rpx;
  color: #999;
  font-size: 24rpx;
}

.red-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #ff2442;
}

.recommend-head {
  padding: 40rpx 38rpx 24rpx;
  display: flex;
  justify-content: space-between;
  color: #8d8d8d;
  font-size: 28rpx;
}

.user-row {
  padding: 20rpx 38rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar {
  width: 86rpx;
  height: 86rpx;
  border-radius: 50%;
  color: #fff;
  font-size: 30rpx;
  line-height: 86rpx;
  text-align: center;
  font-weight: 800;
}

.user-main {
  flex: 1;
  min-width: 0;
}

.name-line {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.user-name {
  color: #333;
  font-size: 32rpx;
  font-weight: 800;
}

.verify-icon {
  position: relative;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #438cff;
}

.verify-icon::after {
  content: "";
  position: absolute;
  left: 6rpx;
  top: 6rpx;
  width: 10rpx;
  height: 6rpx;
  border-left: 3rpx solid #fff;
  border-bottom: 3rpx solid #fff;
  transform: rotate(-45deg);
}

.user-desc {
  display: block;
  margin-top: 8rpx;
  color: #999;
  font-size: 26rpx;
}

.follow-btn {
  width: 150rpx;
  height: 64rpx;
  line-height: 60rpx;
  border: 2rpx solid #ff2442;
  border-radius: 34rpx;
  background: #fff;
  color: #ff2442;
  font-size: 28rpx;
  font-weight: 800;
}

.follow-btn.followed {
  border-color: #ddd;
  background: #f5f5f5;
  color: #888;
}

.close-icon {
  position: relative;
  width: 34rpx;
  height: 34rpx;
}

.close-icon::before,
.close-icon::after {
  content: "";
  position: absolute;
  left: 3rpx;
  top: 15rpx;
  width: 28rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #999;
}

.close-icon::before { transform: rotate(45deg); }
.close-icon::after { transform: rotate(-45deg); }
</style>
