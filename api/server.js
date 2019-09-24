const express = require('express')
const cors = require('cors')

require('dotenv').config()

console.log(process.env.JWT_SECRET)

const usersRouter = require('../users/users-router.js')
const questionsRouter = require('../questions/questions-router.js')
const responsesRouter = require('../responses/responses-router.js')

const server = express()

server.use(express.json())
server.use(cors())

server.options('*', cors())

server.use('/api/users', usersRouter)
server.use('/api/users/questions', questionsRouter)
// server.use('/api/users/responses', responsesRouter)

server.get('/', (req, res) => {
  res.send('Welcome to Mentor Me!')
})

module.exports = server