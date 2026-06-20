<template>
  <view class="page">
    <view class="nav">
      <view class="back-icon" @tap="goBack" />
      <text class="title">{{ pageTitle }}</text>
      <view />
    </view>

    <view v-if="type === 'likes'" class="message-list">
      <view v-for="item in likes" :key="item.name + item.action" class="notice-row">
        <view class="avatar" :style="{ background: item.bg }">{{ item.avatar }}</view>
        <view class="notice-main">
          <view class="name-line">
            <text class="name">{{ item.name }}</text>
            <text class="action">{{ item.action }}</text>
          </view>
          <text class="desc">{{ item.note }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
        <view class="thumb" :class="item.kind">{{ item.mark }}</view>
      </view>
    </view>

    <view v-else-if="type === 'follows'" class="message-list">
      <view v-for="user in follows" :key="user.name" class="follow-row">
        <view class="avatar" :style="{ background: user.bg }">{{ user.avatar }}</view>
        <view class="notice-main">
          <view class="name-line">
            <text class="name">{{ user.name }}</text>
            <view v-if="user.verified" class="verify-icon" />
          </view>
          <text class="desc">{{ user.desc }}</text>
        </view>
        <button class="follow-btn" :class="{ followed: user.followed }" @tap.stop="toggleFollow(user)">
          {{ user.followed ? '已关注' : '关注' }}
        </button>
      </view>
    </view>

    <view v-else class="message-list">
      <view v-for="item in comments" :key="item.name + item.content" class="notice-row">
        <view class="avatar" :style="{ background: item.bg }">{{ item.avatar }}</view>
        <view class="notice-main">
          <view class="name-line">
            <text class="name">{{ item.name }}</text>
            <text class="action">{{ item.action }}</text>
          </view>
          <text class="comment-text">{{ item.content }}</text>
          <text class="desc">{{ item.note }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
        <view class="thumb" :class="item.kind">{{ item.mark }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const type = ref('likes')

const pageTitle = computed(() => {
  if (type.value === 'follows') return '新增关注'
  if (type.value === 'comments') return '评论和 @'
  return '赞和收藏'
})

const likes = [
  { name: '小满', action: '赞了你的笔记', note: '周末城市散步路线', time: '刚刚', avatar: '满', bg: '#ff6f7d', kind: 'photo', mark: '图' },
  { name: '阿青', action: '收藏了你的笔记', note: '低成本卧室改造', time: '12 分钟前', avatar: '青', bg: '#61a5ff', kind: 'room', mark: '藏' },
  { name: '七七', action: '赞了你的笔记', note: '新手也能做的番茄意面', time: '今天 09:20', avatar: '七', bg: '#ffc05c', kind: 'food', mark: '赞' }
]

const follows = ref([
  { name: '安行 趣玩分享', desc: '票务代理', avatar: '安', bg: '#7bb6ff', verified: true, followed: false },
  { name: '媛媛到处玩', desc: '咨询公司', avatar: '媛', bg: '#8bd67a', verified: true, followed: false },
  { name: '三亚学院小贝学姐', desc: '教育内容热门作者', avatar: '贝', bg: '#ff8f70', verified: false, followed: false },
  { name: 'sage_zhou', desc: '美食内容热门作者', avatar: 's', bg: '#a9a9a9', verified: false, followed: false }
])

const comments = [
  { name: '南栀', action: '评论了你的笔记', content: '这个路线好实用，周末就去试试', note: '周末城市散步路线', time: '2 分钟前', avatar: '南', bg: '#ff7a9a', kind: 'photo', mark: '评' },
  { name: '刘霞', action: '@ 了你', content: '@小红薯 13 这个是不是你上次说的？', note: '下一个风口就是：深圳 + 跨境', time: '18 分钟前', avatar: '刘', bg: '#111', kind: 'text', mark: '@' },
  { name: '奶味仙女棒', action: '回复了你', content: '谢谢分享，已经收藏啦', note: '精致手 花钱手 顾家手', time: '昨天', avatar: '奶', bg: '#d7a4ff', kind: 'hand', mark: '回' }
]

function toggleFollow(user) {
  user.followed = !user.followed
}

function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/message/message' }) })
}

onLoad((query) => {
  type.value = query.type || 'likes'
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
  color: #222;
}

.nav {
  height: 120rpx;
  display: grid;
  grid-template-columns: 90rpx 1fr 90rpx;
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
  width: 26rpx;
  height: 26rpx;
  border-left: 6rpx solid #222;
  border-bottom: 6rpx solid #222;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 34rpx;
  font-weight: 800;
}

.message-list {
  padding: 14rpx 34rpx 60rpx;
}

.notice-row,
.follow-row {
  display: flex;
  align-items: center;
  gap: 22rpx;
  min-height: 128rpx;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  box-sizing: border-box;
}

.avatar {
  flex: 0 0 auto;
  width: 84rpx;
  height: 84rpx;
  border-radius: 50%;
  color: #fff;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 84rpx;
  text-align: center;
}

.notice-main {
  flex: 1;
  min-width: 0;
}

.name-line {
  display: flex;
  align-items: center;
  gap: 8rpx;
  min-width: 0;
}

.name {
  max-width: 280rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 30rpx;
  font-weight: 800;
}

.action,
.desc,
.time {
  color: #999;
  font-size: 25rpx;
}

.desc,
.time,
.comment-text {
  display: block;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comment-text {
  color: #333;
  font-size: 28rpx;
  font-weight: 700;
}

.thumb {
  flex: 0 0 auto;
  width: 86rpx;
  height: 86rpx;
  border-radius: 10rpx;
  color: #fff;
  font-size: 26rpx;
  font-weight: 900;
  line-height: 86rpx;
  text-align: center;
}

.photo { background: linear-gradient(135deg, #9fdcff, #ff7f91); }
.room { background: linear-gradient(135deg, #d9c4a5, #8f9a8c); }
.food { background: linear-gradient(135deg, #f6c47c, #ef6a4a); }
.text { background: linear-gradient(135deg, #f6f6f6, #ffe6ea); color: #222; }
.hand { background: linear-gradient(135deg, #ffe2d1, #d8c2a0); }

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

.follow-btn {
  flex: 0 0 auto;
  width: 150rpx;
  height: 64rpx;
  margin: 0;
  border: 2rpx solid #ff2442;
  border-radius: 34rpx;
  background: #fff;
  color: #ff2442;
  font-size: 28rpx;
  font-weight: 800;
  line-height: 60rpx;
}

.follow-btn.followed {
  border-color: #ddd;
  background: #f5f5f5;
  color: #888;
}
</style>
