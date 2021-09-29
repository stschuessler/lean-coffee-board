const express = require('express')
const Card = require('../models/Card') // import Card
const { nanoid } = require('nanoid')

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
  Card.find()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json(error))
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
  const { text, author } = request.body // { text: "What is node?", author: "Max M." }

  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return response.status(400).json(error) //Bad request
  }

  const newCard = { text, author, id: nanoid() } // Shorcut für: { text: text, author: author, id: nanoid() }
  cards = [...cards, newCard]
  // cards.push(newCard)
  response.status(200).json(newCard)
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text || !author) {
    const error = { message: 'Information missing' }
    return response.status(400).json(error)
  }

  const card = cards.find(card => card.id === id)
  if (!card) {
    const error = { message: 'Could not find object with that id.' }
    return response.status(404).json(error)
  }

  const newCard = {
    text: text, // der mit gelieferte Text  //text : card.text ist der alte Eintrag in unserem Array
    author: author, // ich könnte auch nur den short-cut verwenden ==> author
    id: card.id,
  }

  const index = cards.findIndex(card => card.id === id)

  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]

  response.status(200).json(newCard)
})

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text && !author) {
    // wenn text UND author beide leer sind, dann schmeiß mir einen Error
    const error = { message: 'Information missing' }
    return response.status(400).json(error) // Und zwar mit der Info-message und Bad error
  }

  const card = cards.find(card => card.id === id) // hole mir die card mit der id
  if (!card) {
    // wenn card nicht vorhanden
    const error = { message: 'Could not find object with that id.' }
    return response.status(404).json(error)
  }

  const newCard = {
    text: text ? text : card.text, // text da? dann zeige mir diesen an, wenn nicht, dann übernimmt den mitgelieferten text
    author: author ? author : card.author, // author da? dann zeige mir diesen an, wenn nicht, dann übernimm den mitgelieferten author
    id: card.id, // die id bleibt gleich
  }

  const index = cards.findIndex(card => card.id === id)

  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]

  response.status(200).json(newCard)
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const card = cards.find(card => card.id === id) // ist id in einem der Objekte vorhanden?

  if (card) {
    // card ==> truthy
    cards = cards.filter(card => card.id !== id) // filter alle Einträge heraus, die nicht der id entsprechen und wirft sie in das Array. Nur die mit der id wird nicht mit hinein genommen, also deleted
    response.status(200).json(card)
  } else {
    const error = { message: 'Could not find object with that id.' }
    response.status(404).json(error)
  }
})

module.exports = router
