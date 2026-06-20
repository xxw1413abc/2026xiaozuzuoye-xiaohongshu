<template>
  <view class="page">
    <view class="top-bar">
      <view class="back-icon" @tap="goBack" />
      <view class="search-box">
        <view class="search-icon" />
        <input
          v-model="keyword"
          class="search-input"
          confirm-type="search"
          focus
          placeholder="搜索本地笔记"
          placeholder-class="placeholder"
          @confirm="runSearch"
          @input="runSearch"
        />
        <view v-if="keyword" class="clear-icon" @tap="clearKeyword" />
      </view>
      <text class="cancel" @tap="goBack">取消</text>
    </view>

    <view class="content">
      <view v-if="!keyword" class="tips">
        <text class="tips-title">搜索本地文章</text>
        <text class="tips-desc">可以搜索标题、作者和正文内容</text>
      </view>

      <view v-else-if="results.length" class="result-list">
        <view v-for="item in results" :key="item.id" class="result-card" @tap="openNote(item)">
          <image v-if="item.cover" class="thumb" :src="item.cover" mode="aspectFill" />
          <view v-else class="poster" :style="{ background: item.bg }">
            <text>{{ item.poster }}</text>
          </view>
          <view class="result-body">
            <text class="result-title">{{ item.title }}</text>
            <text class="result-content">{{ item.content || '暂无正文' }}</text>
            <view class="meta-row">
              <view class="avatar" :style="{ background: item.avatarBg }">{{ item.avatar }}</view>
              <text class="author">{{ item.authorName }}</text>
              <view class="heart-icon" />
              <text class="likes">{{ item.likes }}</text>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="empty">
        <view class="empty-icon">
          <view class="search-icon large" />
        </view>
        <text class="empty-title">没有搜到相关笔记</text>
        <text class="empty-desc">换个关键词试试</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getLocalNotes } from '../../common/mock.js'

const keyword = ref('')
const notes = ref([])
const results = ref([])

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function loadNotes() {
  notes.value = getLocalNotes()
  runSearch()
}

function runSearch() {
  const key = normalize(keyword.value)
  if (!key) {
    results.value = []
    return
  }

  results.value = notes.value.filter((item) => {
    const target = [
      item.title,
      item.authorName,
      item.content,
      item.poster
    ].map(normalize).join(' ')
    return target.includes(key)
  })
}

function clearKeyword() {
  keyword.value = ''
  results.value = []
}

function openNote(item) {
  uni.setStorageSync('current_note', item)
  uni.navigateTo({ url: '/pages/detail/detail' })
}

function goBack() {
  uni.navigateBack({
    fail: () => uni.redirectTo({ url: '/pages/index/index' })
  })
}

onLoad(loadNotes)
onShow(loadNotes)
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f8f8f8;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 112rpx;
  display: grid;
  grid-template-columns: 58rpx 1fr 72rpx;
  align-items: center;
  gap: 16rpx;
  padding: 0 24rpx;
  background: #fff;
  border-bottom: 1rpx solid #f0f0f0;
  box-sizing: border-box;
}

.back-icon {
  position: relative;
  width: 44rpx;
  height: 44rpx;
}

.back-icon::before {
  content: "";
  position: absolute;
  left: 13rpx;
  top: 8rpx;
  width: 24rpx;
  height: 24rpx;
  border-left: 4rpx solid #222;
  border-bottom: 4rpx solid #222;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.search-box {
  height: 72rpx;
  display: flex;
  align-items: center;
  gap: 14rpx;
  padding: 0 20rpx;
  border-radius: 40rpx;
  background: #f4f4f4;
  box-sizing: border-box;
}

.search-icon {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  flex: 0 0 32rpx;
  border: 4rpx solid #555;
  border-radius: 50%;
  box-sizing: border-box;
}

.search-icon::after {
  content: "";
  position: absolute;
  right: -9rpx;
  bottom: -6rpx;
  width: 16rpx;
  height: 4rpx;
  border-radius: 4rpx;
  background: #555;
  transform: rotate(45deg);
}

.search-input {
  flex: 1;
  height: 70rpx;
  color: #222;
  font-size: 30rpx;
}

.placeholder {
  color: #aaa;
}

.clear-icon {
  position: relative;
  width: 34rpx;
  height: 34rpx;
  flex: 0 0 34rpx;
  border-radius: 50%;
  background: #c8c8c8;
}

.clear-icon::before,
.clear-icon::after {
  content: "";
  position: absolute;
  left: 9rpx;
  top: 15rpx;
  width: 16rpx;
  height: 3rpx;
  border-radius: 3rpx;
  background: #fff;
}

.clear-icon::before {
  transform: rotate(45deg);
}

.clear-icon::after {
  transform: rotate(-45deg);
}

.cancel {
  color: #333;
  font-size: 28rpx;
  text-align: right;
}

.content {
  padding: 22rpx 24rpx 48rpx;
}

.tips {
  padding-top: 180rpx;
  text-align: center;
}

.tips-title,
.empty-title {
  display: block;
  color: #222;
  font-size: 34rpx;
  font-weight: 800;
}

.tips-desc,
.empty-desc {
  display: block;
  margin-top: 18rpx;
  color: #999;
  font-size: 26rpx;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.result-card {
  display: grid;
  grid-template-columns: 184rpx 1fr;
  gap: 18rpx;
  padding: 16rpx;
  border-radius: 8rpx;
  background: #fff;
  box-sizing: border-box;
}

.thumb,
.poster {
  width: 184rpx;
  height: 184rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.poster {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14rpx;
  box-sizing: border-box;
}

.poster text {
  color: #222;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
}

.result-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.result-title {
  color: #222;
  font-size: 31rpx;
  font-weight: 800;
  line-height: 1.35;
}

.result-content {
  display: -webkit-box;
  margin-top: 10rpx;
  overflow: hidden;
  color: #777;
  font-size: 25rpx;
  line-height: 1.45;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta-row {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 9rpx;
  color: #888;
  font-size: 24rpx;
}

.avatar {
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  color: #fff;
  font-size: 19rpx;
  line-height: 34rpx;
  text-align: center;
}

.author {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.heart-icon {
  position: relative;
  width: 23rpx;
  height: 21rpx;
  transform: rotate(-45deg);
}

.heart-icon::before,
.heart-icon::after {
  content: "";
  position: absolute;
  width: 13rpx;
  height: 21rpx;
  border: 3rpx solid #858585;
  border-bottom: 0;
  border-radius: 13rpx 13rpx 0 0;
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

.likes {
  min-width: 28rpx;
}

.empty {
  padding-top: 170rpx;
  text-align: center;
}

.empty-icon {
  width: 128rpx;
  height: 128rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28rpx;
  border-radius: 50%;
  background: #fff;
}

.search-icon.large {
  width: 54rpx;
  height: 54rpx;
  border-width: 5rpx;
  border-color: #ddd;
}

.search-icon.large::after {
  right: -13rpx;
  bottom: -9rpx;
  width: 22rpx;
  height: 5rpx;
  background: #ddd;
}
</style>
