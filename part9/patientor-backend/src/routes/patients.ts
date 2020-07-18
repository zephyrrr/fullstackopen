import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = patientService.findById(req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const newEntry = toNewPatientEntry(req.body);
      
    const addedEntry = patientService.addEntry(newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e); 
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const newEntry = toNewPatientEntry(req.body);
      
    const addedEntry = patientService.addEntry(newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e); 
  }
});

export default router;