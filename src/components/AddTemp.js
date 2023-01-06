import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class AddTemp extends Component {
  cajaInicioRef = React.createRef();

  state = {
    categorias: [],
    mensaje: "",
    status: false,
    selectedId: 0
  }

  cargarSelect = () => {
    var request ="/api/categoriastimer"
    var url = Global.timer+request;
    axios.get(url).then(res=>{
        this.setState({
            categorias: res.data
        })
    })
  }

  handleChange = (event) => {
    // Obtener el valor del elemento seleccionado
    const selectedId = event.target.value;
    // Actualizar el estado con el valor seleccionado
    this.setState({ selectedId: selectedId });
  }

  crearTemp = (e) => {
    e.preventDefault();
    var request = "/api/timers";
    var url = Global.timer + request;
    // var id = this.cajaNombreRef.current.value;
    var inicio = this.cajaInicioRef.current.value;
    console.log(this.state.selectedId)
    var temp = {
        idTemporizador: 0,
        inicio: inicio,
        idCategoria: this.state.selectedId,
        pausa: false
    };

    axios.post(url, temp).then(response => {
      this.setState({
        status: true,
        mensaje: "Temporizador insertado"
      });
    });
  }

  componentDidMount = () => {
    this.cargarSelect();
  }

  render() {
    // if (this.state.status == true){
    //   return (<Navigate to="/"/>);
    // }
    return (
        <div>
            <h1>TEMPORIZADORES</h1>
            
            <form className='container-fluid'>
              <label>Categoría:</label>
                <select className='form-control' onChange={this.handleChange}>
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

              <button className='btn btn-primary me-2' onClick={this.crearTemp}>
                Guardar
              </button>
              <NavLink className='btn btn-info' to="/" >
                Salir
              </NavLink>
            </form>

            <h2 style={{color:"blue"}}>
              {this.state.mensaje}
            </h2>
        </div>
    )
  }
}