var fs = require("fs");
var url = require("url");

function getDictOfEnvVars(filepath) {
    if(!fs.existsSync(filepath)) {
        console.log("ERROR", filepath, "not found");
        return {};
    }
    var fileOfVariable = fs.readFileSync(filepath, "utf8").split("\n");
    var envsDict = {};
    fileOfVariable.forEach(function(variable){
        var v = variable.split("=");
        if(v && v.length==2 && v[0] && v[1]) {
            envsDict[v[0].replace(" ", "")] = v[1];
        }
    });
    var parsedPostgresURL = url.parse(envsDict.DATABASE_URL);

    var auth = parsedPostgresURL.auth.split(":");
    envsDict.postgres = {};
    envsDict.postgres.user = auth[0];
    envsDict.postgres.password = auth[1];

    envsDict.postgres.database = parsedPostgresURL.path.replace("/", "");
    envsDict.postgres.port = parseInt(parsedPostgresURL.port, 10); //Base 10
    envsDict.postgres.host = parsedPostgresURL.hostname;

    if(!envsDict.PGSSLMODE || envsDict.PGSSLMODE !== "false") {
        envsDict.postgres.ssl = true;
    }
    return envsDict;
}

var config = getDictOfEnvVars(".env");
config.siteName = "Egress";
config.siteAuthor = "Shakeel Mohamed";
config.siteDescription = "Egress, start writing a web app already.";
config.port = 5000;

module.exports = config;