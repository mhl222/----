import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: login
  },
  {
    path: '/index',
    name: '主页',
    component: resolve => require(['../views/Home.vue'], resolve),
    childern:[
      {
        path:'/allphoto',
        name: '所有照片',
        component:resolve => require(['../components/Allphoto.vue'], resolve)
      },
      {
        path:'/people',
        name:'人物相册',
        component:resolve => require(['../components/Album_people.vue'], resolve)
      },
      {
        path:'/location',
        name:'地点相册',
        component:resolve => require(['../components/Album_location_.vue'], resolve)
      },
      {
        path:'/recyclebin',
        name:'回收站',
        component:resolve => require(['../components/Recycle_bin.vue'], resolve)
      },
      {
        path:'/album',
        name:'相册',
        component:resolve => require(['../components/Album.vue'], resolve)
      },
    ]

  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
 // {
  //   path:'/',
  //   redirect: '/allphoto'
  // },
  // {
  //   path:'/allphoto',
  //   name: 'allphoto',
  //   component:allphoto
  // },
  // {
  //   path:'/people',
  //   component:resolve => require(['../components/Album_people.vue'], resolve)
  // },
  // {
  //   path:'/location',
  //   component:resolve => require(['../components/Album_location_.vue'], resolve)
  // },
  // {
  //   path:'/recyclebin',
  //   component:resolve => require(['../components/Recycle_bin.vue'], resolve)
  // },
  // {
  //   path:'/album',
  //   component:resolve => require(['../components/Album.vue'], resolve)
  // },
  // {
  //   path:'/rencent',
  //   component:resolve => require(['../components/Rencent.vue'], resolve)
  // }