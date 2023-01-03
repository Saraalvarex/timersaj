import React, { Component } from "react";
import '../style/Inicio.css';
import Global from "../Global";
import axios from "axios";
import { NavLink, Navigate } from "react-router-dom";



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
        <span className="Mensaje container-fluid">No tienes temporizadores <NavLink to="/creartemporizadorpag1">Añade uno ahora</NavLink></span>
      </div>
    );
    }else{
      return (
      <div className="container-fluid">
        <div className="container-fluid d-flex justify-content-around mt-3">
          <span className="display-3">TEMPORIZADORES</span>
          <NavLink to="/creartemporizadorpag1" className="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          </NavLink>
        </div>
        <div className="container-fluid">
          {
            this.state.eventos.map((temp, index)=> {
              return(
                <div className="card mt-3 mb-2 shadow" key={index}>
                  <button className="card-header btn btn-light" >
                    <span className="card-title d-flex justify-content-center text-decoration-underline fw-bolder">{temp.nombreEvento}</span>
                  </button>
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
