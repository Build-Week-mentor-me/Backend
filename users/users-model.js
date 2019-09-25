db = require('../database/dbConfig.js')

module.exports = {
  findBy,
  findUsers,
  findUser,
  findQuestions,
  findQuestion,
  findResponses,
  findResponse,
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

function findBy(info) {
  return db('users').where(info)
}

function findUsers() {
  return db('users').select('id','username', 'position')
}

function findUser(user_id) {
  if (user_id) {
    return db('users').where({id: user_id}).first()
  }else {
    return { message: 'User ID not found' }
  }
}

function findQuestions(user_id) {
  console.log(user_id)
  if (user_id) {
    return db('questions as q')
    .join('users as u', 'u.id', 'q.user_id')
    .select('q.id','user_id','u.username','u.position','question','business-type')
    .where({user_id})
  }
  else if (user_id === null || user_id === undefined) {
    return db('questions as q')
      .join('users as u', 'u.id', 'q.user_id')
      .select('q.id', 'user_id', 'u.username', 'u.position', 'question', 'business-type')
  }else {
    return {message: 'No user with that ID was found'}
  }
}

function findQuestion(question_id) {
  if (question_id) {
    return db('questions as q')
      .join('users as u', 'u.id', 'q.user_id')
      .select('q.*', 'u.username', 'u.position')
      .where('q.id', question_id).first()
  } else {
    return { message: 'Question ID not found' }
  }
}

function findResponses(question_id) {
  if (question_id) {
    return db('responses as r')
      .join('questions as q', 'q.id', 'r.question_id')
      .where({question_id})
  } 
  else if (question_id === null || question_id === undefined) {
    return db('responses as r')
      .join('questions as q', 'q.id', 'r.question_id')
      .join('users as u', 'u.id', 'q.user_id')
      .select('q.question', 'r.*', 'u.username', 'u.position')
  }else {
    return {message: 'Question ID not found' }
  }
}

function findResponse(response_id) {
  if (response_id) {
    return db('responses as r')
      .join('questions as q', 'q.id', 'r.question_id')
      .join('users as u', 'u.id', 'q.user_id')
      .select('q.question','r.*', 'u.username', 'u.position')
      .where('r.id', response_id).first()
  } else {
    return { message: 'Response ID not found' }
  }
}

function addUser(user) {
  const { username, password, position } = user

  if (username && password && position) {
    return db('users').insert(user)
      .then(id => {
        return findUser(id[0])
      })
  }else {
    console.log('error!!!')
    return {message: 'Required data is missing'}
  }
}

function addQuestion(question) {
  if (question) {
    return db('questions').insert(question)
      .then(id => {
        return findQuestion(id[0])
      })
  } else {
    return { message: 'Required data is missing' }  }
}

function addResponse(response) {
  if (response) {
    return db('responses').insert(response)
      .then(id => {
        return findResponse(id[0])
      })
  } else {
    return { message: 'Required data is missing' }  }
}

function updateUser(changes, user_id) {
  return db('users').where({user_id}).update(changes)
    .then(id => {
      return findUser(id[0])
    })
}

function updateQuestion(changes, question_id) {
  return db('questions').where({ question_id }).update(changes)
    .then(id => {
      return findQuestion(id[0])
    })
}

function updateResponse(changes, response_id) {
  return db('responses').where({ response_id }).update(changes)
    .then(id => {
      return findResponse(id[0])
    })
}

function removeUser(user_id) {
  const deleted = findUser(user_id)

  if (user_id) {
    return db('users').where({user_id}).del()
      .then(count => {
        return deleted
      })
  }else {
    return null
  }
}

function removeQuestion(question_id) {
  const deleted = findQuestion(question_id)

  if (question_id) {
    return db('questions').where({ question_id }).del()
      .then(count => {
        return deleted
      })
  } else {
    return null
  }
}

function removeResponse(response_id) {
  const deleted = findQuestion(response_id)

  if (response_id) {
    return db('responses').where({ response_id }).del()
      .then(count => {
        return deleted
      })
  } else {
    return null
  }
}