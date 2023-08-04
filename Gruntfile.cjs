module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        ts: {
            default: {
                tsconfig: "./tsconfig.json",
            },
        },
        babel: {
            options: {
                sourceMap: true,
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "@babel/preset-typescript",
                ],
                plugins: ["transform-es2015-modules-strip"],
            },
            dist: {
                files: {
                    "dist/store.ts": "store.ts",
                    "dist/component/Component/Popup/Popup.js": "component/Component/Popup/Popup.tsx",
                    "dist/component/Component/Inputs/InputWithIcon/InputWithIcon.js": "component/Component/Inputs/InputWithIcon/InputWithIcon.tsx",
                    "dist/component/Component/Inputs/EmailInput/EmailInput.js": "component/Component/Inputs/EmailInput/EmailInput.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/Droppable/Droppable.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/Droppable/Droppable.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InnerDroppable/InnerDroppable.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InnerDroppable/InnerDroppable.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InstanceDraggable/InstanceDraggable.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InstanceDraggable/InstanceDraggable.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategorieName/CategorieName.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategorieName/CategorieName.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategoryDraggable/CategoryDraggable.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategoryDraggable/CategoryDraggable.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/DisplayCategories/DisplayCategories.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/DisplayCategories/DisplayCategories.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/LinkDroppable/LinkDroppable.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/LinkDroppable/LinkDroppable.tsx",
                    "dist/component/Component/DropDownMenu/DropDownMenu.js": "component/Component/DropDownMenu/DropDownMenu.tsx",
                    "dist/component/Component/Selects/CustomSelect/CustomSelect.js": "component/Component/Selects/CustomSelect/CustomSelect.tsx",
                    "dist/component/Component/Selects/Select/Select.js": "component/Component/Selects/Select/Select.tsx",
                    "dist/component/Component/Selects/SearchSelect/SearchSelect.js": "component/Component/Selects/SearchSelect/SearchSelect.tsx",
                    "dist/component/Component/Pagination/Pagination.js": "component/Component/Pagination/Pagination.tsx",
                    "dist/component/ManageUser/HeaderCell/HeaderCell.js": "component/ManageUser/HeaderCell/HeaderCell.tsx",
                    "dist/component/ManageUser/UserModal/UserModal.js": "component/ManageUser/UserModal/UserModal.tsx",
                    "dist/component/ManageUser/ManageUser.js": "component/ManageUser/ManageUser.tsx",
                    "dist/component/Component/Modal/AddAssetModal/AddAssetModal.js": "component/Component/Modal/AddAssetModal/AddAssetModal.tsx",
                    "dist/component/Component/Modal/AddCategoryModal/AddCategoryModal.js": "component/Component/Modal/AddCategoryModal/AddCategoryModal.tsx",
                    "dist/component/Component/Modal/MOSPImportAssetModal/MOSPImportAssetModal.js": "component/Component/Modal/MOSPImportAssetModal/MOSPImportAssetModal.tsx",
                    "dist/component/Component/Modal/AssetImportCenterModal/AssetImportCenterModal.js": "component/Component/Modal/AssetImportCenterModal/AssetImportCenterModal.tsx",
                    "dist/component/Component/Modal/MonarcLibraryModal/MonarcLibraryModal.js": "component/Component/Modal/MonarcLibraryModal/MonarcLibraryModal.tsx",
                    "dist/component/Component/Modal/CSVFileImportCenterModal/CSVFileImportCenterModal.js": "component/Component/Modal/CSVFileImportCenterModal/CSVFileImportCenterModal.tsx",
                    "dist/component/Component/Modal/MonarcExportFileModal/MonarcExportFileModal.js": "component/Component/Modal/MonarcExportFileModal/MonarcExportFileModal.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/AnrRiskAnalysisDragNDrop.js": "component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/AnrRiskAnalysisDragNDrop.tsx",
                    "dist/component/ClientSettings/ClientSettings.js": "component/ClientSettings/ClientSettings.tsx",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysis.js": "component/AnrRiskAnalysis/AnrRiskAnalysis.tsx",
                    "dist/component/ReduxWrapper/ReduxWrapper.js": "component/ReduxWrapper/ReduxWrapper.tsx",
                },
            },
        },
        nggettext_extract: {
            pot: {
                files: {
                    "po/template.pot": [
                        "views/**/*.html",
                        "views/*.html",
                        "views/dialogs/*.html",
                        "src/**/*.js",
                        "src/*.js",
                        "../ng_anr/views/*.html",
                        "../ng_anr/src/**/*.js",
                        "../ng_anr/src/*.js",
                    ],
                },
            },
        },

        nggettext_compile: {
            all: {
                files: {
                    "../../public/js/translations.js": ["po/*.po"],
                },
            },
        },

        concat: {
            options: {
                separator: ";\n",
            },
            angularCommonLibsJs: {
                src: [
                    "node_modules/bootstrap/dist/js/bootstrap.js",
                    "node_modules/angular/angular.min.js",
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/angular-animate/angular-animate.min.js",
                    "node_modules/angular-aria/angular-aria.min.js",
                    "node_modules/angular-gettext/dist/angular-gettext.min.js",
                    "node_modules/angular-material/angular-material.min.js",
                    "node_modules/iso-639-1/build/index.js",
                    "node_modules/node-forge/dist/forge.min.js",
                    "node_modules/react/umd/react.development.js",
                    "node_modules/react-dom/umd/react-dom.development.js",
                    "node_modules/ngreact/ngReact.js",
                    "my_node_modules/lodash_frompairs.js",
                    "node_modules/lodash/lodash.js",
                    "node_modules/ngcomponent-forked/index.js",
                    "node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                    "node_modules/angular-resource/angular-resource.min.js",
                    "node_modules/angular-local-storage/dist/angular-local-storage.min.js",
                    "node_modules/angular-material-data-table/dist/md-data-table.min.js",
                    "node_modules/angular-breadcrumb/release/angular-breadcrumb.min.js",
                    "node_modules/ng-file-upload/dist/ng-file-upload.min.js",
                    "node_modules/angular-ui-tree/dist/angular-ui-tree.min.js",
                    "node_modules/angular-messages/angular-messages.min.js",
                    "node_modules/angular-toastr/dist/angular-toastr.tpls.min.js",
                    "node_modules/angular-resizable/angular-resizable.min.js",
                    "node_modules/angular-trix/dist/angular-trix.min.js",
                    "node_modules/trix/dist/trix.js",
                    "node_modules/moment/min/moment.min.js",
                    "node_modules/sortablejs/Sortable.min.js",
                    "node_modules/angular-legacy-sortablejs/angular-legacy-sortable.js",
                    "node_modules/d3/dist/d3.min.js",
                    "node_modules/save-svg-as-png/lib/saveSvgAsPng.js",
                    "node_modules/xlsx/dist/xlsx.full.min.js",
                    "node_modules/xlsx/dist/xlsx.core.min.js",
                    "node_modules/papaparse/papaparse.min.js",
                    "node_modules/jschardet/dist/jschardet.min.js",
                    "node_modules/pptxgenjs/dist/pptxgen.bundle.js",
                    "node_modules/angular-loading-bar/build/loading-bar.min.js",
                    "node_modules/@uirouter/react-hybrid/lib/angularjs/module.js",
                    "node_modules/react2angular-forked/index.js",
                    "node_modules/i18next/i18next.min.js",
                    "node_modules/select2/dist/js/select2.full.js",
                    "translation/translation.js",
                    "node_modules/immer/dist/immer.cjs.development.js",
                    "node_modules/react-redux/dist/react-redux.js",
                    "node_modules/redux/dist/redux.js",
                    "node_modules/reselect/dist/reselect.js",
                    "node_modules/redux-thunk/dist/redux-thunk.js",
                    "my_node_modules/redux_toolkit.js",
                    "my_node_modules/dnd-kit/utilities.js",
                    "my_node_modules/dnd-kit/core.js",
                    "my_node_modules/dnd-kit/accessibility.js",

                    //React components and Redux Files

                    "Slices/modalSlice.ts",
                    "Slices/riskAnalysisSlice.ts",
                    "dist/store.ts",
                    "dist/component/Component/Popup/Popup.js",
                    "dist/component/Component/Inputs/InputWithIcon/InputWithIcon.js",
                    "dist/component/Component/Inputs/EmailInput/EmailInput.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/Droppable/Droppable.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InnerDroppable/InnerDroppable.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InstanceDraggable/InstanceDraggable.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategorieName/CategorieName.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/CategoryDraggable/CategoryDraggable.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/DisplayCategories/DisplayCategories.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/LinkDroppable/LinkDroppable.js",
                    "dist/component/Component/DropDownMenu/DropDownMenu.js",
                    "dist/component/Component/Selects/CustomSelect/CustomSelect.js",
                    "dist/component/Component/Selects/Select/Select.js",
                    "dist/component/Component/Selects/SearchSelect/SearchSelect.js",
                    "dist/component/Component/Pagination/Pagination.js",
                    "dist/component/ManageUser/HeaderCell/HeaderCell.js",
                    "dist/component/ManageUser/UserModal/UserModal.js",
                     "dist/component/ManageUser/ManageUser.js",
                    "dist/component/Component/Modal/AddAssetModal/AddAssetModal.js",
                    "dist/component/Component/Modal/AddCategoryModal/AddCategoryModal.js",
                    "dist/component/Component/Modal/MOSPImportAssetModal/MOSPImportAssetModal.js",
                    "dist/component/Component/Modal/AssetImportCenterModal/AssetImportCenterModal.js",
                    "dist/component/Component/Modal/CSVFileImportCenterModal/CSVFileImportCenterModal.js",
                    "dist/component/Component/Modal/MonarcLibraryModal/MonarcLibraryModal.js",
                    "dist/component/Component/Modal/MonarcExportFileModal/MonarcExportFileModal.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/AnrRiskAnalysisDragNDrop.js",
                    "dist/component/ClientSettings/ClientSettings.js",
                    "dist/component/AnrRiskAnalysis/AnrRiskAnalysis.js",
                    "dist/component/ReduxWrapper/ReduxWrapper.js",
                ],
                dest: "../../public/js/angular-common-libs.js",
                nonull: true,
            },

            angularCommonLibsCss: {
                src: [
                    "node_modules/angular-material/angular-material.min.css",
                    "node_modules/angular-material-data-table/dist/md-data-table.min.css",
                    "node_modules/angular-ui-tree/dist/angular-ui-tree.min.css",
                    "node_modules/angular-toastr/dist/angular-toastr.min.css",
                    "node_modules/trix/dist/trix.css",
                    "node_modules/flag-icons/css/flag-icons.min.css",
                    "node_modules/angular-loading-bar/build/loading-bar.css",
                    "node_modules/bootstrap/dist/css/bootstrap.css",
                 "node_modules/select2/dist/css/select2.css",
                ],
                dest: "../../public/css/angular-common-libs.css",
                nonull: true,
            },
        },

        uglify: {
            appJs: {
                files: {
                    // '../../public/js/app.min.js': ['public/js/Starter.js', 'public/js/StarterController.js', 'public/js/translations.js'],
                    "../../public/js/angular-common-libs.min.js": [
                        "../../public/js/angular-common-libs.js",
                    ],
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-angular-gettext");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-ts");

    // Default task(s).
    grunt.registerTask("default", ["babel2", "ts"]);
    grunt.registerTask("extract_translations", ["nggettext_extract"]);
    grunt.registerTask("compile_translations", ["nggettext_compile"]);
    grunt.registerTask("concat_assets", ["concat", "uglify"]);
};
