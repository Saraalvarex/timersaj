import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddEmpresa from './components/AddEmpresa';
import AddCategoria from './components/AddCategoria';
import Eventos from './components/Eventos';
import Inicio from './components/Inicio';
import AddEvento from './components/AddEvento';
import AddSala from './components/AddSala';


export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path='/creartemporizadorpag1/' element={<AddEvento/>}/>
          <Route path='/creartemporizadorpag2/' element={<AddCategoria/>}/>
          <Route path='/creartemporizadorpag3/' element={<AddSala/>}/>
          <Route path='/addempresa' element={<AddEmpresa/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
        </Routes>
      </BrowserRouter>

    )
  }
}
