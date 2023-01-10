import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink, Navigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
export default class AddEvento extends Component {
//El numero de categorias lo necesitamos para la siguiente pantalla
  cajaNumeroRef = React.createRef();
  cajaNombreRef = React.createRef();
  cajaInicioRef = React.createRef();
  cajaFinRef = React.createRef();

  state = {
    mensaje: "",
    status: false
  }

  crearEvento = (e) => {
    e.preventDefault();
    var request = "/api/eventos";
    var url = Global.timer + request;
    // var numero = parseInt(this.cajaNumeroRef.current.value);
    var nombre = this.cajaNombreRef.current.value;
    var inicio = this.cajaInicioRef.current.value;
    var fin = this.cajaFinRef.current.value;

    var evento = {
        idEvento: 0,
        nombreEvento: nombre,
        inicioEvento: inicio,
        finEvento: fin
    };

    axios.post(url, evento).then(response => {
      localStorage.setItem("idEvento", response.data.idEvento)
      this.setState({
        status: true,
        mensaje: "Evento insertado"
      });
    });
  }

  render() {
    if (this.state.status === true){
      return (<Navigate to={"/creartemporizadorpag2"}/>);
    }
    return (
        <div className='container-fluid'>
          <div className='d-flex justify-content-between mt-3'>
            <NavLink to="/"><Icon icon="line-md:chevron-left-circle" color="#0d6efd" width="50" /></NavLink>
          </div>
            <h1 className='display-2 mt-3'>Crear evento</h1>
            <br/>
            <form className='container-fluid'>
                <label>Nombre: </label>
                <input type="text" className='form-control'
                ref={this.cajaNombreRef} required/><br/>
              <div className="row">
                <div className="col">
                <label>Inicio:</label>
                  <input type="datetime-local" className='form-control' ref={this.cajaInicioRef} defaultValue={new Date().toISOString().substr(0, 16)} required/>
                </div>
                <div className="col">
                <label>Fin: </label>
                  <input type="datetime-local" className='form-control' ref={this.cajaFinRef} defaultValue={new Date().toISOString().substr(0, 16)} required/><br/>
                </div>
              </div>
              <br/>
              <div className="row">
              <div className="col">
                <button className='btn btn-primary' onClick={this.crearEvento}>
                  Guardar
                </button>
              </div>
              <div className="col">
                <NavLink className='btn btn-outline-primary' to={"/creartemporizadorpag2"} >
                  Siguiente
                </NavLink>
              </div>
            </div>
            <br/>
              <h2 style={{color: "blue"}}>{this.state.mensaje}</h2>
            </form>
        </div>
    )
  }
}