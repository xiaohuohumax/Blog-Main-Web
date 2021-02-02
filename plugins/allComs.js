import Vue from 'vue'

let allComs = {
  Header: () => import('@/components/Header'), // 页眉
  Body: () => import('@/components/Body'), // 主体
  Footer: () => import('@/components/Footer'), // 页脚
  Banner: () => import('@/components/Banner'), // 横幅
  BreadcrumbNav: () => import('@/components/BreadcrumbNav'), // 面包屑
  // 右侧卡片
  InfoNotice: () => import('@/components/infoCard/InfoNotice'), // 公告
  InfoTalk: () => import('@/components/infoCard/InfoTalk'), // 讨论
  InfoTalkItem: () => import('@/components/infoCard/InfoTalkItem'), 
  InfoTime: () => import('@/components/infoCard/InfoTime'), // 时间
  // 插槽
  InfoCardSolt: () => import('@/components/solt/InfoCardSolt'), // 右侧卡片插槽

  // 页面
  ArticleCard: () => import('@/components/pageCard/ArticleCard'), // 文章页面
  ToolCard: () => import('@/components/pageCard/ToolCard'), // 工具页面
  MusicVideoCard: () => import('@/components/pageCard/MusicVideoCard'), // 音视频页面
  ImageCard: () => import('@/components/pageCard/ImageCard'), // 图片页面
  TimeCard: () => import('@/components/pageCard/TimeCard'), 

  // 工具
  Tools: () => import('@/components/Tools'), // 右侧工具
  Loading: () => import('@/components/Loading'),
  VideoPlayer: () => import('@/components/VideoPlayer'), 
  SelectLoading: () => import('@/components/SelectLoading'), 
  SelectLoadingOrFail: () => import('@/components/SelectLoadingOrFail'), 
  BackTime: () => import('@/components/BackTime'), 
  Null: () => import('@/components/Null'), 

  // 模块
  Clock: () => import('@/components/Clock'), // 时钟
  TalkBox: () => import('@/components/TalkBox'), // 评论盒子
  MessageBox: () => import('@/components/messageBox/MessageBox'), // 留言盒子
  MessageItem: () => import('@/components/messageBox/MessageItem'), // 留言子模块
  // Musicplayer: () => import('@/components/Musicplayer'), // 音乐播放器模块

  // 登录注册
  LoginItem: () => import('@/components/loginLogon/LoginItem'),
  LogonItem: () => import('@/components/loginLogon/LogonItem'),
}

for (const key in allComs) {
  Vue.component(key, allComs[key])
}
