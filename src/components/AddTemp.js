import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class AddTemp extends Component {
  cajaTiempoRef = React.createRef();
  cajaNombreRef = React.createRef();
  cajaInicioRef = React.createRef();

  state = {
    mensaje: "",
    status: false
  }

  crearTemp = (e) => {
    e.preventDefault();
    var request = "/api/timer";
    var url = Global.timer + request;
    var nombre = this.cajanombreRef.current.value;
    var inicio = this.cajaInicioRef.current.value;

    var temp = {
        idTemporizador: 0,
        inicio: inicio,
        idCategoria: 0,
        pausa: false
    };

    axios.post(url, temp).then(response => {
      this.setState({
        status: true,
        mensaje: "Periodo insertado"
      });
    });
  }

  render() {
    if (this.state.status == true){
      return (<Navigate to="/"/>);
    }
    return (
        <div>
            <h1>PERIODOS DE TIEMPO</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
                <label>Nombre: </label>
                <input type="text" className='form-control'
                ref={this.cajaNombreRef} required/><br/>

                <label>Inicio: </label>
                <input type="datetime-local" className='form-control'
                ref={this.cajaInicioRef} required/><br/>
                <label>Fin: </label>
                <input type="datetime-local" className='form-control'
                ref={this.cajaFinRef} required/><br/>

                <label>Nº de categorías de temporizadores: </label>
                <input type="number" className='form-control'
                ref={this.cajaNumeroRef} required/><br/>

              <button className='btn btn-info' onClick={this.crearEvento}>
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