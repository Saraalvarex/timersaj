import React, { useState, useEffect } from 'react';

export default function Temp(props) {
  // Obtén el array de horas de inicio predeterminadas y duraciones
  const startTimes = props.startTimes;
  // Declara una variable de estado para almacenar la hora actual
  const [currentTime, setCurrentTime] = useState(null);

  // Declara una variable de estado para almacenar el tiempo transcurrido
  const [elapsedTime, setElapsedTime] = useState(0);

  // Declara una variable de estado para almacenar el tiempo límite
  const [timelimit, setTimelimit] = useState(null);

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
  function startTimer() {
    setIsRunning(true);
  }

  // Define una función para detener el temporizador
  function stopTimer() {
    setIsRunning(false);
  }

  // Define una función para resetear el temporizador
  function resetTimer() {
    setElapsedTime(0);
  }

  // Define una función para obtener la próxima hora de inicio predeterminada
  function getNextStartTime(startTimes, currentTime) {
    // Convierte el array de horas de inicio a un formato de fecha y las ordena
    const sortedStartTimes = startTimes.map(time => new Date(`1970-01-01${time}:00`)).sort((a, b) => a - b);
    console.log(sortedStartTimes)
    // Convierte la hora actual a un formato de fecha
    const currentDate = new Date(currentTime);
    console.log(currentDate)
    // Encuentra la próxima hora de inicio que aún no ha llegado
    let nextStartTime = sortedStartTimes.find(time => time > currentDate);

    // Si todas las horas de inicio ya han pasado, obtén la primera hora de inicio del día siguiente
    // if (!nextStartTime) {
    //   nextStartTime = sortedStartTimes[0];
    //   nextStartTime.setDate(nextStartTime.getDate() + 1);
    // }

    // Devuelve la próxima hora de inicio en un formato de tiempo
    // return nextStartTime.toTimeString().slice(0, 8);
    return nextStartTime;
  }

  // Define una función para calcular el tiempo restante hasta la próxima hora de inicio predeterminada
function getTimeUntilStart(nextStartTime) {
    // Convierte la hora actual y la próxima hora de inicio a un formato de fecha
    const currentDate = new Date('1970-01-01'+{currentTime}+':00');
    const nextStartDate = new Date('1970-01-01'+{nextStartTime}+':00');

// Calcula el tiempo restante hasta la próxima hora de inicio en milisegundos
const timeUntilStart = nextStartDate - currentDate;

// Devuelve el tiempo restante en milisegundos
return timeUntilStart;
}

// Define una función para mostrar el tiempo transcurrido
function displayElapsedTime() {
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
    const timeUntilStart = getTimeUntilStart(nextStartTime);
    setTimeout(startTimer, timeUntilStart);
}

return (
<div>
{/* Muestra el tiempo transcurrido */}
<p>Tiempo transcurrido: {displayElapsedTime()}</p>
  {/* Muestra un botón para detener el temporizador */}
  <button onClick={stopTimer}>Detener</button>

  {/* Muestra un botón para resetear el temporizador */}
  <button onClick={resetTimer}>Resetear</button>
</div>
);
}
