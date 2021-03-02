export default ({
    store
}, inject) => {
  /* 权限-检验角色 */
  function authRole(roles = []) {
    const rolCodes = store.getters["auth/rolCodes"];
    const rolesChecked = store.state.auth.rolesChecked;
    for (const item of roles) {
      // 已校验的队列中
      if (rolesChecked.includes(item)) {
        return true;
      }
    }
    for (const item of roles) {
      if (rolCodes.includes(item)) {
        store.commit("auth/addRolesChecked", item);
        return true;
      }
    }
    return false;
  }

  /* 权限-校验-资源 */
  function authResource(resources = []) {
    const resCodes = store.getters["auth/resCodes"];
    const resourcessChecked = store.state.auth.resourcessChecked;

    for (const item of resources) {
      // 已校验的队列中
      if (resourcessChecked.includes(item)) {
        return true;
      }
    }

    for (const item of resources) {
      if (resCodes.includes(item)) {
        store.commit("auth/addResourcesChecked", item);
        return true;
      }
    }
    return false;
  }

  inject('author', (roles = [], resources = []) => {
    return authRole(roles) || authResource(resources);
  });
  inject('authand', (roles = [], resources = []) => {
    return authRole(roles) && authResource(resources);
  });
  inject('authres', authResource);
  inject('authrol', authRole);
}
