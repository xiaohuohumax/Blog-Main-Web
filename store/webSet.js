export const state = () => ({
  selected:false, // 是否查询过
  webSet: {
    webName: 'XiaoHuoHu', // 名称
    webDescription: '个人博客', // 介绍

    webState: true, // true 开放 false 维修
    opentime: Date.now() + 1000 * 60 * 60 * 24 * 12 + "",
    webTheme: 'color', // 网站主题
    webThemeList: [{
        name: "明亮",
        theme: "light"
      },
      {
        name: "暗系",
        theme: "dark"
      },
      {
        name: "彩色",
        theme: "color"
      },
    ],
  }
})

export const mutations = {
  addWebSet(state, inf) {
    state.webSet = inf;
    state.selected =true;
  },
}
