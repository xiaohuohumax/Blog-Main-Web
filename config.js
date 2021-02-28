module.exports = {
  backgroundUrl: "http://localhost:8888", // 后台api 地址
  websocketBaseURL: "ws://192.168.31.158:8890", // websocket 地址
  proxyPrefix: "/api",
  consoleInterrceptOpen: false, // 是否开启console拦截
  globalErrorInterrceptOpen: true, // 是否开启全局错误拦截 注意图片加载错误会被拦截

  banners: [ // 默认横幅
    "/image/banner/sky.jpg",
    "/image/banner/night.png",
  ],
  musicplayer: {
    defineIcon: "/image/musicplayer/define.svg",
    loadingIcon: "/image/musicplayer/loading.svg"
  }
}
