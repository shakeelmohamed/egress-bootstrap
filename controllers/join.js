(function(){
    module.exports = function(getViewData, validators) {
        validators
        return {
            get: function(req, res) {
                if (req.session.userID) {
                    //Send user to the account page if they're authorized
                    res.redirect("account");
                }
                else {
                    res.render("join", getViewData("Join", "join"));
                }
            },
            post: function(req, res) {
                var pg = require("pg");
                var bcrypt = require("bcrypt-nodejs");

                var post = req.body;

                //TODO: add some data validation: email, password format, string length, SQL sanitize
                if(!validators.join(post)) {
                    res.render("join", getViewData("Join", "join", req.session.userID, "Error: user registration failed"));
                }
                else {
                    pg.connect(process.env.DATABASE_URL, function (err, client) {
                        if (err) {
                            return console.error("could not connect to postgres", err);
                        }
                        if(post.register == "register")
                        {
                            //TODO: handle registration process, sanitize before doing the insert.
                            //TODO: insert query must be run asynch, to get the callback for errors like non-unique values, etc.
                            client.query("insert into users (userid, username, email, secret) values (DEFAULT, '"+post.user+"', '"+post.email+"', '"+bcrypt.hashSync(post.password)+"')", function (err, result) {
                                if (err || (!post.user || !post.email || !post.password)) {
                                    console.log("ERROR ON REGISTRATION:", err);
                                    res.render("join", getViewData("Join", "join", req.session.userID, "Error: user registration failed"));
                                }
                                else {
                                    console.log("Registration worked for", post.user);
                                    req.session.userID = post.user;
                                    res.redirect("account");
                                }
                            });
                        }
                        else {
                            res.render("join", getViewData("Join", "join", null, "Error: login failed, unexpected form data"));
                        }
                    });
                }
            }
        };
    };
})();