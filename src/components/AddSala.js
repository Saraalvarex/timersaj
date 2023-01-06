import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class AddSala extends Component {
  cajaNombreRef = React.createRef();

  state = {
    mensaje: "",
    save: false
  }

  crearSala = (e) => {
    e.preventDefault();
    // Obtengo valor del input de la sala introducida
    var nombresala = this.cajaNombreRef.current.value
    console.log(nombresala)
    var request = "/api/salas/createsala/"+nombresala;
    var url = Global.timer + request;
      axios.post(url).then(response => {
        this.setState({
          save: true,
          mensaje: "Sala "+nombresala+" guardada"
        });
      });
  }

  render() {
    return (
        <div>
            <h1 className='display-2 mt-3'>AÑADIR SALAS</h1>
            
            <form className='container-fluid'>
            <label>Nombre: </label>
            <input type="text" className='form-control'
            ref={this.cajaNombreRef} required/><br/>

            {/*<label>Nº de categorías de temporizadores: </label>
            <input type="number" className='form-control'
            ref={this.cajaNumcategoriasRef} required/><br/> */}

              <button className='btn btn-primary me-2' onClick={this.crearSala}>
                Guardar
              </button>
              <NavLink className='btn btn-info' to={"/creartemporizadorpag3"} >
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