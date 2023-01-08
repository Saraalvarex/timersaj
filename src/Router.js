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
import ListaTemporizadores from './components/ListaTemporizadores';
import Menu from './components/Menu';
// import CountDownGeneral from './components/Timer/CountdownGeneral';
import CreateTempSala from './components/CreateTempSala';

export default class Router extends Component {
  render() {

    function TemporizadorElement(){
      var {idsala} = useParams();
      return (<Temporizador idsala={idsala}/>)
    }

    return (
      <BrowserRouter>
      <Menu/>
      {/* <CountDownGeneral minutes={localStorage.getItem("Estimate duration")}/> */}
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path='/creartemporizadorpag1' element={<AddEvento/>}/>
          <Route path='/creartemporizadorpag2' element={<AddSala/>}/>
          <Route path='/creartemporizadorpag3' element={<AddCategoria/>}/>
          <Route path='/creartemporizadorpag4' element={<AddTemp/>}/>
          <Route path='/temporizador/:idsala' element={<TemporizadorElement/>}/>
          <Route path='/temporizador' element={<Temporizador/>}/>
          <Route path='/salas' element={<ListaTemporizadores/>}/>
          <Route path='/addempresa' element={<AddEmpresa/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
          <Route path='/configuretemp' element={<CreateTempSala/>}/>
        </Routes>
      </BrowserRouter>

    )
  }
}
