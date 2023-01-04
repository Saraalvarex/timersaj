import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';
import CountDown from './Timer/Countdown';
import DateNow from './Timer/DateNow';

export default class Temporizador extends Component {
    
  state = {
    timers: [],
    mensaje: "",
    status: false
  }

  changeFormat = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let hoursString = hours;
    if (hours < 10) {
      hoursString = '0' + hours;
    }

    let minutesString = minutes;
    if (minutes < 10) {
      minutesString = '0' + minutes;
    }

    let secondsString = seconds;
    if (seconds < 10) {
      secondsString = '0' + seconds;
    }
    var timeString = `${hoursString}:${minutesString}:${secondsString}`;
    return timeString;
  }

  getTimerEventoSala = () => {
    var request = "api/timereventos/eventossala/2";
    var url = Global.timer + request;

    axios.get(url).then(res => {
        var timers = res.data;
        var sala = "";
        var tiempoTotal = 0;
        var categorias = []
        var inicio = 0;
        var duracion = 0;
        console.log(timers)

        timers.forEach(timer => {
            sala = timer.sala;
            categorias.push(timer.categoria);
            // console.log(timer.inicioEvento);
            inicio = new Date(timer.inicioEvento);
            duracion = timer.duracion;
            console.log(duracion)
            const fin = new Date(timer.finEvento);
            tiempoTotal = (fin.getTime() - inicio.getTime()) / 3600000; // 5
        });

      this.setState({
        sala: sala,
        categorias: categorias,
        tiempoTotal: tiempoTotal,
        status: true,
        inicio: inicio
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
              <CountDown seconds={this.state.inicio}/>
              <DateNow/>
            <h1>Tiempo total {this.state.tiempoTotal}</h1>
        </div>
    )
  }
}