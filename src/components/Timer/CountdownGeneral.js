//Actualizacion reciente.
//Ahora esta funcion de Countdown pasa a ser una funcion general de la aplicacion
//Se lleva a cabo en App.js Permite llevar el tiempo sin perder el progreso. Te podrás mover a cualquier parte de la aplicacion.



import { useEffect, useRef, useState } from "react";

//Lo formatea a horas:min:segundos
const formatTime = (time) =>{
    if (time <= 0) return "00:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if(minutes <= 9) minutes = '0' + minutes;
    if(seconds <= 9) seconds = '0' + seconds;
    return minutes + ':' + seconds //Lo dejo comentado para que no se muestre, pero sí quiero que se ejecute (Lo dejo asi de momento)
}

/* 
const minutosAux = this.props.minutes;
console.log(minutosAux) */

export default function CountDownGeneral({minutes}) {
    //Pasamos los minutos del tmp iniciado y los pasamos a segundos para iniciar el temp
    const seconds = minutes*60
    const [countdown, setCountdown] = useState(
        parseInt(localStorage.getItem("countdown")) || seconds
    );

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
            window.navigator.vibrate(1000); //Esto hara que vibre el dispositivo por 1 segundo (1000)
        }
    }, [countdown])
    return (
        <h1 className="display-1">General: {formatTime(countdown)}</h1>
    ) 
}