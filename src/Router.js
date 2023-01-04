import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddEmpresa from './components/AddEmpresa';
import AddCategoria from './components/AddCategoria';
import Eventos from './components/Eventos';
import Inicio from './components/Inicio';
import AddEvento from './components/AddEvento';
import AddSala from './components/AddSala';
import Temporizador from './components/Temporizador';
import AddTemp from './components/AddTemp';
import MenuSalas from './components/Menu';

export default class Router extends Component {
  render() {

    function TemporizadorElement(){
      var {idsala} = useParams();
      return (<Temporizador idsala={idsala}/>)
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path='/creartemporizadorpag1' element={<AddEvento/>}/>
          <Route path='/creartemporizadorpag2' element={<AddSala/>}/>
          <Route path='/creartemporizadorpag3' element={<AddCategoria/>}/>
          <Route path='/creartemporizadorpag4' element={<AddTemp/>}/>
          <Route path='/temporizador/:idsala' element={<TemporizadorElement/>}/>
          <Route path='/temporizador' element={<Temporizador/>}/>
          <Route path='/salas' element={<MenuSalas/>}/>
          <Route path='/addempresa' element={<AddEmpresa/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
        </Routes>
      </BrowserRouter>

    )
  }
}
