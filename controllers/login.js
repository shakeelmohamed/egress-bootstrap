(function(){
    module.exports = function(getViewData, validators, config){
        return {
            get: function(req, res) {
                if (req.session.userID) {
                    //Send user to the account page if they're authorized
                    res.redirect("account");
                }
                else {
                    res.render("login", getViewData("Login", "login"));
                }
            },
            post: function(req, res) {
                var pg = require("pg");
                var bcrypt = require("bcrypt-nodejs");

                var post = req.body;
                
                //TODO: add some data validation: email, password format, string length, SQL sanitize
                if (!validators.login(post)) {
                    
                }
                else {
                    pg.connect(config.postgres, function (err, client) {
                        if (err) {
                            return console.error("could not connect to postgres", err);
                        }
                        if (post.login == "login")
                        {
                            client.query("SELECT * FROM users WHERE username=$1 OR email=$1 LIMIT 1", [post.user],function (err, result) {
                                if (err || !result || !result.rows || result.rows.length === 0) {
                                    res.render("login", getViewData("Login", "login", req.session.userID, "Error: login failed"));
                                    client.end();
                                }
                                else {
                                    if (bcrypt.compareSync(post.password, result.rows[0].secret)) {
                                        console.log("Login worked for", result.rows[0].username);
                                        req.session.userID = post.user;
                                        res.redirect("/account");
                                    }
                                    else {
                                        res.render("login", getViewData("Login", "login", req.session.userID, "Error: login failed"));
                                    }
                                    client.end();
                                }
                            });
                        }
                        else {
                            res.render("login", getViewData("Login", "login", req.session.userID, "Error: login failed, unexpected form data"));
                        }
                    });
                }
            }
        };
    };
})();