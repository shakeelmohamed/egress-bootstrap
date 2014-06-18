module.exports = function (assert, browser) {
    describe("Sign out:", function () {
        describe("script", function () {
            it("should sign out the test user", function (done) {
                browser.visit("/signout", function () {
                    assert.ok(browser.success);
                    done();
                    //At this point the user will have been logged out, and redirected to /signin
                });
            });
        });
    });
};