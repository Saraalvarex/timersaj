import React, { Component } from "react";
import '../style/Inicio.css';
import Global from "../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
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
          {
            this.state.eventos.map((temp, index)=> {
              return(
                <div className="card mt-3 mb-2 shadow d-flex justify-content-between mt-3" key={index}>
                  <NavLink className="card-header btn btn-light" to="/salas" >
                  <div className='d-flex justify-content-between mt-3'>
                    <span className="card-title d-flex justify-content-center fw-bolder evento">{temp.nombreEvento}</span>
                    <Icon icon="material-symbols:play-arrow-outline-rounded" color="#0d6efd" width="42" />
                    </div>
                    <hr/>
                  <div className="row card-body">
                    <div className="col">
                      <b>Categoría</b>
                    </div>
                    <div className="col">
                      <b>Duración</b>
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
                  </NavLink>
                </div>
              );
            })
          }
        </div>
      );
    }
  }
}
