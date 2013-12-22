Nope.js
====

[![Build Status](https://travis-ci.org/shakeelmohamed/Nope.js.png)](https://travis-ci.org/shakeelmohamed/Nope.js)

NOPE is an acronym for Node.js Organized PostgreSQL Experience, a minimal user account login system built for a PostgreSQL back-end.


## Setup

1. Create a `.env` file in the root directory of this project
2. In your `.env` file add your PostgreSQL connection string in the following format
`DATABASE_URL=postgres://<username>:<password>@<host>/<dbname>`, this will allow your application to connect to your database.