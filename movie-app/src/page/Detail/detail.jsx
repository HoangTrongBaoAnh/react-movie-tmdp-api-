import React from 'react'
import { Link } from "react-router-dom";

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import CastList from './Cartlist';
import VideoList from './VideoList';
import MovieList from '../../component/movie-list/movieList'

import Button from "../../component/button/button";

import './detail.scss'
function Detail() {
  const { category, id } = useParams();
  const [item, setiem] = useState(null);
  useEffect(() => {
    const getdetail = async () => {
      //await tmdbApi.detail(category, id, {params:{}});
      const res = await tmdbApi.detail(category, id, { params: {} });
      setiem(res);
      window.scrollTo(0, 0);
    }
    getdetail();


  }, [category, id])

  const link = '/watch/' + category + '/' + id

  return (
    <>
      {
        item && (
          <>
            <div className='banner' style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>

            </div>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <Link to={link}>
                  <div className="movie-content__poster__img movie-card" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}>
                  <Button>
                    <i className="bx bx-play"></i>
                </Button>
                  </div>
                </Link>
              </div>
              <div className="movie-content__info">
                <h1 className='title'>
                  {item.title || item.name}
                </h1>
                <div className='genres'>
                  {
                    item.genres && item.genres.slice(0, 5).map((gen, index) => (
                      <span className='genres__item' key={index}>{gen.name}</span>
                    ))
                  }
                </div>
                <p className='overview'>{item.overview}</p>
                <div className='cast'>
                  <div >
                    <h2>Casts</h2>
                    <CastList id={item.id} />
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="section mb-3">
                <VideoList id={item.id} />
              </div>
              <div className="section mb-3">
                <div className="section__header mb-3">
                  <h2>Similar</h2>
                </div>
                <MovieList category={category} type="simillar" id={item.id} />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Detail;