<template>
  <view class="page">
    <view class="profile-head">
      <view class="tool-row">
        <view class="menu-icon" @tap="openDrawer"><view /><view /><view /></view>
      </view>

      <view class="user-block">
        <view class="big-avatar">
          <view class="camera-icon" />
          <text class="avatar-text">上传头像</text>
        </view>
        <view class="user-info">
          <view class="name-row">
            <text class="name">{{ displayName }}</text>
            <view class="pen-icon" />
          </view>
          <text class="xhs-id">小红书号：{{ studentId }}</text>
        </view>
      </view>

      <view class="stats">
        <text><text class="num">0</text> 关注</text>
        <text><text class="num">0</text> 粉丝</text>
        <text><text class="num">{{ localNotes.length }}</text> 笔记</text>
      </view>

      <text class="bio">点击这里，填写简介</text>

      <view class="entry-row">
        <view class="entry" @tap.stop="openHistory">
          <view class="entry-title"><view class="history-icon" />浏览记录</view>
          <text class="entry-desc">看过的笔记</text>
        </view>
        <view class="entry" @tap.stop="openGroup">
          <view class="entry-title"><view class="group-icon" />群聊</view>
          <text class="entry-desc">加入的群聊</text>
        </view>
        <view class="entry" @tap.stop="openWallet">
          <view class="entry-title"><view class="wallet-icon" />钱包</view>
          <text class="entry-desc">查看详情</text>
        </view>
      </view>
    </view>

    <view class="content-panel">
      <view class="tabs">
        <text class="tab active">笔记</text>
        <text class="tab">收藏</text>
        <view class="tab lock">赞过</view>
        <view class="tab-search" />
      </view>

      <view v-if="localNotes.length" class="my-grid">
        <view v-for="item in localNotes" :key="item.id" class="my-card" @tap="openNote(item)">
          <image v-if="item.cover" class="my-cover" :src="item.cover" mode="aspectFill" />
          <view v-else class="my-cover poster" :style="{ background: item.bg }">
            <text>{{ item.poster || item.title }}</text>
          </view>
          <view class="my-body">
            <text class="my-title">{{ item.title }}</text>
            <text class="my-meta">本地发布</text>
          </view>
        </view>
      </view>

      <view v-else class="empty">
        <view class="empty-icon"><view /><view /></view>
        <text class="empty-text">用音乐图集清日常碎片库存</text>
        <button class="publish-btn" @tap="goPublish">去发布</button>
      </view>
    </view>

    <view v-if="drawerOpen" class="drawer-layer">
      <view class="drawer-panel" @tap.stop>
        <view class="drawer-spacer" />
        <view class="drawer-card single">
          <view class="drawer-item" @tap="openDrawerPage('addFriend')"><view class="side-icon add-friend-icon" /><text>添加好友</text><view class="drawer-arrow" /></view>
        </view>
        <view class="drawer-card">
          <view class="drawer-item" @tap="openDrawerPage('creator')"><view class="side-icon creator-icon" /><text>创作者中心</text><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openDrawerPage('pro')"><view class="side-icon pro-icon"><text>PRO</text></view><text>升级为专业号</text><view class="drawer-arrow" /></view>
        </view>
        <view class="drawer-card">
          <view class="drawer-item" @tap="openDrawerPage('draft')"><view class="side-icon draft-icon" /><text>我的草稿</text><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openDrawerPage('activity')"><view class="side-icon activity-side-icon" /><text>我的活动</text><text class="new-badge">新</text><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openHistoryFromDrawer"><view class="side-icon history-side-icon" /><text>浏览记录</text><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openDrawerPage('download')"><view class="side-icon download-icon" /><text>我的下载</text><view class="drawer-arrow" /></view>
        </view>
        <view class="drawer-card">
          <view class="drawer-item" @tap="openDrawerPage('orders')"><view class="side-icon order-icon" /><text>订单</text><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openDrawerPage('cart')"><view class="side-icon cart-side-icon" /><text>购物车</text><text class="dot-badge" /><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openWalletFromDrawer"><view class="side-icon wallet-side-icon" /><text>钱包</text><view class="drawer-arrow" /></view>
        </view>
        <view class="drawer-card">
          <view class="drawer-item" @tap="openDrawerPage('mini')"><view class="side-icon mini-icon" /><text>小程序</text><view class="drawer-arrow" /></view>
          <view class="drawer-item" @tap="openDrawerPage('moment')"><view class="side-icon moment-icon" /><text>瞬间</text><view class="drawer-arrow" /></view>
        </view>
        <view class="drawer-bottom">
          <view class="drawer-tool" @tap="startScan"><view class="tool-circle"><view class="scan-side-icon" /></view><text>扫一扫</text></view>
          <view class="drawer-tool" @tap="openDrawerPage('help')"><view class="tool-circle"><view class="service-icon" /></view><text>帮助与客服</text></view>
          <view class="drawer-tool" @tap="openDrawerPage('settings')"><view class="tool-circle"><view class="setting-icon" /></view><text>设置</text></view>
        </view>
      </view>
      <view class="drawer-mask" @tap="closeDrawer" />
    </view>

    <BottomNav active="me" />
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import BottomNav from '../../components/BottomNav/BottomNav.vue'

const localNotes = ref([])
const drawerOpen = ref(false)

const displayName = computed(() => {
  return uni.getStorageSync('user_name') || '小红薯 669E54D0'
})

const studentId = computed(() => {
  return uni.getStorageSync('user_student_id') || '94787774830'
})

function loadLocalNotes() {
  localNotes.value = uni.getStorageSync('offline_notes') || []
}

function checkLogin() {
  const token = uni.getStorageSync('token')
  if (!token) {
    uni.navigateTo({ url: '/pages/login/login?redirect=/pages/me/me' })
    return
  }
  loadLocalNotes()
}

function goPublish() {
  uni.redirectTo({ url: '/pages/note/note' })
}

function openWallet() {
  navigateToPage('/pages/wallet/wallet')
}

function openWalletFromDrawer() {
  drawerOpen.value = false
  openWallet()
}

function openHistoryFromDrawer() {
  drawerOpen.value = false
  openHistory()
}

function openHistory() {
  navigateToPage('/pages/history/history')
}

function openGroup() {
  navigateToPage('/pages/group/group')
}

function navigateToPage(url) {
  uni.navigateTo({
    url,
    fail: () => {
      uni.redirectTo({
        url,
        fail: () => uni.showToast({ title: '请重新运行项目', icon: 'none' })
      })
    }
  })
}

function openDrawer() {
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

function openDrawerPage(type) {
  drawerOpen.value = false
  uni.navigateTo({ url: `/pages/side/side?type=${type}` })
}

function startScan() {
  drawerOpen.value = false
  uni.scanCode({
    onlyFromCamera: false,
    scanType: ['qrCode', 'barCode'],
    success: (res) => {
      uni.showModal({
        title: '扫码结果',
        content: res.result || '已识别',
        showCancel: false
      })
    },
    fail: () => {
      uni.showToast({ title: '扫码已取消', icon: 'none' })
    }
  })
}

function openNote(item) {
  uni.setStorageSync('current_note', item)
  uni.navigateTo({ url: '/pages/detail/detail' })
}

onShow(checkLogin)

onLoad((query) => {
  if (query.drawer === '1') {
    drawerOpen.value = true
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding-bottom: 150rpx;
  background: #f7f7f7;
}

.profile-head {
  min-height: 640rpx;
  padding: 0 30rpx 30rpx;
  color: #fff;
  background: linear-gradient(180deg, #29454b 0%, #66736d 100%);
  box-sizing: border-box;
}

.tool-row {
  height: 118rpx;
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.menu-icon view {
  height: 4rpx;
  border-radius: 4rpx;
  background: rgba(255, 255, 255, 0.86);
}

.pen-icon {
  position: relative;
  width: 24rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #fff;
  transform: rotate(-45deg);
}

.pen-icon::after {
  content: "";
  position: absolute;
  right: -7rpx;
  top: -4rpx;
  border-left: 9rpx solid #fff;
  border-top: 6rpx solid transparent;
  border-bottom: 6rpx solid transparent;
}

.user-block {
  margin-top: 22rpx;
  display: flex;
  align-items: center;
  gap: 36rpx;
}

.big-avatar {
  width: 150rpx;
  height: 150rpx;
  border: 3rpx solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.camera-icon {
  position: relative;
  width: 62rpx;
  height: 44rpx;
  border: 5rpx solid #dce4e4;
  border-radius: 10rpx;
  box-sizing: border-box;
}

.camera-icon::before {
  content: "";
  position: absolute;
  left: 18rpx;
  top: -14rpx;
  width: 22rpx;
  height: 10rpx;
  border-radius: 7rpx 7rpx 0 0;
  background: #dce4e4;
}

.camera-icon::after {
  content: "";
  position: absolute;
  left: 18rpx;
  top: 10rpx;
  width: 16rpx;
  height: 16rpx;
  border: 4rpx solid #dce4e4;
  border-radius: 50%;
  box-sizing: border-box;
}

.avatar-text {
  margin-top: 8rpx;
  font-size: 24rpx;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.name {
  font-size: 42rpx;
  font-weight: 850;
}

.xhs-id {
  display: block;
  margin-top: 14rpx;
  color: rgba(255, 255, 255, 0.62);
  font-size: 26rpx;
}

.stats {
  margin-top: 46rpx;
  display: flex;
  gap: 28rpx;
  color: rgba(255, 255, 255, 0.82);
  font-size: 30rpx;
}

.num {
  color: #fff;
  font-weight: 900;
}

.bio {
  display: block;
  margin-top: 28rpx;
  color: rgba(255, 255, 255, 0.75);
  font-size: 30rpx;
}

.entry-row {
  position: relative;
  z-index: 3;
  margin-top: 28rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.entry {
  height: 104rpx;
  padding: 18rpx 20rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.14);
  box-sizing: border-box;
}

.entry-title {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  font-weight: 800;
}

.entry-desc {
  display: block;
  margin-top: 10rpx;
  color: rgba(255, 255, 255, 0.58);
  font-size: 22rpx;
}

.history-icon {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  border: 4rpx solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
}

.history-icon::before {
  content: "";
  position: absolute;
  left: 12rpx;
  top: 5rpx;
  width: 4rpx;
  height: 12rpx;
  border-radius: 4rpx;
  background: #fff;
}

.history-icon::after {
  content: "";
  position: absolute;
  left: 12rpx;
  top: 16rpx;
  width: 12rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #fff;
  transform: rotate(28deg);
  transform-origin: left center;
}

.group-icon {
  position: relative;
  width: 34rpx;
  height: 28rpx;
}

.group-icon::before,
.group-icon::after {
  content: "";
  position: absolute;
  border: 4rpx solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  background: transparent;
}

.group-icon::before {
  left: 0;
  top: 6rpx;
  width: 25rpx;
  height: 18rpx;
}

.group-icon::after {
  right: 0;
  top: 0;
  width: 25rpx;
  height: 18rpx;
  background: rgba(255, 255, 255, 0.08);
}

.wallet-icon {
  width: 28rpx;
  height: 22rpx;
  border: 4rpx solid #fff;
  border-radius: 6rpx;
  box-sizing: border-box;
  position: relative;
}

.wallet-icon::after {
  content: "";
  position: absolute;
  right: -3rpx;
  top: 5rpx;
  width: 9rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background: #fff;
}

.content-panel {
  position: relative;
  z-index: 1;
  margin-top: -30rpx;
  min-height: 760rpx;
  overflow: hidden;
  border-radius: 28rpx 28rpx 0 0;
  background: #fff;
}

.tabs {
  height: 94rpx;
  padding: 0 38rpx;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 70rpx;
  align-items: center;
  border-bottom: 1rpx solid #f1f1f1;
}

.tab {
  position: relative;
  color: #999;
  font-size: 32rpx;
  font-weight: 800;
}

.tab.active {
  color: #222;
}

.tab.active::after {
  content: "";
  position: absolute;
  left: 8rpx;
  bottom: -26rpx;
  width: 58rpx;
  height: 7rpx;
  border-radius: 8rpx;
  background: #ff2442;
}

.lock {
  color: #aaa;
  display: flex;
  align-items: center;
}

.tab-search {
  justify-self: end;
  position: relative;
  width: 42rpx;
  height: 42rpx;
  border: 5rpx solid #999;
  border-radius: 50%;
  box-sizing: border-box;
}

.tab-search::after {
  content: "";
  position: absolute;
  right: -10rpx;
  bottom: -6rpx;
  width: 18rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #999;
  transform: rotate(45deg);
}

.my-grid {
  padding: 18rpx 14rpx 170rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14rpx;
  background: #f7f7f7;
}

.my-card {
  overflow: hidden;
  border-radius: 12rpx;
  background: #fff;
}

.my-cover {
  width: 100%;
  height: 360rpx;
  display: block;
  background: #eee;
}

.poster {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx;
  box-sizing: border-box;
}

.poster text {
  color: #222;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.35;
  text-align: center;
}

.my-body {
  padding: 16rpx;
}

.my-title {
  display: block;
  color: #222;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1.4;
}

.my-meta {
  display: block;
  margin-top: 10rpx;
  color: #999;
  font-size: 22rpx;
}

.empty {
  height: 600rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  position: relative;
  width: 118rpx;
  height: 94rpx;
}

.empty-icon view {
  position: absolute;
  width: 72rpx;
  height: 88rpx;
  border: 6rpx solid #ddd;
  border-radius: 14rpx;
  box-sizing: border-box;
}

.empty-icon view:first-child {
  left: 10rpx;
  top: 0;
  transform: rotate(-8deg);
}

.empty-icon view:last-child {
  right: 8rpx;
  top: 18rpx;
  transform: rotate(12deg);
}

.empty-text {
  margin-top: 28rpx;
  color: #333;
  font-size: 30rpx;
}

.publish-btn {
  width: 170rpx;
  height: 70rpx;
  margin-top: 34rpx;
  border: 1rpx solid #d0d0d0;
  border-radius: 40rpx;
  background: #fff;
  color: #333;
  font-size: 28rpx;
  line-height: 68rpx;
}

.drawer-layer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
}

.drawer-panel {
  width: 574rpx;
  height: 100vh;
  overflow-y: auto;
  padding: 0 30rpx 34rpx;
  background: #fff;
  box-sizing: border-box;
  animation: drawer-in 0.18s ease-out;
}

.drawer-mask {
  flex: 1;
  height: 100vh;
  background: rgba(10, 18, 24, 0.74);
}

.drawer-spacer {
  height: 116rpx;
}

.drawer-card {
  margin-bottom: 22rpx;
  padding: 18rpx 0;
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.035);
}

.drawer-card.single {
  padding: 10rpx 0;
}

.drawer-item {
  position: relative;
  min-height: 88rpx;
  display: flex;
  align-items: center;
  padding: 0 34rpx;
  color: #202020;
  font-size: 32rpx;
  font-weight: 700;
  box-sizing: border-box;
}

.drawer-arrow {
  width: 18rpx;
  height: 18rpx;
  margin-left: auto;
  border-top: 4rpx solid #d0d0d0;
  border-right: 4rpx solid #d0d0d0;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.side-icon {
  position: relative;
  width: 50rpx;
  height: 50rpx;
  margin-right: 34rpx;
  flex: 0 0 50rpx;
  box-sizing: border-box;
}

.add-friend-icon {
  background:
    linear-gradient(#333, #333) 42rpx 31rpx / 22rpx 5rpx no-repeat,
    linear-gradient(#333, #333) 51rpx 22rpx / 5rpx 22rpx no-repeat;
}

.add-friend-icon::before {
  content: "";
  position: absolute;
  left: 11rpx;
  top: 4rpx;
  width: 22rpx;
  height: 22rpx;
  border: 5rpx solid #333;
  border-radius: 50%;
  box-sizing: border-box;
}

.add-friend-icon::after {
  content: "";
  position: absolute;
  left: 4rpx;
  bottom: 6rpx;
  width: 34rpx;
  height: 20rpx;
  border: 5rpx solid #333;
  border-top-left-radius: 26rpx;
  border-top-right-radius: 26rpx;
  border-bottom: 0;
  box-sizing: border-box;
}

.creator-icon,
.activity-side-icon,
.history-side-icon,
.mini-icon,
.moment-icon {
  border: 5rpx solid #333;
  border-radius: 50%;
}

.creator-icon::before {
  content: "";
  position: absolute;
  left: 18rpx;
  top: 9rpx;
  width: 12rpx;
  height: 27rpx;
  border-radius: 10rpx;
  background: #333;
  transform: rotate(25deg);
}

.creator-icon::after {
  content: "";
  position: absolute;
  right: 7rpx;
  bottom: -9rpx;
  width: 28rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
}

.pro-icon {
  border: 5rpx solid #333;
  border-radius: 18rpx;
}

.pro-icon text {
  display: block;
  color: #333;
  font-size: 17rpx;
  font-weight: 900;
  line-height: 44rpx;
  text-align: center;
}

.draft-icon {
  border: 5rpx solid #333;
  border-radius: 8rpx 8rpx 14rpx 14rpx;
}

.draft-icon::before {
  content: "";
  position: absolute;
  left: 8rpx;
  top: 10rpx;
  width: 28rpx;
  height: 10rpx;
  border: 5rpx solid #333;
  border-top: 0;
  border-radius: 0 0 12rpx 12rpx;
  box-sizing: border-box;
}

.activity-side-icon::before,
.activity-side-icon::after {
  content: "";
  position: absolute;
  left: 17rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #333;
}

.activity-side-icon::before {
  top: -9rpx;
}

.activity-side-icon::after {
  bottom: -13rpx;
}

.history-side-icon::before {
  content: "";
  position: absolute;
  left: 22rpx;
  top: 9rpx;
  width: 5rpx;
  height: 18rpx;
  border-radius: 5rpx;
  background: #333;
}

.history-side-icon::after {
  content: "";
  position: absolute;
  left: 22rpx;
  top: 25rpx;
  width: 16rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
  transform: rotate(35deg);
  transform-origin: left center;
}

.download-icon {
  border-bottom: 5rpx solid #333;
  border-left: 5rpx solid #333;
  border-right: 5rpx solid #333;
  border-radius: 0 0 16rpx 16rpx;
}

.download-icon::before {
  content: "";
  position: absolute;
  left: 23rpx;
  top: 0;
  width: 5rpx;
  height: 34rpx;
  border-radius: 5rpx;
  background: #333;
}

.download-icon::after {
  content: "";
  position: absolute;
  left: 14rpx;
  top: 23rpx;
  width: 20rpx;
  height: 20rpx;
  border-right: 5rpx solid #333;
  border-bottom: 5rpx solid #333;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.order-icon,
.wallet-side-icon {
  border: 5rpx solid #333;
  border-radius: 8rpx;
}

.order-icon::before {
  content: "";
  position: absolute;
  left: 11rpx;
  right: 11rpx;
  top: 12rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
  box-shadow: 0 14rpx 0 #333;
}

.cart-side-icon {
  border-bottom: 5rpx solid #333;
  border-left: 5rpx solid #333;
  border-radius: 0 0 11rpx 11rpx;
  transform: skewX(-8deg);
}

.cart-side-icon::before {
  content: "";
  position: absolute;
  left: -6rpx;
  top: 8rpx;
  width: 46rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
}

.cart-side-icon::after {
  content: "";
  position: absolute;
  left: 4rpx;
  bottom: -15rpx;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background: #333;
  box-shadow: 33rpx 0 0 #333;
}

.wallet-side-icon::after {
  content: "";
  position: absolute;
  right: -5rpx;
  top: 15rpx;
  width: 22rpx;
  height: 22rpx;
  border: 5rpx solid #333;
  border-radius: 8rpx 0 0 8rpx;
  background: #fff;
  box-sizing: border-box;
}

.mini-icon::before {
  content: "";
  position: absolute;
  left: 13rpx;
  top: 20rpx;
  width: 22rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
  transform: rotate(-35deg);
}

.mini-icon::after,
.moment-icon::after {
  content: "";
  position: absolute;
  right: 5rpx;
  top: 9rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #333;
}

.moment-icon::before {
  content: "";
  position: absolute;
  left: 16rpx;
  top: 16rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #333;
}

.new-badge {
  margin-left: auto;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: #ff2442;
  color: #fff;
  font-size: 24rpx;
  line-height: 44rpx;
  text-align: center;
}

.dot-badge {
  margin-left: auto;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #ff2442;
}

.drawer-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  padding: 6rpx 10rpx 0;
}

.drawer-tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  color: #8a8a8a;
  font-size: 26rpx;
}

.tool-circle {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f5f5;
}

.scan-side-icon,
.service-icon,
.setting-icon {
  position: relative;
  width: 48rpx;
  height: 48rpx;
}

.scan-side-icon {
  border: 5rpx solid #555;
  border-left-color: transparent;
  border-right-color: transparent;
  border-radius: 10rpx;
}

.scan-side-icon::before,
.scan-side-icon::after {
  content: "";
  position: absolute;
  left: 8rpx;
  right: 8rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #555;
}

.scan-side-icon::before {
  top: 9rpx;
}

.scan-side-icon::after {
  bottom: 9rpx;
}

.service-icon {
  height: 42rpx;
  border: 5rpx solid #555;
  border-radius: 24rpx 24rpx 12rpx 12rpx;
  box-sizing: border-box;
}

.service-icon::before,
.service-icon::after {
  content: "";
  position: absolute;
  top: 12rpx;
  width: 8rpx;
  height: 16rpx;
  border-radius: 8rpx;
  background: #555;
}

.service-icon::before {
  left: -11rpx;
}

.service-icon::after {
  right: -11rpx;
}

.setting-icon {
  border: 5rpx solid #555;
  border-radius: 50%;
  box-sizing: border-box;
}

.setting-icon::before {
  content: "";
  position: absolute;
  left: 13rpx;
  top: 13rpx;
  width: 10rpx;
  height: 10rpx;
  border: 5rpx solid #555;
  border-radius: 50%;
  background: #f5f5f5;
  box-sizing: border-box;
}

.setting-icon::after {
  content: "";
  position: absolute;
  left: -8rpx;
  top: 16rpx;
  width: 52rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #555;
  box-shadow: 0 -14rpx 0 #555, 0 14rpx 0 #555;
}

@keyframes drawer-in {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
