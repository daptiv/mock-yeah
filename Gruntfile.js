/*
 * mock-yeah
 * https://github.com/daptiv/mock-yeah
 *
 * Copyright (c) 2014 Jonathan Park
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    var paths = require('./config/paths');
    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                '**/*.js',
                '!node_modules/**/*.js',
                '!src/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['output'],
        },

        simplemocha: {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd'
            },
            dev: {
                src: [paths.test.allJsFilesPattern()],
                options: {
                    reporter: 'spec'
                }
            },
            ci: {
                src: [paths.test.allJsFilesPattern()],
                options: {
                    reporter: 'mocha-teamcity-reporter'
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint', 'clean', 'simplemocha:dev']);
    grunt.registerTask('test-ci', ['jshint', 'clean', 'simplemocha:ci']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
