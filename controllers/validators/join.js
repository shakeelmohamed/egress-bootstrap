function checkLength(string, stringName, min, max) {
    if (string.length < min) {
        return stringName + " is too short";
    }
    if (string.length > max) {
        return stringName + " is too long";
    }
    return;
}

module.exports = function () {
    return {
        post: function (req, res) {
            var post = req.body;
            var username = post.user;
            var email = post.email;

            var response = {};
            response.ok = true; // Assume valid
            response.errors = [];

            // TODO: the strategy is to do whatever is needed to validate each field
            //      for any errors (with specific known problem), push the error to errors array.

            // username
                // Check length
            var err = checkLength(username, "Username", 4, 30);
            if (err) {
                response.errors.push(err);
                err = false;
            }
                // Check available
            // email
                // Check length
            err = checkLength(email, "Email", 4, 254);
            if (err) {
                response.errors.push(err);
                err = false;
            }
                // Check available

            // Save the database related unique tests for the very end
                //TODO: connect to database, etc.


            if (response.errors.length > 0) {
                response.ok = false;
            }
            res.json(response);
        }
    };
};