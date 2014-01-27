module.exports = function(assert, testuser, bcrypt){
    describe("Bcrypt", function(){
        describe("Test user's password", function() {
            it("should match the encrypted password", function() {
                assert( bcrypt.compareSync(testuser.password, bcrypt.hashSync(testuser.password)) );
            });
        });
    });
};