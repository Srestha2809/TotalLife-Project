const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const sequelize = require('./database');
const Clinician = require('./models/Clinician');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

const app = express();

//Parse incoming json req
app.use(bodyParser.json());

//allow re from this origin
app.use(cors({
    origin: 'http://localhost:5173' 
  }));


//Sync Database and populate with initial data
sequelize.sync().then(async () => {
    
  
    console.log('Initial data has been added');
  });
  

//Validation middleware for incoming req
const { body, validationResult } = require('express-validator');

const validateClinician = [
    body('firstName').isString(),
    body('lastName').isString(),
    body('state').isString(),
    body('npiNumber').isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.state(400).json({errors: errors.array()});
        }
        next();
    }
];

//AS REQUIRED: Created a Clinician with NPI validation
app.post('/clinicians', validateClinician, async (req, res) => {
    const { firstName, lastName, state, npiNumber } = req.body;
    const apiUrl = `https://npiregistry.cms.hhs.gov/api/?number=${npiNumber}&first_name=${firstName}&last_name=${lastName}&state=${state}&version=2.1`;
  
    try {
      // Log the request URL
      console.log('NPI API request URL:', apiUrl);
  
      const response = await axios.get(apiUrl);
      
      //  to understand its structure as I was facing errors with this.
      console.log('NPI API response:', response.data);
  
      if (!response.data || !response.data.results || response.data.results.length === 0) {
        return res.status(400).json({ error: 'Invalid NPI number or details' });
      }
  
      const result = response.data.results[0];
      const { basic } = result;
  
      // Convert to lowercase for comparison to avoid case sensitivity issues
      if (basic.first_name.toLowerCase() !== firstName.toLowerCase() || basic.last_name.toLowerCase() !== lastName.toLowerCase()) {
        return res.status(400).json({ error: 'NPI number details do not match' });
      }
  
      const clinician = await Clinician.create({ firstName, lastName, state, npiNumber });
      res.status(201).json(clinician);
    } catch (error) {
      console.error('Error creating clinician:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
//Get all clinicians
app.get('/clinicians', async (req, res) => {
    try{
        const clinician = await Clinician.findAll();
        res.status(200).json(clinician);
    }
    catch(error){
        res.status(500).json({error: 'Seriver error '});
    }
})

//get all by ID
app.get('/clinicians/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const clinician = await Clinician.findByPk(id);
        if(clinician) {
            res.status(200).json(clinician);
        }
        else{
            res.status(404).json({error: 'Clinician not found'});
        }
    }
    catch(error){
        res.status(500).json({error: 'Server error'});
    }
});


//update clinicians by ID
app.put('/clinicians/:id', validateClinician, async (req, res) => {
    const { id} = req.params;
    const { firstName, lastName, state, npiNumber} = req.body;
    try{
        const clinician = await Clinician.findByPk(id);
        if(clinician) {
            clinician.firstName = firstName;
            clinician.lastName = lastName;
            clinician.state = state;
            clinician.npiNumber = npiNumber;
            await clinician.save();
            res.status(200).json(clinician);
        }else{
            res.status(404).json({error: 'CLinician not found'});
        }
    }
    catch (error){
        res.status(500).json({error: 'Server error'});
    }
});

//Delete clinicians 
app.delete('/clinicians/:id', async (req, res) =>{
    const {id} = res.params;
    try{
        const clinician = await Clinician.findByPk(id);
        if(clinician) {
            await clinician.destroy();
            res.status(204).json();
        }else{
            res.status(404).json({error: 'Clinician not found'});
        }
    }
    catch(error){
        res.status(500).json({error: 'Server error'});
    }
});


//Middleware validation for patient
const validatePatient = [
    body('firstName').isString(),
    body('lastName').isString(),
    body('dateOfBirth').isDate(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        next();
    }
];

//Create new patient
app.post('/patients',  validatePatient, async (req, res) => {
    const { firstName, lastName, dateOfBirth} = req.body;
    try{
        const patient = await Patient.create({ firstName, lastName, dateOfBirth});
        res.status(201).json(patient);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

//Get all
app.get('/patients', async (req, res) =>{
    try{
        const patient = await Patient.findAll();
        res.status(201).json(patient);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/patients/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const patient = await Patient.findByPk(id);
        if (patient) {
            res.status(200).json(patient);
          } else {
            res.status(404).json({ error: 'Patient not found' });
          }
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
});


app.put('/patients/:id', validatePatient, async (req, res) => {
    const { id} = req.params;
    const { firstName, lastName, dateOfBirth} = req.body;
    try{
        const patient = await Patient.findByPk(id);
        if(patient) {
            patient.firstName = firstName;
            patient.lastName = lastName;
            patient.dateOfBirth = dateOfBirth;
            await patient.save();
            res.status(200).json(patient);
        }else{
            res.status(404).json({error: 'patient not found'});
        }
    }
    catch (error){
        res.status(500).json({error: 'Server error'});
    }
});

app.delete('/patients/:id', async (req, res) =>{
    const {id} = res.params;
    try{
        const patient = await Patient.findByPk(id);
        if(patient) {
            await patient.destroy();
            res.status(204).json();
        }else{
            res.status(404).json({error: 'patient not found'});
        }
    }
    catch(error){
        res.status(500).json({error: 'Server error'});
    }
});


const validateAppoint = [
    body('appointmentTime').isISO8601(),
    body('status').isString(),
    body('ClinicianId').isInt(),
    body('PatientId').isInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        next();
    }
];


app.post('/appointments',  validateAppoint, async (req, res) => {
    const { appointmentTime, status, ClinicianId, PatientId } = req.body;
    try{
        const appointment = await Appointment.create({ appointmentTime, status, ClinicianId, PatientId });
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/appointments', async (req, res) =>{
    try{
        const appointment = await Appointment.findAll({ include: [Clinician, Patient]});
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/appointments/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const appointment = await Appointment.findByPk(id, { include: [Clinician, Patient]});
        if (appointment) {
            res.status(200).json(appointment);
          } else {
            res.status(404).json({ error: 'appointment not found' });
          }
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
});


app.put('/appointments/:id', validateAppoint, async (req, res) => {
    const { id} = req.params;
    const { appointmentTime, status, ClinicianId, PatientId } = req.body;
    try{
        const appointment = await Appointment.findByPk(id);
        if (appointment) {
            appointment.appointmentTime = appointmentTime;
            appointment.status = status;
            appointment.ClinicianId = ClinicianId;
            appointment.PatientId = PatientId;
            await appointment.save();
            res.status(200).json(appointment);
        }else{
            res.status(404).json({error: 'appointment not found'});
        }
    }
    catch (error){
        res.status(500).json({error: 'Server error'});
    }
});

app.delete('/appointments/:id', async (req, res) =>{
    const {id} = res.params;
    try{
        const appointment = await Appointment.findByPk(id);
        if(appointment) {
            await appointment.destroy();
            res.status(204).json();
        }else{
            res.status(404).json({error: 'appointment not found'});
        }
    }
    catch(error){
        res.status(500).json({error: 'Server error'});
    }
});

//To start the express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });