module.exports = function (grunt) {
    var packageFile = grunt.file.readJSON("package.json");
    
    grunt.initConfig({
        pkg: packageFile,
        jshint: {
            all: [
                "Gruntfile.js",
                "app.js",
                "config.js",
                "controllers/*.js",
                "controllers/validators/*.js",
                "public/js/egress-*.js",
                "routes/*.js",
                "test/*.js"
            ],
            options: packageFile.jshintConfig
        },
        jade: {
            "temp/jade": ["jade/*.jade", "jade/*/*.jade"]
        },
        clean: {
            jade: "temp" // Remove the temp directory containing the compiled jade file from above
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["jshint", "jade", "clean"]);
};