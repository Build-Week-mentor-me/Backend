const router = require('express').Router()

const Questions = require('../users/users-model.js')

// ***endpoints start with /api/users/questions***

// GET ALL QUESTIONS FOR A SINGLE USER
router.get('/', (req, res) => {
  const user_id = req.body.id

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