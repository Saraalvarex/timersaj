import React, { Component } from "react";
import '../style/Inicio.css';
import Global from "../Global";
import axios from "axios";



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
    //this.Get_Eventos();
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
                <div className="card" key={index}>
                  <span className="card-title card-header">{temp.nombreEvento}</span>
                  <div className="row">
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
                        <div className="row" key={index}>
                          <div className="col">{cat.categoria}</div>
                          <div className="col">{cat.duracion}</div>
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
