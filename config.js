var fs = require("fs");
var url = require("url");

function getDictOfEnvVars(filepath) {
    if (!fs.existsSync(filepath)) {
        console.log("ERROR", filepath, "not found");
        var config = {};
        //This should only happen on Travis CI
        if (process.env.DATABASE_URL) {
            config.DATABASE_URL = process.env.DATABASE_URL;
        }
        return config;
    }
    var fileOfVariables = fs.readFileSync(filepath, "utf8").split("\n");
    
    // For every line in the .env file, parse out the key-value pairs
    // and add them to the envsDict object.
    var envsDict = {};
    fileOfVariables.forEach(function (variable) {
        var key = variable.substring(0, variable.indexOf("="));
        var value = variable.substring(variable.indexOf("=")+1);
        if (key && value) {
            envsDict[key.replace(" ", "")] = value;
        }
    });
    
    return envsDict;
}

var config = getDictOfEnvVars(".env"); // This is primarily use to parse the DATABASE_URL value
config.siteName = "Egress";
config.siteAuthor = "Shakeel Mohamed";
config.siteDescription = "Egress, start writing a web app already.";
config.port = 5000;

module.exports = config;