module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JSHint - Error check javascript
    jshint: {
      beforeconcat: ['Gruntfile.js', '_test/jasonmorris.test.js']
    },

    // Uglify - Minify js files
    uglify: {
      picturefill: {
        files: {
          'js/picturefill.js': ['js/vendor/picturefill.js']
        }
      },
      serviceworker: {
        files: {
          './sw.js': ['js/lib/sw.js']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'img/'
        }]
      },
      root: {
        files: [{
          expand: true,
          cwd: './',
          src: ['*.{png,jpg,gif,svg}'],
          dest: './'
        }]
      }
    },

    // Shell - Jekyll build and serve tasks via shell
    shell: {
      jekyllBuild: {
        command: 'bundle exec jekyll build'
      },
      jekyllServe: {
        command: 'bundle exec jekyll serve --watch'
      },
      htmlproofer: {
        command: "htmlproofer ./_site --allow-hash-href --check-html --empty-alt-ignore"
      }
    },

    // HTML lint - run html validation on compiled site
    htmllint: {
      all: {
        options: {
          ignore: ['The “frameborder” attribute on the “iframe” element is obsolete. Use CSS instead.',
          'The “scrolling” attribute on the “iframe” element is obsolete. Use CSS instead.']
        },
        src: "_site/**/*.html"
      }
    },

    sasslint: {
      options: {
        configFile: '.sass-lint.yml',
      },
      target: ['_sass/\*.scss']
    },

    // SCSS lint - check SCSS formatting
    scsslint: {
      all: [
        '_sass/*.scss',
      ],
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        colorizeOutput: true
      }
    },

    // Accessibility - run accessibility scan on compiled site
    accessibility: {
      options : {
        accessibilityLevel: 'WCAG2AA',
        reportLevels: {
          notice: false,
          warning: true,
          error: true
        },
        ignore : [
          'WCAG2AA.Principle1.Guideline1_1.1_1_1.H67.2', // empty alt tag warning
          'WCAG2AA.Principle1.Guideline1_3.1_3_1.H48', // navigation section warning
          'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Abs', // abs pos contrast warning
          'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.BgImage' // text on background image
          ]
      },
      test : {
        src: ['_site/**/*.html']
      }
    },

    // Performance Auditing
    perfbudget: {
      homeCable: {
        options: {
          url: 'https://jasonmorris.com/',
          key: 'A.e04d20f893fadb3ae5c4f06494a457c8',
          connectivity: 'Cable',
          budget: {
        		visualComplete: '3000',
        		SpeedIndex: '2000'
          }
        }
      },
      home3G: {
        options: {
          url: 'https://jasonmorris.com/',
          key: 'A.e04d20f893fadb3ae5c4f06494a457c8',
          connectivity: '3G',
          budget: {
        		visualComplete: '6500',
        		SpeedIndex: '5000'
          }
        }
      },
      postCable: {
        options: {
          url: 'https://jasonmorris.com/bikes/twenty-years-later/',
          key: 'A.e04d20f893fadb3ae5c4f06494a457c8',
          connectivity: 'Cable',
          budget: {
        		visualComplete: '3000',
        		SpeedIndex: '2000'
          }
        }
      },
      post3G: {
        options: {
          url: 'https://jasonmorris.com/bikes/twenty-years-later/',
          key: 'A.e04d20f893fadb3ae5c4f06494a457c8',
          connectivity: '3G',
          budget: {
        		visualComplete: '6500',
        		SpeedIndex: '5000'
          }
        }
      },
      postVideoCable: {
        options: {
          url: 'https://jasonmorris.com/bikes/deck-dancing/',
          key: 'A.e04d20f893fadb3ae5c4f06494a457c8',
          connectivity: 'Cable',
          budget: {
        		visualComplete: '3000',
        		SpeedIndex: '2000'
          }
        }
      },
      postVideo3G: {
        options: {
          url: 'https://jasonmorris.com/bikes/deck-dancing/',
          key: 'A.e04d20f893fadb3ae5c4f06494a457c8',
          connectivity: '3G',
          budget: {
        		visualComplete: '6500',
        		SpeedIndex: '5000'
          }
        }
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: "https://jasonmorris.com/"
      },
      homeMobile: {
        options: {
          url: "https://jasonmorris.com/",
          locale: "en_US",
          strategy: "mobile",
          threshold: 50
        }
      },
      homeDesktop: {
        options: {
          url: "https://jasonmorris.com/",
          locale: "en_US",
          strategy: "desktop",
          threshold: 50
        }
      },
      postMobile: {
        options: {
          url: "https://jasonmorris.com/bikes/twenty-years-later/",
          locale: "en_US",
          strategy: "mobile",
          threshold: 50
        }
      },
      postDesktop: {
        options: {
          url: "https://jasonmorris.com/bikes/twenty-years-later/",
          locale: "en_US",
          strategy: "desktop",
          threshold: 50
        }
      },
      postVideoMobile: {
        options: {
          url: "https://jasonmorris.com/bikes/deck-dancing/",
          locale: "en_US",
          strategy: "mobile",
          threshold: 50
        }
      },
      postVideoDesktop: {
        options: {
          url: "https://jasonmorris.com/bikes/deck-dancing/",
          locale: "en_US",
          strategy: "desktop",
          threshold: 50
        }
      },
    },

    // Update - find new versions of Grunt dependencies
    devUpdate: {
      main: {
        options: {
          updateType: 'prompt',
          reportUpdated: false,
          semver: false,
          packages: {
            devDependencies: true,
            dependencies: false
          },
          packageJson: null
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // grunt - runs js, then serve tasks (see below)
  grunt.registerTask('default', ['js', 'imagemin', 'scsslint', 'sasslint', 'serve']);

  // grunt serve - Serve and watch Jekyll site + SCSS compilation
  grunt.registerTask('serve', ['shell:jekyllServe']);

  // grunt build - Run js, imagemin tasks, then build Jekyll site + SCSS compilation
  grunt.registerTask('build', ['js', 'imagemin', 'shell:jekyllBuild']);

  // grunt js - Error checks, concatenation, minify JS
  grunt.registerTask('js', ['jshint', 'uglify']);

  // grunt validate-html - Validate compiled site's HTML
  grunt.registerTask('validate-html', ['htmllint', 'shell:htmlproofer']);

  // grunt validate-scss - Validate compiled site's SCSS
  grunt.registerTask('validate-scss', ['scsslint']);

  // grunt a11y - Validate compiled site's accessibility
  grunt.registerTask('a11y', ['accessibility']);

  // grunt lint - Run all linters
  grunt.registerTask('lint', ['htmllint', 'shell:htmlproofer', 'scsslint', 'sasslint', 'accessibility']);

  // grunt performance - Run all performance checks
  grunt.registerTask('performance', ['perfbudget', 'pagespeed']);

  // grunt build-test - Task for TravicCI to run
  grunt.registerTask('build-test', ['shell:jekyllBuild', 'shell:htmlproofer', 'accessibility', 'scsslint', 'sasslint']);

  // grunt update - Find new versions of Grunt libraries
  grunt.registerTask('update', ['devUpdate']);

};
