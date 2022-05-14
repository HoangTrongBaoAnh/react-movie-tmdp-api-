import React from 'react'
import {Route,Routes } from 'react-router-dom';

import Home from '../page/Home';
import Catalog from '../page/catalog';
import Detail from '../page/Detail/detail';
import Movie from '../page/Movie/Movie';


 const route = () => {
  return (
    <Routes >
        <Route
            path='/:category/search/:keyword'
            element={<Catalog/>}
        />
        <Route
            path='/:category/:id'
            element={<Detail/>}
        />
        <Route
            path='/:category'
            element={<Catalog/>}
        />
        <Route
            path='/watch/:category/:id'
            element={<Movie/>}
        />
        <Route
            path="/"
            exact
            element={<Home />}
        />
    </Routes >
  )
}

export default route;

