/* 权限-检验角色 */
function authRole(roles = []) {
  const rolCodes = this.$store.getters["auth/rolCodes"];
  const rolesChecked = this.$store.state.auth.rolesChecked;
  for (const item of roles) {
    // 已校验的队列中
    if (rolesChecked.includes(item)) {
      return true;
    }
  }
  for (const item of roles) {
    if (rolCodes.includes(item)) {
      this.$store.commit("auth/addRolesChecked", item);
      return true;
    }
  }
  return false;
}

/* 权限-校验-资源 */
function authResource(resources = []) {
  const resCodes = this.$store.getters["auth/resCodes"];
  const resourcessChecked = this.$store.state.auth.resourcessChecked;

  for (const item of resources) {
    // 已校验的队列中
    if (resourcessChecked.includes(item)) {
      return true;
    }
  }

  for (const item of resources) {
    if (resCodes.includes(item)) {
      this.$store.commit("auth/addResourcesChecked", item);
      return true;
    }
  }
  return false;
}

export default {
  authRTor: (roles = [], resources = []) => {
    return authRole(roles) || authResource(resources);
  },
  authRTand: (roles = [], resources = []) => {
    return authRole(roles) && authResource(resources);
  },
  authRTres: authResource,
  authRTrol: authRole
}
