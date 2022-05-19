import React from 'react'
import {useParams } from 'react-router-dom'
import Pageheader from '../component/pageheader/pageheader'
import {category as cate} from '../api/tmdbApi'
import Moviegrid from '../component/movie-grid/movie-grid'
const Catalog = () => {
  const {category} = useParams();
  console.log(category);
  return (
    <div>
      <Pageheader>
        {category==cate.movie ? "movies" : "tv_series"}
      </Pageheader>
      <div className="container">
        <div className="section mb-3">
          <Moviegrid category={category}/>
        </div>
      </div>
    </div>
  )
}

export default Catalog;