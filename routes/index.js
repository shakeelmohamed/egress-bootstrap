exports.init = function (app, config) {
    var pg = require('pg'),
    jade = require('jade'),
    bcrypt = require('bcrypt-nodejs');

    function getViewData (title, pathSuffix, userID, message) {
        // Set the config values in web.js
        return {
            sitename: config.sitename,
            author: config.author,
            title: title,
            loc: pathSuffix,
            user: userID
        };
    }

    app.get('/', function (req, res) {
        res.render('index', getViewData('Home', 'home', req.session.user_id));
    });

    app.get('/404', function (req, res) {
        res.render('404', getViewData('404', '', req.session.user_id));
    });

    app.get('/login', function (req, res) {
        if (req.session.user_id) {
            //Send user to the account page if they're authorized
            //TODO: make this a middleware function for code reuse
            res.redirect('account');
        }
        else {
            res.render('login', getViewData('Login', 'login'));
        }
    });

    app.post('/login', function (req, res) {
        var post = req.body;

        //TODO: add some data validation: email, password format, string length, sql sanitize
        pg.connect(process.env.DATABASE_URL, function (err, client) {
            if (err) {
                return console.error('could not connect to postgres', err);
            }
            if(post.login == 'login')
            {
                client.query("SELECT * from subject where nicename='"+post.user+"'", function (err, result) {
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

    app.get('/join', function (req, res) {
        if (req.session.user_id) {
            //Send user to the account page if they're authorized
            res.redirect('account');
        }
        else {
            res.render('join', getViewData('Join', 'join'));
        }
    });

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
                client.query("insert into subject (subjectid, nicename, email, secret) values (DEFAULT, '"+post.user+"', '"+post.email+"', '"+bcrypt.hashSync(post.password)+"')", function (err, result) {
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

    app.get('/logout', function (req, res) {
        delete req.session.user_id;
        res.redirect('/login');
    });

    /**Function to check if a user is logged in**/
    function checkAuth(req, res, next) {
        //set boolean to true for checking if a user is authorized
        if (!req.session.user_id) {
            //Send user to the login page if they're not authorized
            res.redirect('login');
        }
        else {
            next();
        }
    }

    /**Pages that require user to be logged in**/
    app.get('/account', checkAuth, function(req, res){
        res.render('account', getViewData('Account', 'account', req.session.user_id));
    });
};