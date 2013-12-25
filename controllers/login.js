(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                if (req.session.user_id) {
                    //Send user to the account page if they're authorized
                    //TODO: make this a middleware function for code reuse
                    res.redirect('account');
                }
                else {
                    res.render('login', getViewData('Login', 'login'));
                }
            },
            post: function() {
                //TODO
            }
        }
    }
})();