import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clinician = ({ clinicianId, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState('');
  const [npiNumber, setNpiNumber] = useState('');

  useEffect(() => {
    if (clinicianId) {
      axios.get(`http://localhost:3000/clinicians/${clinicianId}`)
        .then(response => {
          const { firstName, lastName, state, npiNumber } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setState(state);
          setNpiNumber(npiNumber);
        });
    }
  }, [clinicianId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clinicianData = { firstName, lastName, state, npiNumber };
    if (clinicianId) {
      axios.put(`http://localhost:3000/clinicians/${clinicianId}`, clinicianData)
        .then(() => onSave());
    } else {
      axios.post('http://localhost:3000/clinicians', clinicianData)
        .then(() => onSave())
        .catch(error => console.error('Error adding clinicians:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">NPI Number</label>
        <input
          type="text"
          placeholder="NPI Number"
          value={npiNumber}
          onChange={(e) => setNpiNumber(e.target.value)}
          required
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
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

export default Clinician;
