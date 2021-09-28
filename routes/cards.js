const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('Hello Wööörld!')
})

router.post('/', (request, response) => {
  console.log(request.body) // gibt  im Terminal undefined aus, wenn express.json nicht gesetzt
  response.send(request.body.text)
})

router.put('/:id', (request, response) => {
  console.log(request.body)
  response.set('Content-type', 'text/html; charset=utf-8')
  const requestObject = request.body
  response.send(requestObject.text)

  // Das selbe in destructering:
  // const {text} = request.body
  // response.send(text)
})

router.patch('/:id', (request, response) => {
  console.log(request.body)
  response.set('Content-type', 'text/html; charset=utf-8')
  const requestObject = request.body
  response.send(requestObject.text)
})

router.delete('/:id', (request, response) => {
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('This was a DELETE request')
})

module.exports = router
