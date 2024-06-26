//COmponent to create an Apoointment, I wasn't sure that we do have to create ADD functionality for Appointment, patient and clinician, 
//Just to be on the safer side i have created the ADD functionality in frontened as well.

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Appointment = ({appointmentId, onSave}) => {
    //initializing the hooks 
    const [appointmentTime, setAppointmentTime] = useState('');
    const [status, setStatus] = useState('');
    const [clinicianId, setClinicianId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [clinicians, setClinicians] = useState([]);
    const [patients, setPatient] = useState([]);


    //to fetch patients and clinicians 
    useEffect(() => {
        axios.get('http://localhost:3000/clinicians').then(response => setClinicians(response.data));
        axios.get('http://localhost:3000/patients').then(response => setPatient(response.data));
        

        if(appointmentId) {
            axios.get(`http://localhost:3000/appointments/${appointmentId}`).then(response => {
                const { appointmentTime, status, ClinicianId, PatientId} =response.data;
                setAppointmentTime(new Date(appointmentTime).toISOString().split('.')[0]);
                setStatus(status);
                setClinicianId(ClinicianId);
                setPatientId(PatientId);
            });
        }

    }, [appointmentId]);


    //handles the creation of an appointment
    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentData = { appointmentTime, status, ClinicianId: clinicianId, PatientId: patientId };
        if (appointmentId) {
          axios.put(`http://localhost:3000/appointments/${appointmentId}`, appointmentData)
            .then(() => onSave())
            .catch(error => console.error('Error updating appointment:', error));
        } else {
          axios.post('http://localhost:3000/appointments', appointmentData)
            .then(() => onSave())
            .catch(error => console.error('Error creating appointment:', error));
        }
      };


      return (
        <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
        <input
          type="datetime-local"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="" disabled selected>Select option</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Clinician</label>
        <select
          value={clinicianId}
          onChange={(e) => setClinicianId(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Select Clinician</option>
          {clinicians.map(clinician => (
            <option key={clinician.id} value={clinician.id}>{clinician.firstName} {clinician.lastName}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.firstName} {patient.lastName}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Save
      </button>
    </form>
      );


};

export default Appointment;