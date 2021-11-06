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

router.get('/', (request, response, next) => {
  Card.find()
    .then(data => response.status(200).json(data))
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params //Wir stellen den request an unsere params.
  Card.findById(id)
    .then(data => {
      if (!data) {
        throw new Error('This is my error!')
      }
      response.status(200).json(data)
    })
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
})

router.post('/', (request, response) => {
  const { text, author } = request.body

  // Validierung ruhig schon vom Backend ausgehend!!
  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return next({ status: 400, message: error.message }) // bei return wird die next Funktion aufgerufen
  }

  const newCard = { text, author }

  Card.create(newCard)
    .then(data => response.status(201).json(data))
    .catch(next) // springt hoch zum Aufruf von next
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text || !author) {
    const error = { message: 'Information missing' }
    return next({ status: 400, message: error.message })
  }

  Card.findByIdAndUpdate(id, { text, author }, { new: true }) // new: true --> damit Mongo uns die neue Card/Document als response wieder gibt
    .then(data => response.status(200).json(data))
    .catch(next)
})

router.patch('/:id', (request, response, next) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text && !author) {
    const error = { message: 'Information missing' }
    return next({ status: 400, message: error.message })
  }

  Card.findByIdAndUpdate(id, { text, author }, { new: true }) // new: true --> damit Mongo uns die neue Card/Document als response wieder gibt
    .then(data => response.status(200).json(data))
    .catch(next)
})

router.delete('/:id', (request, response, next) => {
  const { id } = request.params

  Card.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        throw new Error('Document with this id not found')
      }
      response.status(200).json(data)
    })
    .catch(error =>
      next({ status: 404, message: error.message || 'Document not found' })
    )
})

module.exports = router
