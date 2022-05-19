import React, { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import tmdbApi, { category } from '../../api/tmdbApi';
import './movie.scss';
import MovieList from '../../component/movie-list/movieList'
import { category as cate } from '../../api/tmdbApi'
import { useTranslation } from 'react-i18next';

const Movie = () => {
    const { category, id } = useParams();
    const [item, setiem] = useState(null);
    const [seasonNumber, setSeasonNumber] = useState(1);
    const [espisode, setEspisode] = useState(1);
    const [seasonEspisode, setseasonEspisode] = useState([]);

    const {t} = useTranslation();

    const getdetail = async () => {
        //await tmdbApi.detail(category, id, {params:{}});
        const res = await tmdbApi.detail(category, id, { params: {} });
        setiem(res);
        window.scrollTo(0, 0);

    }

    const getSeasonEspisode = async () => {
        //await tmdbApi.detail(category, id, {params:{}});
        const res = await tmdbApi.seasonDetail(id, seasonNumber);
        setseasonEspisode(res.episodes);
        //window.scrollTo(0, 0);
    }
    useEffect(() => {
        getdetail();
        if (category == cate.tv) {
            //setSeasonNumber(item.seasons[0].season_number);
            getSeasonEspisode(id, seasonNumber);
            //console.log(seasonNumber);
        }
        console.log(seasonEspisode);

    }, [category, id, seasonNumber, espisode])
    return (
        <>
            {item && (
                <>
                    <div className='mb-3 movie-video container'>
                        <Video item={item} category={category} seasonNumber={seasonNumber} espisode={espisode} />
                    </div>
                    {
                        category == cate.tv && (
                            <div className='mb-3 container'>
                                <div className='season-number mb-3'>
                                    {item.seasons.map(item => (

                                        <div className={`season-number__item ${item.season_number == seasonNumber ? 'active' : ''}`} key={item.id} onClick={() => setSeasonNumber(item.season_number)}>
                                            {t('season')} {item.season_number}
                                        </div>

                                    ))}
                                </div>
                                <div className='season-espisode'>
                                    <div className='season-espisode__container'>
                                        <ul>
                                            {seasonEspisode && seasonEspisode.map(item => (
                                                <li className={`season-espisode__item ${item.episode_number == espisode ? 'active' : ''}`} key={item.id} onClick={() => setEspisode(item.episode_number)}>
                                                    {item.episode_number}
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )

                    }
                    <div className="container">

                        <div className="section mb-3">
                            <div className="section__header mb-3">
                                <h2>{t('similar')}</h2>
                            </div>
                            <MovieList category={category} type="simillar" id={item.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

const Video = (props) => {
    const item = props.item;

    const iframeref = useRef(null);
    useEffect(() => {
        //console.log(item)
        const height = iframeref.current.offsetWidth * 9 / 16 + 'px';
        iframeref.current.setAttribute('height', height);
        console.log(`https://2embed.org/embed/${item.id}/${props.seasonNumber}/${props.espisode}`)
    }, [])
    var src = '';
    props.category === category.tv ? src = `https://2embed.org/embed/${item.id}/${props.seasonNumber}/${props.espisode}` : src = 'https://2embed.org/embed/' + item.id;;
    //const src = 'https://2embed.org/embed/TV_SHOW_IMDB_ID/SEASON/EPISODE'
    //const src = 'https://2embed.org/embed/' + item.id;;
    return (
        <div className='video'>
            <div className="video__title">
                <h2>{item.title}</h2>
            </div>
            <iframe
                src={src}
                ref={iframeref}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default Movie