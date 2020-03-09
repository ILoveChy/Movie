import Express from 'express'
import path from 'path'
import multer from 'multer'
import { ResHelper } from './ResHelper'
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../public/upload'),
  filename(req, file, cb) {
    //文件名是啥?
    const time = new Date().getTime()
    //后缀名是啥
    const extname = path.extname(file.originalname);
    //设置文件的全称
    cb(null, `${time}${extname}`)
  }
})
const allowdExtensions = [".jpg", ".png", ".gif", ".bmp", ".jpeg", ".tiff"]
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2 //文件最多2M 
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname)
    if (allowdExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('文件类型不正确'))
    }
  }
}).single('imgfile')

const router = Express.Router();

router.post('/', (req, res) => {
  upload(req, res, err => {
    if (err) {
      ResHelper.sendError(err.message, res)
    } else {
      // 一切都好
      const url = `/upload/${req.file.filename}`
      ResHelper.sendData(url, res)

    }


  })
})

export default router