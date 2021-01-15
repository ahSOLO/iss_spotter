const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("Error: ", error);
  }
  const datetime = new Date(0);
  datetime.setUTCSeconds(passTimes[0].risetime);
  const duration = passTimes[0].duration;
  console.log(`Next pass at ${datetime} for ${duration} seconds!`);
});