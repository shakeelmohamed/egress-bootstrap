Nope.js
====

[![Build Status](https://travis-ci.org/shakeelmohamed/Nope.js.png)](https://travis-ci.org/shakeelmohamed/Nope.js)

NOPE is an acronym:
* Node.js
* Organized (read: OCD)
* PostgreSQL
* Experience

It's a minimal user account login system built with PostgreSQL support.

## Setup

* If using Heroku:
    1. Authenticate via the Heroku command line, `heroku login`.
    2. Execute `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>`.
    3. Push your code up to your Heroku app, done.

* If using Foreman:
    1. Create a `.env` file in the root directory of this project.
    2. In your `.env` file add your PostgreSQL connection string in the following format:
    
    ```
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>
    PGSSLMODE=require
    ```

    This will allow your application to connect to your database.
    3. Running `foreman start` will process the `DATABASE_URL` and `PGSSLMODE` values, locally.
* If using something else
    * Submit a pull request.

# License

This projected is licensed under the terms of [the MIT license](LICENSE).