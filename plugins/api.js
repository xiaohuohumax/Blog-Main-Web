export default (http) => ({
  // oneWord: () => http({
  //   url: 'https://v1.hitokoto.cn',
  //   // method: 'post',
  // }),

  oneWord: () => Promise.reject("error"),


  // articleFind: () => http({
  //   url: '/user/api/articlefind',
  //   method: 'post',
  // }),
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

  webUserLogin: (name, pass,code) => http({
    url: '/user/webUserLogin',
    method: 'post',
    data: {
      name,
      pass,
      code
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

});
