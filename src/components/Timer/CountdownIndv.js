//La razón de esta funcion es para que recoja el tiempo del local storage que va actualizandose del CountdownGeneral.js
//Sería buena idea que el countdown general llevase el tiempo ya que Si juan cambia de Temporizador.js (es decir, de sala en sala) 
//El contador YA NO SE REINICIA

import { useEffect, useRef, useState } from "react";

//Lo formatea a horas:min:segundos
const formatTime = (time) =>{
    if (time <= 0) return "00:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if(minutes <= 9) minutes = '0' + minutes;
    if(seconds <= 9) seconds = '0' + seconds;
    return minutes + ':' + seconds
}

export default function CountDownIndv({seconds}) {
    // Inicializa el estado de countdown con el valor almacenado en localStorage
    // o con seconds si no hay ningún valor almacenado
    const [countdown, setCountdown] = useState(
        parseInt(localStorage.getItem("countdown")) || seconds
    );
    // Actualizo el countdown al tiempo transcurrido
    // if(localStorage.getItem("comenzar") === true){
        localStorage.setItem("countdown", countdown)
        // console.log(localStorage.getItem("countdown"))
    // }
    const timerId = useRef();

    useEffect(() => {
        timerId.current = setInterval(()=>{
            setCountdown(prev => prev -1)
        }, 1000);
        return () => clearInterval(timerId.current)
    }, []);

    useEffect(()=> {
        if(countdown <= 0){
            clearInterval(timerId.current);
            // Borra el countdown del localStorage
            localStorage.removeItem("countdown");
        }
    }, [countdown])

    return (
        <h1 className="display-1">{formatTime(countdown)}</h1>
    )
}