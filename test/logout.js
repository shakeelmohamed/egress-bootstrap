module.exports = function(assert, browser){
    describe("Logout:", function(){
        describe("script", function(){
            it("should logout the test user", function(done){
                browser.visit("/logout", function(){
                    assert.ok(browser.success);
                    done();
                    //At this point the user will have been logged out, and redirected to /login
                });
            });
        });
    });
};