
# Total Life Test

This Project is used to manage clincians, patients, and their appointments. It's Backend part is created by using Node.js, Express, Sequelize, and SQlite, & Frontend part is built using React and Tailwind.

## Prerequisities

- Node.js and npm install on your PC.


# Directory Structure

```
TotalLife Project/
├── backend/
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Clinician.js
│   │   └── Patient.js
│   ├── database.js
│   ├── database.sqlite
│   ├── Server.js
│   └── package.json
│  
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointList.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── Clinician.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Patient.jsx
│   │   │   └── Range.jsx
│   │   ├── assets/
│   │   │   └── logo.png
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   └── README.md
```

## Backend Steup
### Installation

 Install the backend dependencies:

        npm install axios body-parser cors express express-validator sequelize sqlite3


# Configuration
No additional configuration is needed for this project as it uses SQLite for the database, which is included in the project files.    

# Running the Server

    node Server.js
The server is on port 3000.

## API Endpoints
The backend provides API endpoints to manage patients, Clinicians and Appointments:

### Clinicians
- `GET /clinicians`: Get all clinicians with NPI validation
- `GET /clinicians/:id`: Get a specific clinician by ID
- `POST /clinicians`: Add a new clinician
- `PUT /clinicians/:id`: Update a clinician by ID
- `DELETE /clinicians/:id`: Delete a clinician by ID

### Patients
- `GET /patients`: Get all patients
- `GET /patients/:id`: Get a specific patient by ID
- `POST /patients`: Add a new patient
- `PUT /patients/:id`: Update a patient by ID
- `DELETE /patients/:id`: Delete a patient by ID

### Appointments
- `GET /appointments`: Get all appointments
- `GET /appointments/:id`: Get a specific appointment by ID
- `POST /appointments`: Add a new appointment
- `PUT /appointments/:id`: Update an appointment by ID
- `DELETE /appointments/:id`: Delete an appointment by ID


#

# Frontend Setup
# Installation

 Install Dependencies:

    npm install axios react-router-dom -D tailwindcss postcss autoprefixer 

# Running The Frontend
    npm run dev

- The frontend will start on port 5173 by default  and will automatically open in your default web browser. If not, navigate to http://localhost:5173.

## Frontend Components
The frontend consists of several React components:

- AppointList: Displays a list of appointments.
- Appointment: Form to create or edit an appointment.
- Clinician: Form to create or edit a clinician.
- Patient: Form to create or edit a patient.
- Range: Component to filter appointments by date and time range.
- Modal: Modal component to display forms.

# Usage
The frontend communicates with the backend API to manage clinicians, patients, and appointments. You can add, edit, delete, and filter appointments through the frontend interface.

# API Integration
- The frontend uses Axios to make HTTP requests to the backend API.
- Ensure the backend server is running before starting the frontend to allow proper API communication.

# Notes
- Make sure both the backend and frontend servers are running simultaneously.
- The frontend is configured to communicate with the backend server running on http://localhost:3000. If your backend server is running on a different URL, update the Axios requests in the frontend code accordingly.

# Additional Information
The backend initializes the database with some sample data for testing purposes.
NPI numbers are validated using the CMS API. The API request URL and response are logged to the console for debugging purposes.

#
This `README.md` provides clear installation and setup instructions, ensuring that anyone setting up the project knows exactly which dependencies to install and how to run both the backend and frontend servers.



