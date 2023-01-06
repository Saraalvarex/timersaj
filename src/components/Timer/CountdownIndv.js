//La razón de esta funcion es para que recoja el tiempo del local storage que va actualizandose del CountdownGeneral.js
//Sería buena idea que el countdown general llevase el tiempo ya que Si juan cambia de Temporizador.js (es decir, de sala en sala) 
//El contador se reinicia cada vez, y entonces el evento no avanza...

//El codigo es el mismo solo que en la linea 23 en vez de recibir minutos, recibo segundos puesto que el localStoage guarda los segundos




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
    //Pasamos los minutos del tmp iniciado y los pasamos a segundos para iniciar el temp
    //const seconds = minutes*60 --> Ya no seria necesario
    const [countdown, setCountdown] = useState(seconds)
    if(localStorage.getItem("Comenzar") === true){
        localStorage.setItem("countdown", countdown)
    }
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
            
        }
    }, [countdown])
    return (
        <h1 className="display-1">{formatTime(countdown)}</h1>
    )
}