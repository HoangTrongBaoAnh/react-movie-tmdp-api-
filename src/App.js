import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './component/header/header'
import Footer from './component/footer/footer'

import Routex from './config/route'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routex />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
