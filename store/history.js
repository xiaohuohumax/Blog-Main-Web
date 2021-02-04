export const state = () => ({
  history: []
})

export const mutations = {
  // 添加历史记录
  addHistory(state, item) {
    // 不加入历史记录
    if (item.meta && item.meta.notIntoHistory) return;

    let nameArray = state.history.map(val => val.name);
    let index = nameArray.lastIndexOf(item.name);

    if (index == -1) { // 首次浏览
      state.history.unshift(item)
    } else { // 再次浏览
      state.history.splice(index, 1)
      state.history.unshift(item)
    }
  }
}

// export const getters = {
//   // 添加历史记录
//   historyFilter(state) {
//     return state.history.map(val => ({
//       name: val.name,
//       path: val.path
//     }));
//   }
// }
