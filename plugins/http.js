let baseApi = "/api";

import apiFactory from "./api";

export default ({
  app: {
    store: store,
    router: router,
  },
  $axios
}, inject) => {

  const instance = $axios.create({
    withCredentials: true
  });
  instance.defaults.withCredentials = true; // 允许携带cookie

  // 附加请求头
  let headerAdd = {}

  const axiosFun = options => {
    return new Promise((resolve, reject) => {
      const defaultOptions = {};
      const newOptions = {
        ...defaultOptions,
        ...options
      };
      // 添加附加请求头
      newOptions.headers = {
        ...headerAdd,
        ...newOptions.headers,
      };
      instance({
        ...newOptions,
      }).then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch(err => {
        reject(err);
      })
    })
  };

  let api = apiFactory(axiosFun); // 生成api 接口


  instance.interceptors.request.use(
    config => {

      let logined = store.state.user.logined; // 用户是否登录
      logined ? config.headers.authorization = store.state.user.key : "";
      // let selected = store.state.webSet.selected;
      // if (config.url != `${baseApi}/webset/webSetFindOnly` && !selected) {
      //   api.webSetFindOnly().then(res => {
      //     store.commit('webSet/addWebSet', res);
      //   });
      // }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {

      const code = error.response && error.response.status;

      const codeFunc = {
        503() { // 网站维修
          if (route.path != "/maintenance") {
            router.push("/maintenance");
          }
        },
        401() { // 未登录
          store.commit('user/logouted');
        }
      }

      let resFunc = codeFunc[code];
      resFunc ? resFunc() : "";
      return Promise.reject(error);
    }
  )

  inject('http', api);
}
