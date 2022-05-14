import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './movie-list.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Moviecard from '../moviecard/moviecard';
const MovieList = (props) => {

  const [itemList, setitemList] = useState([]);
  useEffect(() => {
    
    const getMovieList = async () => {
      let res = null;
      const params = {};
      
      if (props.type !== 'simillar') {

        switch (props.category) {
          case category.movie:
            res = await tmdbApi.getMovieList(props.type, { params })

            break;
          default:
            res = await tmdbApi.getTvList(props.type, { params })

            break;
        }
      }
      else {
        res = await tmdbApi.similar(props.category, props.id);
      }
      setitemList(res.results);

    }
    getMovieList();
   
  }, [])
  

  return (
    <div className='movie-list'>
      <Swiper
      grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {itemList.map((item, i) => (
          <SwiperSlide key={i}>
            <Moviecard item={item} category={props.category}/>
            {/* <img src={apiConfig.w500Image(item.poster_path)} alt=""/>   */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

MovieList.proType = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default MovieList