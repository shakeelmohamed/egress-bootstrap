Egress: start writing a web app already.
====

Egress is a minimal [Express](http://expressjs.com/) app template for a user account system.
I built this with the intention of getting user-based node.js apps scaffolded out quickly.
The backend is implemented using PostgreSQL.

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

## Usage
* The best way to use Egress is by using the [Yeoman generator](http://github.com/shakeelmohamed/generator-egress)
* This package was not meant to be installed over npm
    * But, you can run `npm install egress`, then copy the contents of the `node_modules/egress` folder to the root of your project directory and follow the steps below
    * Or, you can clone this project in the root of your project directory by executing `git clone git@github.com/shakeelmohamed/egress.git`
* You don't need to declare this package as a dependency in your project's `package.json` file.


### Development with Foreman:

1. Create a `.env` file in the root directory of this project
2. Your `.env` file should contain your PostgreSQL connection string in the following format, along with setting the `PGSSLMODE` variable to `require`:

```
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>
PGSSLMODE=require
```

This will allow your application to connect to your database

3. Modify the `config` object in `config.js`
4. Running `foreman start` will process the `DATABASE_URL` and `PGSSLMODE` values, locally

### Deploying to Heroku:

1. Authenticate via the Heroku command line, `heroku login`
2. Set your environment variables on Heroku
    * If you're already setup you `.env` file as documented above, simply execute `heroku config:push`
    * Otherwise you can execute
        1. Execute `heroku config:set DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<dbname>`
        2. Execute `heroku config:set PGSSLMODE=require`
4. Modify the `config` object in `config.js`
5. Push your code up to your Heroku app, done

### Deploying elsewhere

* Submit a pull request

## Modifying site content

* See the `jade` directory for various markup files used to create the web views.
* See the `controllers` directory for specific functionality for each views, along with the files in `routes` for how they're invoked.
* Add additional frontend assets to the `public` directory, then reference them in the files found in `jade/includes`, particularly `head.jade` and `scripts.jade`

## Running the tests

* Make sure your environment is setup to run [Zombie.js](http://zombie.labnotes.org/#Infection)
* With foreman
    * execute `foreman run npm test` from the root directory of this repository
* Without foreman
    * execute `npm test`

## Validating JS and Jade files

* Run `grunt`

## Current problems (marked with a TODO)

* There is no significant input validation in place. I'm planning to implement [validator.js](https://github.com/chriso/validator.js). This is necessary for:
    * Security issues
    * Password requirements
* There is no protection against SQL injection, which is a huge security concern. This might be addressed as a byproduct of adding input validation.

# Dependencies

* [Bootstrap v3.0.0](https://github.com/twbs/bootstrap/releases/tag/v3.0.0)
* [PostgreSQL](http://www.postgresql.org/)
* For other dependencies see [package.json](package.json)

# Issues

* When in doubt, create an issue and I'll probably respond within 24 hours.

# Contact

You can most easily reach me on twitter [@_Shakeel](http://twitter.com/_Shakeel)

# License

This project is licensed under the terms of [the MIT license](LICENSE)