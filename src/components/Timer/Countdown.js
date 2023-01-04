import { useEffect, useRef, useState } from "react";

//Lo formatea a horas:min:segundos
const formatTime = (time) =>{
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if(minutes <= 9) minutes = '0' + minutes;
    if(seconds <= 9) seconds = '0' + seconds;
    return minutes + ':' + seconds
}

export default function CountDown({minutes}) {
    //Pasamos los minutos del tmp iniciado y los pasamos a segundos para iniciar el temp
    const seconds = minutes*60
    const [countdown, setCountdown] = useState(seconds)
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
            alert("FIN");
        }
    }, [countdown])

    return (
        <h1 className="display-1">{formatTime(countdown)}</h1>
    )
}