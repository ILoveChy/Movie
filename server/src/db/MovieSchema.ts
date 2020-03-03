import { Schema, Document, model } from 'mongoose'
import { Movie } from '../model/Movie'

export interface IMovie extends Movie, Document { }

const movieSchema = new Schema<IMovie>({
  name: String,
  types: [String],
  areas: [String],
  timeLong: Number,
  isHot: Boolean,
  isClassic: Boolean,
  isComing: Boolean,
  description: String,
  poster: String
}, {
  versionKey: false
})

export default model<IMovie>("Movie", movieSchema);