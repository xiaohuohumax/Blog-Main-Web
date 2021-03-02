export default function (resolve) {
  return [{
      path: '/',
      component: resolve('./view/index.vue'),
      children: [{
        path: '/',
        component: resolve('./view/main.vue'),
        children: [{
          path: '/',
          name: '首页',
          component: resolve('./view/home.vue'),
        }, {
          path: 'indexmore/:id',
          name: '文章详细',
          component: resolve('./view/homemore.vue'),
        }, {
          path: 'image',
          name: '图包分享',
          component: resolve('./view/image.vue'),
        }, {
          path: 'imagemore/:id',
          name: '图包详细',
          component: resolve('./view/imagemore.vue'),
        }, {
          path: 'time',
          name: '时间轴',
          component: resolve('./view/time.vue'),
        }, {
          path: 'tool',
          name: '在线工具',
          component: resolve('./view/tool.vue'),
        }, {
          path: 'toolmore/:id',
          name: '工具详细',
          component: resolve('./view/toolmore.vue'),
        }, {
          path: 'userinf',
          name: '个人信息',
          component: resolve('./view/userinf.vue'),
        }, {
          path: 'video',
          name: '音乐视频',
          component: resolve('./view/video.vue'),
        }, {
          path: 'videomore/:id',
          name: '音乐视频详细',
          component: resolve('./view/videomore.vue'),
        }, {
          path: 'otherinf/:id',
          name: '他人信息',
          component: resolve('./view/otherinf.vue'),
        }]
      }, {
        path: 'logins',
        name: '登录注册',
        component: resolve('./view/logins.vue'),
        meta: {
          notIntoHistory: true, // 不加入历史记录
          authres: ["router_logins"]
        }
      }]
    }, {
      path: '/maintenance',
      name: '维修中',
      component: resolve('./view/maintenance.vue'),
      meta: {
        notIntoHistory: true, // 不加入历史记录
      }
    },
    {
      path: '/error403',
      name: '未授权',
      component: resolve('./view/error403.vue'),
      meta: {
        notIntoHistory: true, // 不加入历史记录
      }
    },
    {
      path: '*',
      name: '未找到',
      component: resolve('./view/error404.vue'),
      meta: {
        notIntoHistory: true, // 不加入历史记录
      }
    }
  ]
};
