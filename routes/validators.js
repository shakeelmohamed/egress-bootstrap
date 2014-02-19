module.exports = {
    join: function (post) {
        // Define your custom input validation here
        if (!post.user || !post.email || !post.password) {
            return false;
        }
        return true;
    },
    login: function (post) {
        // Define your custom input validation here
        if (!post.user || !post.password) {
            return false;
        }
        return true;
    }
};