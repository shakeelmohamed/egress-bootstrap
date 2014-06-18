module.exports = function () {
    return {
        get: function (req, res) {
            delete req.session.userID;
            res.redirect("/signin");
        }
    };
};