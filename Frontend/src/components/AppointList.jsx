//To display the list of the appointsments

import React from "react";

const AppointList = ({appointments}) => {
    return (

        //Container for the table
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">First Name</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Last Name</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Appointment Time</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id} className="hover:bg-gray-100">
                            <td className="py-3 px-4">{appointment.Patient.firstName}</td>
                            <td className="py-3 px-4">{appointment.Patient.lastName}</td>
                            <td className="py-3 px-4">{new Date(appointment.appointmentTime).toLocaleString()}</td>
                            <td className="py-3 px-4">{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AppointList;
