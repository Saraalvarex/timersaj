import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class AddSala extends Component {
  cajaNombreRef = React.createRef();

  state = {
    mensaje: "",
    status: false,
    salas: [] // Array para almacenar los nombres de las salas
  }

  enviarSalas = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    var nombre = this.cajaNombreRef.current.value;
    // Agregamos el nombre de la sala al array
    this.setState({ salas: nombre});
    console.log(this.state.salas)
  }

  crearSalas = (e) => {
    console.log(e.target.value)
    // var request = "api/salas/createsala";
    // var url = Global.timer + request;
    // axios.post(url, { salas: this.state.salas }).then(response => {
    //   this.setState({
    //     status: true,
    //     mensaje: "Salas insertadas"
    //   });
    // });
  }

  render() {
    var num = this.props.numsalas;
    console.log(num);
    const inputs = [];

    for (let i = 0; i < num; i++) {
      inputs.push(
        <div key={i}>
          <label>Nombre de sala {i + 1}: </label>
          <input
            type="text"
            className="form-control"
            ref={this.cajaNombreRef}
            onBlur={this.enviarSalas}
            required
          />
          <br/>
        </div>
      );
    }

    if (this.state.status === true) {
      return <Navigate to="/" />;
    }
    return (
      <div>
        <h1>NOMBRES DE SALAS</h1>

        <form style={{ width: "500px", margin: "0 auto" }}>
          {inputs}
          <button className="btn btn-info" onClick={this.crearSalas}>
            Siguiente
          </button>
        </form>

        <h2 style={{ color: "blue" }}>{this.state.mensaje}</h2>
      </div>
    );
  }
}
