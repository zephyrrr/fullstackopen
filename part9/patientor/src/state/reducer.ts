import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { 
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi 
  };
};

export const updatePatient = (patientFromApi: Patient): Action => {
  return { 
    type: "UPDATE_PATIENT", 
    payload: patientFromApi 
  };
};

export const setDiagnosisList = (dataFromApi: Diagnosis[]): Action => {
  return { 
    type: "SET_DIAGNOSIS_LIST", 
    payload: dataFromApi 
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      console.log({
        ...state.patients,
        [action.payload.id]: action.payload
      })
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, item) => ({ ...memo, [item.code]: item }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};
