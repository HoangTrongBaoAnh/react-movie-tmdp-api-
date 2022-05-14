import React, { useEffect, useRef, useState } from 'react'
import tmdbApi, {category,movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

import Button, { OutlineButton } from '../button/button';
import Modal, { ModalContent } from '../modal/modal';
import './heroslide.scss'
const Heroslide = () => {
    SwiperCore.use([Autoplay]);
    const [movieitems,setmovieitems] = useState([]);
    useEffect(() => {
      const getMovieItem = async() => {
        const params = {page:1};
        try{
            const res = await tmdbApi.getMovieList(movieType.popular,{params});
            setmovieitems(res.results.slice(1,4));
            console.log(res)
        }
        catch{
            console.log('error');
        }
      }
      getMovieItem();
    }, [])
    
  return (
    <div className='hero-slide'>
        <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                    movieitems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({isActive}) => (
                                <Heroslideitems item={item} className={`${isActive ? 'active' : ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieitems.map((item,i) => (
                    <TrailerModal key={i} item={item} />
                ))
            }
    </div>
  )
}

const Heroslideitems = props =>{
    let navigate = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path?item.backdrop_path:item.poster_path);

    const setModalACtive = async () => {
        
        const modal = document.querySelector(`#modal_${item.id}`);

       // console.log(modal)

        const video = await tmdbApi.getVideo(category.movie,item.id);

        if(video.results.length > 0){
            const videoSrc = "https://www.youtube.com/embed/" + video.results[0].key;
            //console.log(videoSrc)
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
            
        }
        else{
            modal.querySelector('.modal__content').innerHTML('No trailer');
        }

        modal.classList.toggle('active');

    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
            <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={()=> setModalACtive()}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
            
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);
    const onClose = () =>{
        iframeRef.current.setAttribute('src', '');
    }
    return (
        <Modal active={props.active} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width='100%' height='500px' title='trailer'></iframe>
            </ModalContent>

        </Modal>
    )
}

export default Heroslide