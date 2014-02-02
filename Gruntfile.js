module.exports = function(grunt) {
    var packageFile = grunt.file.readJSON("package.json");
    
    grunt.initConfig({
        pkg: packageFile,
        jshint: {
            all: [
                "Gruntfile.js",
                "app.js",
                "config.js",
                "index.js",
                "controllers/*.js",
                "routes/*.js",
                "test/*.js"
            ],
            options: packageFile.jshintConfig
        },
        jade: {
            all: ["jade/*.jade", "jade/includes/*.jade"]
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jade");

    grunt.registerTask("default", ["jshint", "jade"]);
};