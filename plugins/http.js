import axios from 'axios';
import qs from 'qs';
// 超时时间
// axios.defaults.timeout = 5000;


const instance = axios.create({
  baseURL: "http://localhost1:8888",
  // timeout: 5000,
  withCredentials:true
});

// 基础路径
// axios.defaults.baseURL = 'http://localhost:8888';
// 附加请求头
let headerAdd = {}

instance.defaults.withCredentials = true; // 允许携带cookie

const http = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options
    };
    // 添加附加请求头
    newOptions.headers = {
      // "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...headerAdd,
      ...newOptions.headers,
    };
    instance({
      ...newOptions,
      // data:qs.stringify(newOptions.data)
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

let api = {
  // oneWord: () => http({
  //   url: 'https://v1.hitokoto.cn',
  //   // method: 'post',
  // }),

  oneWord: () => Promise.reject("error"),


  articleFind: () => http({
    url: '/user/api/articlefind',
    method: 'post',
  }),
  articleFindById: (id) => http({
    url: '/user/api/articlefindbyid',
    method: 'post',
    data: {
      id
    }
  }),
  noticeFindTop: () => http({
    url: '/user/api/noticeFindTop',
    method: 'post',
  }),
  commentRandom: (sum) => http({
    url: '/user/api/commentRandom',
    method: 'post',
    data: {
      sum
    }
  }),

  articleFindByPage: (page, pageSteep) => http({
    url: '/user/api/articleFindByPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      select: ""
    }
  }),
  videomusicFindByPage: (page, pageSteep) => http({
    url: '/user/api/videomusicFindByPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      select: ""
    }
  }),

  imageFindPage: (page, pageSteep) => http({
    url: '/user/api/imageFindPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      select: ""
    }
  }),

  toolFindByPage: (page, pageSteep, select) => http({
    url: '/user/api/toolFindByPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      select
    }
  }),

  noticeFindByPage: (page, pageSteep) => http({
    url: '/user/api/noticeFindByPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      select: ""
    }
  }),
  commentFindByPage: (page, pageSteep, articleId, kind) => http({
    url: '/user/api/commentFindByPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      articleId,
      kind,
    }
  }),

  videomusicfindbyid: (id) => http({
    url: '/user/api/videomusicfindbyid',
    method: 'post',
    data: {
      id
    }
  }),
  imageFindbyid: (id) => http({
    url: '/user/api/imageFindbyid',
    method: 'post',
    data: {
      id
    }
  }),
  toolFindbyid: (id) => http({
    url: '/user/api/toolFindbyid',
    method: 'post',
    data: {
      id
    }
  }),

  webUserLogin: (name, pass) => http({
    url: '/user/webUserLogin',
    method: 'post',
    data: {
      name,
      pass
    }
  }),

  webUserAdd: (name, pass) => http({
    url: '/user/webUserAdd',
    method: 'post',
    data: {
      name,
      pass
    }
  }),
  danmuFindRByVId: (videoId) => http({
    url: '/user/api/danmuFindRByVId',
    method: 'post',
    data: {
      videoId
    }
  }),
  danmuInsert: (userId, videoId, content, start, color) => http({
    url: '/user/api/danmuInsert',
    method: 'post',
    data: {
      userId,
      videoId,
      content,
      start,
      color
    }
  }),
  commentInsert: (userId, articleId, kind, message) => http({
    url: '/user/api/commentInsert',
    method: 'post',
    data: {
      userId,
      articleId,
      kind,
      message
    }
  }),
  articleNiceById: (id, inc) => http({
    url: '/user/api/articleNiceById',
    method: 'post',
    data: {
      id,
      inc
    }
  }),
  commentNiceById: (id, inc) => http({
    url: '/user/api/commentNiceById',
    method: 'post',
    data: {
      id,
      inc
    }
  }),
  imageNiceById: (id, inc) => http({
    url: '/user/api/imageNiceById',
    method: 'post',
    data: {
      id,
      inc
    }
  }),
  videoMusicNiceById: (id, inc) => http({
    url: '/user/api/videoMusicNiceById',
    method: 'post',
    data: {
      id,
      inc
    }
  }),
  webSetFindOnly: () => http({
    url: '/webset/webSetFindOnly',
    method: 'post',

  }),

  webUserFindbyid: (id) => http({
    url: '/user/api/webUserFindbyid',
    method: 'post',
    data: {
      id
    }
  }),

  WebUserUpdateById: (id, params) => http({
    url: '/user/api/WebUserUpdateById',
    method: 'post',
    data: {
      id,
      params
    }
  }),

}

export default ({
  app,
  route
}, inject) => {
  let {
    store,
    router,
  } = app;

  instance.interceptors.request.use(
    config => {

      let logined = store.state.user.logined; // 用户是否登录
      logined ? config.headers.authorization = store.state.user.key : "";
      let selected = store.state.webSet.selected;
      if (config.url != "/webset/webSetFindOnly" && !selected) {
        api.webSetFindOnly().then(res => {
          store.commit('webSet/addWebSet', res);
        });
      }
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
      if (route.path != "/maintenance" && error.response && error.response.status == 503) {
        return router.push("/maintenance");
      }
      return Promise.reject(error);
    }
  )

  inject('http', api);
}
