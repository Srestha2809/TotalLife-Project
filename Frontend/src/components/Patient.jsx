import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Patient =({patientId, onSave}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateBirth] = useState('');

    useEffect(() => {
        if(patientId){
            axios.get(`https://localhost:3000/patients/${patientId}`).then(response => {
                const {firstName, lastName, dateOfBirth} = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setDateBirth(dateOfBirth);

            });
        }
    }, [patientId]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const patientData = {firstName, lastName, dateOfBirth};
        if(patientId){
            axios.put(`https://localhost:3000/patients/${patientId}`, patientData).then(() => onSave())
            .catch(error => console.error('Error updating patient:', error));
        }
        else{
            axios.post('http://localhost:3000/patients', patientData)
        .then(() => onSave())
        .catch(error => console.error('Error adding patient:', error));
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
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
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

}

export default Patient;