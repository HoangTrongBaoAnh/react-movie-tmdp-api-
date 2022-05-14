import React, { useRef, useEffect } from 'react'
import logo from '../../assets/tmovie.png'
import './header.scss'
import { useLocation, Link } from 'react-router-dom'
const headerNav = [
  {
    displaY: 'Home',
    path: '/'
  },
  {
    displaY: 'Movies',
    path: '/movie'
  },
  {
    displaY: 'TV Series',
    path: '/tv'
  },
]

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex(e => e.path === pathname);
  useEffect(() => {
    const shrinkHeader = () => {
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        headerRef.current.classList.add('shrink');
      }
      else{
        headerRef.current.classList.remove('shrink');
      }
    }
    window.addEventListener('scroll',shrinkHeader);
    return () => {
      window.addEventListener('scroll',shrinkHeader);
    }
  },[]);
  return (
    <div ref={headerRef} className="header">
      <div className='header__wrap container'>
        <div className='logo' alt="logo">
          <img src={logo} />
          <Link to="/">tmovies</Link>
        </div>
        <ul className='header__nav'>
          {

            headerNav.map((e, i) => (
              //console.log(headerNav),
              <li key={i} className={`${i === active ? 'active' : ''}`}>
                <Link to={e.path}>{e.displaY}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Header;
