import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class AddSala extends Component {
  cajaNombreRef = React.createRef();

  state = {
    mensaje: "",
    status: false
  }

  crearSala = (e) => {
    e.preventDefault();
    var nombre = this.cajaNombreRef.current.value;
    var request = "/api/salas/createsala/"+nombre;
    var url = Global.timer + request;

    axios.post(url).then(response => {
      this.setState({
        status: true,
        mensaje: "Sala insertada"
      });
    });
  }

  render() {
    if (this.state.status == true){
      return (<Navigate to="/"/>);
    }
    return (
        <div>
            <h1>NOMBRES DE SALAS</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
                <label>Nombre de sala: </label>
                <input type="text" className='form-control'
                ref={this.cajaNombreRef} required/><br/>

              <button className='btn btn-info' onClick={this.crearSala}>
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