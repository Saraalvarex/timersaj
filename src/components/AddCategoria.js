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
        mensaje: "Categoria "+ nombre +" insertada"
      });
    });
  }

  render() {
    return (
        <div>
            <h1 className='display-3 mt-3'>AÑADIR CATEGORIAS</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
            <label>Nombre: </label>
            <input type="text" className='form-control'
            ref={this.cajaNombreRef} required/><br/>
            
            <label>Duración (minutos): </label>
            <input type="number" className='form-control'
            ref={this.cajaDuracionRef} required/><br/>

              <button className='btn btn-primary' onClick={this.crearCategoria}>
                Guardar
              </button>
              <NavLink className='btn btn-info' to={"/creartemporizadorpag4"} >
                Siguiente
              </NavLink>
            </form>

            <h2 style={{color:"red"}}>
              {this.state.mensaje}
            </h2>
        </div>
    )
  }
}