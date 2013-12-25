exports.init = function (app) {
    var pg = require('pg'),
    jade = require('jade'),
    bcrypt = require('bcrypt-nodejs'),
    controllerSet = require('../controllers');

    function getViewData (title, pathSuffix, userID, message) {
        // Set app.locals in web.js
        return {
            sitename: app.locals.sitename,
            author: app.locals.author,
            title: title,
            loc: pathSuffix,
            user: userID,
            msg: message
        };
    }

    var controllers = new controllerSet(getViewData);

    app.get('/', controllers.home.get);
    app.get('/404', controllers._404.get);

    app.get('/login', controllers.login.get);

    /*
    app.post('/login', function (req, res) {
        var post = req.body;
        //TODO: add some data validation: email, password format, string length, sql sanitize
        pg.connect(process.env.DATABASE_URL, function (err, client) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            if(post.login == 'login')
            {
                //TODO: this select should only get one result, but let's be explicit and limit results to 1
                client.query("SELECT * from users where username='"+post.user+"'", function (err, result) {
                    if (err || result.rows.length === 0) {
                        res.render('login', getViewData('Login', 'login', req.session.user_id, 'Error: login failed'));
                        client.end();
                    }
                    else {
                        if ( bcrypt.compareSync(post.password, result.rows[0].secret) ) {
                            req.session.user_id = post.user;
                            res.redirect('/account');
                        }
                        else {
                            res.render('login', getViewData('Login', 'login', req.session.user_id, 'Error: login failed'));
                        }
                        client.end();
                    }
                });
            }
            else {
                res.render('login', getViewData('Login', 'login', req.session.user_id, 'Error: login failed, unexpected form data'));
            }
        });
    });
    */
    
    app.get('/join', controllers.join.get);

    app.post('/join', function (req, res) {
        var post = req.body;
        //TODO: add some data validation: email, password format, string length, sql sanitize
        pg.connect(process.env.DATABASE_URL, function (err, client) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            if(post.register == 'register')
            {
                //TODO: handle registration processs, sanitize before doing the insert.
                //TODO: insert query must be run asynch, to get the callback for errors like non-unique values, etc.
                client.query("insert into users (userid, username, email, secret) values (DEFAULT, '"+post.user+"', '"+post.email+"', '"+bcrypt.hashSync(post.password)+"')", function (err, result) {
                    if (err) {
                        console.log("ERROR ON REGISTRATION: "+err);
                    }
                    else {
                        console.log("I think registration worked.");
                        req.session.user_id = post.user;
                        res.redirect('account');
                    }
                });
            }
            else {
                res.render('join', getViewData('Join', 'join', null, 'Error: login failed, unexpected form data'));//{title: 'Join', loc: 'join', msg: 'Error: login failed, unexpected form data'});
            }
        });
    });
    
    app.get('/logout', controllers.logout.get);

    /**Function to check if a user is logged in**/
    function checkAuth(req, res, next) {
        //set boolean to true for checking if a user is authorized
        if (!req.session.user_id) {
            //Send user to the login page if they're not authorized
            res.redirect('login');
        }
        else 
            next();
    }

    app.get('/account', checkAuth, controllers.account.get);
};