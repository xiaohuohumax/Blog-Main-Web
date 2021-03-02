export default ({
  app: {
    store: store,
    router: router,
    $authres: $authres
  }
}) => {
  router.beforeEach((to, from, next) => {
    
    if (to.meta && to.meta.authres) {
      if (!$authres(to.meta.authres)) {
        return next("/error403")
      }
    }

    if (to.meta && to.meta.authrol) {
      if (!$authrol(to.meta.authrol)) {
        return next("/error403")
      }
    }
    store.commit('history/addHistory', to);
    // 修改 title
    document && (document.title = to.name);
    next();
  })
}
