const router = require('express').Router()

const Questions = require('../users/users-model.js')

// ***endpoints start with /api/users/questions***

// GET ALL QUESTIONS FOR A SINGLE USER

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

router.get('/user/:id', (req, res) => {
  const user_id = req.params.id

  Questions.findQuestions(user_id)
    .then(questions => {
      if (questions) {
        res.status(200).json(questions)
      }else {
        res.status(404).json({ message: 'No questions found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

module.exports = router