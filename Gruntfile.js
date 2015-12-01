module.exports = function(grunt) {

  var app_js = [
    'public/js/*.js'
  ];

  var app_css = [
    'public/css/*.css'
  ];

  // Project configuration
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'public/scss/',
          src: ['*.scss'],
          dest: 'public/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: 'public/scss/**/*.scss',
        tasks: ['sass']
      },
      tests: {
        files: ['tests/*.js', 'public/js/*.js'],
        tasks: ['karma:unit_auto']
      }
    },
    karma: {
      unit: {
        configFile: './my.conf.js',
        singleRun: true
      },
      unit_auto: {
        configFile: './my.conf.js',
        autoWatch: true
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      release_js: {
        files: {
          './public/build/app.min.js': app_js
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      target: {
        files: {
          './public/build/app.min.css': app_css
        }
      }
    },
    injector: {
      options: {
        addRootSlash: false
      },
      prod_js: {
        options: {
          ignorePath:'public/'
        },
        files: {
          './public/index.html': 'public/build/app.min.js'
        }
      },
      prod_css: {
        options: {
          ignorePath:'public/'
        },
        files: {
          './public/index.html': 'public/build/app.min.css'
        }
      },
      dev_js: {
        options: {
          ignorePath:'public/'
        },
        files: {
          './public/index.html': app_js
        }
      },
      dev_css: {
        options: {
          ignorePath:'public/'
        },
        files: {
          './public/index.html': app_css
        }
      }
    }
  });


  // Tasks
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('build:release', ['uglify', 'cssmin', 'injector:prod_js', 'injector:prod_css']);
  grunt.registerTask('build:dev', ['injector:dev_js', 'injector:dev_css']);

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-karma');
};