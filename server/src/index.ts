import "reflect-metadata"
import Express from "express"
import MovieRouter from './routes/MovieRoute'
import UpLoadRouter from './routes/UpLoadRoute'
const app = Express();
app.use(Express.json()); //配置中间件,用于解析请求消息体中的json数据


//使用postman进行测试
app.use('/api/movie', MovieRouter)

// 设置静态文件路径
app.use('/upload', Express.static("public/upload"))

// 文件上传
app.use('/api/upload', UpLoadRouter)
app.listen(10086)