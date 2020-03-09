import React from 'react'
import MovieForm from '../../components/MovieForm'
import { MovieService } from '../../services/MovieServices'



export default function AddMovie() {
  return (
    <div>
      <MovieForm onFinish={async movie => {
        const res = await MovieService.add(movie)
        if (res.data) {
          return "";
        } else {
          return res.err
        }
      }} />
    </div>
  )
}