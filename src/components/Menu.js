import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

import './../App.css';

export default class TestteoApi extends Component {

  state = {
    Empresas: [],
    Categorias:[],
    statusEmp: false,
    statusCat: false
  }
  Get_Empresas = () => {
    var request = "/api/empresas";
    var url = Global.timer + request;
    axios.get(url).then(res=>{
      this.setState({
        Empresas: res.data,
        statusEmp: true
      })
    })
  }
  Get_Categorias = () => {
    var request = "/api/categoriastimer";
    var url = Global.timer + request;
    axios.get(url).then(res=>{
      this.setState({
        Categorias: res.data,
        statusCat: true
      })
    })
  }
  componentDidMount = () => {
    this.Get_Empresas();
    this.Get_Categorias();
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Mis Temporizadores</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href=".">Features</a>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/eventos">Eventos</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="." role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Empresas
          </a>
          <ul className="dropdown-menu">
            {

              this.state.statusEmp === true ?
              (
                this.state.Empresas.map((emp, index) => {
                  return (<li key={index}><button className="dropdown-item">{emp.nombreEmpresa}</button></li>)
                })
              ):(<li><span>Cargando Empresas...</span></li>)
            
            }
            <li><hr className="dropdown-divider"/></li>
            <li><NavLink className="dropdown-item" to="/addEmpresa">Añadir Empresa</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="." role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mis Categorías
          </a>
          <ul className="dropdown-menu">
            {

              this.state.statusCat === true ?
              (
                this.state.Categorias.map((cat, index) => {
                  return (<li key={index}><a className="dropdown-item" href=".">{cat.categoria}</a></li>)
                })
              ):(<li><span>Cargando Categorías...</span></li>)

            }
            <li><hr className="dropdown-divider"/></li>
            <li><NavLink className="dropdown-item" to="/addcategoria">Añadir Categoría</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</nav>
    )
  }
}