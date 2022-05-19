import React from 'react'
import './footer.scss';
import logo from '../../assets/tmovie.png'
import bg from '../../assets/footer-bg.jpg'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const {t} = useTranslation();
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
            <Link to='/'>{t('home')}</Link>
            <Link to='/'>{t('contact_us')}</Link>
            <Link to='/'>{t('term_of_services')}</Link>
            <Link to='/'>{t('ablout_us')}</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">{t('live')}</Link>
            <Link to="/">{t('faq')}</Link>
            <Link to="/">{t('premium')}</Link>
            <Link to="/">{t('privacy_policy')}</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">{t('you_must_watch')}</Link>
            <Link to="/">{t('recent_release')}</Link>
            <Link to="/">{t('top_imdb')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;