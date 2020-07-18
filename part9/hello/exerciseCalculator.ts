interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (hours: Array<number>, h: number) : Result => {
  if (!hours || !h) {
    throw new Error('arguments not ok');
  }
  const sum =  hours.reduce((a, b) => a + b, 0);
  const average = sum / hours.length;
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(n => n > 0).length,
    success: sum > h * hours.length,
    rating: average > h ? 3 : (average < h ? 1 : 2),
    ratingDescription: average > h ? 'good' : (average < h ? 'bad' : 'not too bad but could be better'),
    target: h,
    average: average
  };
};


const parseArguments2 = (args: Array<string>): Array<number> => {
  if (args.length < 3) throw new Error('Not enough arguments');
  return args.slice(2).map(n => Number(n));
};

if(!module.parent) {
  try {
    const value1  = parseArguments2(process.argv);
    console.log(calculateExercises(value1.slice(1, value1.length), value1[0]));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e);
  }
}