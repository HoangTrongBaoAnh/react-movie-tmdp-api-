import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'
const VideoList = (props) => {
    const { category } = useParams();

    const [videos, setvideos] = useState([]);

    useEffect(() => {
        const getvideos = async () => {
            const res = await tmdbApi.getVideo(category, props.id);
            setvideos(res.results.slice(0, 5));
        }

        getvideos();


    }, [category, props.id])
    return (
        <>
        {
            videos.map((item,index) => (
                <Video key={index} item={item}/>
            ))
        }
        </>
    )
}

const Video = (props) => {
    const item = props.item;

    const iframeref = useRef(null);
    useEffect(() => {
        const height = iframeref.current.offsetWidth * 9 / 16 + 'px';
        iframeref.current.setAttribute('height',height);
    },[])
    return (
        <div className='video'>
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeref}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default VideoList