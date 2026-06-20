export const mockNotes = [
  {
    id: 1,
    title: '急聘 急聘 急聘',
    authorName: '元朵',
    avatar: '元',
    likes: 34,
    poster: '三亚\n招聘',
    bg: 'linear-gradient(145deg, #fff 0%, #fff 55%, #ffe9e6 100%)',
    avatarBg: '#f2a598',
    cover: '',
    content: '三亚本地岗位招聘，适合想边工作边看海的人。'
  },
  {
    id: 2,
    title: '我反正是被电瓶车逼得砸了好多钱了',
    authorName: 'SA',
    avatar: 'S',
    likes: 21,
    poster: '你被三亚学院\n逼出了什么\n生存技巧',
    bg: 'linear-gradient(145deg, #fbfbfb 0%, #f3f3f3 100%)',
    avatarBg: '#9b8f85',
    cover: '',
    content: '校园生活小技巧集合，主打一个真实。'
  },
  {
    id: 3,
    title: '下一个风口就是：深圳 + 跨境',
    authorName: '刘霞',
    avatar: '刘',
    likes: 340,
    poster: '下一个风口\n就是\n深圳+跨境',
    bg: 'linear-gradient(160deg, #fff 0%, #fff 70%, #ffd6d6 100%)',
    avatarBg: '#111',
    cover: '',
    content: '聊聊跨境方向的机会和普通人怎么入门。'
  },
  {
    id: 4,
    title: '进来看看手型 我是文学手',
    authorName: '奶味仙女棒',
    avatar: '奶',
    likes: 22,
    poster: '精致手  花钱手\n顾家手  清闲手\n操劳手  富贵手\n幸福手  文学手',
    bg: 'linear-gradient(180deg, #fff 0%, #f9f9f9 100%)',
    avatarBg: '#6aa8ff',
    cover: '',
    content: '娱乐向手型分析，看看你是哪一种。'
  },
  {
    id: 5,
    title: '三亚一日游怎么安排不踩雷',
    authorName: '晴天旅行',
    avatar: '晴',
    likes: 88,
    poster: '三亚\n一日游\n路线',
    bg: 'linear-gradient(150deg, #e8fbff 0%, #fff7e9 100%)',
    avatarBg: '#3cc0d8',
    cover: '',
    content: '从海边到夜市，路线紧凑但不累。'
  },
  {
    id: 6,
    title: '宿舍收纳真的能救命',
    authorName: '小薯条',
    avatar: '薯',
    likes: 57,
    poster: '宿舍\n收纳\n清单',
    bg: 'linear-gradient(145deg, #fff5f8 0%, #f3f6ff 100%)',
    avatarBg: '#ff6b8a',
    cover: '',
    content: '几个便宜好用的小物，桌面一下清爽很多。'
  }
]

export const mockUsers = [
  { name: '安行趣玩分享', desc: '票务代理', avatar: '安', bg: '#89b7e6', verified: true },
  { name: '媛媛到处玩', desc: '咨询公司', avatar: '媛', bg: '#83c77e', verified: true },
  { name: '三亚学院小贝学姐', desc: '教育内容热门作者', avatar: '贝', bg: '#25b8c8', verified: false },
  { name: 'sage_zhou', desc: '美食内容热门作者', avatar: 's', bg: '#bdbdbd', verified: false },
  { name: '可达楠楠', desc: '摄影内容热门作者', avatar: '楠', bg: '#f3bdd1', verified: false },
  { name: '梁老财 cc', desc: '宠物内容热门作者', avatar: '梁', bg: '#8a6d4b', verified: false },
  { name: '黄子韬', desc: '音乐内容热门作者', avatar: '黄', bg: '#4a98dd', verified: true }
]

export function getLocalNotes() {
  const drafts = uni.getStorageSync('offline_notes') || []
  return [...drafts, ...mockNotes]
}

export function saveLocalNote(note) {
  const drafts = uni.getStorageSync('offline_notes') || []
  const nextNote = {
    id: Date.now(),
    authorName: uni.getStorageSync('user_phone') || '我',
    avatar: '我',
    likes: 0,
    poster: note.title,
    bg: 'linear-gradient(145deg, #fff 0%, #ffecee 100%)',
    avatarBg: '#ff2442',
    ...note
  }
  uni.setStorageSync('offline_notes', [nextNote, ...drafts])
  return nextNote
}
