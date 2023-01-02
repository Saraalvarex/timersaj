import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class Temporizador extends Component {
    
  state = {
    timers: [],
    mensaje: "",
    status: false
  }

  getTimerEventoSala = () => {
    var request = "api/timereventos/eventossala/2";
    var url = Global.timer + request;

    axios.get(url).then(res => {
        var timers = res.data;
        var sala = "";
        var tiempoTotal = 0;
        var categorias = []
        console.log(timers)
        timers.forEach(timer => {
            sala = timer.sala;
            categorias.push(timer.categoria);
            console.log(timer.inicioEvento);
            const inicio = new Date(timer.inicioEvento);
            const fin = new Date(timer.finEvento);
            tiempoTotal = (fin.getTime() - inicio.getTime()) / 3600000; // 5
        });

      this.setState({
        sala: sala,
        categorias: categorias,
        tiempoTotal: tiempoTotal,
        status: true
      });
    });
  }

  componentDidMount = () => {
    this.getTimerEventoSala();
}

  render() {

    return (
        <div>
            <p>Sala {this.state.sala}</p>

            <h1>Tiempo total {this.state.tiempoTotal}</h1>

        </div>
    )
  }
}