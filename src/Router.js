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


export default class Router extends Component {
  render() {

    function AddSalaElement(){
      var {numsalas} = useParams();
      return (<AddSala numsalas={numsalas}></AddSala>)
    }

    function AddCategoriaElement(){
      var {numcategorias} = useParams();
      return (<AddCategoria numcategorias={numcategorias}></AddCategoria>)
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path='/creartemporizadorpag1/' element={<AddEvento/>}/>
          <Route path='/creartemporizadorpag2/:numsalas' element={<AddSalaElement/>}/>
          <Route path='/creartemporizadorpag3/:numcategorias' element={<AddCategoriaElement/>}/>
          <Route path='/temporizador' element={<Temporizador/>}/>
          <Route path='/addempresa' element={<AddEmpresa/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
        </Routes>
      </BrowserRouter>

    )
  }
}
