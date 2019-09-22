# Backend

        ************https://bw-unit4-mentor-me.herokuapp.com/**************

- Endpoints:
  - example: https://bw-unit4-mentor-me.herokuapp.com/api/users/register

  - Register: api/users/register
    - username, password, and position(Mentor/Entrepreneur) are required

  - LogIn:  api/users/login
    - username and password are required

  - Get Users:  api/users

  - Post Question:  api/users/questions
    - user_id, username, position(Mentor/Entrepreneur), question, and business-type
      - user_id and question are required

  - Get specific user's questions:  api/users/questions/:id