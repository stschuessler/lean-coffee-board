const http = require('http')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8') // charset UTF 8 hier mit einfügen wegen der Umlaute
  res.end('<h1>Hellö, World!</h1>')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

// to find in: https://nodejs.dev/learn/build-an-http-server
