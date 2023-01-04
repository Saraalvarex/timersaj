import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';
import CountDown from './Timer/Countdown';
import DateNow from './Timer/DateNow';

export default class Temporizador extends Component {
  
  state = {
    // timers: [],
    iniciosTimers: [],
    mensaje: "",
    status: false,
    datenow: localStorage.getItem('time')
  }

  //Cambia el formato "2023-01-18T09:00:00" a 09:00:00
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
    //Recoger parametros para coger el id de la sala
    var request = "/api/timereventos/eventossala/"+this.props.idsala;
    var url = Global.timer + request;

    axios.get(url).then(res => {
        var timers = res.data;
        var iniciosTimersAux = []
        //console.log(timers) -> muestra [] sin nada
        //La sala y tiempo inicio y tiempo fin debería ser común en todos los temps de una sala
        var sala = "";
        var tiempoTotal = 0;
        var inicio = 0;
        var duracion = 0;
        // console.log(res.data)

        timers.forEach(timer => {
            sala = timer.sala;
            inicio = new Date(timer.inicioEvento);
            duracion = parseInt(timer.duracion);
            //Meto un array todos los inicios (hora) de los timers de una sala
            iniciosTimersAux.push(this.changeFormat(timer.inicioTimer));
            //duracion deberia ser un array
            //duracion = timer.duracion;
            const fin = new Date(timer.finEvento);
            tiempoTotal = (fin.getTime() - inicio.getTime()) / 3600000; // 5.5
        });
      //Si iniciosTimersAux[i]==this.state.datenow empieza el countdown
      //console.log(iniciosTimersAux)
      //console.log(this.state.datenow)
      

      this.setState({
        iniciosTimers : iniciosTimersAux,
        sala: sala,
        duracion: duracion,
        tiempoTotal: tiempoTotal,
        status: true,
        inicio: inicio
      });
    });
  }



  //Cuando cambio de sala
  componentDidMount = () => {
    this.getTimerEventoSala();
  }

  render() {
    // var renderCountDown = (minutes) => {
    //   if (this.state.datenow === this.state.iniciosTimersAux[0]) {
    //     return <CountDown minutes={15} />
    //   }
    // }
    return (
        <div className="container-fluid mt-4">
            <h4>Sala <strong>{this.state.sala}</strong></h4>
              {/* <CountDown minutes={this.state.duracion}/> */}
              <CountDown minutes={this.state.duracion}/>
              {/* {renderCountDown()} */}
              {/* <InicioTemp horaactual={savedTime} inicioTemp={savedTime}/> duracion={15} */}
              <DateNow/>
            <h1>Tiempo total del evento: {this.state.tiempoTotal}</h1>
        </div>
    )
  }
}