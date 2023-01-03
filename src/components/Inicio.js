import React, { Component } from "react";
import '../style/Inicio.css';
import Global from "../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";



export default class Inicio extends Component {

  state = {
    eventos: [],
    categorias: [],
    statusEvento: false
  }

  Get_Eventos = () =>{
    var request = "/api/Eventos";
    var url = Global.timer + request;
    axios.get(url).then(res=> {
      this.setState({
        eventos: res.data,
        statusEvento: true
      });
    });
  }

  Get_Categorias = () => {
    var request = "/api/categoriastimer";
    var url = Global.timer + request;
    axios.get(url).then(res=> {
      this.setState({
        categorias: res.data
      });
    });
  }
  
  componentDidMount = () => {
    this.Get_Eventos();
    this.Get_Categorias()
  }
  
  render() {
    if(this.state.eventos.length === 0){
    return (
      <div className="container">
        <span className="display-5">TEMPORIZADORES</span>
        <span className="Mensaje container-fluid">No tienes temporizadores <a href=".">Añade uno ahora</a></span>
      </div>
    );
    }else{
      return (
      <div className="container">
        <span className="display-5">TEMPORIZADORES</span>
        <div className="container-fluid">
          {
            this.state.eventos.map((temp, index)=> {
              return(
                <div className="card mt-4" key={index}>
                  <div className="card-header">
                    <span className="card-title d-flex justify-content-center">{temp.nombreEvento}</span>
                    <button type="button" class="btn btn-outline-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
                    </svg>
                    </button>
                  </div>
                  <div className="row card-body">
                    <div className="col">
                      <b>Categorias</b>
                    </div>
                    <div className="col">
                      <b>Tiempo</b>
                    </div>
                  </div>
                  {
                    this.state.categorias.map((cat, index)=> {
                      return(
                        <div className="row card-body" key={index}>
                          <div className="col">{cat.categoria}</div>
                          <div className="col">{cat.duracion}'</div>
                        </div>
                      )
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
      );
    }
  }
}
