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

  toolFindByPage: (page, pageSteep,select) => http({
    url: '/user/api/toolFindByPage',
    method: 'post',
    data: {
      page,
      pageSteep,
      select
    }
  }),
}

export default (app, inject) => {
  inject('http', api)
}
