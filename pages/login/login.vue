<template>
  <view class="page">
    <view class="close" @tap="goBack" />
    <view class="login-card">
      <text class="brand">小红书</text>
      <text class="title">登录后查看你的主页</text>
      <text class="sub">离线演示版账号保存在本机</text>
      <view v-if="registrationNotice" class="success-notice">
        <view class="success-icon" />
        <text>账号注册成功，请输入密码登录</text>
      </view>
      <input v-model="studentId" class="input" type="number" placeholder="学号" />
      <input v-model="userName" class="input" placeholder="姓名" />
      <input v-model="password" class="input" password placeholder="自定义密码" :focus="passwordFocus" />
      <view class="action-row">
        <button class="login-button" @tap="login">登录账号</button>
        <button class="register-button" @tap="register">注册账号</button>
      </view>
      <text class="agree">注册或登录后可使用本地离线演示数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const studentId = ref('')
const userName = ref('')
const password = ref('')
const redirect = ref('/pages/me/me')
const registrationNotice = ref(false)
const passwordFocus = ref(false)

function getUsers() {
  return uni.getStorageSync('offline_users') || {}
}

function validateForm() {
  if (!studentId.value || !userName.value || !password.value) {
    uni.showToast({ title: '请填写学号、姓名和密码', icon: 'none' })
    return false
  }
  if (password.value.length < 4) {
    uni.showToast({ title: '密码至少 4 位', icon: 'none' })
    return false
  }
  return true
}

function saveLogin() {
  uni.setStorageSync('token', `offline-demo-${studentId.value}`)
  uni.setStorageSync('user_student_id', studentId.value)
  uni.setStorageSync('user_name', userName.value)
  uni.setStorageSync('user_phone', studentId.value)
}

function register() {
  if (!validateForm()) return
  const users = getUsers()
  if (users[studentId.value]) {
    uni.showToast({ title: '该学号已经注册，请直接登录', icon: 'none' })
    return
  }
  users[studentId.value] = {
    studentId: studentId.value,
    userName: userName.value,
    password: password.value
  }
  uni.setStorageSync('offline_users', users)
  registrationNotice.value = true
  password.value = ''
  passwordFocus.value = false
  setTimeout(() => {
    passwordFocus.value = true
  }, 100)
  uni.showToast({ title: '注册成功，请登录', icon: 'success' })
}

function login() {
  if (!validateForm()) return
  const users = getUsers()
  const account = users[studentId.value]
  if (!account) {
    uni.showToast({ title: '请先注册账号', icon: 'none' })
    return
  }
  if (account.userName !== userName.value || account.password !== password.value) {
    uni.showToast({ title: '姓名或密码不正确', icon: 'none' })
    return
  }
  registrationNotice.value = false
  saveLogin()
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => uni.redirectTo({ url: redirect.value }), 500)
}

function goBack() {
  uni.redirectTo({ url: '/pages/index/index' })
}

onLoad((query) => {
  if (query.redirect) {
    redirect.value = query.redirect
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
}

.close {
  position: relative;
  width: 76rpx;
  height: 76rpx;
  margin: 18rpx 0 0 32rpx;
}

.close::before,
.close::after {
  content: "";
  position: absolute;
  left: 18rpx;
  top: 36rpx;
  width: 40rpx;
  height: 5rpx;
  border-radius: 5rpx;
  background: #333;
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}

.login-card {
  padding: 76rpx 54rpx 0;
}

.brand {
  display: block;
  color: #ff2442;
  font-size: 56rpx;
  font-weight: 900;
}

.title {
  display: block;
  margin-top: 30rpx;
  color: #222;
  font-size: 42rpx;
  font-weight: 850;
}

.sub {
  display: block;
  margin-top: 16rpx;
  margin-bottom: 56rpx;
  color: #999;
  font-size: 28rpx;
}

.success-notice {
  min-height: 72rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin: -28rpx 0 28rpx;
  padding: 0 24rpx;
  border-radius: 12rpx;
  background: #f2faf5;
  color: #318a52;
  font-size: 26rpx;
  box-sizing: border-box;
}

.success-icon {
  position: relative;
  flex: 0 0 auto;
  width: 30rpx;
  height: 30rpx;
  border: 3rpx solid #46a568;
  border-radius: 50%;
  box-sizing: border-box;
}

.success-icon::after {
  content: "";
  position: absolute;
  left: 7rpx;
  top: 5rpx;
  width: 11rpx;
  height: 6rpx;
  border-left: 3rpx solid #46a568;
  border-bottom: 3rpx solid #46a568;
  transform: rotate(-45deg);
}

.input {
  height: 92rpx;
  margin-bottom: 24rpx;
  padding: 0 28rpx;
  border-radius: 46rpx;
  background: #f6f6f6;
  font-size: 30rpx;
  box-sizing: border-box;
}

.action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18rpx;
  margin-top: 18rpx;
}

.login-button,
.register-button {
  height: 92rpx;
  margin: 0;
  border-radius: 46rpx;
  font-size: 32rpx;
  font-weight: 800;
  line-height: 92rpx;
}

.login-button {
  background: #ff2442;
  color: #fff;
}

.register-button {
  border: 2rpx solid #ff2442;
  background: #fff;
  color: #ff2442;
}

.agree {
  display: block;
  margin-top: 28rpx;
  color: #aaa;
  font-size: 24rpx;
  text-align: center;
}
</style>
