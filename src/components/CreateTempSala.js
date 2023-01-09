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
                res = cat.categoria +  ", duración de " +cat.duracion + " minutos" ;
            }
        });
        return res;
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
                                <option key={index} value={temp.idTemporizador}>{
                                    this.dameCategoria(temp.idCategoria) + " inicia: "+temp.inicio 
                                }</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mb-3 container-fluid">
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
            <button className="btn btn-success me-2" onClick={this.AddTemporizador}>Añadir</button>
            <NavLink to="/salas" className="btn btn-primary">He terminado</NavLink>
            </form>

             {/* Button trigger modal  */}
            {/* <button type="button" className="btn btn-warning mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Detalles
            </button> */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-warning">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Significado de los números</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        Los números que te se te ofrecen indican qué duración deseas en tus salas
                        {
                            this.state.categorias.map((cat, index)=> {
                                return(
                                    <p key={index}>El <b>{cat.idCategoria}</b> corresponde a la <b>categoría {cat.categoria}</b> con <b>{cat.duracion} minutos</b> de duración</p>
                                )
                            })
                        }
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                    </div>
                </div>
            </div>

            <h2 style={{color:"blue"}}>
              {this.state.mensaje}
            </h2>
      </div>
    )
  }
}
