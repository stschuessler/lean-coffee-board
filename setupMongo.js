const mongoose = require('mongoose') // ruhig reuqire statt import verwenden, damit man besser abgrenzen kann
// import mongoose fron 'mongoose' ES6 Module

function connectDatabase(url) {
  // zu welcher url soll sich mongoose verbinden via url parameter
  mongoose
    .connect(url) // hier bekommen wir ein promise zurück
    .then(() => console.log('Connect to MongoDB')) // nach erhalt des promise
    .catch(error => console.log('can not connect: ' + error)) // zum Fehler auswerfen
}

module.exports = connectDatabase // zum exportieren der Funktion
