egress: start writing a web app already.
====

egress is a minimal [Express](http://expressjs.com/) app template for a user account system.
I built this with the intention of getting user-based node.js apps scaffolded out quickly.

<table>
    <tr>
        <th>Branch</th>
        <th>Build Status</th>
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

## Usage
* The best way to use egress is by using the [Yeoman generator](http://github.com/shakeelmohamed/generator-egress)
* This package was not meant to be installed through npm
    * But, you can run `npm install egress`, then copy the contents of the `node_modules/egress` folder to the root of your project directory and follow the steps below
    * Or, you can clone this project in the root of your project directory by running `git clone git@github.com/shakeelmohamed/egress.git`
* You don't need to declare this module as a dependency in your project's `package.json` file.

## Current problems (marked with a TODO)

* There is no significant input validation in place, I suggest using [validator.js](https://github.com/chriso/validator.js) since it's already being used in the browser.
See the current validation in [public/js/validator.min.js](public/js/validators.js)

### Development with Foreman:

1. Create a `.env` file in the root directory of this project
2. Your `.env` file should contain your PostgreSQL connection string in the following format, the `?ssl=true` bit is necessary only if your database connection requires SSL (Heroku's databases do):
    ```
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>?ssl=true
    ```
This will allow your application to connect to your database

3. Modify the `config` object in `config.js`
4. Running `foreman start` will process the `DATABASE_URL` variable, locally.

### Deploying to Heroku:

1. Authenticate via the Heroku command line, `heroku login`
2. Set your environment variables on Heroku
    * If you've already setup your `.env` file as documented above, simply run `heroku config:push`
    * Otherwise you can run the following command before `heroku config:push`
    `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>?ssl=true`
3. Modify the `config` object in `config.js`
4. Push your code up to your Heroku app, done

## Modifying site content

* See the `jade` directory for various markup files used to create the web views.
* See the `controllers` directory for specific functionality for the views, along with the files in `routes` for how they're invoked.
* Add additional frontend assets to the `public` directory, then reference them in the files found in `jade/includes`, particularly `head.jade` and `scripts.jade`

## Running the tests

* Make sure your environment is setup to run [Zombie.js](http://zombie.labnotes.org/#Infection)
* With foreman
    * run `foreman run npm test` from the root directory of this repository
* Without foreman
    * run `npm test`

## Validating JS and Jade files

* Run `grunt`

# Dependencies

* [Bootstrap v3.1.1](https://github.com/twbs/bootstrap/releases/tag/v3.1.1)
* [PostgreSQL](http://www.postgresql.org/)
* For other dependencies see [package.json](package.json)

# Issues

* When in doubt, create an issue!

# Contact

You can most easily reach me on twitter [@_Shakeel](http://twitter.com/_Shakeel)

# License

This project is licensed under the terms of [the MIT license](LICENSE)