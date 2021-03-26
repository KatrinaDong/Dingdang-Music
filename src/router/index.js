import Vue from 'vue'
import VueRouter from 'vue-router'
// import Recommend from '@/views/Recommend'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/recommend'
  },
  {
    path:'/recommend',
    // component:Recommend
    component:()=>import('@/views/Recommend'),
    meta:{title:'',showNav:true,keepAlive:true}
  },
  {
    path:'/hot',
    component:()=>import('@/views/Hot'),
    meta:{title:'',showNav:true,keepAlive:true}
  },
  {
    path:'/search',
    component:()=>import('@/views/Search'),
    meta:{title:'',showNav:true,keepAlive:true}
  },
  {
    path:'/playlist/:id',
    component:()=>import('@/views/PlayList')
  },
  {
    path:'/singerdetail/:id',
    component:()=>import('@/views/SingerDetail')
  },
  {
    path:'/albumdetail/:id',
    component:()=>import('@/views/AlbumDetail')
  },
 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
