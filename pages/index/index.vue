<template>
  <view class="page">
    <view class="top-safe">
      <view class="channel-row">
        <view class="menu-icon" @tap="openHomeMenu"><view /><view /><view /></view>
        <text
          v-for="item in channels"
          :key="item.key"
          class="channel"
          :class="{ active: activeChannel === item.key }"
          @tap="switchChannel(item.key)"
        >
          {{ item.name }}
        </text>
        <view class="search-icon" @tap="openSearch" />
      </view>

      <view v-if="activeChannel === 'sanya'" class="sanya-tabs">
        <view class="area-trigger" @tap="toggleArea">全城 <view class="area-arrow" :class="{ up: areaOpen }" /></view>
        <text class="sub active">推荐</text>
        <text class="sub">美食</text>
        <text class="sub">热门打卡地</text>
        <text class="sub">周末出行</text>
        <text class="sub">购物</text>
      </view>
    </view>

    <view class="feed-scroll" :class="{ sanya: activeChannel === 'sanya' }">
      <view v-if="activeChannel === 'worldcup'" class="worldcup-page">
        <image class="worldcup-img" :src="worldcupImage" mode="widthFix" @error="useFallbackWorldcup" />
      </view>

      <view v-else-if="activeChannel === 'follow'" class="masonry">
        <view v-for="item in followNotes" :key="item.id" class="note-card" @tap="openNote(item)">
          <view class="photo-cover" :class="item.cls">
            <text v-if="item.badge" class="video-badge" />
            <text v-if="item.overlay" class="cover-overlay">{{ item.overlay }}</text>
          </view>
          <view class="note-body">
            <text class="note-title">{{ item.title }}</text>
            <view class="author-row">
              <view class="avatar" :style="{ background: item.avatarBg }">{{ item.avatar }}</view>
              <view class="author-block">
                <text class="author">{{ item.authorName }}</text>
                <text class="date">{{ item.date }}</text>
              </view>
              <view class="like"><view class="heart-icon" />{{ item.likes }}</view>
            </view>
          </view>
        </view>
      </view>

      <view v-else-if="activeChannel === 'sanya'" class="masonry sanya-list">
        <view v-for="item in sanyaNotes" :key="item.id" class="note-card" @tap="openNote(item)">
          <view class="photo-cover" :class="item.cls">
            <text v-if="item.location" class="location-pill">{{ item.location }}</text>
            <text v-if="item.overlay" class="cover-overlay">{{ item.overlay }}</text>
          </view>
          <view class="note-body">
            <text class="note-title">{{ item.title }}</text>
            <view class="author-row">
              <view class="avatar" :style="{ background: item.avatarBg }">{{ item.avatar }}</view>
              <text class="author">{{ item.authorName }}</text>
              <view class="like"><view class="heart-icon" />{{ item.likes }}</view>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="masonry">
        <view v-for="item in notes" :key="item.id" class="note-card" @tap="openNote(item)">
          <image v-if="item.cover" class="image-cover" :src="item.cover" mode="aspectFill" />
          <view v-else class="cover" :style="{ background: item.bg }">
            <text class="cover-text">{{ item.poster }}</text>
          </view>
          <view class="note-body">
            <text class="note-title">{{ item.title }}</text>
            <view class="author-row">
              <view class="avatar" :style="{ background: item.avatarBg }">{{ item.avatar }}</view>
              <text class="author">{{ item.authorName }}</text>
              <view class="like"><view class="heart-icon" />{{ item.likes }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="bottom-space" />
    </view>

    <view v-if="areaOpen" class="area-panel">
      <view class="map-strip">
        <text>地图探索</text>
        <text>三亚⌁</text>
      </view>
      <text class="panel-title">位置距离</text>
      <view class="distance-row">
        <text class="selected">全城</text>
        <text>1km</text>
        <text>3km</text>
        <text>5km</text>
      </view>
      <view class="districts">
        <view class="left-list">
          <text class="hot">热门商圈</text>
          <text>海棠区</text>
          <text>吉阳区</text>
          <text>天涯区</text>
          <text>崖州区</text>
        </view>
        <view class="right-list">
          <text>三亚湾</text>
          <text>迎宾路</text>
          <text>河西路</text>
          <text>海韵路</text>
          <text>海棠湾</text>
          <text>河东路</text>
          <text>金鸡岭</text>
          <text>河西</text>
        </view>
      </view>
    </view>
    <view v-if="areaOpen" class="area-mask" @tap="areaOpen = false" />

    <view v-if="homeDrawerOpen" class="home-drawer-layer">
      <view class="home-drawer">
        <view class="home-drawer-head">
          <view class="home-avatar">小</view>
          <view>
            <text class="home-name">小红薯 13</text>
            <text class="home-id">小红书号：94787774830</text>
          </view>
        </view>
        <view class="home-menu-card">
          <view class="home-menu-item" @tap="openDrawerPage('addFriend')"><view class="home-side-icon add" /><text>添加好友</text><view class="drawer-arrow" /></view>
          <view class="home-menu-item" @tap="openDrawerPage('creator')"><view class="home-side-icon creator" /><text>创作者中心</text><view class="drawer-arrow" /></view>
          <view class="home-menu-item" @tap="openDrawerPage('pro')"><view class="home-side-icon pro" /><text>升级为专业号</text><view class="drawer-arrow" /></view>
        </view>
        <view class="home-menu-card">
          <view class="home-menu-item" @tap="openDrawerPage('history')"><view class="home-side-icon history" /><text>浏览记录</text><view class="drawer-arrow" /></view>
          <view class="home-menu-item" @tap="openDrawerPage('orders')"><view class="home-side-icon order" /><text>订单</text><view class="drawer-arrow" /></view>
          <view class="home-menu-item" @tap="openWallet"><view class="home-side-icon wallet" /><text>钱包</text><view class="drawer-arrow" /></view>
        </view>
        <view class="home-menu-card">
          <view class="home-menu-item" @tap="openDrawerPage('mini')"><view class="home-side-icon mini" /><text>小程序</text><view class="drawer-arrow" /></view>
          <view class="home-menu-item" @tap="openDrawerPage('moment')"><view class="home-side-icon moment" /><text>瞬间</text><view class="drawer-arrow" /></view>
        </view>
        <view class="home-drawer-bottom">
          <view @tap="startScan"><view class="round"><view class="scan-mini" /></view><text>扫一扫</text></view>
          <view @tap="openDrawerPage('help')"><view class="round"><view class="help-mini" /></view><text>帮助与客服</text></view>
          <view @tap="openDrawerPage('settings')"><view class="round"><view class="setting-mini" /></view><text>设置</text></view>
        </view>
      </view>
      <view class="home-drawer-mask" @tap="homeDrawerOpen = false" />
    </view>

    <BottomNav active="home" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import BottomNav from '../../components/BottomNav/BottomNav.vue'
import { getLocalNotes } from '../../common/mock.js'

const channels = [
  { key: 'follow', name: '关注' },
  { key: 'discover', name: '发现' },
  { key: 'worldcup', name: '世界杯' },
  { key: 'sanya', name: '三亚' }
]

const activeChannel = ref('discover')
const areaOpen = ref(false)
const homeDrawerOpen = ref(false)
const notes = ref([])
const worldcupImage = ref('../../static/worldcup.jpg')

const followNotes = [
  { id: 'f1', title: 'DAY 533｜这谁不会嘛', authorName: 'Jack 和 Linda', avatar: 'J', date: '05-19', likes: 101, cls: 'dance', avatarBg: '#9aa9b6', poster: 'DAY 533', content: '跳舞练习室日常，记录两个人一起坚持的第 533 天。' },
  { id: 'f2', title: '苏河湾 顶楼复式带阳台（转租）', authorName: '娟娟甄选好房', avatar: '娟', date: '11小时前', likes: '赞', cls: 'loft', avatarBg: '#b8c3d2', badge: true, poster: '上海顶楼复式的家', content: '顶楼复式带阳台，采光很好，适合喜欢开阔空间的人。' },
  { id: 'f3', title: '别人搞投资我搞透支', authorName: '潘大喜', avatar: '潘', date: '04-19', likes: 1, cls: 'farm', avatarBg: '#deb887', overlay: '负债500w牛马日常', poster: '负债500w牛马日常', content: '轻松吐槽生活压力，顺便记录每天认真打工的状态。' },
  { id: 'f4', title: '南京每天都像在澡堂里', authorName: '昆仑', avatar: '昆', date: '05-27', likes: 26, cls: 'gym', avatarBg: '#795548', poster: '南京每天都像在澡堂里', content: '天气热到像蒸桑拿，通勤路上已经开始怀疑人生。' },
  { id: 'f5', title: '椅子！比床舒服？', authorName: '清闲动态', avatar: '清', date: '今天', likes: 9, cls: 'chair', avatarBg: '#444', badge: true, poster: '椅子！比床舒服？', content: '一把舒服的人体工学椅，适合久坐党。' }
]

const sanyaNotes = [
  { id: 's1', title: '三亚有一起喝酒的吗', authorName: 'yyy（', avatar: 'y', likes: 14, cls: 'selfie', avatarBg: '#d0b08a', location: '海南热带海洋学院（三…｜4.1km', poster: '三亚有一起喝酒的吗', content: '想找附近朋友一起小聚，三亚夜晚还是要热闹一点。' },
  { id: 's2', title: '有人能干吗', authorName: 'YAN', avatar: 'Y', likes: 8, cls: 'chatshot', avatarBg: '#eee', location: '三亚学院｜658m', poster: '有人能干吗', content: '三亚学院附近聊天截图，主打一个真实好笑。' },
  { id: 's3', title: '人大大二', authorName: 'Zz', avatar: 'Z', likes: 464, cls: 'girl', avatarBg: '#e8c7c7', poster: '人大大二', content: '三亚本地日常随拍。' },
  { id: 's4', title: '三亚万科公园里急租 900/月', authorName: '天坛摄影春风', avatar: '天', likes: 7, cls: 'room', avatarBg: '#b197fc', location: '万科公园里｜2.4km', poster: '急租 900/月', content: '万科公园里附近急租房源，适合短期过渡。' },
  { id: 's5', title: '办公室短租，离学校很近', authorName: '小红薯', avatar: '薯', likes: 3, cls: 'office', avatarBg: '#ff2442', poster: '办公室短租', content: '离学校很近的办公室短租，适合临时办公。' }
]

function loadNotes() {
  notes.value = getLocalNotes()
}

function switchChannel(key) {
  activeChannel.value = key
  areaOpen.value = false
}

function toggleArea() {
  areaOpen.value = !areaOpen.value
}

function openNote(item) {
  uni.setStorageSync('current_note', {
    bg: 'linear-gradient(145deg, #fff 0%, #ffecee 100%)',
    avatarBg: item.avatarBg || '#ff2442',
    poster: item.poster || item.title,
    content: item.content || item.title,
    ...item
  })
  uni.navigateTo({ url: '/pages/detail/detail' })
}

function useFallbackWorldcup() {
  worldcupImage.value = '/static/worldcup.jpg'
}

function openHomeMenu() {
  homeDrawerOpen.value = true
}

function openDrawerPage(type) {
  homeDrawerOpen.value = false
  uni.navigateTo({ url: `/pages/side/side?type=${type}` })
}

function openWallet() {
  homeDrawerOpen.value = false
  uni.navigateTo({ url: '/pages/wallet/wallet' })
}

function startScan() {
  homeDrawerOpen.value = false
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

function openSearch() {
  uni.navigateTo({ url: '/pages/search/search' })
}

onLoad(loadNotes)
onShow(loadNotes)
</script>

<style scoped>
.page {
  min-height: 100vh;
  max-width: 750rpx;
  margin: 0 auto;
  background: #f8f8f8;
  overflow-x: hidden;
}

.top-safe {
  position: fixed;
  top: 0;
  left: 50%;
  right: auto;
  width: 100%;
  max-width: 750rpx;
  z-index: 20;
  background: #fff;
  border-bottom: 1rpx solid #f2f2f2;
  transform: translateX(-50%);
}

.channel-row {
  height: 106rpx;
  display: grid;
  grid-template-columns: 76rpx 1fr 1fr 1.3fr 1fr 76rpx;
  align-items: center;
  padding: 0 20rpx;
  color: #999;
}

.menu-icon {
  width: 42rpx;
  margin: 0 auto;
}

.menu-icon view {
  height: 4rpx;
  margin: 8rpx 0;
  border-radius: 4rpx;
  background: #333;
}

.search-icon {
  position: relative;
  width: 46rpx;
  height: 46rpx;
  margin: 0 auto;
  border: 5rpx solid #222;
  border-radius: 50%;
  box-sizing: border-box;
}

.search-icon::after {
  content: "";
  position: absolute;
  right: -12rpx;
  bottom: -8rpx;
  width: 20rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #222;
  transform: rotate(45deg);
}

.channel {
  position: relative;
  text-align: center;
  font-size: 34rpx;
  font-weight: 650;
}

.channel.active {
  color: #222;
  font-weight: 800;
}

.channel.active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -18rpx;
  width: 66rpx;
  height: 8rpx;
  border-radius: 8rpx;
  background: #ff2442;
  transform: translateX(-50%);
}

.sanya-tabs {
  height: 78rpx;
  display: flex;
  align-items: center;
  gap: 38rpx;
  padding: 0 22rpx;
  overflow-x: auto;
  color: #909090;
  font-size: 30rpx;
  white-space: nowrap;
}

.sanya-tabs .sub,
.area-trigger {
  flex: 0 0 auto;
  white-space: nowrap;
}

.sanya-tabs .active,
.area-trigger {
  color: #222;
  font-weight: 800;
}

.area-trigger {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.area-arrow {
  width: 14rpx;
  height: 14rpx;
  border-right: 4rpx solid #777;
  border-bottom: 4rpx solid #777;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.area-arrow.up {
  transform: rotate(-135deg);
}

.feed-scroll {
  padding-top: 106rpx;
  box-sizing: border-box;
}

.feed-scroll.sanya {
  padding-top: 184rpx;
}

.worldcup-page {
  min-height: 100vh;
  background: #173c90;
}

.worldcup-img {
  width: 100%;
  display: block;
}

.masonry {
  padding: 14rpx 12rpx 0;
  column-count: 2;
  column-gap: 12rpx;
}

.note-card {
  display: inline-block;
  width: 100%;
  margin: 0 0 14rpx;
  overflow: hidden;
  border-radius: 8rpx;
  background: #fff;
  break-inside: avoid;
}

.cover {
  min-height: 390rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26rpx;
  box-sizing: border-box;
}

.image-cover,
.photo-cover {
  width: 100%;
  height: 430rpx;
  display: block;
  background: #eee;
}

.photo-cover {
  position: relative;
  overflow: hidden;
}

.dance { background: linear-gradient(160deg, #c6d5e6 0%, #e8d2bd 48%, #9f7b55 100%); }
.loft { background: linear-gradient(140deg, #f7f0df 0%, #ffffff 45%, #b7c4c9 100%); }
.farm { height: 620rpx; background: linear-gradient(160deg, #7e9f51, #d7c27b); }
.gym { background: linear-gradient(150deg, #111 0%, #333 52%, #e0c7b3 100%); }
.chair { background: linear-gradient(145deg, #101010, #555); }
.selfie { height: 500rpx; background: linear-gradient(150deg, #351816 0%, #a65f52 55%, #f0b0a0 100%); }
.chatshot { height: 500rpx; background: linear-gradient(180deg, #111 0%, #222 100%); }
.girl { height: 620rpx; background: linear-gradient(160deg, #b27e5e 0%, #efe4d4 40%, #202020 100%); }
.room { background: linear-gradient(150deg, #cfc7b8 0%, #6b5f51 60%, #f3f0e9 100%); }
.office { background: linear-gradient(150deg, #d9dce5 0%, #a33232 65%, #f5f5f5 100%); }

.cover-overlay {
  position: absolute;
  left: 18rpx;
  right: 18rpx;
  top: 40rpx;
  color: #ffe85a;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.3;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,.4);
}

.video-badge {
  position: absolute;
  right: 16rpx;
  top: 16rpx;
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  background: rgba(0,0,0,.38);
}

.video-badge::after {
  content: "";
  position: absolute;
  left: 14rpx;
  top: 10rpx;
  border-left: 14rpx solid #fff;
  border-top: 9rpx solid transparent;
  border-bottom: 9rpx solid transparent;
}

.location-pill {
  position: absolute;
  left: 18rpx;
  bottom: 18rpx;
  max-width: 86%;
  padding: 10rpx 16rpx;
  border-radius: 24rpx;
  background: rgba(0,0,0,.48);
  color: #fff;
  font-size: 23rpx;
}

.cover-text {
  color: #222;
  font-size: 48rpx;
  font-weight: 800;
  line-height: 1.36;
  text-align: center;
}

.note-body {
  padding: 16rpx 20rpx 18rpx;
}

.note-title {
  display: block;
  min-height: 70rpx;
  color: #262626;
  font-size: 30rpx;
  font-weight: 800;
  line-height: 1.35;
}

.author-row {
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  color: #fff;
  font-size: 20rpx;
  line-height: 36rpx;
  text-align: center;
}

.author-block {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.author {
  flex: 1;
  color: #777;
  font-size: 24rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date {
  margin-top: 4rpx;
  color: #aaa;
  font-size: 22rpx;
}

.like {
  display: flex;
  align-items: center;
  gap: 5rpx;
  color: #777;
  font-size: 26rpx;
}

.heart-icon {
  position: relative;
  width: 24rpx;
  height: 22rpx;
  transform: rotate(-45deg);
}

.heart-icon::before,
.heart-icon::after {
  content: "";
  position: absolute;
  width: 14rpx;
  height: 22rpx;
  border: 3rpx solid #858585;
  border-bottom: 0;
  border-radius: 14rpx 14rpx 0 0;
  box-sizing: border-box;
  background: #fff;
}

.heart-icon::before {
  left: 0;
  transform: rotate(45deg);
}

.heart-icon::after {
  right: 0;
  transform: rotate(135deg);
}

.area-mask {
  position: fixed;
  left: 50%;
  right: auto;
  width: 100%;
  max-width: 750rpx;
  top: 184rpx;
  bottom: 0;
  z-index: 25;
  background: rgba(0,0,0,.36);
  transform: translateX(-50%);
}

.area-panel {
  position: fixed;
  left: 50%;
  right: auto;
  width: 100%;
  max-width: 750rpx;
  top: 184rpx;
  z-index: 30;
  padding: 26rpx 30rpx 0;
  background: #fff;
  box-sizing: border-box;
  transform: translateX(-50%);
}

.map-strip {
  height: 76rpx;
  display: grid;
  grid-template-columns: 1fr 150rpx;
  gap: 20rpx;
}

.map-strip text {
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  border-radius: 12rpx;
  background: #f1f1f1;
  font-size: 28rpx;
  font-weight: 800;
}

.panel-title {
  display: block;
  margin: 34rpx 0 22rpx;
  font-size: 32rpx;
  font-weight: 900;
}

.distance-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  margin-bottom: 34rpx;
}

.distance-row text {
  height: 72rpx;
  border-radius: 14rpx;
  background: #f5f5f5;
  color: #333;
  font-size: 30rpx;
  line-height: 72rpx;
  text-align: center;
}

.distance-row .selected {
  border: 2rpx solid #e0445e;
  background: #fff6f7;
  color: #d73d57;
  font-weight: 800;
}

.districts {
  display: grid;
  grid-template-columns: 164rpx 1fr;
  margin: 0 -30rpx;
  min-height: 660rpx;
}

.left-list,
.right-list {
  display: flex;
  flex-direction: column;
  gap: 54rpx;
  padding: 36rpx 30rpx;
  font-size: 30rpx;
  box-sizing: border-box;
}

.left-list {
  background: #f7f7f7;
}

.left-list .hot {
  color: #e0445e;
  font-weight: 800;
}

.bottom-space {
  height: 138rpx;
}

.home-drawer-layer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
}

.home-drawer {
  width: 574rpx;
  height: 100vh;
  overflow-y: auto;
  padding: 90rpx 30rpx 34rpx;
  background: #fff;
  box-sizing: border-box;
  animation: drawer-in 0.18s ease-out;
}

.home-drawer-mask {
  flex: 1;
  height: 100vh;
  background: rgba(10, 18, 24, 0.72);
}

.home-drawer-head {
  display: flex;
  align-items: center;
  gap: 22rpx;
  margin-bottom: 28rpx;
  padding: 0 18rpx;
}

.home-avatar {
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  background: #ff2442;
  color: #fff;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 82rpx;
  text-align: center;
}

.home-name,
.home-id {
  display: block;
}

.home-name {
  color: #222;
  font-size: 34rpx;
  font-weight: 900;
}

.home-id {
  margin-top: 8rpx;
  color: #999;
  font-size: 24rpx;
}

.home-menu-card {
  margin-bottom: 22rpx;
  padding: 12rpx 0;
  border-radius: 14rpx;
  background: #fff;
  box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.035);
}

.home-menu-item {
  min-height: 86rpx;
  display: flex;
  align-items: center;
  padding: 0 34rpx;
  color: #202020;
  font-size: 31rpx;
  font-weight: 700;
  box-sizing: border-box;
}

.home-side-icon {
  position: relative;
  width: 50rpx;
  height: 50rpx;
  margin-right: 34rpx;
  flex: 0 0 50rpx;
  box-sizing: border-box;
}

.home-side-icon::before,
.home-side-icon::after,
.home-side-icon view {
  content: "";
  position: absolute;
  box-sizing: border-box;
}

.home-side-icon.add::before {
  left: 12rpx;
  top: 4rpx;
  width: 20rpx;
  height: 20rpx;
  border: 5rpx solid #333;
  border-radius: 50%;
}

.home-side-icon.add::after {
  left: 4rpx;
  bottom: 6rpx;
  width: 32rpx;
  height: 18rpx;
  border: 5rpx solid #333;
  border-bottom: 0;
  border-radius: 22rpx 22rpx 0 0;
}

.home-side-icon.creator,
.home-side-icon.moment {
  border: 5rpx solid #333;
  border-radius: 50%;
}

.home-side-icon.creator::before {
  left: 17rpx;
  top: 9rpx;
  width: 10rpx;
  height: 24rpx;
  border-radius: 8rpx;
  background: #333;
  transform: rotate(25deg);
}

.home-side-icon.pro {
  border: 5rpx solid #333;
  border-radius: 16rpx;
}

.home-side-icon.pro::after {
  content: "PRO";
  left: 5rpx;
  top: 11rpx;
  color: #333;
  font-size: 16rpx;
  font-weight: 900;
}

.home-side-icon.history {
  border: 5rpx solid #333;
  border-radius: 50%;
}

.home-side-icon.history::before {
  left: 20rpx;
  top: 9rpx;
  width: 5rpx;
  height: 17rpx;
  border-radius: 5rpx;
  background: #333;
}

.home-side-icon.history::after {
  left: 20rpx;
  top: 24rpx;
  width: 15rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
  transform: rotate(35deg);
}

.home-side-icon.order {
  border: 5rpx solid #333;
  border-radius: 8rpx;
}

.home-side-icon.order::before {
  left: 9rpx;
  right: 9rpx;
  top: 12rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
  box-shadow: 0 13rpx 0 #333;
}

.home-side-icon.wallet {
  border: 5rpx solid #333;
  border-radius: 8rpx;
}

.home-side-icon.wallet::after {
  right: -5rpx;
  top: 14rpx;
  width: 21rpx;
  height: 20rpx;
  border: 5rpx solid #333;
  border-radius: 8rpx 0 0 8rpx;
  background: #fff;
}

.home-side-icon.mini::before {
  left: 5rpx;
  top: 8rpx;
  width: 18rpx;
  height: 14rpx;
  border: 5rpx solid #333;
  border-radius: 4rpx;
  box-shadow: 24rpx 0 0 -1rpx #333, 0 23rpx 0 -1rpx #333, 24rpx 23rpx 0 -1rpx #333;
}

.home-side-icon.moment::before {
  left: 15rpx;
  top: 15rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #333;
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

.home-drawer-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  padding-top: 8rpx;
}

.home-drawer-bottom > view {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8a8a8a;
  font-size: 25rpx;
  gap: 14rpx;
}

.round {
  width: 92rpx;
  height: 92rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f5f5;
}

.scan-mini,
.help-mini,
.setting-mini {
  position: relative;
  width: 46rpx;
  height: 46rpx;
}

.scan-mini {
  border: 5rpx solid #555;
  border-left-color: transparent;
  border-right-color: transparent;
  border-radius: 10rpx;
}

.help-mini {
  border: 5rpx solid #555;
  border-radius: 24rpx 24rpx 12rpx 12rpx;
}

.setting-mini {
  border: 5rpx solid #555;
  border-radius: 50%;
}

.setting-mini::before {
  content: "";
  position: absolute;
  left: 13rpx;
  top: 13rpx;
  width: 10rpx;
  height: 10rpx;
  border: 5rpx solid #555;
  border-radius: 50%;
  box-sizing: border-box;
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
