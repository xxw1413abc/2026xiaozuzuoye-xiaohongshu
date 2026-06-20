<template>
  <view class="page" :class="{ dark: type === 'scan' || type === 'moment' }">
    <view class="nav">
      <view class="back-icon" @tap="goBack" />
      <text class="title">{{ title }}</text>
      <view class="right-action">
        <text v-if="type === 'orders'">筛选</text>
        <text v-else-if="type === 'cart'">管理</text>
        <view v-else-if="type === 'help'" class="search-mini" />
        <view v-else-if="type === 'settings'" />
        <view v-else-if="type === 'addFriend'" class="gear-mini" />
        <text v-else />
      </view>
    </view>

    <view v-if="type === 'addFriend'" class="add-page">
      <view class="qr-card">
        <view class="qr-grid">
          <view v-for="n in 625" :key="n" :class="{ on: isQrOn(n) }" />
          <view class="qr-avatar">X</view>
        </view>
      </view>
      <text class="user-name">X.</text>
      <text class="user-id">小红书号：753653624</text>
      <view class="line-list">
        <view class="line-row"><view class="line-icon scan-line" /><text>扫一扫</text><view class="right-arrow" /></view>
        <view class="line-row"><view class="line-icon book-line" /><text>通讯录</text><view class="right-arrow" /></view>
        <view class="line-row"><view class="line-icon chat-line" /><text>微信好友</text><text class="hint">分享个人名片至微信</text><view class="right-arrow" /></view>
        <view class="line-row"><view class="line-icon qq-line" /><text>QQ 好友</text><text class="hint">分享个人名片至 QQ</text><view class="right-arrow" /></view>
      </view>
      <text class="section-title">你可能感兴趣的人</text>
      <view v-for="user in friendUsers" :key="user.name" class="friend-row">
        <view class="face" :style="{ background: user.bg }">{{ user.avatar }}</view>
        <view class="friend-main"><text class="friend-name">{{ user.name }}</text><text class="friend-desc">{{ user.desc }}</text></view>
        <button class="follow-btn" :class="{ followed: user.followed }" @tap.stop="toggleFollow(user)">{{ user.followed ? '已关注' : '关注' }}</button>
        <view class="close-mini" />
      </view>
    </view>

    <view v-else-if="type === 'creator'" class="creator-page">
      <view class="creator-head">
        <text class="big-name">X.</text>
        <text class="status-pill">账号正常</text>
        <view class="rights-card"><text>9 项作者权益</text><text>粉丝 22 /500</text><view class="progress"><view /></view></view>
      </view>
      <view class="task-card"><text class="task-title">成长计划奖励任务</text><text class="tag">直播任务</text><text class="tag red">新任务</text><text class="task-desc">立即开播，上万流量奖励等你拿</text></view>
      <view class="data-card">
        <view class="card-head"><text>近 7 日数据</text><text>开通数据权限</text></view>
        <view class="data-grid"><view v-for="item in ['观看','互动数','新增粉丝','主页访客']" :key="item"><text>{{ item }}</text><text class="zero">0</text><text>-</text></view></view>
      </view>
      <view class="service-strip">
        <view v-for="item in creatorServices" :key="item.name"><view class="mini-service-icon" :class="item.cls"><view /></view><text>{{ item.name }}</text></view>
      </view>
      <view class="inspiration">
        <view class="tabs"><text class="active">创作灵感</text><text>课程学习</text></view>
        <view class="chip-row"><text>推荐</text><text>热点</text><text>活动</text><text>AI玩法</text><text>拼图</text></view>
        <view class="image-grid"><view class="photo-card peach">春日拍照灵感</view><view class="photo-card sea">海边穿搭模板</view></view>
      </view>
    </view>

    <view v-else-if="type === 'pro'" class="pro-page">
      <view class="pro-bg" />
      <text class="pro-title">升级专业号</text>
      <view class="pro-card"><view class="blue-avatar person" /><view><text class="pro-name">个人专业号 <text class="blue-tag">免费升级</text></text><text class="pro-desc">适合个人商业行为，如蒲公英博主、买手、开店，以及二手交易、兴趣副业等个人服务收款</text></view><view class="right-arrow" /></view>
      <view class="pro-card"><view class="blue-avatar card" /><view><text class="pro-name">企业专业号 <text class="blue-tag">认证审核费 600 元/年</text></text><text class="pro-desc">适合企业经营行为，如蓝 V 认证、推广投放、企业店铺、品牌认领等</text></view><view class="right-arrow" /></view>
    </view>

    <view v-else-if="type === 'draft' || type === 'download'" class="empty-page">
      <view class="empty-doc"><view /><view /></view>
      <text class="empty-text">{{ type === 'draft' ? '取消发送或发送失败的笔记\n可被存为草稿' : '暂无内容' }}</text>
    </view>

    <view v-else-if="type === 'activity'" class="activity-page">
      <view class="activity-tabs"><text class="active">全部 0</text><text>进行中 0</text><text>待开始 0</text><text>售后 0</text><text>待评价 0</text></view>
      <view class="empty-doc mascot"><view /><view /></view>
      <text class="empty-text">暂无报名的活动</text>
      <text class="more-title">- 发现更多活动 -</text>
      <view class="activity-grid"><view class="event-card ai"><text>上海一人公司必看｜免费 Ai 公开课并送工位</text><text>明天 周三 12:30</text></view><view class="event-card salon"><text>她宇宙上海女性搞钱沙龙</text><text>06-27 周六 13:00</text></view></view>
    </view>

    <view v-else-if="type === 'history'" class="history-page">
      <view class="history-tabs"><text class="active">笔记</text><text>直播</text></view>
      <text class="today">今天</text>
      <view class="empty-toast">支持在通用设置中关闭浏览记录</view>
    </view>

    <view v-else-if="type === 'orders'" class="orders-page">
      <view class="search-order">搜索我的订单</view>
      <view class="order-tabs"><text class="active">全部</text><text>待付款</text><text>待发货</text><text>待收货 / 使用</text><text>评价</text><text>售后</text></view>
      <view class="shop-row"><text>常逛店铺</text><text>看更多</text></view>
      <view v-for="order in orders" :key="order.title" class="order-card"><view class="order-head"><text>{{ order.shop }}</text><text>{{ order.status }}</text></view><view class="order-body"><view class="goods-img">{{ order.img }}</view><view class="goods-main"><text>{{ order.title }}</text><text>{{ order.desc }}</text><text class="red-text">{{ order.tag }}</text></view><text class="price">{{ order.price }}</text></view><view class="order-actions"><button>晒单</button><button>评价</button><button class="red-btn">再买一单</button></view></view>
    </view>

    <view v-else-if="type === 'cart'" class="cart-page">
      <view class="cart-empty"><view class="cart-draw" /><text>购物车是空的哦，快去加购心仪商品吧</text></view>
      <view class="invalid-head"><text>以下商品已无法购买</text><text>清空失效商品</text></view>
      <view class="invalid-item"><view class="check" /><view class="invalid-img">失效</view><view><text>简约 ins 抓夹带独立包装 5 款各 15</text><text>该商品已下架</text><button>找相似</button></view></view>
      <view class="checkout"><view class="check" /><text>全选</text><text class="sum">总计 ¥0</text><button>结算</button></view>
    </view>

    <view v-else-if="type === 'mini'" class="mini-page">
      <view class="search-mini-box">搜索小程序名称</view>
      <view class="mini-card"><text class="block-title">最近使用</text><text class="muted">暂无使用过的小程序，看看下方推荐吧</text></view>
      <view class="mini-card"><text class="block-title">发现小程序</text><view v-for="app in miniApps" :key="app.name" class="mini-row"><view class="app-icon" :class="app.cls"><view /></view><view><text>{{ app.name }}</text><text>{{ app.desc }}</text><text class="pill">{{ app.used }}</text></view></view></view>
    </view>

    <view v-else-if="type === 'moment'" class="moment-page">
      <view class="moment-head"><view class="face sunset">X</view><view><text>记录我的日常</text><text>暂未开始记录哦~</text></view><view class="close-white" @tap="goBack" /></view>
      <view class="moment-grid"><view class="pink">咻咻</view><view class="orange">语音</view><view class="green">日签</view><view class="cyan">打卡</view><view class="rose">文字</view><view class="purple">拍摄</view></view>
      <text class="dark-title">听 ~ 有趣的声音</text>
      <view class="voice-flow"><view v-for="v in ['你权衡利弊，我退而远之。','碎碎念','喜欢','记得','khalil']" :key="v" class="voice-pill">{{ v }}</view></view>
      <text class="dark-title">刷 ~ 所有好玩瞬间</text>
    </view>

    <view v-else-if="type === 'scan'" class="scan-page">
      <text class="scan-title">扫描二维码</text>
      <view class="scan-box" @tap="startNativeScan"><view class="corner lt" /><view class="corner rt" /><view class="corner lb" /><view class="corner rb" /><text>点击开始扫码</text></view>
      <text class="scan-tip">请将二维码对准扫码框中心</text>
      <view class="scan-bottom"><view><view class="round-tool qr-tool"><view /></view><text>我的二维码</text></view><view><view class="round-tool img-tool"><view /></view><text>相册</text></view></view>
    </view>

    <view v-else-if="type === 'help'" class="help-page">
      <view class="tool-card"><text class="block-title">自助工具</text><view class="tool-grid"><view v-for="item in helpTools" :key="item.name"><view class="help-icon" :class="item.cls"><view /></view><text>{{ item.name }}</text></view></view></view>
      <view class="qa-card"><text class="block-title">猜你想问</text><view class="qa-tabs"><text class="active">热门问题</text><text>账号问题</text><text>个人主页问题</text><text>流量问题</text></view><view v-for="q in questions" :key="q" class="qa-row"><text>{{ q }}</text><view class="right-arrow" /></view></view>
      <view class="help-bottom"><button>意见反馈</button><button>联系官方客服</button></view>
    </view>

    <view v-else class="settings-page">
      <view v-for="group in settings" :key="group[0].name" class="settings-card"><view v-for="row in group" :key="row.name" class="settings-row"><view class="set-icon" :class="row.cls"><view /></view><text>{{ row.name }}</text><text class="set-value">{{ row.value }}</text><view class="right-arrow" /></view></view>
      <view class="settings-card logout-card">
        <view class="settings-row logout-row" @tap="logout">
          <view class="set-icon logout-set"><view /></view>
          <text>退出账号</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const type = ref('addFriend')

const titles = {
  addFriend: '添加好友',
  creator: '',
  pro: '升级专业号',
  draft: '本地草稿',
  activity: '我的活动',
  history: '浏览记录',
  download: '我的下载',
  orders: '',
  cart: '购物车',
  mini: '小程序',
  moment: '',
  scan: '',
  help: '帮助与客服',
  settings: '设置'
}

const title = computed(() => titles[type.value] || '')

const friendUsers = ref([
  { name: '两个半 (^L^)', desc: '通讯录好友', avatar: '两', bg: '#d9a16f', followed: false },
  { name: 'ijinu.（和勋灿嘟对视 10086…', desc: '1 个共同好友', avatar: 'i', bg: '#c8c8c8', followed: false },
  { name: 'Sgr08-FF', desc: '1 个共同好友', avatar: 'S', bg: '#e9b4a7', followed: false }
])

const creatorServices = [
  { name: '活动中心', cls: 'flag-service' },
  { name: '成长中心', cls: 'grow-service' },
  { name: '作者邀约', cls: 'invite-service' },
  { name: '主播中心', cls: 'host-service' },
  { name: '创作学院', cls: 'school-service' }
]

const orders = [
  { shop: '小虫快跑的店', status: '已完成', img: '药', title: '【长效杀蟑 180天】蟑螂药家用强效...', desc: '2 盒装｜局部适用', tag: '极速退款  7天无理由退货', price: '¥12.8' },
  { shop: 'Sherryy 的店', status: '已取消', img: '书', title: '概率论完整版，从第一章到第七章，可...', desc: '电子资料｜学习笔记', tag: '极速退款成功 已退回原支付账号', price: '¥1' }
]

const miniApps = [
  { name: '当家家装小程序', desc: '装修找工长找工匠就用当家家装', used: '164 人最近使用过', cls: 'home-app' },
  { name: '当家 APP', desc: '没有装修公司赚差价', used: '116 人最近使用过', cls: 'rocket-app' },
  { name: '公考小百科', desc: '为公职类考试的考生提供咨询', used: '5400 人最近使用过', cls: 'book-app' },
  { name: '碰碰火 优选团购', desc: '幼小衔接｜书法｜拼音｜美术教材课件', used: '264 人最近使用过', cls: 'group-app' },
  { name: '秀动', desc: '太合音乐集团旗下音乐现场', used: '2.9 万人最近使用过', cls: 'show-app' }
]

const helpTools = [
  { name: '账号检测', cls: 'account-help' },
  { name: '笔记申诉', cls: 'appeal-help' },
  { name: '开通店铺', cls: 'shop-help' },
  { name: '售后退款', cls: 'refund-help' },
  { name: '券和福利', cls: 'coupon-help' },
  { name: '找回账号', cls: 'find-help' },
  { name: '账号与安全', cls: 'safe-help' },
  { name: '查看物流', cls: 'truck-help' },
  { name: '价保中心', cls: 'price-help' },
  { name: '买贵必赔', cls: 'shield-help' }
]
const questions = ['笔记审核时效是多久', '视频互动栏怎么切换到底部?', '如何开通直播权限?', '笔记被判定违反社区规范第四条是什么意思?', '如何变更或解绑小红书的实名认证?', '如何找回小红书账号?', '如何开通买手权限为他人带货', '小红书开店的费用是多少?', '商家一直不发货怎么办?']
const settings = [
  [{ name: '账号与安全', cls: 'user-set' }, { name: '通用设置', cls: 'gear-set' }, { name: '通知设置', cls: 'bell-set' }, { name: '多语言和翻译', cls: 'translate-set' }, { name: '隐私设置', cls: 'lock-set' }],
  [{ name: '存储空间', value: '809.2 MB', cls: 'trash-set' }, { name: '内容偏好调节', cls: 'note-set' }, { name: '收货地址', cls: 'pin-set' }, { name: '添加小组件', cls: 'grid-set' }, { name: '未成年人模式', value: '未开启', cls: 'umbrella-set' }],
  [{ name: '新功能体验', cls: 'flask-set' }],
  [{ name: '帮助与客服', cls: 'headset-set' }, { name: '关于小红书', cls: 'info-set' }]
]

function goBack() {
  uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/me/me' }) })
}

function toggleFollow(user) {
  user.followed = !user.followed
}

function isFinder(row, col, startRow, startCol) {
  const r = row - startRow
  const c = col - startCol
  if (r < 0 || c < 0 || r > 6 || c > 6) return false
  return r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
}

function isQrOn(index) {
  const i = index - 1
  const row = Math.floor(i / 25)
  const col = i % 25
  if (isFinder(row, col, 0, 0) || isFinder(row, col, 0, 18) || isFinder(row, col, 18, 0)) return true
  if ((row === 7 && col < 8) || (col === 7 && row < 8) || (row === 7 && col > 16) || (col === 17 && row < 8)) return false
  if ((row >= 10 && row <= 14 && col >= 10 && col <= 14)) return false
  return ((row * 7 + col * 11 + row * col) % 5 === 0) || ((row + col) % 7 === 0) || (row % 4 === 0 && col % 3 === 0)
}

function startNativeScan() {
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

function logout() {
  uni.showModal({
    title: '退出账号',
    content: '确定要退出当前账号吗？',
    confirmText: '退出',
    confirmColor: '#ff2442',
    success: (res) => {
      if (!res.confirm) return
      uni.removeStorageSync('token')
      uni.removeStorageSync('user_student_id')
      uni.removeStorageSync('user_name')
      uni.removeStorageSync('user_phone')
      uni.showToast({ title: '已退出', icon: 'success' })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/login/login?redirect=/pages/me/me' })
      }, 500)
    }
  })
}

onLoad((query) => {
  type.value = query.type || 'addFriend'
  if (type.value === 'scan') {
    setTimeout(startNativeScan, 300)
  }
})
</script>

<style scoped>
.page { min-height: 100vh; background: #f7f7f7; color: #262626; }
.page.dark { background: #000; color: #fff; }
.nav { height: 120rpx; display: grid; grid-template-columns: 90rpx 1fr 120rpx; align-items: center; padding: 0 30rpx; background: transparent; box-sizing: border-box; }
.back-icon { position: relative; width: 54rpx; height: 54rpx; }
.back-icon::before { content: ""; position: absolute; left: 18rpx; top: 12rpx; width: 26rpx; height: 26rpx; border-left: 6rpx solid currentColor; border-bottom: 6rpx solid currentColor; transform: rotate(45deg); box-sizing: border-box; }
.title { text-align: center; font-size: 34rpx; font-weight: 800; }
.right-action { display: flex; justify-content: flex-end; align-items: center; color: #333; font-size: 30rpx; }
.dark .right-action { color: #fff; }
.right-arrow { width: 20rpx; height: 20rpx; border-top: 4rpx solid #bbb; border-right: 4rpx solid #bbb; transform: rotate(45deg); box-sizing: border-box; }
.search-mini { width: 44rpx; height: 44rpx; border: 5rpx solid #222; border-radius: 50%; box-sizing: border-box; }
.gear-mini { width: 44rpx; height: 44rpx; border: 5rpx solid #222; border-radius: 50%; box-sizing: border-box; }
.add-page { background: #fff; min-height: calc(100vh - 120rpx); padding: 60rpx 30rpx; box-sizing: border-box; }
.qr-card { width: 330rpx; height: 330rpx; margin: 0 auto 26rpx; padding: 18rpx; border: 1rpx solid #ddd; border-radius: 28rpx; box-sizing: border-box; }
.qr-grid { position: relative; display: grid; grid-template-columns: repeat(25, 1fr); gap: 3rpx; }
.qr-grid view { width: 8rpx; height: 8rpx; border-radius: 50%; }
.qr-grid .on { background: #222; }
.qr-avatar { position: absolute; left: 50%; top: 50%; width: 66rpx !important; height: 66rpx !important; border: 8rpx solid #fff; border-radius: 50% !important; background: linear-gradient(135deg, #f2c089, #6b87b7) !important; color: #fff; font-size: 28rpx; font-weight: 900; line-height: 50rpx; text-align: center; transform: translate(-50%, -50%); box-sizing: border-box; }
.user-name, .user-id { display: block; text-align: center; }
.user-name { font-size: 36rpx; font-weight: 700; }
.user-id { margin: 18rpx 0 58rpx; color: #999; font-size: 28rpx; }
.line-list { border-top: 1rpx solid #eee; }
.line-row { min-height: 96rpx; display: flex; align-items: center; border-bottom: 1rpx solid #eee; font-size: 32rpx; gap: 24rpx; }
.line-icon { position: relative; width: 46rpx; height: 46rpx; box-sizing: border-box; }
.line-icon::before,
.line-icon::after { content: ""; position: absolute; box-sizing: border-box; }
.scan-line { border: 4rpx solid #333; border-left-color: transparent; border-right-color: transparent; border-radius: 10rpx; }
.scan-line::before { left: 9rpx; top: 11rpx; width: 20rpx; height: 4rpx; border-radius: 4rpx; background: #333; box-shadow: 0 12rpx 0 #333; }
.book-line { border: 4rpx solid #333; border-radius: 8rpx; }
.book-line::before { left: 10rpx; top: -7rpx; width: 22rpx; height: 10rpx; border: 4rpx solid #333; border-bottom: 0; border-radius: 10rpx 10rpx 0 0; }
.book-line::after { left: 11rpx; top: 12rpx; width: 16rpx; height: 4rpx; border-radius: 4rpx; background: #333; box-shadow: 0 10rpx 0 #333; }
.chat-line::before { left: 0; top: 8rpx; width: 27rpx; height: 22rpx; border: 4rpx solid #333; border-radius: 50%; }
.chat-line::after { right: 0; bottom: 7rpx; width: 27rpx; height: 22rpx; border: 4rpx solid #333; border-radius: 50%; background: #fff; }
.qq-line::before { left: 7rpx; top: 3rpx; width: 30rpx; height: 38rpx; border: 4rpx solid #333; border-radius: 18rpx 18rpx 14rpx 14rpx; }
.qq-line::after { left: 7rpx; bottom: 0; width: 30rpx; height: 10rpx; border-left: 4rpx solid #333; border-right: 4rpx solid #333; border-radius: 50%; }
.hint { margin-left: auto; color: #aaa; font-size: 26rpx; }
.section-title { display: block; margin: 54rpx 0 24rpx; color: #666; font-size: 26rpx; }
.friend-row { display: flex; align-items: center; gap: 22rpx; margin-bottom: 34rpx; }
.face { width: 74rpx; height: 74rpx; border-radius: 50%; color: #fff; line-height: 74rpx; text-align: center; }
.friend-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.friend-name { font-size: 30rpx; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.friend-desc { margin-top: 8rpx; color: #999; font-size: 24rpx; }
.follow-btn { width: 126rpx; height: 58rpx; border: 2rpx solid #ff2442; border-radius: 34rpx; background: #fff; color: #ff2442; font-size: 26rpx; line-height: 54rpx; }
.follow-btn.followed { border-color: #ddd; background: #f5f5f5; color: #888; }
.close-mini { width: 28rpx; height: 28rpx; background: linear-gradient(45deg, transparent 45%, #999 45%, #999 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, #999 45%, #999 55%, transparent 55%); }
.creator-page, .activity-page, .history-page, .orders-page, .cart-page, .mini-page, .help-page, .settings-page { padding: 0 30rpx 40rpx; box-sizing: border-box; }
.creator-head { height: 250rpx; position: relative; }
.big-name { position: absolute; left: 10rpx; bottom: 60rpx; font-size: 40rpx; font-weight: 800; }
.status-pill { position: absolute; left: 10rpx; bottom: 8rpx; padding: 10rpx 18rpx; background: #fff; border-radius: 8rpx; color: #5dbd76; }
.rights-card { position: absolute; right: 0; bottom: 32rpx; width: 320rpx; padding: 18rpx 24rpx; border-radius: 18rpx; background: #fff; box-sizing: border-box; }
.rights-card text { display: block; margin-bottom: 10rpx; }
.progress { height: 7rpx; border-radius: 8rpx; background: #d7f5f4; }
.progress view { width: 45%; height: 7rpx; border-radius: 8rpx; background: #52d5d0; }
.task-card, .data-card, .service-strip, .tool-card, .qa-card, .mini-card, .settings-card { margin-bottom: 26rpx; padding: 28rpx; border-radius: 20rpx; background: #fff; box-sizing: border-box; }
.task-title, .block-title { font-size: 32rpx; font-weight: 800; }
.tag { margin-left: 16rpx; padding: 6rpx 12rpx; border-radius: 6rpx; background: #f4f4f4; color: #555; font-size: 24rpx; }
.tag.red { color: #ff2442; background: #fff1f3; }
.task-desc { display: block; margin-top: 22rpx; color: #666; font-size: 28rpx; }
.card-head { display: flex; justify-content: space-between; font-size: 30rpx; font-weight: 800; }
.card-head text:last-child { color: #999; font-size: 26rpx; font-weight: 400; }
.data-grid { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 34rpx; text-align: center; color: #999; }
.data-grid text { display: block; }
.zero { margin: 20rpx 0; color: #222; font-size: 42rpx; font-weight: 800; }
.service-strip { display: grid; grid-template-columns: repeat(5, 1fr); text-align: center; font-size: 24rpx; }
.mini-service-icon { position: relative; width: 58rpx; height: 58rpx; margin: 0 auto 12rpx; box-sizing: border-box; }
.mini-service-icon::before,
.mini-service-icon::after,
.mini-service-icon view { content: ""; position: absolute; box-sizing: border-box; }
.flag-service::before { left: 8rpx; top: 6rpx; width: 34rpx; height: 38rpx; border: 5rpx solid #333; border-radius: 8rpx; border-right: 0; }
.flag-service::after { right: 3rpx; top: 2rpx; width: 24rpx; height: 24rpx; border-radius: 50%; background: #ff2442; }
.grow-service::before { left: 8rpx; top: 10rpx; width: 18rpx; height: 18rpx; border: 5rpx solid #333; border-radius: 50%; }
.grow-service::after { right: 7rpx; bottom: 8rpx; width: 32rpx; height: 22rpx; border-top: 5rpx solid #333; border-right: 5rpx solid #333; transform: rotate(22deg); }
.invite-service::before { left: 18rpx; top: 5rpx; width: 22rpx; height: 22rpx; border: 5rpx solid #333; border-radius: 50%; }
.invite-service::after { left: 8rpx; bottom: 6rpx; width: 42rpx; height: 20rpx; border: 5rpx solid #333; border-top-left-radius: 26rpx; border-top-right-radius: 26rpx; border-bottom: 0; }
.invite-service view { right: 0; top: 24rpx; width: 22rpx; height: 5rpx; border-radius: 5rpx; background: #333; box-shadow: 8rpx 0 0 #333; transform: rotate(90deg); }
.host-service::before { left: 9rpx; top: 8rpx; width: 40rpx; height: 38rpx; border: 5rpx solid #333; border-radius: 9rpx; }
.host-service::after { right: 3rpx; top: 4rpx; width: 13rpx; height: 13rpx; border-radius: 50%; background: #333; }
.host-service view { left: 20rpx; top: 20rpx; width: 16rpx; height: 16rpx; border: 4rpx solid #333; border-radius: 50%; }
.school-service::before { left: 4rpx; top: 15rpx; width: 50rpx; height: 26rpx; background: #333; transform: perspective(60rpx) rotateX(35deg); }
.school-service::after { left: 17rpx; bottom: 6rpx; width: 24rpx; height: 14rpx; border: 5rpx solid #333; border-top: 0; border-radius: 0 0 8rpx 8rpx; }
.inspiration { margin: 0 -30rpx; padding: 26rpx 30rpx; background: #fff; }
.tabs { display: flex; justify-content: space-around; font-size: 34rpx; font-weight: 800; }
.tabs .active, .history-tabs .active, .qa-tabs .active, .order-tabs .active { color: #222; border-bottom: 6rpx solid #ff2442; }
.chip-row, .order-tabs, .activity-tabs, .qa-tabs { display: flex; gap: 34rpx; overflow-x: auto; margin: 28rpx 0; color: #888; font-size: 28rpx; white-space: nowrap; }
.chip-row text:first-child, .activity-tabs .active { padding: 10rpx 24rpx; border-radius: 30rpx; background: #f1f1f1; color: #222; }
.image-grid, .activity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12rpx; }
.photo-card, .event-card { min-height: 340rpx; padding: 22rpx; border-radius: 8rpx; color: #222; font-size: 30rpx; font-weight: 800; box-sizing: border-box; }
.peach { background: linear-gradient(135deg, #ffdce2, #bde8ff); }
.sea { background: linear-gradient(135deg, #d6f1ff, #ffb16d); }
.pro-page { padding: 80rpx 30rpx; background: #fff; min-height: calc(100vh - 120rpx); }
.pro-title { display: block; margin-bottom: 120rpx; text-align: center; font-size: 40rpx; font-weight: 900; }
.pro-card { min-height: 210rpx; display: grid; grid-template-columns: 90rpx 1fr 30rpx; align-items: center; gap: 28rpx; margin-bottom: 38rpx; padding: 32rpx; border: 1rpx solid #e5e5e5; border-radius: 18rpx; }
.blue-avatar { position: relative; width: 76rpx; height: 76rpx; border-radius: 50%; background: #2f86ff; }
.blue-avatar::before,
.blue-avatar::after { content: ""; position: absolute; background: #fff; box-sizing: border-box; }
.blue-avatar.person::before { left: 28rpx; top: 18rpx; width: 20rpx; height: 20rpx; border-radius: 50%; }
.blue-avatar.person::after { left: 20rpx; bottom: 18rpx; width: 36rpx; height: 18rpx; border-radius: 22rpx 22rpx 6rpx 6rpx; }
.blue-avatar.card::before { left: 18rpx; top: 22rpx; width: 40rpx; height: 30rpx; border-radius: 5rpx; }
.blue-avatar.card::after { right: 19rpx; top: 30rpx; width: 8rpx; height: 8rpx; border-radius: 50%; background: #2f86ff; }
.pro-name { display: block; font-size: 32rpx; font-weight: 800; }
.blue-tag { margin-left: 10rpx; padding: 6rpx 10rpx; background: #edf6ff; color: #438ad7; font-size: 22rpx; }
.pro-desc { display: block; margin-top: 16rpx; color: #777; font-size: 27rpx; line-height: 1.55; }
.empty-page { min-height: calc(100vh - 120rpx); display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; }
.empty-doc { position: relative; width: 130rpx; height: 112rpx; margin-bottom: 28rpx; }
.empty-doc view { position: absolute; box-sizing: border-box; }
.empty-doc view:first-child { width: 88rpx; height: 104rpx; left: 20rpx; top: 0; border: 6rpx solid #d8d8d8; border-radius: 12rpx; }
.empty-doc view:first-child::before { content: ""; position: absolute; left: 20rpx; top: 20rpx; width: 44rpx; height: 5rpx; border-radius: 5rpx; background: #d8d8d8; box-shadow: 0 16rpx 0 #d8d8d8; }
.empty-doc view:last-child { left: 44rpx; top: 58rpx; width: 42rpx; height: 22rpx; border: 6rpx solid #d8d8d8; border-top: 0; border-radius: 0 0 22rpx 22rpx; }
.empty-doc view:last-child::before,
.empty-doc view:last-child::after { content: ""; position: absolute; top: -13rpx; width: 18rpx; height: 18rpx; border: 6rpx solid #d8d8d8; border-radius: 50%; background: #fff; box-sizing: border-box; }
.empty-doc view:last-child::before { left: -3rpx; }
.empty-doc view:last-child::after { right: -3rpx; }
.empty-text { white-space: pre-line; color: #888; text-align: center; font-size: 28rpx; line-height: 1.6; }
.more-title { display: block; margin: 380rpx 0 30rpx; text-align: center; color: #aaa; }
.event-card { min-height: 310rpx; background: #fff; }
.event-card text { display: block; margin-top: 210rpx; }
.event-card text:last-child { margin-top: 18rpx; color: #777; font-size: 26rpx; font-weight: 400; }
.ai { background: linear-gradient(135deg, #bff7ff, #fff); }
.salon { background: linear-gradient(135deg, #ffe2de, #fff2ba); }
.history-tabs { display: flex; justify-content: center; gap: 210rpx; font-size: 34rpx; font-weight: 800; }
.today { display: block; margin: 36rpx 0; font-size: 36rpx; font-weight: 800; }
.empty-toast { width: 420rpx; margin: 440rpx auto 0; padding: 22rpx; border-radius: 50rpx; background: #000; color: #fff; text-align: center; font-size: 28rpx; }
.search-order, .search-mini-box { height: 70rpx; border-radius: 40rpx; background: #f0f0f0; color: #aaa; line-height: 70rpx; padding-left: 36rpx; box-sizing: border-box; }
.shop-row, .invalid-head { display: flex; justify-content: space-between; margin: 34rpx 0; color: #777; font-size: 28rpx; }
.order-card { margin: 0 -30rpx 22rpx; padding: 26rpx 30rpx; background: #fff; }
.order-head { display: flex; justify-content: space-between; font-size: 30rpx; font-weight: 800; }
.order-head text:last-child { color: #666; font-weight: 400; }
.order-body { display: grid; grid-template-columns: 146rpx 1fr auto; gap: 18rpx; margin-top: 24rpx; }
.goods-img, .invalid-img { width: 146rpx; height: 146rpx; border-radius: 10rpx; background: #f0c28a; color: #fff; line-height: 146rpx; text-align: center; }
.goods-main text, .invalid-item text, .mini-row text, .settings-row text { display: block; }
.goods-main text:first-child, .invalid-item text:first-child { font-size: 28rpx; font-weight: 800; }
.goods-main text:nth-child(2), .invalid-item text:nth-child(2) { margin-top: 12rpx; color: #999; }
.red-text { margin-top: 14rpx; color: #e64558; }
.price { font-size: 28rpx; font-weight: 800; }
.order-actions { display: flex; justify-content: flex-end; gap: 16rpx; margin-top: 24rpx; }
.order-actions button, .invalid-item button { min-width: 120rpx; height: 58rpx; border: 1rpx solid #ddd; border-radius: 32rpx; background: #fff; font-size: 26rpx; line-height: 56rpx; }
.order-actions .red-btn, .invalid-item button { border-color: #dd6d80; color: #e64558; }
.cart-empty { height: 420rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #777; }
.cart-draw { position: relative; width: 120rpx; height: 70rpx; margin-bottom: 28rpx; border: 6rpx solid #ddd; border-top: 0; border-radius: 0 0 14rpx 14rpx; transform: skewX(-8deg); box-sizing: border-box; }
.cart-draw::before { content: ""; position: absolute; left: -10rpx; top: -15rpx; width: 98rpx; height: 6rpx; border-radius: 6rpx; background: #ddd; }
.cart-draw::after { content: ""; position: absolute; left: 18rpx; bottom: -18rpx; width: 12rpx; height: 12rpx; border-radius: 50%; background: #ddd; box-shadow: 62rpx 0 0 #ddd; }
.invalid-item { display: grid; grid-template-columns: 46rpx 160rpx 1fr; gap: 20rpx; align-items: center; padding: 24rpx 0; }
.check { width: 42rpx; height: 42rpx; border: 2rpx solid #ddd; border-radius: 50%; }
.checkout { position: fixed; left: 0; right: 0; bottom: 0; height: 122rpx; display: grid; grid-template-columns: 48rpx 1fr 160rpx 220rpx; align-items: center; column-gap: 18rpx; padding: 0 34rpx; background: #fff; box-sizing: border-box; }
.checkout .sum { margin-left: 0; text-align: right; }
.checkout button { width: 220rpx; height: 76rpx; margin: 0; border-radius: 42rpx; background: #ff2442; color: #fff; line-height: 76rpx; }
.mini-card .muted { display: block; padding: 80rpx 0; color: #999; text-align: center; }
.mini-row { display: grid; grid-template-columns: 88rpx 1fr; gap: 24rpx; padding: 26rpx 0; border-top: 1rpx solid #eee; }
.app-icon { position: relative; width: 88rpx; height: 88rpx; border-radius: 18rpx; overflow: hidden; }
.app-icon view,
.app-icon::before,
.app-icon::after { content: ""; position: absolute; box-sizing: border-box; }
.home-app { background: linear-gradient(135deg, #ff7c43, #ff4e36); }
.home-app::before { left: 24rpx; top: 32rpx; width: 40rpx; height: 34rpx; border-radius: 4rpx; background: #fff; }
.home-app::after { left: 27rpx; top: 20rpx; width: 32rpx; height: 32rpx; background: #fff; transform: rotate(45deg); border-radius: 4rpx; }
.rocket-app { background: linear-gradient(135deg, #ff9c3a, #ff5c48); }
.rocket-app::before { left: 25rpx; top: 15rpx; width: 38rpx; height: 54rpx; border-radius: 50% 50% 18rpx 18rpx; background: #fff; }
.rocket-app::after { left: 38rpx; top: 28rpx; width: 12rpx; height: 12rpx; border-radius: 50%; background: #ff7a3f; }
.book-app { background: #e50914; }
.book-app::before { left: 16rpx; top: 18rpx; width: 56rpx; height: 44rpx; border: 5rpx solid #fff; border-radius: 8rpx; }
.book-app::after { left: 43rpx; top: 18rpx; width: 5rpx; height: 44rpx; background: #fff; }
.group-app { background: linear-gradient(135deg, #05a8ff, #6d4cff); }
.group-app::before { left: 14rpx; top: 24rpx; width: 24rpx; height: 24rpx; border-radius: 50%; background: #fff; box-shadow: 34rpx 0 0 #fff; }
.group-app::after { left: 18rpx; bottom: 20rpx; width: 52rpx; height: 14rpx; border-radius: 20rpx; background: #fff; }
.show-app { background: #101b32; }
.show-app::before { left: 18rpx; top: 18rpx; width: 22rpx; height: 22rpx; border-radius: 8rpx 0 8rpx 0; background: #1fd0a2; box-shadow: 30rpx 0 0 #ffb92e, 0 30rpx 0 #3c7cff, 30rpx 30rpx 0 #63dd4c; }
.pill { display: inline-block !important; margin-top: 12rpx; padding: 6rpx 12rpx; border: 1rpx solid #ddd; border-radius: 6rpx; color: #777; }
.moment-page { padding: 60rpx 28rpx; }
.moment-head { display: flex; align-items: center; gap: 20rpx; margin-bottom: 60rpx; }
.moment-head text { display: block; }
.moment-head text:first-child { font-size: 32rpx; font-weight: 800; }
.sunset { background: #a77245; }
.close-white { margin-left: auto; width: 46rpx; height: 46rpx; background: linear-gradient(45deg, transparent 45%, #fff 45%, #fff 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, #fff 45%, #fff 55%, transparent 55%); }
.moment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12rpx; }
.moment-grid view { height: 170rpx; padding: 28rpx; border-radius: 18rpx; color: #fff; font-size: 34rpx; font-weight: 900; box-sizing: border-box; }
.pink { background: linear-gradient(135deg, #ff4fe1, #ff9fdf); }
.orange { background: linear-gradient(135deg, #ff8d2a, #ffbb70); }
.green { background: linear-gradient(135deg, #31db82, #b4f46d); }
.cyan { background: linear-gradient(135deg, #10bdf2, #58d9ff); }
.rose { background: linear-gradient(135deg, #ff4c6f, #ff999e); }
.purple { background: linear-gradient(135deg, #6177ef, #b965ff); }
.dark-title { display: block; margin: 56rpx 0 24rpx; color: #ddd; font-size: 30rpx; font-weight: 800; }
.voice-flow { display: flex; flex-wrap: wrap; gap: 24rpx; }
.voice-pill { padding: 18rpx 28rpx; border-radius: 32rpx; background: #333; color: #fff; font-size: 28rpx; }
.scan-page { min-height: calc(100vh - 120rpx); padding: 0 30rpx; text-align: center; background: rgba(0,0,0,.86); }
.scan-title { display: block; margin-top: -72rpx; font-size: 34rpx; font-weight: 800; }
.scan-box { position: relative; width: 530rpx; height: 530rpx; display: flex; align-items: flex-end; justify-content: center; margin: 420rpx auto 44rpx; padding-bottom: 58rpx; background: rgba(255,255,255,.1); box-sizing: border-box; }
.corner { position: absolute; width: 48rpx; height: 48rpx; border-color: #fff; border-style: solid; }
.lt { left: 0; top: 0; border-width: 8rpx 0 0 8rpx; border-radius: 12rpx 0 0 0; }
.rt { right: 0; top: 0; border-width: 8rpx 8rpx 0 0; border-radius: 0 12rpx 0 0; }
.lb { left: 0; bottom: 0; border-width: 0 0 8rpx 8rpx; border-radius: 0 0 0 12rpx; }
.rb { right: 0; bottom: 0; border-width: 0 8rpx 8rpx 0; border-radius: 0 0 12rpx 0; }
.scan-tip { color: #fff; font-size: 28rpx; }
.scan-bottom { display: flex; justify-content: space-around; margin-top: 320rpx; color: #fff; }
.round-tool { position: relative; width: 96rpx; height: 96rpx; margin: 0 auto 20rpx; border-radius: 50%; background: rgba(255,255,255,.24); }
.round-tool view,
.round-tool::before,
.round-tool::after { content: ""; position: absolute; box-sizing: border-box; }
.qr-tool view { left: 27rpx; top: 27rpx; width: 15rpx; height: 15rpx; border: 4rpx solid #fff; box-shadow: 27rpx 0 0 -1rpx #fff, 0 27rpx 0 -1rpx #fff, 27rpx 27rpx 0 -1rpx #fff; }
.img-tool view { left: 25rpx; top: 27rpx; width: 46rpx; height: 36rpx; border: 5rpx solid #fff; border-radius: 6rpx; }
.img-tool::after { left: 34rpx; top: 44rpx; width: 28rpx; height: 16rpx; border-left: 6rpx solid #fff; border-bottom: 6rpx solid #fff; transform: rotate(-45deg); }
.tool-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 30rpx 18rpx; margin-top: 34rpx; text-align: center; font-size: 24rpx; }
.help-icon, .set-icon { position: relative; width: 50rpx; height: 50rpx; margin: 0 auto 10rpx; box-sizing: border-box; }
.help-icon::before,
.help-icon::after,
.help-icon view,
.set-icon::before,
.set-icon::after,
.set-icon view { content: ""; position: absolute; box-sizing: border-box; }
.account-help::before,
.find-help::before,
.safe-help::before,
.user-set::before { left: 16rpx; top: 2rpx; width: 18rpx; height: 18rpx; border: 5rpx solid #333; border-radius: 50%; }
.account-help::after,
.find-help::after,
.safe-help::after,
.user-set::after { left: 8rpx; bottom: 3rpx; width: 34rpx; height: 18rpx; border: 5rpx solid #333; border-top-left-radius: 24rpx; border-top-right-radius: 24rpx; border-bottom: 0; }
.account-help view { right: 1rpx; bottom: 9rpx; width: 17rpx; height: 10rpx; border-left: 5rpx solid #333; border-bottom: 5rpx solid #333; transform: rotate(-45deg); }
.appeal-help,
.note-set { border: 5rpx solid #333; border-radius: 8rpx; }
.appeal-help::before,
.note-set::before { left: 10rpx; top: 12rpx; width: 22rpx; height: 4rpx; border-radius: 4rpx; background: #333; box-shadow: 0 12rpx 0 #333; }
.appeal-help::after,
.note-set::after { right: -7rpx; bottom: -5rpx; width: 20rpx; height: 20rpx; border: 5rpx solid #333; border-radius: 50%; background: #fff; }
.shop-help::before { left: 7rpx; top: 15rpx; width: 36rpx; height: 28rpx; border: 5rpx solid #333; border-radius: 0 0 8rpx 8rpx; }
.shop-help::after { left: 6rpx; top: 6rpx; width: 38rpx; height: 16rpx; border: 5rpx solid #333; border-radius: 10rpx 10rpx 4rpx 4rpx; background: #fff; }
.refund-help::before,
.price-help::before { left: 4rpx; top: 4rpx; width: 40rpx; height: 40rpx; border: 5rpx solid #333; border-radius: 50%; }
.refund-help::after,
.price-help::after { right: 0; top: 15rpx; width: 18rpx; height: 18rpx; border-top: 5rpx solid #333; border-right: 5rpx solid #333; transform: rotate(45deg); }
.refund-help view,
.price-help view { left: 20rpx; top: 12rpx; width: 5rpx; height: 24rpx; border-radius: 5rpx; background: #333; }
.coupon-help::before { left: 5rpx; top: 11rpx; width: 40rpx; height: 28rpx; border: 5rpx solid #333; border-radius: 7rpx; transform: rotate(-40deg); }
.coupon-help::after { left: 21rpx; top: 22rpx; width: 8rpx; height: 8rpx; border-radius: 50%; background: #333; }
.find-help view { right: -2rpx; bottom: 4rpx; width: 20rpx; height: 20rpx; border: 5rpx solid #333; border-radius: 50%; background: #fff; }
.find-help view::after { content: ""; position: absolute; right: -9rpx; bottom: -5rpx; width: 13rpx; height: 5rpx; border-radius: 5rpx; background: #333; transform: rotate(45deg); }
.safe-help view,
.shield-help::before { left: 9rpx; top: 4rpx; width: 32rpx; height: 40rpx; border: 5rpx solid #333; border-radius: 16rpx 16rpx 18rpx 18rpx; }
.truck-help::before { left: 3rpx; top: 14rpx; width: 30rpx; height: 24rpx; border: 5rpx solid #333; border-radius: 6rpx; }
.truck-help::after { right: 2rpx; top: 21rpx; width: 18rpx; height: 17rpx; border: 5rpx solid #333; border-left: 0; border-radius: 0 6rpx 6rpx 0; }
.truck-help view { left: 10rpx; bottom: 3rpx; width: 9rpx; height: 9rpx; border-radius: 50%; background: #333; box-shadow: 24rpx 0 0 #333; }
.shield-help::after { content: "赔"; left: 15rpx; top: 12rpx; color: #333; font-size: 20rpx; font-weight: 900; }
.gear-set { border: 5rpx solid #333; border-radius: 50%; }
.gear-set::before { left: 14rpx; top: 14rpx; width: 12rpx; height: 12rpx; border: 5rpx solid #333; border-radius: 50%; background: #fff; }
.gear-set::after { left: -4rpx; top: 18rpx; width: 48rpx; height: 5rpx; border-radius: 5rpx; background: #333; box-shadow: 0 -14rpx 0 #333, 0 14rpx 0 #333; }
.bell-set::before { left: 9rpx; top: 7rpx; width: 32rpx; height: 34rpx; border: 5rpx solid #333; border-radius: 22rpx 22rpx 10rpx 10rpx; border-bottom-width: 5rpx; }
.bell-set::after { left: 20rpx; bottom: 0; width: 10rpx; height: 8rpx; border-radius: 50%; background: #333; }
.translate-set::before { left: 2rpx; top: 7rpx; width: 27rpx; height: 24rpx; border: 5rpx solid #333; border-radius: 6rpx; }
.translate-set::after { right: 2rpx; bottom: 7rpx; width: 27rpx; height: 24rpx; border: 5rpx solid #333; border-radius: 6rpx; }
.translate-set view { left: 13rpx; top: 16rpx; width: 24rpx; height: 5rpx; border-radius: 5rpx; background: #333; transform: rotate(45deg); }
.lock-set::before { left: 9rpx; bottom: 5rpx; width: 32rpx; height: 28rpx; border: 5rpx solid #333; border-radius: 7rpx; }
.lock-set::after { left: 15rpx; top: 2rpx; width: 20rpx; height: 24rpx; border: 5rpx solid #333; border-bottom: 0; border-radius: 16rpx 16rpx 0 0; }
.trash-set::before { left: 8rpx; top: 15rpx; width: 34rpx; height: 30rpx; border: 5rpx solid #333; border-radius: 0 0 8rpx 8rpx; }
.trash-set::after { left: 12rpx; top: 5rpx; width: 26rpx; height: 5rpx; border-radius: 5rpx; background: #333; box-shadow: 6rpx -6rpx 0 -1rpx #333; }
.pin-set::before { left: 9rpx; top: 3rpx; width: 32rpx; height: 40rpx; border: 5rpx solid #333; border-radius: 50% 50% 50% 6rpx; transform: rotate(-45deg); }
.pin-set::after { left: 20rpx; top: 15rpx; width: 10rpx; height: 10rpx; border-radius: 50%; background: #333; }
.grid-set::before { left: 4rpx; top: 7rpx; width: 18rpx; height: 14rpx; border: 5rpx solid #333; border-radius: 4rpx; box-shadow: 25rpx 0 0 -1rpx #333, 0 24rpx 0 -1rpx #333, 25rpx 24rpx 0 -1rpx #333; }
.umbrella-set::before { left: 6rpx; top: 8rpx; width: 38rpx; height: 20rpx; border: 5rpx solid #333; border-radius: 40rpx 40rpx 0 0; border-bottom: 0; }
.umbrella-set::after { left: 24rpx; top: 27rpx; width: 5rpx; height: 20rpx; border-radius: 5rpx; background: #333; }
.flask-set::before { left: 16rpx; top: 4rpx; width: 18rpx; height: 18rpx; border-left: 5rpx solid #333; border-right: 5rpx solid #333; }
.flask-set::after { left: 8rpx; bottom: 3rpx; width: 34rpx; height: 28rpx; border: 5rpx solid #333; border-radius: 4rpx 4rpx 16rpx 16rpx; }
.headset-set::before { left: 7rpx; top: 8rpx; width: 36rpx; height: 30rpx; border: 5rpx solid #333; border-bottom: 0; border-radius: 24rpx 24rpx 0 0; }
.headset-set::after { left: 2rpx; top: 24rpx; width: 9rpx; height: 18rpx; border-radius: 8rpx; background: #333; box-shadow: 37rpx 0 0 #333; }
.info-set::before { left: 5rpx; top: 5rpx; width: 40rpx; height: 40rpx; border: 5rpx solid #333; border-radius: 50%; }
.info-set::after { content: "!"; left: 21rpx; top: 8rpx; color: #333; font-size: 30rpx; font-weight: 900; }
.qa-row, .settings-row { min-height: 88rpx; display: flex; align-items: center; border-top: 1rpx solid #eee; font-size: 30rpx; }
.qa-row text, .settings-row text { flex: 1; }
.help-bottom { position: sticky; bottom: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 24rpx; padding: 20rpx 0; background: #f7f7f7; }
.help-bottom button { height: 72rpx; border: 1rpx solid #ddd; border-radius: 40rpx; background: #fff; font-size: 28rpx; line-height: 70rpx; }
.settings-row { padding: 0 10rpx; }
.settings-row .set-icon { margin: 0 24rpx 0 0; }
.set-value { flex: 0 0 auto !important; margin-right: 16rpx; color: #999; }
.logout-card { margin-bottom: 48rpx; }
.logout-row { justify-content: center; }
.logout-row text { color: #ff2442; font-weight: 800; text-align: center; }
.logout-row .set-icon { flex: 0 0 auto; }
.logout-set::before { left: 8rpx; top: 10rpx; width: 32rpx; height: 30rpx; border: 5rpx solid #ff2442; border-radius: 8rpx; }
.logout-set::after { right: 0; top: 21rpx; width: 24rpx; height: 5rpx; border-radius: 5rpx; background: #ff2442; }
.logout-set view { right: 0; top: 15rpx; width: 14rpx; height: 14rpx; border-top: 5rpx solid #ff2442; border-right: 5rpx solid #ff2442; transform: rotate(45deg); }
</style>
