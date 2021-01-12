import axios from 'axios';
// 超时时间
// axios.defaults.timeout = 5000;
// 基础路径
axios.defaults.baseURL = 'http://localhost:8888';
// 附加请求头
let headerAdd = {}

const http = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options
    };
    // 添加附加请求头
    newOptions.headers = {
      "Content-Type": "application/json",
      ...headerAdd,
      ...newOptions.headers,
    };
    axios({
      ...newOptions
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
  oneWord: () => http({
    url: 'https://v1.hitokoto.cn',
    // method: 'post',
  }),

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
}

export default ({
  store
}, inject) => {
  axios.interceptors.request.use(
    config => {
      // console.log(config); // 该处可以将config打印出来看一下，该部分将发送给后端（server端）
      let logined = store.state.user.logined; // 用户是否登录
      logined ? config.headers.authorization = store.state.user.key : "";
      // config.data = config.data ? {} : config.data;

      return config // 对config处理完后返回，下一步将向后端发送请求
    },
    error => { // 当发生错误时，执行该部分代码
      // console.log(error); //调试用
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => { // 该处为后端返回整个内容
      const res = response.data; // 该处可将后端数据取出，提前做一个处理
      if ('正常情况') {
        return response // 该处将结果返回，下一步可用于前端页面渲染用
      } else {
        // alert('该处异常');
        return Promise.reject('error')
      }
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  inject('http', api)

}
