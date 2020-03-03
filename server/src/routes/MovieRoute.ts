import Express from 'express'
import { MovieService } from '../services/MovieService'
import { ResHelper } from './ResHelper'
const router = Express.Router()

//localhost:10086/api/movie/xxxxx      params

//localhost:10086/api/movie?id=xxxxx   query

router.get('/:id', async (req, res) => {
  try {

    const movieID = req.params.id
    const movie = await MovieService.findById(movieID)
    //响应:服务器的接口响应格式,是一种标准格式
    ResHelper.sendData(movie, res)
  } catch{
    ResHelper.sendData(null, res)
  }
})
router.get('/', async (req, res) => {
  const result = await MovieService.find(req.query);
  ResHelper.sendPageData(result, res);
})
router.post('/', async (req, res) => {
  const result = await MovieService.add(req.body)
  if (Array.isArray(result)) {
    ResHelper.sendError(result, res)
  } else {
    ResHelper.sendData(result, res)
  }
})
router.put('/:id', async (req, res) => {
  try {
    const result = await MovieService.update(req.params.id, req.body)
    if (result.length > 0) {
      ResHelper.sendError(result, res)
    } else {
      ResHelper.sendData(true, res)
    }
  } catch {
    ResHelper.sendError("id错误", res)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    await MovieService.delete(req.params.id)
    ResHelper.sendData(true, res)
  } catch {
    ResHelper.sendError("id错误", res)
  }
})

export default router