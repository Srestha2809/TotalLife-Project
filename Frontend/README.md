# Total Life Test


## Frontend Setup
# Installation

1. Install Dependencies:

npm install axios react-router-dom -D tailwindcss postcss autoprefixer 

# Running The Frontend
 npm run dev

 The frontend will start on port 5173 by default  and will automatically open in your default web browser. If not, navigate to http://localhost:5173.

Frontend Components

The frontend consists of several React components:

1. AppointList: Displays a list of appointments.
2. Appointment: Form to create or edit an appointment.
3. Clinician: Form to create or edit a clinician.
4. Patient: Form to create or edit a patient.
5. Range: Component to filter appointments by date and time range.
6. Modal: Modal component to display forms.

Usage

The frontend communicates with the backend API to manage clinicians, patients, and appointments. You can add, edit, delete, and filter appointments through the frontend interface.

API Integration

The frontend uses Axios to make HTTP requests to the backend API.
Ensure the backend server is running before starting the frontend to allow proper API communication.

Notes

Make sure both the backend and frontend servers are running simultaneously.
The frontend is configured to communicate with the backend server running on http://localhost:3000. If your backend server is running on a different URL, update the Axios requests in the frontend code accordingly.

Additional Information

The backend initializes the database with some sample data for testing purposes.
NPI numbers are validated using the CMS API. The API request URL and response are logged to the console for debugging purposes.


This `README.md` provides clear installation and setup instructions, ensuring that anyone setting up the project knows exactly which dependencies to install and how to run both the backend and frontend servers.
