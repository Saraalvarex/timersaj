import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class AddTemp extends Component {
  cajaInicioRef = React.createRef();
 
  state = {
    categorias: [],
    salas: [],
    mensaje: "",
    status: false,
    save: false,
    selectedIdCategoria: 0,
    selectedIdSala: 0,
    idTemp: 0
  }

  cargarSelectCategorias = () => {
    var request ="/api/categoriastimer"
    var url = Global.timer+request;
    axios.get(url).then(res=>{
        this.setState({
            categorias: res.data
        })
    })
  }

  cargarSelectSalas = () => {
    var request ="/api/salas"
    var url = Global.timer+request;
    axios.get(url).then(res=>{
        this.setState({
            salas: res.data
        })
    })
  }

  handleChangeSala = (event) => {
    // Obtener el valor del elemento seleccionado
    const selectedIdSala = event.target.value;
    // Actualizar el estado con el valor seleccionado
    this.setState({ selectedIdSala: selectedIdSala });
  }

  handleChangeCategoria = (event) => {
    // Obtener el valor del elemento seleccionado del select de categoria
    const selectedIdCategoria = event.target.value;
    // Actualizar el estado con el valor seleccionado
    this.setState({ selectedIdCategoria: selectedIdCategoria });
  }

  //Creamos temporizador y "Tiempos-empresas-salas"
  crearTemp = (e) => {
    e.preventDefault();
    var requestTimers = "/api/timers";
    var url = Global.timer
    var inicio = this.cajaInicioRef.current.value;
    var temp = {
        idTemporizador: 0,
        inicio: inicio,
        idCategoria: this.state.selectedId,
        pausa: false
    };

    axios.post(url+requestTimers, temp).then(response => {
      this.setState({
        status: true,
        idTemp: response.idTemporizador,
        mensaje: "Temporizador insertado"
      });
    });

    var requestTiempos = "/api/tiempoempresasala";
    var registro = {
      id: 1,
      idTimer: this.state.idTemp,
      idEmpresa: 4,
      idSala: this.state.selectedIdSala,
      idEvento: localStorage.getItem("idEvento")
    };

    axios.post(url+requestTiempos, registro).then(response => {
      this.setState({
        save: true
      });
    });

  }

  componentDidMount = () => {
    this.cargarSelectCategorias();
    this.cargarSelectSalas();
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-between mt-3'>
          <NavLink to="/creartemporizadorpag3">Atrás</NavLink>
        </div>

            <h1 className='display-3 mt-3'>Añadir temporizadores</h1>
            <br/>
            <form style={{width: "500px", margin: "0 auto"}}>

            <label>Sala:</label>
                <select className='form-control' onChange={this.handleChangeSala}>
                  {this.state.salas.map((sala) => (
                    <option className="form-control" key={sala.idSala} value={sala.idSala}>
                      {sala.nombreSala}
                    </option>
                  ))}
                </select>
              <br/>

              <label>Categoría:</label>
                <select className='form-control' onChange={this.handleChangeCategoria}>
                  {this.state.categorias.map((categoria) => (
                    <option className="form-control" key={categoria.idCategoria} value={categoria.idCategoria}>
                      {categoria.categoria}
                    </option>
                  ))}
                </select>
                <br/>

                <label>Inicio: </label>
                <input type="datetime-local" className='form-control'
                ref={this.cajaInicioRef} required/><br/>

              <div className="row">
                <div className="col">
                <button className='btn btn-primary' onClick={this.crearTemp}>
                    Guardar
                  </button>
                </div>
                <div className="col">
                <NavLink className='btn btn-outline-primary' to="/" >
                    Terminar y salir
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