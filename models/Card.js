const mongoose = require('mongoose') // require mongoose

const schema = new mongoose.Schema(
  {
    // festlegen, welche Daten sollen in unserer Datenbank vorhanden sein  // als Objekt angelegt
    text: {
      type: String, // hierin ein Objekt anlegen, welches definiert, wie dieses text-Objekt gesetzt sein muss
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { versionKey: false } // verhindert, dass mongoose einen Version key mitliefert. Dieser wird autm. für alle Objekte angelegt, die wir in Mongo anlegen wollen
)

//Collection: 'cards'
//Mongoose Model: 'Card' --> 'cards'

module.exports = mongoose.model('Card', schema) // dieses schema hänge ich einem sogenannten Modell an
