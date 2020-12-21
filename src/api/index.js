// api
// 命名上的规范
// axios
// import axios from 'axios';
import http from "../http";

//apiLogin({ username: this.username, password: this.password });
export function apiLogin({ username, password }) {
  //返回一个Promise对象
  return (
    http
      .post("/login", {
        username,
        password
      })
  );
}

export function apiGetPhotos() {
  return http.get("/getPhotos");
}

export function apiUpload(file) {
  const formData = new FormData();
  //''
  formData.append("img", file);
  return http.post("/upload", formData).then(res => {
    console.log(res);
  });
}
