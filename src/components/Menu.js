import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react';
export default class Menu extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/"><Icon icon="game-icons:time-bomb" color="#0d6efd" width="55" /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/salas">Salas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/creartemporizadorpag1">Crear Evento</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/creaempresa">Añadir Empresas</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/creartemporizadorpag4">Añadir Temporizador</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
