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
      <div className="container-fluid">
        <span className="display-5">TEMPORIZADORES</span>
        <div className="d-flex justify-content-center">
        <span className="card" style={{width: "18rem"}}>No tienes temporizadores <NavLink to="/creartemporizadorpag1">Añade uno ahora</NavLink></span>
        </div>
      </div>
      
    );
    }else{
      return (
      <div className="container-fluid">
        <div className="container-fluid">
          {
            this.state.eventos.map((temp, index)=> {
              return(
                <div className="card mt-3 mb-2 shadow" key={index}>
                  <NavLink className="card-header btn btn-light" to="/salas" >
                    <span className="card-title d-flex justify-content-center text-decoration-underline fw-bolder">{temp.nombreEvento}</span>
                  </NavLink>
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
