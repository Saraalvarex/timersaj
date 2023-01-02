import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddEmpresa from './components/AddEmpresa';
import AddCategoria from './components/AddCategoria';
import Eventos from './components/Eventos';
import Inicio from './components/Inicio';
import AddEvento from './components/AddEvento';
import AddSala from './components/AddSala';


export default class Router extends Component {
  render() {

    function AddSalaElement(){
      var {numsalas} = useParams();
      return (<AddSala numsalas={numsalas}></AddSala>)
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path='/creartemporizadorpag1/' element={<AddEvento/>}/>
          <Route path='/creartemporizadorpag2/:numsalas' element={<AddSalaElement/>}/>
          <Route path='/creartemporizadorpag3/' element={<AddCategoria/>}/>
          <Route path='/addempresa' element={<AddEmpresa/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
        </Routes>
      </BrowserRouter>

    )
  }
}
