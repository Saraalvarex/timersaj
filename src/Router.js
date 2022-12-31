import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddEmpresa from './components/AddEmpresa';
import AddCategoria from './components/AddCategoria';
import Eventos from './components/Eventos';
import Inicio from './components/Inicio';


export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path='/addempresa' element={<AddEmpresa/>}/>
          <Route path='/addcategoria' element={<AddCategoria/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
        </Routes>
      </BrowserRouter>

    )
  }
}
