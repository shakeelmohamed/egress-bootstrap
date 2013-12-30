Nope.js
====

Build Status:
<table>
    <tr>
        <th>Branch</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>Master</td>
        <td>
            <img src="https://travis-ci.org/shakeelmohamed/Nope.js.png?branch=master" />
        </td>
    </tr>
    <tr>
        <td>Develop</td>
        <td>
            <img src="https://travis-ci.org/shakeelmohamed/Nope.js.png?branch=develop" />
        </td>
    </tr>
</table>

NOPE is an acronym:
* Node.js
* Organized
* PostgreSQL
* Experience

It's a minimal user account login system built with PostgreSQL support.

## Setup

* If using Heroku:
    1. Authenticate via the Heroku command line, `heroku login`.
    2. Execute `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>`.
    3. Change the `app.locals` configuration object in `app.js`.
    4. Push your code up to your Heroku app, done.

* If using Foreman:
    1. Create a `.env` file in the root directory of this project.
    2. In your `.env` file add your PostgreSQL connection string in the following format:
    
    ```
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>
    PGSSLMODE=require
    ```

    This will allow your application to connect to your database.
    3. Change the `app.locals` configuration object in `app.js`.
    4. Running `foreman start` will process the `DATABASE_URL` and `PGSSLMODE` values, locally.

* If using anything else
    * Submit a pull request.

## Running the tests

* Make sure your environment is setup to run [Zombie.js](http://zombie.labnotes.org/#Infection)
* If you want to run the tests, execute `npm test` (or `foreman run npm test` if using foreman) from the root directory of this repository.

# License

This project is licensed under the terms of [the MIT license](LICENSE).