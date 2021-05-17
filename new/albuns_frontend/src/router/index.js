import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'

const home =() => import('../views/Home.vue')
const allphoto = () => import('../components/Allphoto.vue')
const people = () => import('../components/Album_people.vue')
const location = () => import('../components/Album_location_.vue')
const recyclebin = () =>import('../components/Recycle_bin.vue')
const album = () =>import('../components/Album.vue')
const recent= () =>import('../components/Rencent.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/login',
   component: login
  },
  {
    path:'/index',
    component: home,
    childern:[
          {
            path:'allphoto',
            name: '所有照片',
            component:allphoto
          },
          {
            path:'people',
            name:'人物相册',
            component:people
          },
          {
            path:'location',
            name:'地点相册',
            component:location
          },
          {
            path:'recyclebin',
            name:'回收站',
            component:recyclebin
          },
          {
            path:'album',
            name:'相册',
            component:album
          },
          {
            path:'recent',
            name:'最近照片',
            component:recent
          },
        ]
  },
 

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
  // {
  //   path:'/',
  //   redirect: '/login'
  // },
  // // {
  // //   path:'/index/',
  // //   redirect: '/index/allphoto'
  // // },
  // {
  //   path: '/login',
  //   name: '登录',
  //   component: login
  // },
  // {
  //   path: '/index',
  //   name: '主页',
  //   component:home,
  //   childern:[
  //     {
  //       path:'allphoto',
  //       name: '所有照片',
  //       component:allphoto
  //     },
  //     {
  //       path:'people',
  //       name:'人物相册',
  //       component:people
  //     },
  //     {
  //       path:'location',
  //       name:'地点相册',
  //       component:location
  //     },
  //     {
  //       path:'recyclebin',
  //       name:'回收站',
  //       component:recyclebin
  //     },
  //     {
  //       path:'album',
  //       name:'相册',
  //       component:album
  //     },
  //     {
  //       path:'recent',
  //       name:'最近照片',
  //       component:recent
  //     },
  //   ]

  // }