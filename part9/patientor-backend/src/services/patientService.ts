/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { PublicPatient , Patient, NewPatient, Entry } from '../types';
import uuid = require('uuid');

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = ( entry: NewPatient ): Patient => {
  const entries : Entry[] = [];
  const newItem = {
    id: uuid.v4(),
    entries: entries,
    ...entry
  };

  patients.push(newItem);
  return newItem;
};

// const addPatientEntry = (id: string, entry: NewEntry): Entry => {
//   const patient = patients.find(d => d.id === id);
//   switch(entry.type)
//   {
//     case 'HealthCheck':
//       const newItem1 = {
//         ...entry,
//         id: uuid.v4(),
//         type: 'HealthCheck',
//         healthCheckRating: entry.healthCheckRating
//       };

//       patient?.entries.push(newItem1);
//       return newItem1;
//     case 'Hospital':
//       const newItem2 = {
//         id: uuid.v4(),
//         type: 'HealthCheck',
//         ...entry
//       };

//       patient?.entries.push(newItem2);
//       return newItem2;
//     case 'OccupationalHealthcare':
//       const newItem3 = {
//         id: uuid.v4(),
//         type: 'HealthCheck',
//         ...entry
//       };

//       patient?.entries.push(newItem3);
//       return newItem3;
//   }
  
// };

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
};