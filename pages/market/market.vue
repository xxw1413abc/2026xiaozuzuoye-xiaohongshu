<template>
  <view class="page">
    <view class="market-head">
      <view class="search-box">
        <text class="placeholder">休闲裤</text>
        <view class="search-right">
          <view class="camera-icon" />
          <view class="divider" />
          <text class="search-text">搜索</text>
        </view>
      </view>
      <scroll-view scroll-x class="tabs" show-scrollbar="false">
        <text v-for="tab in tabs" :key="tab" class="tab" :class="{ active: tab === '推荐' }">{{ tab }}</text>
      </scroll-view>
    </view>

    <view class="content-scroll">
      <view class="icon-grid">
        <view v-for="item in tools" :key="item.name" class="tool">
          <view class="tool-icon" :class="item.type">
            <view v-if="item.badge" class="tool-badge">{{ item.badge }}</view>
            <view class="icon-shape" />
          </view>
          <text>{{ item.name }}</text>
        </view>
      </view>

      <view class="goods-grid">
        <view v-for="item in goods" :key="item.id" class="goods-card">
          <view class="goods-cover" :style="{ background: item.bg }">
            <text class="goods-poster">{{ item.poster }}</text>
          </view>
          <view class="price-row">
            <view class="mini-img" :style="{ background: item.bg }" />
            <text class="price">¥{{ item.price }}</text>
            <text class="sold">已售 {{ item.sold }}</text>
          </view>
          <text class="goods-title">{{ item.title }}</text>
          <view class="shop-row">
            <view class="shop-avatar">{{ item.shop.slice(0, 1) }}</view>
            <text class="shop-name">{{ item.shop }}</text>
            <view class="like"><view class="heart-icon" />{{ item.likes }}</view>
          </view>
        </view>
      </view>
      <view class="bottom-space" />
    </view>

    <BottomNav active="market" />
  </view>
</template>

<script setup>
import BottomNav from '../../components/BottomNav/BottomNav.vue'

const tabs = ['推荐', '66周年庆', '穿搭', '运动', '食饮', '生鲜', '潮玩']

const tools = [
  { name: '直播广场', type: 'live' },
  { name: '星光夜市', type: 'night' },
  { name: '美妙商店', type: 'shop' },
  { name: '好货市场', type: 'box' },
  { name: '宠粉清单', type: 'coupon' },
  { name: '我的订单', type: 'order' },
  { name: '购物车', type: 'cart' },
  { name: '优惠券', type: 'ticket', badge: '45元券' },
  { name: '客服消息', type: 'chat' },
  { name: '商品足迹', type: 'foot' }
]

const goods = [
  {
    id: 1,
    title: '我选择绿柚叶 作为我的解药',
    price: '25.8',
    sold: '8.9万+',
    shop: '小葵的草木手作',
    likes: 1670,
    poster: '低能量姐妹\n多用绿柚叶',
    bg: 'linear-gradient(145deg, #eff8df 0%, #6f8d54 100%)'
  },
  {
    id: 2,
    title: '这件T恤，是我的衣柜定海神针',
    price: '146',
    sold: '80',
    shop: 'GIRDEAR AMASS',
    likes: 2,
    poster: '草莓T恤\n夏日穿搭',
    bg: 'linear-gradient(145deg, #ffd9d0 0%, #c98d81 100%)'
  },
  {
    id: 3,
    title: '毛绒挂件可爱到不想摘',
    price: '39.9',
    sold: '1.2万+',
    shop: '奶油小铺',
    likes: 421,
    poster: '毛绒\n挂件',
    bg: 'linear-gradient(145deg, #f6f6f6 0%, #cfcfcf 100%)'
  },
  {
    id: 4,
    title: '直播中同款车载香氛',
    price: '59',
    sold: '2600+',
    shop: '清晨车品',
    likes: 89,
    poster: '直播中\n香氛',
    bg: 'linear-gradient(145deg, #e0f7fa 0%, #7ccbd7 100%)'
  }
]
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffe2eb 0%, #fff 220rpx, #f8f8f8 100%);
}

.market-head {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  padding: 44rpx 30rpx 0;
  background: linear-gradient(180deg, #ffe2eb 0%, #fff 100%);
}

.search-box {
  height: 86rpx;
  padding: 0 24rpx 0 32rpx;
  border-radius: 44rpx;
  background: rgba(255, 255, 255, 0.96);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12rpx 30rpx rgba(255, 111, 143, 0.14);
}

.placeholder {
  color: #999;
  font-size: 30rpx;
}

.search-right {
  display: flex;
  align-items: center;
  gap: 18rpx;
  color: #222;
  font-size: 30rpx;
  font-weight: 800;
}

.camera-icon {
  position: relative;
  width: 38rpx;
  height: 30rpx;
  border: 4rpx solid #222;
  border-radius: 7rpx;
  box-sizing: border-box;
}

.camera-icon::before {
  content: "";
  position: absolute;
  left: 8rpx;
  top: -10rpx;
  width: 16rpx;
  height: 8rpx;
  border-radius: 5rpx 5rpx 0 0;
  background: #222;
}

.camera-icon::after {
  content: "";
  position: absolute;
  left: 11rpx;
  top: 7rpx;
  width: 10rpx;
  height: 10rpx;
  border: 3rpx solid #222;
  border-radius: 50%;
  box-sizing: border-box;
}

.divider {
  width: 1rpx;
  height: 36rpx;
  background: #e8e8e8;
}

.tabs {
  white-space: nowrap;
  height: 92rpx;
  margin-top: 22rpx;
}

.tab {
  display: inline-block;
  margin-right: 42rpx;
  color: #333;
  font-size: 30rpx;
  font-weight: 650;
  line-height: 92rpx;
}

.tab.active {
  color: #111;
  font-size: 38rpx;
  font-weight: 900;
}

.tab:nth-child(2) {
  color: #ff2442;
  font-weight: 900;
}

.content-scroll {
  padding-top: 244rpx;
  box-sizing: border-box;
}

.icon-grid {
  padding: 28rpx 18rpx 20rpx;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 34rpx;
  background: #fff;
}

.tool {
  text-align: center;
  color: #333;
  font-size: 26rpx;
  font-weight: 700;
}

.tool-icon {
  position: relative;
  width: 78rpx;
  height: 78rpx;
  margin: 0 auto 12rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 -8rpx 18rpx rgba(255, 255, 255, 0.55);
}

.icon-shape {
  position: relative;
}

.tool-badge {
  position: absolute;
  left: 50%;
  top: -20rpx;
  z-index: 2;
  min-width: 84rpx;
  height: 34rpx;
  padding: 0 10rpx;
  border-radius: 20rpx;
  background: #ff4b68;
  color: #fff;
  font-size: 20rpx;
  line-height: 34rpx;
  text-align: center;
  transform: translateX(-50%);
  white-space: nowrap;
}

.live {
  background: #fff5f6;
  border: 2rpx solid #ff4b68;
}

.live .icon-shape {
  width: 54rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 4rpx solid #ff4b68;
}

.live .icon-shape::before {
  content: "LIVE";
  position: absolute;
  left: 6rpx;
  top: 12rpx;
  color: #ff4b68;
  font-size: 14rpx;
  font-weight: 900;
}

.night {
  background: linear-gradient(145deg, #eaf3ff, #fff9d8);
}

.night .icon-shape {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: radial-gradient(circle at 65% 35%, #fff 0 8rpx, transparent 9rpx), #4b8dff;
  box-shadow: 12rpx -6rpx 0 -4rpx #ffd95a, -10rpx 10rpx 0 -5rpx #ffd95a;
}

.shop {
  background: #fff0f6;
}

.shop .icon-shape {
  width: 52rpx;
  height: 42rpx;
  border-radius: 8rpx;
  background: #fff;
  border: 4rpx solid #ff5d82;
}

.shop .icon-shape::before {
  content: "";
  position: absolute;
  left: -4rpx;
  top: -18rpx;
  width: 52rpx;
  height: 18rpx;
  border-radius: 12rpx 12rpx 4rpx 4rpx;
  background: repeating-linear-gradient(90deg, #ff5d82 0 10rpx, #fff 10rpx 20rpx);
  border: 4rpx solid #ff5d82;
  border-bottom: 0;
}

.box {
  background: #fff2df;
}

.box .icon-shape {
  width: 52rpx;
  height: 46rpx;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #d69b61 0 50%, #c5864b 51%);
}

.box .icon-shape::before {
  content: "";
  position: absolute;
  left: 20rpx;
  top: 0;
  width: 10rpx;
  height: 46rpx;
  background: rgba(255,255,255,0.35);
}

.coupon {
  background: #fff1ed;
}

.coupon .icon-shape {
  width: 48rpx;
  height: 58rpx;
  border-radius: 8rpx;
  background: #fff;
  border: 4rpx solid #ff5a5f;
  transform: rotate(-8deg);
}

.coupon .icon-shape::before {
  content: "%";
  position: absolute;
  left: 8rpx;
  top: 9rpx;
  color: #ff5a5f;
  font-size: 30rpx;
  font-weight: 900;
}

.order {
  background: #fff0f4;
}

.order .icon-shape {
  width: 42rpx;
  height: 54rpx;
  border-radius: 8rpx;
  background: #ff5d82;
}

.order .icon-shape::before {
  content: "";
  position: absolute;
  left: 10rpx;
  top: 12rpx;
  width: 22rpx;
  height: 4rpx;
  background: #fff;
  box-shadow: 0 12rpx 0 #fff, 0 24rpx 0 #fff;
}

.cart {
  background: #fff8dd;
}

.cart .icon-shape {
  width: 54rpx;
  height: 38rpx;
  border: 5rpx solid #ffc94d;
  border-top: 0;
  border-radius: 8rpx 8rpx 14rpx 14rpx;
}

.cart .icon-shape::before,
.cart .icon-shape::after {
  content: "";
  position: absolute;
  bottom: -14rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #ffc94d;
}

.cart .icon-shape::before {
  left: 6rpx;
}

.cart .icon-shape::after {
  right: 6rpx;
}

.ticket {
  background: #ffecef;
}

.ticket .icon-shape {
  width: 58rpx;
  height: 38rpx;
  border-radius: 10rpx;
  background: #ff6c7f;
}

.ticket .icon-shape::before {
  content: "券";
  position: absolute;
  inset: 0;
  color: #fff;
  font-size: 28rpx;
  line-height: 38rpx;
  text-align: center;
  font-weight: 900;
}

.chat {
  background: #e9fbf5;
}

.chat .icon-shape {
  width: 52rpx;
  height: 42rpx;
  border-radius: 24rpx 24rpx 24rpx 8rpx;
  background: #36d39a;
}

.chat .icon-shape::before {
  content: "";
  position: absolute;
  left: 14rpx;
  top: 18rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #fff;
  box-shadow: 16rpx 0 0 #fff;
}

.foot {
  background: #fdeaff;
}

.foot .icon-shape {
  width: 34rpx;
  height: 52rpx;
  border-radius: 22rpx 22rpx 18rpx 18rpx;
  background: #f66bdc;
  transform: rotate(18deg);
}

.foot .icon-shape::before {
  content: "";
  position: absolute;
  left: -8rpx;
  top: -12rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #f66bdc;
  box-shadow: 12rpx -6rpx 0 #f66bdc, 24rpx -4rpx 0 #f66bdc;
}

.goods-grid {
  padding: 18rpx 12rpx 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14rpx;
}

.goods-card {
  overflow: hidden;
  border-radius: 10rpx;
  background: #fff;
}

.goods-cover {
  height: 470rpx;
  padding: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.goods-poster {
  color: #222;
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.35;
  text-align: center;
  white-space: pre-line;
}

.price-row {
  height: 78rpx;
  padding: 0 18rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  background: #fafafa;
}

.mini-img {
  width: 52rpx;
  height: 52rpx;
  border-radius: 6rpx;
}

.price {
  color: #222;
  font-size: 30rpx;
  font-weight: 800;
}

.sold {
  margin-left: auto;
  color: #777;
  font-size: 24rpx;
}

.goods-title {
  display: block;
  padding: 18rpx 18rpx 10rpx;
  color: #222;
  font-size: 30rpx;
  font-weight: 800;
  line-height: 1.45;
}

.shop-row {
  padding: 8rpx 18rpx 22rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
  color: #888;
  font-size: 24rpx;
}

.shop-avatar {
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #222;
  color: #fff;
  line-height: 34rpx;
  text-align: center;
  font-size: 20rpx;
}

.shop-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.like {
  display: flex;
  align-items: center;
  gap: 5rpx;
  color: #999;
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
  border: 3rpx solid #aaa;
  border-bottom: 0;
  border-radius: 14rpx 14rpx 0 0;
  box-sizing: border-box;
}

.heart-icon::before {
  left: 0;
  transform: rotate(45deg);
}

.heart-icon::after {
  right: 0;
  transform: rotate(135deg);
}

.bottom-space {
  height: 170rpx;
}
</style>
