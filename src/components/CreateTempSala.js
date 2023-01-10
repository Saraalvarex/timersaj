import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';
import Temporizador from './Temporizador';

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
        categorias: [],
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
    }

    GetCategorias = () => {
        var request = "/api/categoriastimer";
        var url = Global.timer + request;
        axios.get(url).then(res=> {
            this.setState({
                categorias: res.data
            });
        });
    }


    GetEventos = () => {
        var request = "/api/eventos";
        var url = Global.timer + request;
        axios.get(url).then(res=> {
            this.setState({
                eventos: res.data
            });
        });
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

    AddTemporizador = (e) => {
        e.preventDefault();
        var request = "/api/tiempoempresasala";
        var url = Global.timer + request;

        var sala = parseInt(this.selectSala.current.value);
        var empresa = parseInt(this.selectEmpresa.current.value);
        var duracion = parseInt(this.selectDuracion.current.value);
        var evento = parseInt(this.selectEvento.current.value);

        var salaTemporizador = {
            id: 0,
            idTimer: duracion,
            idEmpresa: empresa,
            idSala: sala,
            idEvento: evento
        }

        axios.post(url, salaTemporizador).then(response=>{
            console.log(response);
            this.setState({
                status: true,
                mensaje: "Temporizador añadido a tus Salas"
            });
        });
    }

    componentDidMount = () => {
        this.GetSalas();
        this.GetEmpresas();
        this.GetTimer();
        this.GetEventos();
        this.GetCategorias();
    }

    dameCategoria = (mycat) => {
        var res = "";
        this.state.categorias.forEach(cat => {
            if (cat.idCategoria === mycat) {
                res = cat.categoria +  " - " +cat.duracion + " min" ;
            }
        });
        return res;
    }

  render() {
    return (
      <div>
    {/* <div className="page-container"> */}
        <br/>
        <h1>Configurar temporizadores</h1>
        <hr/>
        <form>
            <div className="mb-3 container-fluid">
                <label>Evento: </label>
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ref={this.selectEvento}>
                    <option disabled>Insertalo en un evento</option>
                    {
                        this.state.eventos.map((ev, index)=> {
                            return(
                                <option key={index} value={ev.idEvento}>{ev.nombreEvento}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3 container-fluid">
            <label>Sala: </label>
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
            <label>Empresa: </label>
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
            <label>Categoría - duración - inicio: </label>
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" ref={this.selectDuracion}>
                    <option disabled>Establezca la duración</option>
                    {
                        this.state.tiempos.map((temp, index)=> {
                            return(
                                <option key={index} value={temp.idTemporizador}>{
                                    this.dameCategoria(temp.idCategoria) + " -  "+this.changeFormat(temp.inicio)
                                }</option>
                            )
                        })
                    }
                </select>
            </div>
            <br/>
            {/* <button className="btn btn-success me-2" onClick={this.AddTemporizador}>Añadir</button>
            <NavLink to="/salas" className="btn btn-primary">Finalizar</NavLink> */}
            {/* <div className="row">
              <div className="col"> */}
                <button className='btn btn-primary me-2' onClick={this.AddTemporizador}>
                  Guardar
                </button>
              {/* </div> */}
              {/* <div className="col"> */}
                <NavLink className='btn btn-outline-primary' to="/salas">
                  Salir
                </NavLink>
              {/* </div>
              </div> */}
            </form>
            <br/>
            <h2 style={{color:"blue"}}>
              {this.state.mensaje}
            </h2>
      </div>
    )
  }
}
