import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class AddSala extends Component {

    cajaNumcategoriasRef = React.createRef();

    constructor(props) {
        super(props);
        this.cajaNombreRefs = [];
        for (let i = 0; i < props.numsalas; i++) {
          this.cajaNombreRefs.push(React.createRef());
        }
      }

  state = {
    mensaje: "",
    status: false
  }

  crearSala = (e) => {
    e.preventDefault();
    // Obtengo los valores de los elementos de entrada
    var values = this.cajaNombreRefs.map(ref => ref.current.value);
    console.log(values); // [valorDeEntrada1, valorDeEntrada2, ...]

    var request = "api/salas/createsala/";
    var url = Global.timer;
    //Hago post para cada valor del array
    values.forEach(value => {
        axios.post(url + request + value).then(response => {
          this.setState({
            status: true,
            mensaje: "Sala insertada"
          });
        });
      });
  }

  render() {
    var numsalas = this.props.numsalas
    const inputs = [];

    for (let i = 0; i < numsalas; i++) {
        inputs.push(
            <label key={i}>Nombre de sala {i+1}: </label>,<input type="text" className='form-control' key={i} ref={this.cajaNombreRefs[i]} required/>, <br/>
        );
      }

    if (this.state.status === true){
        return (<Navigate to={"/creartemporizadorpag3/"+this.cajaNumcategoriasRef.current.value}/>);
    }
    return (
        <div>
            <h1>NOMBRES DE SALAS</h1>
            
            <form style={{width: "500px", margin: "0 auto"}}>
                {inputs}

            <label>Nº de categorías de temporizadores: </label>
            <input type="number" className='form-control'
            ref={this.cajaNumcategoriasRef} required/><br/>

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