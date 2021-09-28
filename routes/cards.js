const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('Hello Wööörld!')
})

router.put('/api/cards', (request, response) => {
  console.log(request.body)
  response.set('Content-type', 'text/html; charset=utf-8')
  const requestObject = request.body
  response.send(requestObject.text)

  // Das selbe in destructering:
  // const {text} = request.body
  // response.send(text)
})

module.exports = router
