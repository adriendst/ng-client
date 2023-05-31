module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nggettext_extract: {
            pot: {
                files: {
                    'po/template.pot': ['views/**/*.html', 'views/*.html', 'views/dialogs/*.html', 'src/**/*.js', 'src/*.js',
                        '../ng_anr/views/*.html', '../ng_anr/src/**/*.js', '../ng_anr/src/*.js']
                }
            }
        },

        nggettext_compile: {
            all: {
                files: {
                    '../../public/js/translations.js': ['po/*.po']
                }
            }
        },

        concat: {
            options: {
                separator: ";\n"
            },
            angularCommonLibsJs: {
                src: [
                    'node_modules/bootstrap/dist/js/bootstrap.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-aria/angular-aria.min.js',
                    'node_modules/angular-gettext/dist/angular-gettext.min.js',
                    'node_modules/angular-material/angular-material.min.js',
                    'node_modules/iso-639-1/build/index.js',
                    'node_modules/node-forge/dist/forge.min.js',
                    'node_modules/react/umd/react.development.js',
                    'node_modules/react-dom/umd/react-dom.development.js',
                    /* 'node_modules/antd/dist/antd.js', */
                    /* 'node_modules/react-bootstrap/cjs/index.js', */
                    'node_modules/ngreact/ngReact.js',
                    'node_modules/lodash.frompairs/index.js',
                    'node_modules/lodash/lodash.js',
                    'node_modules/ngcomponent/index.js',
                    'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
                    'node_modules/angular-resource/angular-resource.min.js',
                    'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
                    'node_modules/angular-material-data-table/dist/md-data-table.min.js',
                    'node_modules/angular-breadcrumb/release/angular-breadcrumb.min.js',
                    'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
                    'node_modules/angular-ui-tree/dist/angular-ui-tree.min.js',
                    'node_modules/angular-messages/angular-messages.min.js',
                    'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
                    'node_modules/angular-resizable/angular-resizable.min.js',
                    'node_modules/angular-trix/dist/angular-trix.min.js',
                    'node_modules/trix/dist/trix.js',
                    'node_modules/moment/min/moment.min.js',
                    'node_modules/sortablejs/Sortable.min.js',
                    'node_modules/angular-legacy-sortablejs/angular-legacy-sortable.js',
                    'node_modules/d3/dist/d3.min.js',
                    'node_modules/save-svg-as-png/lib/saveSvgAsPng.js',
                    'node_modules/xlsx/dist/xlsx.full.min.js',
                    'node_modules/xlsx/dist/xlsx.core.min.js',
                    'node_modules/papaparse/papaparse.min.js',
                    'node_modules/jschardet/dist/jschardet.min.js',
                    'node_modules/pptxgenjs/dist/pptxgen.bundle.js',
                    'node_modules/angular-loading-bar/build/loading-bar.min.js',
                    'node_modules/@uirouter/react-hybrid/lib/angularjs/module.js',
                    'node_modules/react2angular/index.js',
                    'node_modules/i18next/i18next.min.js',
                    'node_modules/react-i18next/dist/umd/react-i18next.js',
                    'node_modules/select2/dist/js/select2.full.js',
                    /* 'node_modules/multiselect-react-dropdown/dist/multiselect-react-dropdown.esm.js',
                                       'node_modules/@heroicons/react/solid/index.js',
                                       'node_modules/@robertz65/lyte/dist/cjs/index.js' */
                                       'translation/translation.js'
                ],
                dest: '../../public/js/angular-common-libs.js',
                nonull: true
            },

            angularCommonLibsCss: {
                src: [
                    'node_modules/angular-material/angular-material.min.css',
                    'node_modules/angular-material-data-table/dist/md-data-table.min.css',
                    'node_modules/angular-ui-tree/dist/angular-ui-tree.min.css',
                    'node_modules/angular-toastr/dist/angular-toastr.min.css',
                    'node_modules/trix/dist/trix.css',
                    'node_modules/flag-icons/css/flag-icons.min.css',
                    'node_modules/angular-loading-bar/build/loading-bar.css',
                    'node_modules/bootstrap/dist/css/bootstrap.css',
                    /* 'node_modules/css.gg/icons/all.css',
                                       'node_modules/bootstrap-icons/font/bootstrap-icons.css',
                                       'node_modules/font-awesome/css/font-awesome.min.css', */
                    'node_modules/select2/dist/css/select2.css',
                ],
                dest: '../../public/css/angular-common-libs.css',
                nonull: true
            }
        },

        uglify: {
            appJs: {
                files: {
                    // '../../public/js/app.min.js': ['public/js/Starter.js', 'public/js/StarterController.js', 'public/js/translations.js'],
                    '../../public/js/angular-common-libs.min.js': ['../../public/js/angular-common-libs.js']
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('extract_translations', ['nggettext_extract']);
    grunt.registerTask('compile_translations', ['nggettext_compile']);
    grunt.registerTask('concat_assets', ['concat', 'uglify']);
};