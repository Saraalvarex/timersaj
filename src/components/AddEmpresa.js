import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import { Icon } from '@iconify/react';

export default class AddEmpresa extends Component {
    state = {
        mensaje: ""
    }

    cajaNombreRef = React.createRef();

    crearEmpresa = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombreRef.current.value;

        var request = "/api/empresas/createEmpresa/"+nombre
        var url = Global.timer + request;
        axios.post(url).then(res=> {
            this.setState({
                mensaje: "¡Has creado la empresa: "+nombre+"!"
            });
        });
    }

  render() {
    return (
      <div>
        
        <div className='d-flex justify-content-between mt-3'>
        <NavLink to="/"><Icon icon="line-md:chevron-left-circle" color="#0d6efd" width="50" /></NavLink>
          </div>
            <h1 className='display-2 mt-2'>Añadir empresas</h1>
            <br/>
            <form className='container-fluid'>
            <label>Nombre: </label>
            <input type="text" className='form-control'
            ref={this.cajaNombreRef} required/><br/>
              <div className="row">
              <div className="col">
                <button className='btn btn-primary' onClick={this.crearEmpresa}>
                  Guardar
                </button>
              </div>
              <div className="col">
                <NavLink className='btn btn-outline-primary' to="/">
                  Salir
                </NavLink>
              </div>
            </div>
            </form>
            <br/>
            <h2 style={{color:"blue"}}>
              {this.state.mensaje}
            </h2>
      </div>
    )
  }
}
