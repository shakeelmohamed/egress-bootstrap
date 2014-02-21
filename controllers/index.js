//Here we're exporting an object constructor
module.exports = function ControllerSet(getViewData, config) {
    // Get a list of all files in the controllers folder
    var controllers = require("fs").readdirSync(__dirname);

    for (var i in controllers) {
        var name = controllers[i].replace(".js", "");
        //Skip if: weird error, is this file, or isn"t a js file
        if (!name || name == "index" || controllers[i].indexOf(".js") != name.length) {
            continue;
        }
        
        //ex: this["home"] = require("./home.js")(getViewData, config);
        this[name] = require("./" + name)(getViewData, config);
    }
};