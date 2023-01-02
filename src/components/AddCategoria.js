import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class AddCategoria extends Component {

  state = {
    categorias: [],
    nombre : "",
    tiempo : "",
    mensaje: "",
    status: false
  }

  crearCategoria = (event) => {
    event.preventDefault();
  
    const nombre = this.state.nombre;
    const tiempo = this.state.tiempo;
  
    if (nombre === "" || tiempo === "") {
      this.setState({ mensaje: "Por favor, introduce un nombre y un tiempo válidos." });
      return;
    }
  
    const categoria = { idCategoria: tiempo+1, categoria: nombre, duracion: tiempo };
    const categorias = [...this.state.categorias, categoria];
  
    //Hago post para cada valor del array
    categorias.forEach(categoria => {
      var request = "api/categoriastimer/";
      var url = Global.timer + request;
      axios.post(url, categoria).then(response => {
        console.log(response)
        this.setState({
          status: true,
          mensaje: "Categoría insertada"
        });
      });
    });

    this.setState({ categorias: categorias, mensaje: "Categoría agregada correctamente." });
  }

  handleNameChange = (event) => {
    this.setState({ nombre: event.target.value });
  }

  handleTimeChange = (event) => {
    this.setState({ tiempo: event.target.value });
  }

  render() {
    var numcategorias = this.props.numcategorias
    const inputs = [];

    for (let i = 0; i < numcategorias; i++) {
        inputs.push(
            <label key={i}>Nombre de categoria {i+1}: </label>,
            <input type="text" className='form-control' onChange={this.handleNameChange} />,
            <label key={i}>Tiempo (minutos)</label>,
            <input type="number" className='form-control' onChange={this.handleTimeChange} />,
            <br/>
        );
      }

    if (this.state.status === true){
        // return (<Navigate to={"/creartemporizadorpag4/"+this.cajaNumcategoriasRef.current.value}/>);
    }
    return (
        <div>
            <h1>CATEGORIAS DE TIEMPO</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
                {inputs}

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