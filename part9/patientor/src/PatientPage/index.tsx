import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

import { Patient, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosisList, updatePatient  } from "../state";

const PatientPage: React.FC = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();


  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();

    const fetchDiagnosis = async () => {
      try {
        const { data: dataFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(dataFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosis();
  }, [dispatch, id]);

  const getGender = (patient: Patient) => (
    patient.gender === 'female' ? <i className="venus icon"></i> : <i className="mars icon"></i>
  );
  
  console.log(diagnosis)
  const HealthCheckEntryElement = (entry: HealthCheckEntry) => {
    return (
      <Segment placeholder key={entry.id}>
        <h3>{entry.date}<i className="hospital big icon"></i></h3>
        <p>{entry.description}</p>
        {entry.diagnosisCodes ? 
          <ul>
            {entry.diagnosisCodes.map(item => (
             <li key={item}>{item} {diagnosis[item] ? diagnosis[item].name : ''}</li>)
           )}
          </ul>
         : ""}
        <p>{entry.healthCheckRating === 0 ? <i className="heart icon"></i> : <i className="heart outline icon"></i>}</p>
      </Segment>
    );
  };
  const HospitalEntryElement = (entry: HospitalEntry) => {
    return (
      <Segment placeholder key={entry.id}>
        <h3>{entry.date}<i className="medkit big icon"></i></h3>
        <p>{entry.description}</p>
        {entry.diagnosisCodes ? 
          <ul>
            {entry.diagnosisCodes.map(item => (
             <li key={item}>{item} {diagnosis[item] ? diagnosis[item].name : ''}</li>)
           )}
          </ul>
         : ""}
        <p>{entry.discharge.date} {entry.discharge.criteria}</p>
        </Segment>
    );
  };
  const OccupationalHealthcareEntryElement = (entry: OccupationalHealthcareEntry) => {
    return (
      <Segment placeholder key={entry.id}>
        <h3>{entry.date}<i className="plus square big icon"></i>{entry.employerName}</h3>
        <p>{entry.description}</p>
        {entry.diagnosisCodes ? 
          <ul>
            {entry.diagnosisCodes.map(item => (
             <li key={item}>{item} {diagnosis[item] ? diagnosis[item].name : ''}</li>)
           )}
          </ul>
         : ""}
        <p> {entry.sickLeave ? `${entry.sickLeave.startDate} ${entry.sickLeave.endDate}` : ''}</p>
      </Segment>
    );
  };
  const getEntry = (entry: Entry) => {
    switch(entry.type)
    {
      case 'HealthCheck':
        return HealthCheckEntryElement(entry);
      case 'Hospital':
        return HospitalEntryElement(entry);
      case 'OccupationalHealthcare':
        return OccupationalHealthcareEntryElement(entry);
      default:
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(entry)}`
        );
    }
    
  };

  if (!patients)
    return (
      <div></div>
    );
  const patient = patients[id];
  if (!patient)
    return (
      <div></div>
    );

  return (
    <div className="App">
      <Container textAlign="left">
        <h1>{patient.name} { getGender(patient) } </h1>
        <h2>ssn: { patient.ssn }</h2>
        <h2>occupation: { patient.occupation }</h2>
        <h1>entries</h1>
        {patient.entries.map(entry => getEntry(entry))}
      </Container>
    </div>
  );
};

export default PatientPage;
