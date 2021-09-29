const express = require('express')
const { connect } = require('mongoose')
const connectDatabase = require('./setupMongo') // wir importieren unsere Funktion
const app = express()

const port = 3000

connectDatabase('mongodb://localhost:27017/lean-coffee-board') // Funktionsaufruf mit der entsprechenden url
// vgl https://mongoosejs.com/

app.use(express.json())

app.use('/api/cards', require('./routes/cards'))

app.listen(port, () => {
  console.log(`Server listenin at http://localhost:${port}`)
})

// am Ende soll meine App auf den port hören

// zu finden https://expressjs.com/en/starter/hello-world.html
