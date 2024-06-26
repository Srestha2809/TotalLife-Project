//ENtery point for the application

import React, {useState, useEffect} from 'react'; 
import axios from "axios";
import AppointList from "./components/AppointList";
import Range from "./components/Range";
import Patient from './components/Patient';
import Appointment from './components/Appointment';
import Clinician from './components/Clinician';
import logo from './assets/logo.png';
import Modal from './components/Modal';

const App = () => {
  const [appointment, setAppointment] = useState([]);
  const [filteredAppoint, setFilteredAppoint] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [editClinician, setEditClinician] = useState(null);

  useEffect(() => {
    fetchDataForAppoint();
  },[]);

  //Fetching the appointments data from the API
  const fetchDataForAppoint = () =>{
    axios.get('http://localhost:3000/appointments').then(response => {
      setAppointment(response.data);
      setFilteredAppoint(response.data);
    }).catch(error => console.error('Error fetching Appointments:', error));
  }

  //Filter appointments based on date and time range
const handleFilter = (begin, finish) => {
  const filter = appointment.filter(appointment => {
    const appointmentTime = new Date(appointment.appointmentTime);
    return appointmentTime >= begin && appointmentTime <= finish;
  });
  setFilteredAppoint(filter);
}

//functions to handle the created data.
const handleSavePatient = () => {
  setEditPatient(null);
  fetchDataForAppoint();
};

const handleSaveAppointment = () => {
  setEditAppointment(null);
  fetchDataForAppoint();
};

const handleSaveClinician =() =>{
  setEditAppointment(null);
  fetchDataForAppoint();
}

return (
  <div className="App">
    <header className="App-header flex flex-col items-center">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
    <Range appointChange = {handleFilter} />
    <div className="space-x-2 flex flex-row justify-center">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditPatient({})}>
          Add Patient
        </button>
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditAppointment({})}>
          Add Appointment
        </button>
        <button 
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditClinician({})}>
          Add Clinician
        </button>
      </div>
    <AppointList appointments ={filteredAppoint}/>
    <Modal isOpen={!!editPatient} onClose={() => setEditPatient(null)}>
        {editPatient && <Patient patientId={editPatient.id} onSave={handleSavePatient} />}
      </Modal>
      <Modal isOpen={!!editAppointment} onClose={() => setEditAppointment(null)}>
        {editAppointment && <Appointment appointmentId={editAppointment.id} onSave={handleSaveAppointment} />}
      </Modal>
      <Modal isOpen={!!editClinician} onClose={() => setEditClinician(null)}>
        {editClinician && <Clinician clinicianId={editClinician.id} onSave={handleSaveClinician} />}
      </Modal>
  </div>
);
};

export default App;