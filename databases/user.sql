-- Table: user

-- DROP TABLE user;

CREATE TABLE user
(
  userid serial NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  secret text NOT NULL,
  CONSTRAINT "PRIMARY" PRIMARY KEY (userid),
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT nicename_unique UNIQUE (username)
)