// const http = require('http')

// const port = process.env.PORT || 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/html; charset=utf-8') // charset UTF 8 hier mit einfügen wegen der Umlaute
//   res.end('<h1>Hellö, World!</h1>')
// })

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`)
// })

// // to find in: https://nodejs.dev/learn/build-an-http-server

// const { request, response } = require('express')  // VSCODE packt die Zeile autmatisch rein. Wird aber nicht benötigt
const express = require('express') // holen uns request

const app = express() // lege es in der const ab

const port = 3000 // erstell mir einen Port

app.use(express.json()) // muss an erster Stelle stehen!!!

app.get('/api/cards', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('Hello Wööörld!')
})

// Aufgabe:
// Express Request handler schreiben für POST, PUT, PATCH, DELETE (Route: /api/cards)

app.post('/api/cards', (request, response) => {
  console.log(request.body) // gibt  im Terminal undefined aus, wenn express.json nicht gesetzt
  response.send(request.body.text)
})

app.put('/api/cards', (request, response) => {
  console.log(request.body)
  response.set('Content-type', 'text/html; charset=utf-8')
  const requestObject = request.body
  response.send(requestObject.text)

  // Das selbe in destructering:
  // const {text} = request.body
  // response.send(text)
})

app.patch('/api/cards', (request, response) => {
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('This was a PATCH request')
})

app.delete('/api/cards', (request, response) => {
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('This was a DELETE request')
})

app.listen(port, () => {
  console.log(`Server listenin at http://localhost:${port}`)
})

// am Ende soll meine App auf den port hören

// zu finden https://expressjs.com/en/starter/hello-world.html
