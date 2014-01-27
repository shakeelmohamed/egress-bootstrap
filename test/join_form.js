module.exports = function(assert, testuser, app, browser){
    describe("Join form:", function() {
        describe("elements", function(){
            it("should match what is expected", function(done) {
                browser.visit("/join")
                .then(function() {
                    assert.equal(browser.text("h2"), "Join "+app.locals.siteName);
                    assert.ok(browser.query("#user"), "Couldn't find user field.");
                    assert.ok(browser.query("#email"), "Couldn't find email field.");
                    assert.ok(browser.query("#password"), "Couldn't find password field.");
                    assert.ok(browser.query("#register"), "Couldn't find join button.");
                })
                .then(done);
            });
        });
        describe("script", function(){
            it("should create a test user via the registration form", function(done) {
                browser.visit("/join", function(){
                    browser.fill("user", testuser.username);
                    browser.fill("email", testuser.email);
                    browser.fill("password", testuser.password);
                    browser.pressButton("register", function() {
                        assert.ok(browser.success);
                        done();
                    });
                    //At this point the user will have been logged in, and redirected to /account
                });
            });
        });
    });
};