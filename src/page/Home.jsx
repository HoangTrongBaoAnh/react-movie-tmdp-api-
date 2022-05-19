import React from 'react'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OutlineButton } from '../component/button/button';
import Heroslide from '../component/heroslide/heroslide';
import MovieList from '../component/movie-list/movieList';
import i18next from 'i18next'

import { category, movieType,tvType } from '../api/tmdbApi'
import { useTranslation } from 'react-i18next';
function Home() {
  const {t} = useTranslation();
  return (
    <>
      <Heroslide />
      <div className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-3'>
            <h2>{t('trending_movie')}</h2>
            <Link to="/movie">
              <OutlineButton className='small' >{t('view_more')}</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.popular} category={category.movie} />
          <div className='section__header mb-2'>
            <h2>{t('top_rated_movie')}</h2>
            <Link to="/movie">
              <OutlineButton className='small' >{t('view_more')}</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.top_rated} category={category.movie} />
          <div className='section__header mb-2'>
            <h2>{t('top_trending_tv')}</h2>
            <Link to="/movie">
              <OutlineButton className='small' >{t('view_more')}</OutlineButton>
            </Link>
          </div>
          <MovieList type={tvType.top_rated} category={category.tv} />
        </div>
      </div>
    </>
  )
}

export default Home;