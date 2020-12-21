import axios from "axios";
import store from "./store";
import router from "./router";

// dev -> /api
// prod -> xxxx 线上的服务地址
// /api/login
const myAxios = axios.create({
  baseURL: "/api"
});

// 请求接口的时候 -》 请求拦截器
// token
myAxios.interceptors.request.use(config => {
  const token = store.state.token;
  // headers
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }

  return config;
});

// 响应拦截
myAxios.interceptors.response.use(
  res => res,
  err => {
    // 401 403 ....
    switch (err.response.status) {
      //返回失败的状态码可以和后端约定好
      //如果没有带token请求页面时返回的状态码
      case 401:
        // alert("请去登录页面");
        router.replace({
          name: "Login"
        });
        break;
    }
  }
);

export default myAxios;
