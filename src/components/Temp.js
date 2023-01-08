import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function Temp(props) {
  // Obtén el array de horas de inicio predeterminadas y duraciones
  // const startTimes = props.startTimes;
  const startTimes = ["13:40:50", "13:15:16", "13:25:55"];
  // const startTimes = [
  //       { inicio: "13:02", duracion: 15 },
  //       { inicio: "13:15", duracion: 10 },
  //       { inicio: "13:30", duracion: 20 },
  //       { inicio: "13:45", duracion: 15 },
  //     ]
  // Declara una variable de estado para almacenar la hora actual
  const [currentTime, setCurrentTime] = useState(null);

  // Declara una variable de estado para almacenar el tiempo transcurrido
  const [elapsedTime, setElapsedTime] = useState(0);

  // Declara una variable de estado para almacenar el tiempo límite
  // const [timelimit, setTimelimit] = useState(null);

  // Declara una variable de estado para almacenar si el temporizador está en curso o no
  const [isRunning, setIsRunning] = useState(false);

  // Establece un intervalo de tiempo para actualizar la hora actual cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toTimeString().slice(0, 8));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Define una función para iniciar el temporizador
  const startTimer = (duration) => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      // Aquí podrías utilizar la variable seconds para actualizar la pantalla con el tiempo transcurrido
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      // Aquí podrías ejecutar cualquier acción que deba ocurrir cuando el temporizador termine
    }, duration * 1000);
  };

  // Define una función para obtener la próxima hora de inicio predeterminada
  function getNextStartTime(startTimes, currentTime) {
    // Convierte el array de horas de inicio a un formato de fecha y las ordena
    const sortedStartTimes = startTimes.sort((a, b) => {
      const aDate = new Date(`1970-01-01 ${a}:00`);
      const bDate = new Date(`1970-01-01 ${b}:00`);
      return aDate - bDate;
    });
    // Convierte la hora actual a un formato de fecha
    const currentDate = new Date(currentTime);
    // Encuentra la próxima hora de inicio que aún no ha llegado
    let nextStartTime = sortedStartTimes.find(time => time > currentDate);
    // Si no se ha encontrado una próxima hora de inicio, toma la primera del array
    if (!nextStartTime) {
      nextStartTime = sortedStartTimes[0];
    }
    console.log(nextStartTime)
    return nextStartTime;
  }

  function waitUntilNextStartTime(nextStartTime) {
    // Calcula el tiempo restante hasta la próxima hora de inicio en milisegundos
    const timeUntilStart = moment(nextStartTime, 'HH:mm:ss').diff(moment(currentTime, 'HH:mm:ss'));
    console.log(timeUntilStart)
    // Ejecuta una función cada segundo hasta que se alcance la próxima hora de inicio
    const interval = setInterval(() => {
      // Aquí podrías ejecutar cualquier acción que deba ocurrir mientras se espera a la próxima hora de inicio
    }, 1000);
    // Cancela el intervalo cuando se alcance la próxima hora de inicio
    setTimeout(() => {
      clearInterval(interval);
    }, timeUntilStart);
  }
  
  // Define una función para mostrar el tiempo transcurrido
  function displayElapsedTime() {
    // Incrementa el tiempo transcurrido en un segundo
    // Convierte el tiempo transcurrido a un formato de tiempo
    const elapsedTimeString = new Date(elapsedTime).toTimeString().slice(3, 8);
    return elapsedTimeString;
  }

  // Si el temporizador está en curso, aumenta el tiempo transcurrido cada segundo
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
      }, 1000);
        return () => clearInterval(interval);
    }
  }, [isRunning]);

// Si ninguna de las horas de inicio predeterminadas ha sido alcanzada todavía,
// espera hasta que llegue la próxima hora de inicio predeterminada y luego inicia el temporizador
  if (!isRunning) {
    const nextStartTime = getNextStartTime(startTimes, currentTime);
    const timeUntilStart = waitUntilNextStartTime(nextStartTime);
    setTimeout(startTimer, timeUntilStart);
  }

return (
    <div>
      {/* Muestra el tiempo transcurrido */}
      <h1 style={{color : "red"}}>Tiempo transcurrido: {displayElapsedTime()}</h1>
    </div>
  );
}
