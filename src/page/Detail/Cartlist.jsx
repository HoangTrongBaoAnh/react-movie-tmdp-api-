import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
const Cartlist = (props) => {
    const {category} = useParams();

    const [casts,setcasts] = useState([]);
    useEffect(() => {
      const getcredits = async() => {
          const res = await tmdbApi.credits(category,props.id);
          setcasts(res.cast.slice(0,5));
      }
      getcredits();
    
      
    }, [category,props.id])
    
  return (
    <div className='casts'>
        {
            casts.map((item,index) => (
                <div key={index} className="casts__item">
                    <div className='casts__item__img' style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}> 

                    </div>
                    <p className='casts__item__name'>{item.name}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Cartlist