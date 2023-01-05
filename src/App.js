import './App.css';
import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import $ from 'jquery';
import Popper from 'popper.js';

import CountDownGeneral from './components/Timer/CountdownGeneral';



function App() {
  return (
    <div className="App">
      {
        localStorage.getItem("Comenzar") === true &&
        (<CountDownGeneral minutes={localStorage.getItem("Estimate duration")}/>)
      }
      <Router/>
    </div>
  );
}

export default App;
