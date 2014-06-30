function areFieldsSet(postObject) {
    // Define your custom validation here
    if (postObject.user && postObject.password) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = function (getViewData, config) {
    return {
        get: function (req, res) {
            if (req.session.userID) {
                //Send user to the account page if they're authorized
                res.redirect("account");
            }
            else {
                res.render("signin", getViewData("Sign in", "signin"));
            }
        },
        post: function (req, res) {
            var async = require("async");
            var bcrypt = require("bcrypt-nodejs");
            var pg = require("pg");

            var post = req.body;
            
            //TODO: add some data validation: email, password format, string length, SQL sanitize
            if (!areFieldsSet(post)) {
                res.render("signin", getViewData("Sign in", "signin", req.session.userID, "Error: signin failed"));
            }
            else {
                pg.connect(config.DATABASE_URL, function (err, client) {
                    if (err) {
                        return console.error("could not connect to postgres", err);
                    }
                    if (post.signin == "signin")
                    {
                        async.waterfall([
                                function (callback) {
                                    client.query("SELECT * FROM users WHERE LOWER(username)=LOWER($1) OR LOWER(email)=LOWER($1) LIMIT 1", [post.user], callback);
                                },
                                function (result, callback) {
                                    if (!result || !result.rows || result.rows.length === 0) {
                                        //TODO: learn more about each of these cases, and why they occur
                                        //      at least one of these is due to post.user being an invalid user
                                        callback(true);
                                    }
                                    else {
                                        if (bcrypt.compareSync(post.password, result.rows[0].secret)) {
                                            console.log("Sign in worked for", result.rows[0].username);
                                            req.session.userID = result.rows[0].username;
                                            res.redirect("account");
                                        }
                                        else {
                                            callback(true);
                                        }
                                    }
                                }
                            ],
                            function (err) {
                                if (err || err === true) {
                                    res.render("signin", getViewData("Sign in", "signin", req.session.userID, "Error: signin failed"));
                                }
                            }
                        );
                    }
                    else {
                        res.render("signin", getViewData("Sign in", "signin", req.session.userID, "Error: signin failed, unexpected form data"));
                    }
                });
            }
        }
    };
};
