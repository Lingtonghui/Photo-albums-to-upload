const Koa = require("koa");
//托管静态资源文件服务代理
const serve = require("koa-static");
//对从服务器中post请求到服务器的数据进行封装以便使用的中间件
const koaBody = require("koa-body");
//可以用来处理动态路由
const Router = require("koa-router");

//后端上传文件的逻辑 module.exports=async ctx=>{//todo..}
//功能是保存图片到本地和保存到数据库
const upload = require("./lib/upload");

//后端用户登录的逻辑 module.exports=async ctx=>{//todo..}
//功能是判断用户输入的账号密码是否与数据库一致
//如果一致则登录成功并使用第三方库生成了一个可以鉴权的token
const login = require("./lib/login");

//后端获取数据库中全部照片的逻辑
const getPhotos = require("./lib/getPhotos");

//后端获取数据库中对应的照片的逻辑
//SELECT * FROM photos WHERE uId=? AND id=?
const getPhoto = require("./lib/getPhoto");

//后端连接数据库和拉取数据库数据的逻辑
const db = require("./lib/db");


const koaJwt = require("koa-jwt");
const { SECRET } = require("./lib/config");

db.initDB();

const app = new Koa();

//解决接收二进制文件的问题(这里指的是图片)
app.use(
  koaBody({
    multipart: true
  })
);

//托管静态资源文件服务代理
app.use(serve(__dirname + "/static"));

//会自己去判断token是否是伪造的 因为每个请求都会来走一遍中间件
app.use(koaJwt({ secret: SECRET }).unless({ path: [/^\/login/] }));

const router = new Router();


//向后端发起请求时的对应逻辑
router.post("/upload", upload);
router.post("/login", login);
router.get("/getPhotos", getPhotos);
router.get("/getPhoto", getPhoto);



app.use(router.routes());
app.listen(8081);
