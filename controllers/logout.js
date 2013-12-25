(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                delete req.session.user_id;
                res.redirect('/login');
            },
            set: function(req, res) {
                var pg = require('pg');
                var bcrypt = require('bcrypt-nodejs');
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
            }
        }
    }
})();