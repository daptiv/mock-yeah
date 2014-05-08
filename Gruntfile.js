module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                '**/*.js',
                '!node_modules/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        simplemocha: {
            all: {
                src: [ 'test/**/*.js' ]
            },
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        },
    });

    // Default task.
    grunt.registerTask('default', 'Build and run live tests and packaging', ['jshint', 'simplemocha']);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
};

