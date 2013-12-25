(function(){
    module.exports = function(getViewData){
        return {
            get: function(req, res) {
                delete req.session.user_id;
                res.redirect('/login');
            }
        }
    }
})();