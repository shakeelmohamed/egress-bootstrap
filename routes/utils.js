module.exports = function (app) {
    return {
        getViewData: function (title, pathSuffix, userID, message) {
            // Set app.locals in web.js; this function gets passed around to all controllers
            return {
                siteName: app.locals.siteName,
                author: app.locals.siteAuthor,
                title: title,
                loc: pathSuffix,
                user: userID,
                msg: message
            };
        },
        checkAuth: function (req, res, next) {
            if (!req.session.userID) {
                //Send user to the login page if they're not authorized
                res.redirect("login");
            }
            else {
                next();
            }
        }
    };
};