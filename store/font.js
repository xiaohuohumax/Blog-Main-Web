export const state = () => ({
    list: []
  })
  
  export const mutations = {
    setFontSzie(state, text) {
      state.list.push({
        text,
        done: false
      })
    }
  }
  