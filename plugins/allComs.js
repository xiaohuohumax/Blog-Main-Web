import Vue from 'vue'

let allComs = {
  // 右侧卡片
  InfoNotice: () => import('@/components/infoCard/InfoNotice'), // 公告
  InfoTalk: () => import('@/components/infoCard/InfoTalk'), // 评论
  InfoTalkItem: () => import('@/components/infoCard/InfoTalkItem'), // 评论子卡片
  InfoTime: () => import('@/components/infoCard/InfoTime'), // 时间
  // 插槽
  InfoCardSolt: () => import('@/components/solt/InfoCardSolt'), // 右侧卡片插槽

  // 页面子卡片
  ArticleCard: () => import('@/components/pageCard/ArticleCard'), // 文章页面卡片
  ToolCard: () => import('@/components/pageCard/ToolCard'), // 工具页面卡片
  MusicVideoCard: () => import('@/components/pageCard/MusicVideoCard'), // 音视频页面卡片
  ImageCard: () => import('@/components/pageCard/ImageCard'), // 图片页面卡片
  TimeCard: () => import('@/components/pageCard/TimeCard'), // 时间轴卡片

  // 留言评论
  MessageBox: () => import('@/components/messageBox/MessageBox'), // 留言盒子
  MessageItem: () => import('@/components/messageBox/MessageItem'), // 留言子模块

  // 登录注册
  LoginItem: () => import('@/components/loginLogon/LoginItem'), // 登录
  LogonItem: () => import('@/components/loginLogon/LogonItem'), // 注册

  // 模块
  BackTime: () => import('@/components/model/BackTime'), // 维修倒计时
  Clock: () => import('@/components/model/Clock'), // 吃豆人时钟
  Loading: () => import('@/components/model/Loading'), // 网站初始化加载动画
  Null: () => import('@/components/model/Null'), // 啥也没有
  SelectLoading: () => import('@/components/model/SelectLoading'), // 加载中
  SelectLoadingOrFail: () => import('@/components/model/SelectLoadingOrFail'), // 
  VideoPlayer: () => import('@/components/model/VideoPlayer'), // 音乐播放器
  TalkBox: () => import('@/components/model/TalkBox'), // 评论盒子
  ChooseIcon: () => import('@/components/model/ChooseIcon'), // 选择头像
  MusicPlayer: () => import('@/components/model/MusicPlayer'), // 音乐播放器模块


  // 布局
  Header: () => import('@/components/layout/Header'), // 页眉
  Body: () => import('@/components/layout/Body'), // 主体
  Footer: () => import('@/components/layout/Footer'), // 页脚
  Banner: () => import('@/components/layout/Banner'), // 横幅
  HistoryNavLeft: () => import('@/components/layout/HistoryNavLeft'), // 历史记录
  Tools: () => import('@/components/layout/Tools'), // 右侧工具
}

for (const key in allComs) {
  Vue.component(key, allComs[key])
}
