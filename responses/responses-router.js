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

// UPDATE A USER
router.put('/:id', (req, res) => {
  const { username, password, position } = req.body
  const changes = req.body
  const id = req.params.id

  if (!username || !password || !position) {
    res.status(400).json({ message: 'username, password, and position are required' })
  } else {
    Users.updateUser(changes, id)
      .then(user => {
        if (user) {
          res.status(200).json({ user })
        } else {
          res.status(404).json({ message: 'User with the specified ID not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `${err}` })
      })
  }
})

// DELETE A USER
router.delete('/:id', (rec, res) => {
  const { id } = req.params
  const deleted = Users.findUser(id)

  Users.removeUser(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json(deleted)
      } else {
        res.status(404).json({ message: 'User with the specified ID not found' })
      }
    })
    .catch(err => {
      res.status(400).json({ errorMessage: `${err}` })
    })
})

module.exports = router