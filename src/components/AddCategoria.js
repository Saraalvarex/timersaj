import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class AddCategoria extends Component {
//El numero de salas lo necesitamos para la siguiente pantalla
  cajaTiempoRef = React.createRef();
  cajaNombreRef = React.createRef();
  cajaNumsalasRef = React.createRef();

  state = {
    mensaje: "",
    status: false
  }

  crearCategoria = (e) => {
    e.preventDefault();
    var request = "/api/categoriastimer";
    var url = Global.timer + request;
    var nombre = this.cajanombreRef.current.value;
    var tiempo = this.cajaTiempoRef.current.value;

    var categoria = {
      idCategoria: 0,
      categoria: nombre,
      duracion: tiempo
    };

    axios.post(url, categoria).then(response => {
      this.setState({
        status: true,
        mensaje: "Periodo insertado"
      });
    });
  }

  render() {
    if (this.state.status === true){
      return (<Navigate to="/"/>);
    }
    return (
        <div>
            <h1>PERIODOS DE TIEMPO</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
                <label>Nombre categoría: </label>
                <input type="text" className='form-control'
                ref={this.cajaNombreRef} required/><br/>

                <label>Tiempo (minutos): </label>
                <input type="number" className='form-control'
                ref={this.cajaTiempoRef} required/><br/>

                <label>Nº de salas: </label>
                <input type="number" className='form-control'
                ref={this.cajaNumsalasRef} required/><br/>

              <button className='btn btn-info' onClick={this.crearCategoria}>
                Siguiente
              </button>

            </form>

            <h2 style={{color:"blue"}}>
              {this.state.mensaje}
            </h2>
        </div>
    )
  }
}