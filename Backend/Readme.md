# TotalLife project
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
