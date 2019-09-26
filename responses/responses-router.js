const router = require('express').Router()

const Responses = require('../users/users-model.js')

// ***endpoints start with /api/users/responses***

// POST A Response
router.post('/', (req, res) => {
  const newResponse = req.body
  const { question_id, response } = req.body

  if (!question_id || !response) {
    res.status(400).json({ message: 'question_id and response are required' })
  } else {
    Responses.addResponse(newResponse)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `${err}` })
      })
  }
})

// GET ALL RESPONSES
router.get('/', (req, res) => {
  Responses.findResponses()
    .then(responses => {
      if (responses.length === 0) {
        res.status(404).json({ message: 'No responses found.' })
      } else {
        res.status(200).json(responses)
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// GET ALL RESPONSES FOR A SINGLE QUESTION
router.get('/:id', (req, res) => {
  const question_id = req.params.id

  Responses.findResponses(question_id)
    .then(responses => {
      if (responses.length === 0) {
        res.status(404).json({ message: 'No responses found.' })
      } else {
        res.status(200).json(responses)
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// GET A RESPONSE
router.get('/response/:id', (req, res) => {
  const response_id = req.params.id

  Responses.findResponse(response_id)
    .then(response => {
      if (response) {
        res.status(200).json(response)
      } else {
        res.status(404).json({ message: 'No response with that ID was found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// UPDATE A RESPONSE
router.put('/:id', (req, res) => {
  const { question_id, response } = req.body
  const changes = req.body
  const id = req.params.id

  if (!question_id || !response) {
    res.status(400).json({ message: 'question_id and response are required' })
  } else {
    Responses.updateResponse(changes, id)
      .then(response => {
        if (response) {
          res.status(200).json({ response })
        } else {
          res.status(404).json({ message: 'response with the specified ID not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `${err}` })
      })
  }
})

// DELETE A RESPONSE
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const deleted = Responses.findResponse(id)

  Responses.removeResponse(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json(deleted)
      } else {
        res.status(404).json({ message: 'Response with the specified ID not found' })
      }
    })
    .catch(err => {
      res.status(400).json({ errorMessage: `${err}` })
    })
})

module.exports = router