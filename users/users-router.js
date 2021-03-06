const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./users-model.js')
const generateToken = require('../api/generateToken.js')
const authentication = require('../api/auth-middleware.js')

// ***endpoints start with /api/users***

// Register endpoint:
router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  const { username, password, position } = user

  if(username && password && position && Object.keys(user).length === 3) {

    Users.addUser(user)
      .then(newUser => {
        const token = generateToken(newUser)
  
        res.status(201).json({
          user: newUser,
          token
        })
        
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `${err}` })
      })
  }else {
    res.status(400).json({ message: 'Register handles 3 values: username, password, and position' })
  }
})

// Login endpoint:
router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          id: user.id,
          username: user.username,
          position: user.position,
          message: `${user.username}, you shall pass.`,
          token
        })
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// Get users endpoint:
router.get('/', authentication, (req, res) => {
  Users.findUsers()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

// UPDATE A USER
router.put('/:id', authentication, (req, res) => {
  const { username, password, position } = req.body
  const changes = req.body
  const id = req.params.id

  if (!username || !password || !position) {
    res.status(400).json({ message: 'username, password, and position are required' })
  }else {
    Users.updateUser(changes, id)
      .then(user => {
        if (user) {
          res.status(200).json({user})
        }else {
          res.status(404).json({ message: 'User with the specified ID not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `${err}` })
      })
  }
})

// DELETE A USER
router.delete('/:id', authentication, (req, res) => {
  const { id } = req.params
  const deleted = Users.findUser(id)
    .then(user => {
      return user
    })

  Users.removeUser(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json(deleted)
      }else {
        res.status(404).json({ message: 'User with the specified ID not found' })
      }
    })
    .catch(err => {
      res.status(400).json({ errorMessage: `${err}` })
    })
})

module.exports = router