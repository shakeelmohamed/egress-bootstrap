module.exports = function(testuser, bcrypt, assert){
    describe("Bcrypt", function(){
        describe("Test user's password", function() {
            it("should match the encrypted password", function() {
                assert( bcrypt.compareSync(testuser.password, bcrypt.hashSync(testuser.password)) == true );
            });
        });
    });
};