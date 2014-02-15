module.exports = function(assert, testuser, app, browser){
    describe("Login form:", function(){
        describe("elements", function(){
            it("should match what is expected", function(done) {
                browser.visit("/login")
                .then(function() {
                    assert.equal(browser.text("h1"), "Login to "+app.locals.siteName);
                    assert.ok(browser.query("#user"), "Couldn't find user field.");
                    assert.ok(browser.query("#password"), "Couldn't find password field.");
                    assert.ok(browser.query("#login"), "Couldn't find login button.");
                })
                .then(done);
            });
        });
        
        describe("script", function(){
            it("should login as a user", function(done) {
                browser.visit("/login", function(){
                    browser.fill("user", testuser.username);
                    browser.fill("password", testuser.password);
                    browser.pressButton("login", function() {
                        assert.ok(browser.success);
                        assert.ok(!browser.text("#error"), browser.text("#error"));
                        done();
                    });
                });
            });
            it("should logout the test user", function(done){
                browser.visit("/logout", function(){
                    assert.ok(browser.success);
                    done();
                    //At this point the user will have been logged out, and redirected to /login
                });
            });
            it("should login as a user, using email", function(done) {
                browser.visit("/login", function(){
                    browser.fill("user", testuser.email);
                    browser.fill("password", testuser.password);
                    browser.pressButton("login", function() {
                        assert.ok(browser.success);
                        assert.ok(!browser.text("#error"), browser.text("#error"));
                        done();
                    });
                });
            });
        });
    });
};