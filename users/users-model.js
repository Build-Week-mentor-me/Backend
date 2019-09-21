db = require('../database/dbConfig.js')

module.exports = {
  findUsers,
  findUser,
  findQuestions,
  findQuestion,
  findResponses,
  addUser,
  addQuestion,
  addResponse,
  updateUser,
  updateQuestion,
  updateResponse,
  removeUser,
  removeQuestion,
  removeResponse
}

function findUsers() {
  return db('users')
}

function findUser(user_id) {
  if (user_id) {
    return db('users').where({id}).first()
  }else {
    res.status(404).json({ message: 'User ID not found' })
  }
}

function findQuestions(user_id) {
  if (user_id) {
    return db('questions as q')
    .join('users as u', 'u.id', 'q.user_id')
    .where(user_id)
  } else {
    res.status(404).json({ message: 'User ID not found' })
  }
}

function findQuestion(question_id) {
  if (question_id) {
    return db('questions').where({ question_id }).first()
  } else {
    res.status(404).json({ message: 'Question ID not found' })
  }
}

function findResponses(question_id) {
  if (question_id) {
    return db('responses as r')
      .join('questions as q', 'q.id', 'r.question_id')
      .where(question_id)
  } else {
    res.status(404).json({ message: 'Question ID not found' })
  }
}

function addUser(user) {
  if (user) {
    return db('users').insert(user)
      .then(id => {
        return findUser(id[0])
      })
  }else {
    res.status(404).json({ message: 'User data is missing' })
  }
}

function addQuestion(question) {
  if (question) {
    return db('questions').insert(question)
      .then(id => {
        return findQuestion(id[0])
      })
  } else {
    res.status(404).json({ message: 'Question data is missing' })
  }
}

function addResponse(response) {
  if (response) {
    return db('responses').insert(response)
      .then(id => {
        return findResponse(id[0])
      })
  } else {
    res.status(404).json({ message: 'Response data is missing' })
  }
}

function updateUser(changes, user_id) {
  
}

function updateQuestion(changes, question_id) {

}

function updateResponse(changes, response_id) {

}

function removeUser(user_id) {
  
}

function removeQuestion(question_id) {

}

function removeResponse(response_id) {

}