module.exports = function(testuser, pg, assert){
    describe("Cleanup", function(){
        it("test user should be deleted from the PostgreSQL database", function(done) {
            pg.connect(process.env.DATABASE_URL, function (err, client) {
                if(err) {
                    console.log(err);
                    assert.ifError(err, "Unable to connect to database.");
                }
                else {
                    client.query("delete from users where username = $1", [testuser.username], function(err, result) {
                        if(err) {
                            assert.ifError(err, "Unable to delete test user.");
                            done();
                        }
                        else {
                            assert.equal(true, !!result, "Result object invalid.");
                            assert.equal(1 , result.rowCount, "Test user not found in database.");
                            done();
                        }
                    });
                }
            });
        });
    });
};