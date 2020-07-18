import express from 'express';
import bodyParser from 'body-parser';
//const express = require('express');
import { bmiCalculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});
app.get('/bmi', (req, res) => {
  try {
    const h = Number(req.query['height']);
    const w = Number(req.query['weight']);
    const x = bmiCalculator(h, w);
    res.send({
      height: h,
      weight : w,
      bmi: x
    });
  }
  catch(exception) {
    res.send({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hours = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const h = req.body.target;
    if (!hours || !h) {
      res.send({
        error: "parameters missing"
      });
      return;
    }
    const x = calculateExercises(hours, Number(h));
    res.send(x);
  }
  catch(exception) {
    res.send({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});