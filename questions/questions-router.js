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

module.exports = router