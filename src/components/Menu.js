import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Menu extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Temporizadores App</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/salas">Mis Salas</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Configurar Timer
                </NavLink>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/creartemporizadorpag1">Crear Evento</a></li>
                  <li><a className="dropdown-item" href=".">Administrar Timers</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href=".">Más opciones</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link">Identificarse</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
