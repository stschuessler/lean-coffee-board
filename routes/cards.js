const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('Hello Wööörld!')
})

module.exports = router
