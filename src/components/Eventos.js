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
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Nombre </label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div classNameName="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Imagen </label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                    <div id="emailHelp" className="form-text">Indica la url del logo de la empresa</div>
                </div>
                <button type="submit" className="btn btn-primary">Añadir</button>
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
                        <div key={index} className="card m-3" style={{width: "20rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{evento.nombreEvento}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Inicio: {evento.inicioEvento}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Final: {evento.finEvento}</h6>
                            
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
