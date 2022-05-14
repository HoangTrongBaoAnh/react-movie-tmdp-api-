import React from 'react'
import './footer.scss';
import logo from '../../assets/tmovie.png'
import bg from '../../assets/footer-bg.jpg'
import { Link } from 'react-router-dom';

function footer() {
  return (
    <div className='footer' style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__contennt container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to='/'>TMovies</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to='/'>Home</Link>
            <Link to='/'>contact us</Link>
            <Link to='/'>Term of services</Link>
            <Link to='/'>Ablout us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default footer;