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
                        done();
                    });
                });
            });
        });
    });
};