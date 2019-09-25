# Backend

        ************https://bw-unit4-mentor-me.herokuapp.com/**************

- Endpoints:
  - example: https://bw-unit4-mentor-me.herokuapp.com/api/users/register

  - Register: api/users/register
    - username, password, and position(Mentor/Entrepreneur) are required
    - returns the new user with a token

  - LogIn:  api/users/login
    - username and password are required
    - returns the user with a token

  - Get Users:  api/users
    - returns a list of all users (id, username, and position)

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