import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class Eventos extends Component {

    state = {
        eventos: [],
        statusEventos: false
    }

    Get_Eventos = () => {
        var request = "/api/eventos";
        var url = Global.timer + request;
        axios.get(url).then(res=>{
            this.setState({
                eventos:res.data,
                statusEventos: true
            })
        })
    }

componentDidMount = () => {
    this.Get_Eventos();
}

  render() {
    return (
      <div>
        <div className='container-fluid'>
            <div className='row mt-4'>
            <div className='col'></div>
            <div className='col-8'>
                <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre </label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Imagen </label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                    <div id="emailHelp" class="form-text">Indica la url del logo de la empresa</div>
                </div>
                <button type="submit" class="btn btn-primary">Añadir</button>
                </form>
            </div>
            <div className='col'></div>
        </div>
      </div>
      <hr/>
      <div className='row d-flex justify-content-center'>
        {
            this.state.statusEventos===true ?
            (
                this.state.eventos.map((evento, index)=> {
                    return(
                        <div key={index} class="card m-3" style={{width: "20rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">{evento.nombreEvento}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Inicio: {evento.inicioEvento}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Final: {evento.finEvento}</h6>
                            
                        </div>
                    </div>
                    )
                })
            ):
            (<h3>Loading events...</h3>)
        }
      </div>
      </div>
    )
  }
}
