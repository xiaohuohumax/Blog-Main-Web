import Cookies from "js-cookie";
export const state = () => ({
  key: "",
  inf: {},
  logined: false
})

export const mutations = {
  putUser(state, res) {
    if (!res.inf.allowLogin) {
     return state.logined = false;
    }
    state.logined = true;
    state.key = res.key;
    state.inf = res.inf;
    Cookies.set("userKey", res.key);
  },
  logouted(state) {
    state.logined = false;
    Cookies.remove("userKey");
  }
}
