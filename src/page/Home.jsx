import React from 'react'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OutlineButton } from '../component/button/button';
import Heroslide from '../component/heroslide/heroslide';
import MovieList from '../component/movie-list/movieList';

import { category, movieType,tvType } from '../api/tmdbApi'

function Home() {
  return (
    <>
      <Heroslide />
      <div className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-3'>
            <h2>Trending Movie</h2>
            <Link to="/movie">
              <OutlineButton className='small' >View More</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.popular} category={category.movie} />
          <div className='section__header mb-2'>
            <h2>Top Rated Movie</h2>
            <Link to="/movie">
              <OutlineButton className='small' >View More</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.top_rated} category={category.movie} />
          <div className='section__header mb-2'>
            <h2>Top trending Tvs</h2>
            <Link to="/movie">
              <OutlineButton className='small' >View More</OutlineButton>
            </Link>
          </div>
          <MovieList type={tvType.top_rated} category={category.tv} />
        </div>
      </div>
    </>
  )
}

export default Home;