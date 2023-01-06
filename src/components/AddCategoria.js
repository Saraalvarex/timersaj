import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class AddCategoria extends Component {
  cajaNombreRef = React.createRef();
  cajaDuracionRef = React.createRef();
  
  state = {
    mensaje: "",
    status: false
  }

  crearCategoria = (e) => {
    e.preventDefault();
    var request = "/api/categoriastimer";
    var url = Global.timer + request;
    var nombre = this.cajaNombreRef.current.value;
    var duracion = this.cajaDuracionRef.current.value;

    var categoria = {
      idCategoria: 0,
      categoria: nombre,
      duracion: duracion
    };

    axios.post(url, categoria).then(response => {
      this.setState({
        status: true,
        mensaje: "Categoria "+ nombre +" insertada con una duración de "+ duracion +" minutos"
      });
    });
  }

  render() {
    return (
        <div className='container-fluid'>
          <div className='d-flex justify-content-between mt-3'>
            <NavLink to="/creartemporizadorpag2">Atrás</NavLink>
          </div>
            <h1 className='display-3 mt-3'>Añadir categorías</h1>
            <br/>
            <form className='container-fluid'>
            <label>Nombre: </label>
            <input type="text" className='form-control'
            ref={this.cajaNombreRef} required/><br/>
            
            <label>Duración (minutos): </label>
            <input type="number" className='form-control'
            ref={this.cajaDuracionRef} required/><br/>

            <div className="row">
              <div className="col">
                <button className='btn btn-primary' onClick={this.crearCategoria}>
                  Guardar
                </button>
              </div>
              <div className="col">
                <NavLink className='btn btn-outline-primary' to={"/creartemporizadorpag4"} >
                  Siguiente
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