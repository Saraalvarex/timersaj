import React, {useState, useEffect, Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import CountDownIndv from './Timer/CountdownIndv';
import DateNow from './Timer/DateNow';
// import moment from 'moment';
import App from './../App.css';

export default class Temporizador extends Component {
  
  state = {
    tiempoRestante: localStorage.getItem("countdown"),
    timers: [],
    iniciosTimers: [],
    mensaje: "",
    status: false
    // time: localStorage.getItem("countdown")
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
        console.log(res.data)
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
              categoria: timer.categoria
            });
            const fin = new Date(timer.finEvento);
            tiempoTotal = (fin.getTime() - inicio.getTime()) / 3600000; // 5.5
        });
      this.setState({
        iniciosTimers: [
          { inicio: "09:28:20", duracion: 0.5, categoria: "WORK", isRunning: true  },
          { inicio: "09:27:20", duracion: 0.5, categoria: "BREAK", isRunning: false  },
          { inicio: "9:29:50", duracion: 1, categoria: "hahahha", isRunning: false  },
          { inicio: "00:18:30", duracion: 0.6, categoria: "TRABAJO", isRunning: false  }
        ],
        timers: iniciosTimersAux,
        sala: sala,
        tiempoTotal: tiempoTotal,
        // status: true,
        inicio: inicio
      })
    });
  }

//Comprueba la hora
 ChekDates = (inicioProgramado, duracion, categoria, isRunning) => {
   // Obtiene la hora actual en formato hh:mm:ss
    const currentTime = new Date().toTimeString().slice(0, 8);
    // Si la hora actual es igual a la hora de inicio programada
    if (currentTime === inicioProgramado) {
      console.log("Dentro: ", inicioProgramado)
      localStorage.setItem("countdown", duracion)
      localStorage.setItem("categoria", categoria)
      // Establece el estado de "comenzar" en true y
      // localStorage.setItem("comenzar", true);
      // this.setState({
      //   iniciosTimers: [
      //     { inicio: inicioProgramado, duracion: 1, categoria: "WORK", isRunning: true }
      //   ]
      //   time: duracion,
      //   iniciosTimers: this.state.iniciosTimers.filter(item => item.isRunning === true)
      // })
      localStorage.setItem("Estimate duration", duracion);
    } else {
      // localStorage.setItem("comenzar", false);
      // this.setState({
      //   iniciosTimers: this.state.iniciosTimers.filter(item => item.isRunning === false)
      // })
    }
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
    // console.log(interval);
  }

  //Cuando cambio de sala
  componentDidMount = () => {
    this.getTimerEventoSala();
    this.cambiarColor();
  }

  componentDidUpdate(prevProps, prevState) {
    //Si localstorage countdwon esta vacio o a 0 milisegundos, busco el siguiente temp
    // setInterval(() => {
      this.state.iniciosTimers.forEach((inicioTimer) => {
        this.ChekDates(inicioTimer.inicio, inicioTimer.duracion, inicioTimer.categoria);
      })
    // }, 1000);
  }

  render() {
    return (
        // <div className="container-fluid mt-4" style={this.state.estiloDiv}>
          <div className="page-container">
            <h4>Sala <strong>{this.state.sala}</strong></h4>
              {localStorage.getItem("Estimate duration") != null ? <CountDownIndv minutes={localStorage.getItem("Estimate duration")}/> : null}
              {/* <CountDownIndv minutes={localStorage.getItem("countdown")}/> */}
              {/* <CountDownIndv minutes={localStorage.getItem("Estimate duration")}/> */}
              <DateNow/>
              <h4>{localStorage.getItem("categoria")}</h4>
            {/* <p>Tiempo total del evento: {this.state.tiempoTotal}</p> */}
        </div>
    )
  }
}
