const express = require('express')

const router = express.Router()

let cards = [
  {
    text: 'Hello World',
    author: 'Universe',
    id: '1', // Wichtig ist das ganze als String anzugeben!!! Weil wir ja auch
    //ein strict equal gesetzt haben. Bei MongoDB bekommen wir später
    //auch strings als id
  },
  {
    text: 'What is the answer to everything?',
    author: '42',
    id: '2',
  },
]

router.get('/', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  response.status(200).json(cards)
})

router.get('/:id', (request, response) => {
  // '/' Definition unserer Route: wo soll der Aufruf durchgeführt sein,
  const { id } = request.params //Wir stellen den request an unsere params.
  //Params steht hier für unseren Parameter den wir in der Route gesetzt haben
  // const params = request.params  // {id: '1234abs'}
  // const id ) params.id // Hier greife ich auf die id zu  '1234abc'
  const card = cards.find(card => card.id === id) // So suche ich mir meine
  //einzelne Karte raus
  if (card) {
    response.status(200).json(card)
  } else {
    const error = { message: 'Could not find object' } // Defined as object
    response.status(404).json(error)
  }
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
