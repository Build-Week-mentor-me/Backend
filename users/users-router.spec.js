const request = require('supertest')

const server = require('../api/server.js')
const db = require('../database/dbConfig.js')

describe('the server', () => {

  beforeEach(async () => {
    await db('users').truncate()
  })

})