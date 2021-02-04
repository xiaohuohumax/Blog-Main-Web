export default ({
  app: {
    store: store,
    router: router,
  }
}) => {
  router.beforeEach((to, from, next) => {
    store.commit('history/addHistory', to);
    // 修改 title
    document && (document.title = to.name);
    next();
  })
}
