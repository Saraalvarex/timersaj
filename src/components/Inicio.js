import React, { Component, useEffect, useRef, useState } from "react";
import '../style/Inicio.css';



export default class Inicio extends Component {

  state = {
    eventos: [],
    statusEvento: false
  }

  
  render() {
    return (
      <div className="Contenedor">
        <span className="Title">TEMPORIZADORES</span>
        <span className="Mensaje">No tienes temporizadores <a href=".">Añade uno ahora</a></span>
      </div>
    );
  }
}
