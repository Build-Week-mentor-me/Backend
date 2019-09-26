# Backend

        ************https://bw-unit4-mentor-me.herokuapp.com/**************

- Endpoints:
  - example: https://bw-unit4-mentor-me.herokuapp.com/api/users/register

USERS:
  - Register: api/users/register
    - username, password, and position(Mentor/Entrepreneur) are required
    - returns the new user with a token

  - LogIn:  api/users/login
    - username and password are required
    - returns the user with a token

  - Get Users:  api/users
    - returns a list of all users (id, username, and position)

  - Update a User: api/users/:id
    - returns the updated user

  - Delete a User: api/users/:id
    - returns the deleted user
    * Deleting a User also deletes all associated questions and responses

QUESTIONS:
  - Post Question:  api/users/questions
    - user_id, question, and business-type
      - user_id and question are required
      - returns the user and question (id, user_id, username, position, question, and business-type)

  - Get all questions: api/users/questions
    - returns a list of all questions (id, user_id, username, position, question, and business-type)

  - Get specific user's questions:  api/users/questions/:id
    - returns a list of all of a user's questions (id, user_id, username, position, question, and business-type)

  - Get a specific question:  api/users/questions/question/:id
    - returns the user and question (id, user_id, username, position, question, and business-type) 

  - Update a Question: api/users/questions/:id
    - returns the updated question

  - Delete a Question: api/users/questions/:id
    - returns the deleted question
    * Deleting a question also deletes all associated responses
  
RESPONSES:
  - Post response:  api/users/responses
    - question_id, response, and business-type
      - question_id and response are required
      - returns the user and response (id, question_id, username, position, response, and business-type)

  - Get all responses: api/users/responses
    - returns a list of all responses (id, question, question_id, username, position, response, and business-type)

  - Get specific question's responses:  api/users/responses/:id
    - returns a list of all of a question's responses (id, question, question_id, username, position, response, and business-type)

  - Get a specific response:  api/users/responses/response/:id
    - returns the user and response (id, question, question_id, username, position, response, and business-type)

  - Update a Response: api/users/responses/:id
    - returns the updated response

  - Delete a Response: api/users/responses/:id
    - returns the deleted response