Tables:
  - users
      - id
      - username: required, unique
      - password: required
      - position(Mentor/Entrepreneur):  required

  - questions
      - id
      - user_id(foreign key): required
      - username
      - position(Mentor/Entrepreneur)
      - question:  required
      - business-type

  - responses
      - id
      - question_id(foreign key): required
      - username:  required
      - position(Mentor/Entrepreneur): required
      - response:  required
      - business-type


