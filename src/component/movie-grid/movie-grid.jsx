import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import MovieCard from '../moviecard/moviecard'
import Button, { OutlineButton } from '../button/button'
import Input from '../input/Input'
import './movie-grid.scss'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
const Moviegrid = (props) => {
    const {t} = useTranslation();

    const [items,setitems] = useState([]);
    const [page,setpage] = useState(1);
    const [totalpage,settotalpage] = useState(0)

    const {keyword} = useParams();

    const loadMore = async () => {
        let res = null;
        if(keyword === undefined){
            const params = {
                page:page+1
            };
            switch (props.category) {
                case category.movie:
                    res = await tmdbApi.getMovieList(movieType.upcoming,{params})
                    break;
            
                default:
                  res = await tmdbApi.getTvList(tvType.popular,{params})
            }
        }
        else{
          const params = {query:keyword,page:page+1};
          res = await tmdbApi.search(props.category,{params})
      }
        setitems([...items,...res.results]);
        setpage(page+1)
        //settotalpage(res.total_pages)
      }

    useEffect(() => {
      const getlist = async() =>{
        let res = null;
        if(keyword === undefined){
            const params = {};
            switch (props.category) {
                case category.movie:
                    res = await tmdbApi.getMovieList(movieType.upcoming,{params})
                    break;
            
                default:
                  res = await tmdbApi.getTvList(tvType.popular,{params})
            }
        }
        else{
          const params = {query:keyword};
          res = await tmdbApi.search(props.category,{params})
      }
        setitems(res.results);
          settotalpage(res.total_pages)
      }
      getlist()
      
    }, [props.category,keyword])
    
  return (
    <>
    <div className="section mb-3">
      <MovieSearch keyword={keyword} category={props.category} />
    </div>
    <div className='movie-grid'>
        {items.map((item,i) => <MovieCard key={i} item={item} category={props.category} />)}
    </div>
    {page < totalpage ? (
        <div className='movie-grid__loadmore'>
            <OutlineButton className="small" onClick={loadMore}>{t('load_more')}</OutlineButton>
        </div>
    ) : null}
    </>
  )
}

const MovieSearch = props => {
  const {t} = useTranslation();

  const naviagate = useNavigate();
  const [keyword,setkeyword] = useState(props.keyword ? props.keyword : "")

  const gotoSearch = useCallback(
    () => {
      if(keyword.trim().length > 0){
        naviagate(`/${category[props.category]}/search/${keyword}`)
      }
    }, [keyword,props.category,naviagate]
  );

  useEffect(() => {
    const enterevent = e => {
      e.preventDefault();
      if(e.keyCode === 13){
        gotoSearch();
      }
    }

    document.addEventListener('keyup',enterevent);
  
    return () => {
      document.removeEventListener('keyup',enterevent);
    }
  }, [keyword,gotoSearch])
  

  return (
    <div className="movie-search">
      <Input type='text' placeholder={t('enter_keyword')} value={keyword} onChange={e => setkeyword(e.target.value)}/>
      <Button className='small' onClick={gotoSearch}>{t('search')}</Button>
    </div>
  )
}

export default Moviegrid