import React from 'react'
import './pageheader.scss';

import bg from '../../assets/footer-bg.jpg';
import { useTranslation } from 'react-i18next';


const Pageheader = (props) => {
  const {t} = useTranslation();
  return (
    <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
        <h2>{t(props.children)}</h2>
    </div>
  )
}

export default Pageheader