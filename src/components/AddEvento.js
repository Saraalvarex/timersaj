import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

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
    var request = "api/eventos";
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
      this.setState({
        status: true,
        mensaje: "Evento insertado"
      });
    });
  }

  render() {
    if (this.state.status === true){
      return (<Navigate to={"/creartemporizadorpag2/"+this.cajaNumeroRef.current.value}/>);
    }
    return (
        <div>
            <h1>EVENTO</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
                <label>Nombre: </label>
                <input type="text" className='form-control'
                ref={this.cajaNombreRef} required/><br/>

                <div style={{display: "inline-block"}}>
                <label>Inicio:</label>
                <input type="datetime-local" className='form-control'
                ref={this.cajaInicioRef} required/>
                </div>
                <div style={{display: "inline-block"}}>
                <label>Fin: </label>
                <input type="datetime-local" className='form-control'
                ref={this.cajaFinRef} required/><br/>
                </div>

                <label>Nº de salas: </label>
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