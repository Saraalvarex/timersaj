import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class CreateTempSala extends Component {

    selectSala = React.createRef();
    selectEmpresa = React.createRef();
    selectDuracion = React.createRef();
    selectEvento = React.createRef();

    state = {
        mensaje: "",
        salas: [],
        empresas: [],
        tiempos: [],
        eventos: []
    }

    GetSalas = () => {
        var request = "/api/salas";
        var url = Global.timer + request;
        axios.get(url).then(res=> {
            this.setState({
                salas: res.data
            });
        });
    }
    GetEmpresas = () => {
        var request = "/api/empresas";
        var url = Global.timer + request;
        axios.get(url).then(res=> {
            this.setState({
                empresas: res.data
            });
        });
    }
    GetTimer = () => {
        var request = "/api/timers";
        var url = Global.timer + request;
        axios.get(url).then(res=> {
            this.setState({
                tiempos: res.data
            });
        });
        var request2 = "/api/categoriastimer";
        var url2 = Global.timer + request2;
        axios.get(url2).then(res=> {
            this.setState({
                categorias: res.data
            });
        });

    }
    GetEventos= () => {
        var request = "/api/eventos";
        var url = Global.timer + request;
        axios.get(url).then(res=> {
            this.setState({
                eventos: res.data
            });
        });
    }

    componentDidMount = () => {
        this.GetSalas();
        this.GetEmpresas();
        this.GetTimer();
        this.GetEventos();
    }

  render() {
    return (
      <div>
        <h1>Configura tu sala</h1>
        <hr/>
        <form>
            <div className="mb-3 container-fluid">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ref={this.selectSala}>
                    <option disabled>Selecciona una sala</option>
                    {
                        this.state.salas.map((sala, index)=> {
                            return(
                                <option key={index} value={sala.idSala}>{sala.nombreSala}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3 container-fluid">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ref={this.selectEmpresa}>
                    <option disabled>Asigne una empresa a la sala</option>
                    {
                        this.state.empresas.map((emp, index)=> {
                            return(
                                <option key={index} value={emp.idEmpresa}>{emp.nombreEmpresa}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3 container-fluid">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ref={this.selectDuracion}>
                    <option disabled>Establezca la duración</option>
                    {
                        this.state.tiempos.map((temp, index)=> {
                            return(
                                <option key={index} value={temp.idTemporizador}>{temp.inicio}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3 container-fluid">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ref={this.selectEvento}>
                    <option disabled>Insertalo en un evento</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <button className="btn btn-success me-2">Añadir</button>
            <NavLink to="/salas" className="btn btn-primary">He terminado</NavLink>
            </form>

            <h2 style={{color:"red"}}>
              {this.state.mensaje}
            </h2>
      </div>
    )
  }
}
