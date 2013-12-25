(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                if (req.session.user_id) {
                    //Send user to the account page if they're authorized
                    res.redirect('account');
                }
                else {
                    res.render('join', getViewData('Join', 'join'));
                }
            },
            post: function() {
                //TODO
            }
        }
    }
})();