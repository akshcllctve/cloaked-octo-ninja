module.exports = function (grunt) {
    grunt.initConfig({
        /* =JFG.

        First find and replace the project file number to the one you are working on e.g. search and replace 00302-1 with 00320-1. Gruntfile.js resides in the parent of the themes folder, within the root directory e.g. alongside account.php, so that we can monitor the .scss framework files.
        This serves two purposes…

        1) You can monitor the framework files that are at the same level as Gruntfile.js. Monitored files cannot be a directory level above Gruntfile.js as far as I know you cannot go up a level when watching files e.g. if you were in the theme 00305 you cannot monitor "../corecommerce-layout.scss"

        2) It also means that we only need to have 1 set of Grunt files. This is neat since we want to perform the same tasks on each theme.

        Run "Grunt Watch" to continually watch and preprocess using Sass into the dev environment

        Run Production to perform other actions to ready the project for publishing

        */
        watch: {
            sass: {
                files: ["00302-1/design/scss/*.scss", "css/responsive-framework/*.scss"],
                tasks: [
                    "sass:dev", // Run sass:dev
                    "notify:sassdev",
                ]
            },
            triggerLiveReloadOnTheseFiles: { /* =JFG. Source - https://github.com/gruntjs/grunt-contrib-watch/issues/87 */
                // We use this target to watch files that will trigger the livereload
                options: { 
                    livereload: true
                },
                files: [
                // Anytime css is edited or compiled by sass, trigger the livereload on those files. Run grunt watch -v to see what's being watched.
                    "00302-1/design/css/main.css",
                    /*"00302-1/design/vanilla.css",*/
                    // Or other files
                    "00302-1/design/*.php",
                    "00302-1/design/js/*.js",
                    "00302-1/templates/*.php",
                    // "../../templates/*.php",
                    "templates/*.php",
                    "templates/mobile/*.php",
                ]
            }
        },
        sass: {
            dev: {
                options: {
                    sourcemap: "true",
                },
                files: {
                    "00302-1/design/css/main.css": "00302-1/design/scss/style.scss" /* =JFG. Do not use * value here, it slows Sass compilation */
                },
            },
            prod: {
                options: {
                    // sourcemap: "true",
                    // lineNumbers: "true"
                },
                /* =JFG. Sass Sourcemaps gets broken by Auto Prefixer, so don't bother outputting it for production - https://github.com/ai/autoprefixer/issues/37 */
                files: {
                    "00302-1/design/css/main.css": "00302-1/design/scss/production.scss"
                },
            },
        },
        copy: {
            prod: { // =JFG. We need to run the copy task first, to copy the vanilla.CSS into the SCSS directory. Only then can we process the import using Sass' import method (rather than conventional CSS).
                files: [
                    {expand: true, // =JFG. Needed when using cwd. https://github.com/gruntjs/grunt-contrib-copy/issues/90
                    cwd: "00302-1/design/css/local-development", // =JFG. Change working directory, so that we don't copy the whole directory structure
                    src: "vanilla.css",
                    dest: "00302-1/design/scss/",
                    rename: function(dest, src) { // =JFG. Needs to be a function http://stackoverflow.com/questions/15271121/how-can-i-rename-files-with-grunt-based-on-the-respective-files-parent-folder
                        return dest + src.substring(0, src.indexOf('/')) + "_vanilla.scss";
                    }}

                    /* ,
                    {expand: true, // =JFG. Needed when using cwd. https://github.com/gruntjs/grunt-contrib-copy/issues/90
                    cwd: "00302-1/design/fonts/", // =JFG. Change working directory, so that we don't copy the whole directory structure
                    src: "**",
                    dest: "00302-1/design/production/fonts/"} */
                ]
            }
        },
        autoprefixer: {
            prod: {
                files: {
                    "00302-1/design/css/main.css": "00302-1/design/css/main.css"
                }
            }
        },
        "rem-to-px": {
            prod: {
                options: {
                    // Task-specific options go here.
                },
                files: {
                    "00302-1/design/css/main-no-rem.css": ["00302-1/design/css/main.css"]
                },
            }
        },
        cssmin: {
            prod: {
                files: {
                    "00302-1/design/css/main.css": ["00302-1/design/css/main.css"]
                }
            }
        },
        csspretty: { // These options only add about 6kb to the file size, so it’s worth it
            prod: {
                options: {
                    decl: {
                        before: '\n',
                        between: ':',
                    },
                    rule: {
                        before: '\n\n',
                        between: '',
                        after: '\n',
                    },
                    atRule: {
                        before: '\n\n',
                        between: '',
                        after: '\n\n',
                    },
                    selectors: 'separateline',
                },
                src: '00302-1/design/css/main.css',
            }
        },
        notify: {
            sassdev: {
                options: {
                    title: "Sass Dev",
                    message: "Finished", // Required
                }
            },
            sassprod: {
                options: {
                    title: "Sass Production",
                    message: "Finished", // Required
                }
            },
            // js_example: {
            //     options: {
            //         title: "Task Complete",
            //         message: "Your JS has been minified and concatanatated!"
            //     }
            // },
            // image_example: {
            //     options: {
            //         title: "Task Complete",
            //         message: "All images have been compressed"
            //     }
            // }
        }
    });

    grunt.registerTask("default", // i.e. if you just run "grunt"
        ["sass:dev", // Run sass:dev
        "notify:sassdev"
        ]
    );
    
    grunt.registerTask( "prod",// Name of our specific set of build tasks (e.g. doesn't run with watch and does not include dev tasks)
        ["copy:prod", // We need to run the copy task first, to copy the vanilla.CSS into the SCSS directory. Only then can we process the import using Sass' import method (rather than conventional CSS)
        "sass:prod",  // Run Sass withOUT Sourcemaps (they're pointless since we are not using vanilla-theme.scss). Production.scss also pulls in vanilla-theme.scss (unlike style.scss)
        "autoprefixer", // Vendor prefixes; allows us to do away with Compass
        "cssmin", // Minify everything for production
        "csspretty", // Unminify to make things readable. =JFG. Temp solution so customers can edit admin
        "rem-to-px", // Convert pixels to REM and output to a separate file for < IE9
        "notify:sassprod"
        ]
    );




    grunt.loadNpmTasks("grunt-contrib-watch"); /* Watch files for changes */
    grunt.loadNpmTasks("grunt-contrib-sass"); /* Run Sass */
    grunt.loadNpmTasks('grunt-contrib-copy'); /* Copy relative files and folders needed */
    grunt.loadNpmTasks('grunt-rem-to-px');
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-cssmin"); /* Load CSS Compression */
    grunt.loadNpmTasks('grunt-csspretty'); /* Load CSS Pretify */
    grunt.loadNpmTasks('grunt-notify'); // Automatic notifications when tasks fail.


    /* =JFG. Update on the below. We can't store everything in a git subdirectory until an issue is fixed with the Watch module as per https://github.com/gruntjs/grunt-contrib-watch/issues/162 */

    /*grunt.file.setBase('../');*/ /* =JFG. Change the base so that it's referencing the parent folder, since we're keeping everything stored in a sub "grunt" directory. This needs to go after the tasks */
};