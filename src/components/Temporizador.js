import React, {useState, useEffect, Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import CountDownIndv from './Timer/CountdownIndv';
import DateNow from './Timer/DateNow';
// import moment from 'moment';
// import Temp from './Temp';

export default class Temporizador extends Component {
  
  state = {
    timers: [],
    iniciosTimers: [],
    mensaje: "",
    status: false, 
    duracion: 0
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
        //La sala, evento y tiempo inicio y tiempo fin debería ser común en todos los temps de una sala
        var sala = "";
        var tiempoTotal = 0;
        var inicio = 0;
        timers.forEach(timer => {
            sala = timer.sala;
            inicio = new Date(timer.inicioEvento);
            // duracion = parseInt(timer.duracion);
            // Meto un array todos los inicios (hora) de los timers de una sala
            // iniciosTimersAux.push(this.changeFormat(timer.inicioTimer));
            // Agrega inicio y duración de cada timer al array
            iniciosTimersAux.push({
              inicio: this.changeFormat(timer.inicioTimer),
              duracion: parseInt(timer.duracion),
            });
            const fin = new Date(timer.finEvento);
            tiempoTotal = (fin.getTime() - inicio.getTime()) / 3600000; // 5.5
        });
      this.setState({
        iniciosTimers: [
          { inicio: "17:50:00", duracion: 50 },
          { inicio: "18:15:20", duracion: 20 },
          { inicio: "18:28:00", duracion: 35 },
          { inicio: "18:45:00", duracion: 30 }
        ],
        timers: iniciosTimersAux,
        sala: sala,
        tiempoTotal: tiempoTotal,
        // status: true,
        inicio: inicio
      })
      // , () => {
        // setInterval(() => {
      //   this.state.iniciosTimers.forEach((inicioTimer) => {
      //     this.ChekDates(inicioTimer.inicio, inicioTimer.duracion);
      //   });
      // });
    // }, 1000);

    //Si localstorage countdwon esta vacio o a 0 milisegundos, busco el siguiente temp
     setInterval(() => {
      this.state.iniciosTimers.forEach((inicioTimer) => {
        this.ChekDates(inicioTimer.inicio, inicioTimer.duracion);
      })
    }, 1000);
    });
  }

//Esta funcion comprueba la hora
 ChekDates = (inicioProgramado, duracion) => {
   // Obtiene la hora actual en formato hh:mm:ss
    const currentTime = new Date().toTimeString().slice(0, 8);
    // Si la hora actual es mayor o igual que la hora de inicio programada
    // console.log(inicioProgramado)
    if (currentTime >= inicioProgramado) {
      // console.log(duracion)
      // Establece el estado de "comenzar" en true y almacena la nueva duración en localStorage
      localStorage.setItem("comenzar", true);
      this.setState({
        duracion: duracion
      })
      // localStorage.setItem("Estimate duration", duracion);
      // localStorage.setItem("countdown", duracion* 60 * 1000);
    // } else {
    //   localStorage.setItem("comenzar", false);
    }
  };

  //Cuando cambio de sala
  componentDidMount = () => {
    this.getTimerEventoSala();
  }

  render() {
    return (
        <div className="container-fluid mt-4">
            <h4>Sala <strong>{this.state.sala}</strong></h4>
              {/* <CountDown minutes={this.state.duracion}/> */}
              <CountDownIndv seconds={this.state.duracion}/>
              {/* <CountDownIndv seconds={localStorage.getItem("countdown")}/> */}
              <DateNow/>
            <p>Tiempo total del evento: {this.state.tiempoTotal}</p>
            {/* <p>Inicio programado a las: {this.state.iniciosTimers}</p> */}
            {/* <button className='btn btn-outline-success' onClick={this.StartCrono}>Start</button> */}
        </div>
    )
  }
}
