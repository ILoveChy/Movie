import "reflect-metadata"
import Express from "express"
import MovieRouter from './routes/MovieRoute'
import UpLoadRouter from './routes/UpLoadRoute'
import history from 'connect-history-api-fallback'


const app = Express();



app.use(history())
// 设置静态文件路径
app.use('/', Express.static("public/build"))
app.use('/upload', Express.static("public/upload"))


//配置中间件,用于解析请求消息体中的json数据
app.use(Express.json());
//使用postman进行测试
app.use('/api/movie', MovieRouter)
// 文件上传
app.use('/api/upload', UpLoadRouter)

app.listen(10086)