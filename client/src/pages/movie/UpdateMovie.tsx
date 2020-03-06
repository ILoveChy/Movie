import React, { useState } from 'react'
import { RouteComponentProps, useParams, useRouteMatch, useHistory, useLocation } from 'react-router';
import { Button } from 'antd';
interface IParams {
  id: string
}
export default function EditMovie(props: RouteComponentProps<IParams>) {


  const [movieId, setMovieId] = useState(useParams<IParams>().id);
  console.log(useRouteMatch(), useHistory(), useLocation());

  return (
    <div>
      <h1>修改电影页</h1>
      <p>电影id:{movieId}</p>
      <Button type="primary" onClick={(e) => {
        setMovieId(movieId + e.clientX)
      }}>点我</Button>
    </div>
  )
}


