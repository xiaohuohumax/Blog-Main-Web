export const state = () => ({
  list: []
})

export const mutations = {
    changeThemeNext(state, text) {
    state.list.push({
      text,
      done: false
    })
  }
}
