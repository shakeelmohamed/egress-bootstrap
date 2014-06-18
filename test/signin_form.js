module.exports = function (assert, testuser, app, browser) {
    describe("Sign in form:", function () {
        describe("elements", function () {
            it("should match what is expected", function (done) {
                browser.visit("/signin")
                .then(function () {
                    assert.equal(browser.text("h1"), "Sign in to " + app.locals.siteName);
                    assert.ok(browser.query("#user"), "Couldn't find user field.");
                    assert.ok(browser.query("#password"), "Couldn't find password field.");
                    assert.ok(browser.query("#signin"), "Couldn't find signin button.");
                })
                .then(done);
            });
        });
        
        describe("script", function () {
            it("should sign in as a user", function (done) {
                browser.visit("/signin", function () {
                    browser.fill("user", testuser.username);
                    browser.fill("password", testuser.password);
                    browser.pressButton("signin", function () {
                        assert.ok(browser.success);
                        assert.ok(!browser.text("#error"), browser.text("#error"));
                        done();
                    });
                });
            });
            it("should sign out the test user", function (done) {
                browser.visit("/signout", function () {
                    assert.ok(browser.success);
                    done();
                    //At this point the user will have been logged out, and redirected to /signin
                });
            });
            it("should sign in as a user, all caps", function (done) {
                browser.visit("/signin", function () {
                    browser.fill("user", testuser.username.toUpperCase());
                    browser.fill("password", testuser.password);
                    browser.pressButton("signin", function () {
                        assert.ok(browser.success);
                        assert.ok(!browser.text("#error"), browser.text("#error"));
                        done();
                    });
                });
            });
            it("should sign out the test user", function (done) {
                browser.visit("/signout", function () {
                    assert.ok(browser.success);
                    done();
                    //At this point the user will have been logged out, and redirected to /signin
                });
            });
            it("should sign in as a user, using email", function (done) {
                browser.visit("/signin", function () {
                    browser.fill("user", testuser.email);
                    browser.fill("password", testuser.password);
                    browser.pressButton("signin", function () {
                        assert.ok(browser.success);
                        assert.ok(!browser.text("#error"), browser.text("#error"));
                        done();
                    });
                });
            });
            it("should sign out the test user", function (done) {
                browser.visit("/signout", function () {
                    assert.ok(browser.success);
                    done();
                    //At this point the user will have been logged out, and redirected to /signin
                });
            });
            it("should sign in as a user, using email all caps", function (done) {
                browser.visit("/signin", function () {
                    browser.fill("user", testuser.email.toUpperCase());
                    browser.fill("password", testuser.password);
                    browser.pressButton("signin", function () {
                        assert.ok(browser.success);
                        assert.ok(!browser.text("#error"), browser.text("#error"));
                        done();
                    });
                });
            });
        });
    });
};
