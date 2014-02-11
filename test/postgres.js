module.exports = function(assert, testuser, pg, config){
    describe("PostgreSQL", function(){
        describe("credentials", function() {
            it("should connect to a database, and query the version", function(done) {
                pg.connect(config.postgres, function (err, client) {
                    if(err) {
                        console.log(err);
                        assert.ifError(err, "Unable to connect to database.");
                    }
                    else {
                        client.query("select version();", function(err, result) {
                            if(err) {
                                assert.ifError(err, "Unable to query PostgreSQL version.");
                                done();
                            }
                            else {
                                assert.equal(true, !!result, "Result object invalid.");
                                assert(result.rows.length > 0, "No Results returned.");
                                assert(result.rows[0].version.length > 0, "PostgreSQL version not returned.");
                                done();
                            }
                        });
                    }
                });
            });
        });
    });
};