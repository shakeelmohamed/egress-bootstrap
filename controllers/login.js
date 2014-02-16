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
                var bcrypt = require("bcrypt-nodejs");

                var post = req.body;
                
                //TODO: add some data validation: email, password format, string length, SQL sanitize
                if (!validators.login(post)) {
                    res.render("login", getViewData("Login", "login", req.session.userID, "Error: login failed"));
                }
                else {
                    var db = require("../p").connect();
                    if (post.login === "login") {

                        db.query("SELECT * FROM users WHERE username='"+post.user+"' OR email='"+post.user+"' LIMIT 1", function(err, result) {
                            if (err || !result || !result.rows || result.rows.length === 0) {
                                res.render("login", getViewData("Login", "login", req.session.userID, "Error: login failed"));
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
                            }
                            db.end();
                        });
                    }
                    else {
                        res.render("login", getViewData("Login", "login", req.session.userID, "Error: login failed, unexpected form data"));
                    }
                }
            }
        };
    };
})();