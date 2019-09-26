const router = require('express').Router()

const Questions = require('../users/users-model.js')

// ***endpoints start with /api/users/questions***

// POST A QUESTION
router.post('/', (req, res) => {
  const newQuestion = req.body
  const { user_id, question } = req.body
  if (!user_id || !question) {
    res.status(400).json({ message: 'user_id and question are required' })
  }else {
    Questions.addQuestion(newQuestion)
    .then(question => {
      res.status(200).json(question)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
  }
})

// GET ALL QUESTIONS
router.get('/', (req, res) => {
  Questions.findQuestions()
    .then(questions => {
      if (questions.length === 0) {
        res.status(404).json({ message: 'No questions found.' })
      } else {
        res.status(200).json(questions)
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// GET ALL QUESTIONS FOR A SINGLE USER
router.get('/:id', (req, res) => {
  const user_id = req.params.id

  Questions.findQuestions(user_id)
    .then(questions => {
      if (questions.length === 0) {
        res.status(404).json({ message: 'No questions found.' })
      }else {
        res.status(200).json(questions)
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// GET A QUESTION
router.get('/question/:id', (req, res) => {
  const question_id = req.params.id

  Questions.findQuestion(question_id)
    .then(question => {
      if (question) {
        res.status(200).json(question)
      }else {
        res.status(404).json({ message: 'No question with that ID was found.' })
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