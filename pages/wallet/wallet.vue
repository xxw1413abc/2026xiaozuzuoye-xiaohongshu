<template>
  <view class="page">
    <view class="nav">
      <view class="back-icon" @tap="goBack" />
      <text class="title">我的钱包</text>
      <text class="setting">设置</text>
    </view>

    <view class="asset-card">
      <view class="asset-label">
        <text>我的资产</text>
        <view class="eye-icon" />
      </view>
      <view class="money-row">
        <text class="currency">¥</text>
        <text class="amount">0</text>
        <text class="decimal">.00</text>
      </view>
      <view class="card-arrow" />
    </view>

    <view class="wallet-list">
      <view class="wallet-row">
        <view class="row-icon coin-icon">
          <view />
        </view>
        <view class="row-main">
          <text class="row-num">0</text>
          <text class="row-label">薯币</text>
        </view>
        <text class="row-action">充值</text>
        <view class="right-arrow" />
      </view>

      <view class="wallet-row">
        <view class="row-icon coupon-icon">
          <view />
        </view>
        <view class="row-main">
          <text class="row-num">0</text>
          <text class="row-label">优惠券（张）</text>
        </view>
        <text class="row-action">详情</text>
        <view class="right-arrow" />
      </view>

      <view class="wallet-row">
        <view class="row-icon packet-icon">
          <view />
        </view>
        <view class="row-main">
          <text class="row-num"><text class="small-yuan">¥</text>0</text>
          <text class="row-label">购物红包</text>
        </view>
        <text class="row-action">详情</text>
        <view class="right-arrow" />
      </view>
    </view>
  </view>
</template>

<script setup>
function goBack() {
  uni.navigateBack({
    fail: () => uni.redirectTo({ url: '/pages/me/me' })
  })
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 0 30rpx;
  background: #fafafa;
  box-sizing: border-box;
}

.nav {
  height: 132rpx;
  display: grid;
  grid-template-columns: 72rpx 1fr 92rpx;
  align-items: center;
}

.back-icon {
  position: relative;
  width: 58rpx;
  height: 58rpx;
}

.back-icon::before {
  content: "";
  position: absolute;
  left: 18rpx;
  top: 12rpx;
  width: 28rpx;
  height: 28rpx;
  border-left: 7rpx solid #242424;
  border-bottom: 7rpx solid #242424;
  border-radius: 2rpx;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.title {
  color: #242424;
  font-size: 35rpx;
  font-weight: 800;
  text-align: center;
}

.setting {
  color: #333;
  font-size: 30rpx;
  text-align: right;
}

.asset-card {
  position: relative;
  height: 266rpx;
  margin-top: 20rpx;
  padding: 48rpx 48rpx;
  border-radius: 22rpx;
  background: #ff2448;
  box-shadow: 0 26rpx 38rpx rgba(255, 36, 72, 0.12);
  box-sizing: border-box;
}

.asset-label {
  display: flex;
  align-items: center;
  gap: 22rpx;
  color: rgba(255, 255, 255, 0.86);
  font-size: 28rpx;
}

.eye-icon {
  position: relative;
  width: 36rpx;
  height: 24rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.75);
  border-radius: 50%;
  box-sizing: border-box;
}

.eye-icon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  transform: translate(-50%, -50%);
}

.money-row {
  margin-top: 70rpx;
  display: flex;
  align-items: baseline;
  color: #fff;
}

.currency {
  margin-right: 18rpx;
  font-size: 42rpx;
  font-weight: 500;
}

.amount {
  font-size: 74rpx;
  font-weight: 500;
  line-height: 0.9;
}

.decimal {
  font-size: 40rpx;
  font-weight: 500;
}

.card-arrow,
.right-arrow {
  position: relative;
  flex: 0 0 auto;
}

.card-arrow {
  position: absolute;
  right: 46rpx;
  top: 50%;
  width: 34rpx;
  height: 34rpx;
  border-top: 7rpx solid #fff;
  border-right: 7rpx solid #fff;
  border-radius: 2rpx;
  transform: translateY(-50%) rotate(45deg);
  box-sizing: border-box;
}

.wallet-list {
  margin-top: 44rpx;
  display: flex;
  flex-direction: column;
  gap: 28rpx;
}

.wallet-row {
  height: 138rpx;
  display: flex;
  align-items: center;
  padding: 0 34rpx;
  border-radius: 8rpx;
  background: #fff;
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.035);
  box-sizing: border-box;
}

.row-icon {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 34rpx;
  border-radius: 50%;
  background: #fafafa;
}

.coin-icon view {
  position: relative;
  width: 44rpx;
  height: 44rpx;
  border: 5rpx solid #333;
  border-radius: 50%;
  box-sizing: border-box;
}

.coin-icon view::before,
.coin-icon view::after {
  content: "";
  position: absolute;
  border: 4rpx solid #333;
  box-sizing: border-box;
}

.coin-icon view::before {
  left: 11rpx;
  top: 12rpx;
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  border-right-color: transparent;
}

.coin-icon view::after {
  right: -6rpx;
  bottom: 4rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
}

.coupon-icon view {
  position: relative;
  width: 44rpx;
  height: 32rpx;
  border: 5rpx solid #333;
  border-radius: 6rpx;
  transform: rotate(-43deg);
  box-sizing: border-box;
}

.coupon-icon view::before,
.coupon-icon view::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #fff;
  transform: translateY(-50%);
}

.coupon-icon view::before {
  left: -8rpx;
}

.coupon-icon view::after {
  right: -8rpx;
}

.packet-icon view {
  position: relative;
  width: 42rpx;
  height: 42rpx;
  border: 5rpx solid #333;
  border-radius: 8rpx;
  box-sizing: border-box;
}

.packet-icon view::before {
  content: "";
  position: absolute;
  left: 9rpx;
  top: 7rpx;
  width: 18rpx;
  height: 9rpx;
  border-left: 4rpx solid #333;
  border-bottom: 4rpx solid #333;
  transform: rotate(-45deg);
  box-sizing: border-box;
}

.packet-icon view::after {
  content: "¥";
  position: absolute;
  right: -15rpx;
  bottom: -12rpx;
  color: #333;
  font-size: 24rpx;
  font-weight: 800;
}

.row-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.row-num {
  color: #222;
  font-size: 44rpx;
  font-weight: 800;
  line-height: 1;
}

.small-yuan {
  margin-right: 2rpx;
  font-size: 28rpx;
  font-weight: 700;
}

.row-label {
  margin-top: 16rpx;
  color: #7f7f7f;
  font-size: 27rpx;
}

.row-action {
  color: #777;
  font-size: 28rpx;
}

.right-arrow {
  width: 24rpx;
  height: 24rpx;
  margin-left: 18rpx;
  border-top: 5rpx solid #999;
  border-right: 5rpx solid #999;
  border-radius: 2rpx;
  transform: rotate(45deg);
  box-sizing: border-box;
}
</style>
