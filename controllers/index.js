(function(){
    module.exports = function ControllerSet(getViewData) {
        // Get a list of all files in the controllers folder
        var controllers = require('fs').readdirSync('./controllers');

        for(var i=0; i<controllers.length; i++) {
            //Try tp remove the .js extension from all of these files
            var name = controllers[i].replace('.js', '');
            //Skip if: wierd error, is this file, or isn't a javascript file
            if(!name || name == 'index' || controllers[i].indexOf('.js') != name.length)
                continue;
            //ex: this['home'] = require('./home.js')(getViewData);
            this[name] = require('./'+name)(getViewData);
        }
    }
})();