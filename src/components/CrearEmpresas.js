import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';

export default class CrearEmpresas extends Component {
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
                mensaje: "¡Empresa añadida!"
            });
        });

    }



  render() {
    return (
      <div>
        <h2 className='display-2 mt-2'>Crear Empresas</h2>
        <div className='d-flex justify-content-between mt-3'>
            <NavLink className='btn btn-info ms-2' to="/">Atrás</NavLink>
          </div>
            <h3 className='display-5 mt-3'>Añadir salas</h3>
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
                <NavLink className='btn btn-info' to="/">
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
