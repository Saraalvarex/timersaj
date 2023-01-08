import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

import './../App.css';
import CountDownIndv from './Timer/CountdownIndv';

export default class ListaTemporizadores extends Component {

  state = {
    salas: [],
    statusSalas: false,
    tiempoRestante: localStorage.getItem("countdown")
  }
  Get_Salas = () => {
    var request = "/api/timerEventos";
    var url = Global.timer + request;
    axios.get(url).then(res=>{
      this.setState({
        salas: res.data,
        statusSalas: true
      })
    })
  }

  cambiarColor = () => {
    const interval = setInterval(() => {
      this.setState({
        tiempoRestante: this.state.tiempoRestante - 1
      });

      if (this.state.tiempoRestante <= 180) {
        this.setState({
          estiloDiv: {
            backgroundColor: 'orange'
          }
        });
        if(this.state.tiempoRestante <= 60){
          this.setState({
            estiloDiv: {
              backgroundColor: '#e3463b'
            }
          });
        }
      } else {
        this.setState({
          estiloDiv: {
            backgroundColor: 'white'
          }
        });
      }
    }, 1000);
    console.log(interval);
  }


  componentDidMount = () => {
    this.Get_Salas();
    this.cambiarColor();
  }


  render() {
    return(
      <div className='container-fluid'>
        <div className='d-flex justify-content-between mt-3'>
          <NavLink to="/configuretemp">Añade salas</NavLink>
          <h1 className='display-2 '>Tus salas</h1>
        </div>
        <hr/>
        <div className='container-fluid'>
          {
          this.state.statusSalas === true ?
          (
            this.state.salas.map((sala, index)=> {
              return(
                <div key={index} className="card mb-3 container-fluid" style={this.state.estiloDiv}>
                  <div className="card-img-top">
                    {
                      localStorage.getItem("countdown") ?
                      (<CountDownIndv seconds={localStorage.getItem("countdown")}/>):
                      (<h3 className='display-1'>00:00</h3>)
                    }
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Sala: {sala.sala}</h5>
                    <p className="card-text">Empresa: {sala.empresa}</p>
                    <NavLink to={"/temporizador/"+sala.idSala} className="btn btn-primary">Temporizador</NavLink>
                  </div>
                </div>
              );
            })
          )
          :
          (<h3>No hay salas</h3>)
          }
        </div>
      </div>
    )
  }
}