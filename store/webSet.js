export const state = () => ({
  selected: false, // 是否查询过
  webSet: {
    webName: '', // 名称
    webDescription: '', // 介绍
    webState: true, // true 开放 false 维修
    opentime: Date.now() + "",
    webTheme: '', // 网站主题
  }
})

export const mutations = {
  addWebSet(state, inf) {
    state.webSet = inf;
    state.selected = true;
  },
  changeThemeNext(state) {
    let webSet = state.webSet;
    if (!webSet.webThemeList) return;

    let nameList = webSet.webThemeList.map(val => val.name);
    if (!nameList) return;

    let index = nameList.lastIndexOf(webSet.webTheme);
    webSet.webTheme = webSet.webThemeList[(index + 1) % webSet.webThemeList.length].name;

  }
}

export const getters = {
  themeUrl(state) {
    let res = state.webSet.webThemeList && state.webSet.webThemeList.find(val => val.name == state.webSet.webTheme);
    return res ? res.url : undefined;
  }
}
