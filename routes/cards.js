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
  const { id } = request.params //Wir stellen den request an unsere params.
  Card.findById(id)
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json(error))
})

router.post('/', (request, response) => {
  const { text, author } = request.body

  // Validierung ruhig schon vom Backend ausgehend!!
  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return response.status(400).json(error)
  }

  const newCard = { text, author } // newCard muss nicht zwangsläufig erstellt werden, ist aber gängig

  // Card.create(request.body)
  // Card.create({ text, author }) ==> { text:text, author: author}   // entspricht sich
  Card.create(newCard)
    .then(data => response.status(201).json(data))
    .catch(error => response.status(404).json(error))
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
  Card.findByIdAndDelete(id)
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json(error))
})

module.exports = router
