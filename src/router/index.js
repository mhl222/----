import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router'
import login from '../views/Login.vue'
import Home from '../views/Home.vue'
import allphoto from  '../components/Allphoto.vue'
import people from  '../components/Album_people.vue'
import sortalbum from  '../components/Album_sort.vue'
import recyclebin from  '../components/Recycle_bin.vue'
import album from  '../components/Album.vue'

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/index',
    redirect: '/index/allphoto'

  },
  {
    path: '/index',
    name: 'Home',
    component: Home,
    children: [
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
        path:'sortalbum',
        name:'聚类相册',
        component:sortalbum
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
     
    ]
  },
 
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: login
  },
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})

export default router
