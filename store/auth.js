export const state = () => ({
  roles: [],
  resources: [],
  rolesChecked: [],
  resourcessChecked: [],
  menu: [],
  selected: false, //是否已查询
})

export const mutations = {
  addRolesChecked(state, role) {
    state.rolesChecked.push(role);
  },
  addResourcesChecked(state, role) {
    state.resourcessChecked.push(role);
  },
  authInit(state, data) {
    state.selected = true;
    state.menu = data.menu;
    state.roles = data.roles;
    state.resources = data.resources;
    state.rolesChecked = [];
    state.resourcessChecked = [];
  },

}

export const getters = {
  rolCodes(state) {
    return state.roles.map(val => val.code);
  },
  resCodes(state) {
    return state.resources.map(val => val.code);
  },
}
