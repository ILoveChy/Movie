import React, { useState, useEffect } from 'react'
import { RouteComponentProps, useParams } from 'react-router';
import MovieForm from '../../components/MovieForm';
import { MovieService, IMovie } from '../../services/MovieServices';
interface IParams {
  id: string
}

const EditMovie = (props: RouteComponentProps<IParams>) => {

  const [movie, setMovie] = useState<IMovie>(undefined);
  const [movieId] = useState(useParams<IParams>().id);
  useEffect(
    () => {
      const result = MovieService.getMovieById(movieId)
      result.then(res => {
        setMovie(res.data);
      })
    }, []);

  return (
    <div>
      <MovieForm
        onFinish={async movie => {
          const res = await MovieService.update(movieId, movie)
          if (res.data) {
            return "";
          } else {
            return res.err
          }
        }}
        movie={movie}
      />
    </div>
  )
}

export default EditMovie

