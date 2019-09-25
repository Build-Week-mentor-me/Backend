exports.up = function (knex) {
  //  USERS TABLE
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.string('username', 128).unique().notNullable()
    tbl.string('password', 128).notNullable()
    tbl.string('position', 128).notNullable()
  })
    // QUESTIONS TABLE
    .createTable('questions', tbl => {
      tbl.increments()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.string('question', 500).notNullable()
      tbl.string('business-type', 128)
    })

    //  RESPONSES TABLE
    .createTable('responses', tbl => {
      tbl.increments()
      tbl.integer('question_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('questions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.string('response', 500).notNullable()
      tbl.string('business-type', 128)
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('responses')
    .dropTableIfExists('questions')
    .dropTableIfExists('users')
};