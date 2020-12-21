import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Photo from "../views/Photo.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      isAuth: false
    }
  },
  {
    path: "/photo",
    name: "Photo",
    component: Photo,
    meta: {
      isAuth: true
    }
  },

  // 动态加载
  // 优化
  {
    path: "/detail/:id",
    name: "Detail",
    props: true,

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      // webpack 打包的时候切分用的
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  },
  {
    path: "/",
    redirect:'/login'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // login -> 不需要检测
  // photo -> 需要
  // route 路由对象
  if (to.meta.isAuth) {
    // 需要检测有没有 token
    if (store.state.token) {
      next();
    } else {
      next({
        name: "Login"
      });
    }
  } else {
    next();
  }
});

export default router;
