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

const express = require('express') // holen uns request

const app = express() // lege es in der const ab

const port = 3000 // erstell mir einen Port

app.get('/', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('Hello Wöörld!')
})

app.listen(port, () => {
  console.log(`Server listenin at http://localhost:${port}`)
})

// am Ende soll meine App auf den port hören

// zu finden https://expressjs.com/en/starter/hello-world.html
