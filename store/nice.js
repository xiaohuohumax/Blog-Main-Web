export const state = () => ({
  nices: []
})

export const mutations = {
  addNice(state, id) {
    let index = state.nices.lastIndexOf(id);
    index > -1 ? state.nices.splice(index, 1) : state.nices.push(id);
    console.log( state.nices)
  }
}

