-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  id serial NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  secret text NOT NULL,
  CONSTRAINT "PRIMARY" PRIMARY KEY (id),
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT username_unique UNIQUE (username)
)