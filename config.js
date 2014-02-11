var fs = require("fs");
var url = require("url");
/*
var config = {
    "siteName": "Egress",
    "siteAuthor": "Shakeel Mohamed",
    "siteDescription": "Egress, start writing a web app already."
};
*/
function getDictOfEnvVars(filepath) {
    var fileOfVariable = fs.readFileSync(filepath, "utf8").split("\n");
    var envsDict = {};
    fileOfVariable.forEach(function(variable){
        var v = variable.split("=");
        if(v && v.length==2 && v[0] && v[1])
            envsDict[v[0].replace(" ", "")] = v[1];
    });

    //TODO: instead, make this copy to a dummy variable
    var parsedPostgresURL = url.parse(envsDict.DATABASE_URL);
    //envsDict.postgres = url.parse(envsDict.DATABASE_URL);

    var auth = parsedPostgresURL.auth.split(":");
    envsDict.postgres = {};
    envsDict.postgres.user = auth[0];
    envsDict.postgres.password = auth[1];

    envsDict.postgres.database = parsedPostgresURL.path.replace("/", "");
    envsDict.postgres.port = parseInt(parsedPostgresURL.port);
    envsDict.postgres.host = parsedPostgresURL.hostname;
    /*
    delete envsDict.postgres.protocol;
    delete envsDict.postgres.slashes;
    delete envsDict.postgres.hash;
    delete envsDict.postgres.auth;
    delete envsDict.postgres.search;
    delete envsDict.postgres.query;
    delete envsDict.postgres.path;
    delete envsDict.postgres.pathname;
    delete envsDict.postgres.href;
    delete envsDict.postgres.hostname;
    */

    if(!envsDict.PGSSLMODE || envsDict.PGSSLMODE != false)
        envsDict.postgres.ssl = true;
    return envsDict;
}

var config = getDictOfEnvVars(".env");
config.siteName = "Egress";
config.siteAuthor = "Shakeel Mohamed";
config.siteDescription = "Egress, start writing a web app already.";

module.exports = config;