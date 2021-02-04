export const state = () => ({
  fontSzie: "16px"
})

export const mutations = {
  setFontSzie(state, size) {
    state.fontSzie = size;
  }
}
