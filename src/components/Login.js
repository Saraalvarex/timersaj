import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Global from '../Global'

export default class Login extends Component {

    cajaUserRef = React.createRef();
    cajaPasswordRef = React.createRef();

    state = {
        mensaje: ""
    }

    //Al iniciar sesión guardo el token en LocalStorage

    iniciarSesion = (e) => {
        e.preventDefault();
        var user = this.cajaUserRef.current.value;
        var pass = this.cajaPasswordRef.current.value;

        var login = {
            userName: user,
            password: pass
        }

        var request = "/auth/login";
        var url = Global.timer + request;
        axios.post(url, login).then(res=> {
            localStorage.setItem("token",res.data.response)
            this.setState({
                mensaje:"Bienvenido "+ user
            });
        });
    }

    componentDidMount = () => {
        localStorage.clear("token"); //Es "la forma" de cerrar sesion, para que los demas componentes dejen de usarlo y asi restringir acciones
    }

  render() {
    return (
      <div>
        <div className='container-fluid'>
          <div className='d-flex justify-content-between mt-3'>
            <NavLink to="/">Volver</NavLink>
          </div>
            <h1 className='display-2 mt-3'>Login</h1>
            <br/>
            <form className='container-fluid'>
                <label>Usuario: </label>
                <input type="text" className='form-control'
                ref={this.cajaUserRef} required/><br/>
                <div className="row">
                    <div className="col">
                    <label>Contraseña:</label>
                    <input type="password" className='form-control' ref={this.cajaPasswordRef} required/>
                    </div>
                </div>
                <br/>
              <button className='btn btn-info' onClick={this.iniciarSesion}>
                Iniciar sesión
              </button>
            </form>
            <hr/>
            <h2 className = "text-info">{this.state.mensaje}</h2>
        </div>
      </div>
    )
  }
}
