import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default class AddSala extends Component {
  cajaNombreRef = React.createRef();

  state = {
    mensaje: "",
    save: false,
    idSala: 0
  }

  crearSala = (e) => {
    e.preventDefault();
    // Obtengo valor del input de la sala introducida
    var nombresala = this.cajaNombreRef.current.value
    console.log(nombresala)
    var request = "/api/salas/createsala/"+nombresala;
    var url = Global.timer + request;
      axios.post(url).then(response => {
        localStorage.setItem("idSala", response.data.idSala)
        // console.log(response.data.idSala)
        this.setState({
          save: true,
          mensaje: "Sala "+nombresala+" guardada",
          idSala: response.data.idSala
        });
      });
  }

  render() {
    return (
      <div className='container-fluid'>
          <div className='d-flex justify-content-between mt-3'>
            {/* <NavLink to="/creartemporizadorpag1">Atrás</NavLink> */}
            <NavLink to="/creartemporizadorpag1"><Icon icon="line-md:chevron-left-circle" color="#0d6efd" width="50" /></NavLink>
          </div>
            <h1 className='display-2 mt-3'>Añadir salas</h1>
            <br/>
            <form className='container-fluid'>
            <label>Nombre: </label>
            <input type="text" className='form-control'
            ref={this.cajaNombreRef} required/><br/>

            {/*<label>Nº de categorías de temporizadores: </label>
            <input type="number" className='form-control'
            ref={this.cajaNumcategoriasRef} required/><br/> */}

              {/* <button className='btn btn-primary me-2' onClick={this.crearSala}>
                Guardar
              </button>
              <NavLink className='btn btn-info' to={"/creartemporizadorpag3"} >
                Siguiente
              </NavLink> */}
              <div className="row">
              <div className="col">
                <button className='btn btn-primary' onClick={this.crearSala}>
                  Guardar
                </button>
              </div>
              <div className="col">
                <NavLink className='btn btn-outline-primary' to={"/creartemporizadorpag3"} >
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