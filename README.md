Egress
====

## Build Status:
<table>
    <tr>
        <th>Branch</th>
        <th>Status</th>
    </tr>
    <tr>
        <td>Master</td>
        <td>
            <img src="https://travis-ci.org/shakeelmohamed/egress.png?branch=master" />
        </td>
    </tr>
    <tr>
        <td>Develop</td>
        <td>
            <img src="https://travis-ci.org/shakeelmohamed/egress.png?branch=develop" />
        </td>
    </tr>
</table>

## Egress (v.) - to go out; emerge.

Egress is a minimal [Express](http://expressjs.com/) app template for a user account system.
I built this with the intention of getting user-based node.js apps scaffolded out quickly.

## Installing

* This package was not meant to be installed over npm.
    * But, you can run `npm install egress`, then copy the contents of the `node_modules/egress` folder to the root of your project directory and follow the steps below.
    * Or, you can clone this project in the root of your project directory by executing `git clone git@github.com/shakeelmohamed/egress`

## Setup

* Deploying to Heroku:
    1. Authenticate via the Heroku command line, `heroku login`
    2. Execute `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>`
    3. Execute `heroku config:set PGSSLMODE=require`
    4. Change the `config` object in `config.js`
    5. Push your code up to your Heroku app, done

* Development with Foreman:
    1. Create a `.env` file in the root directory of this project
    2. In your `.env` file add your PostgreSQL connection string in the following format:
    
    ```
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>
    PGSSLMODE=require
    ```

    This will allow your application to connect to your database
    3. Change the `app.locals` configuration object in `app.js`
    4. Running `foreman start` will process the `DATABASE_URL` and `PGSSLMODE` values, locally

* If using anything else
    * Submit a pull request

## Running the tests

* Make sure your environment is setup to run [Zombie.js](http://zombie.labnotes.org/#Infection)
* With foreman
    * execute `foreman run npm test` from the root directory of this repository
* Else
    * Submit an issue

# License

This project is licensed under the terms of [the MIT license](LICENSE).