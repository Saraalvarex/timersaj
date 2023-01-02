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
        console.log(res)
      this.setState({
        timers: res,
        status: true,
        mensaje: "Get timer"
      });
    });
  }

  componentDidMount = () => {
    this.getTimerEventoSala();
}

  render() {

    return (
        <div>
            <p>Sala {this.state.timers}</p>

            <h1>CATEGORIAS DE TIEMPO</h1>

        </div>
    )
  }
}