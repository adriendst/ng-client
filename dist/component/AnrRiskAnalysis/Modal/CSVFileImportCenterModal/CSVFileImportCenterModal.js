"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var CSVFileImportCenterModal = function CSVFileImportCenterModal() {
  var _React$useState = React.useState(window.innerWidth),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    windowWidth = _React$useState2[0],
    setWindowWidth = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    fileSchema = _React$useState4[0],
    setFileSchema = _React$useState4[1];
  var _React$useState5 = React.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    importedAssets = _React$useState6[0],
    setImportedAssets = _React$useState6[1];
  var _React$useState7 = React.useState([]),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    assetsCode = _React$useState8[0],
    setAssetsCode = _React$useState8[1];
  var _React$useState9 = React.useState([]),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    assets = _React$useState10[0],
    setAssets = _React$useState10[1];
  var _React$useState11 = React.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    operationalRiskTagCode = _React$useState12[0],
    setOperationalRiskTagCode = _React$useState12[1];
  var _React$useState13 = React.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    operationalRiskTag = _React$useState14[0],
    setOperationalRiskTag = _React$useState14[1];
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    error = _React$useState16[0],
    setError = _React$useState16[1];
  var _React$useState17 = React.useState(false),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    popup = _React$useState18[0],
    setPopup = _React$useState18[1];
  var _React$useState19 = React.useState({
      title: 'New category',
      actionButton: 'Create & Import'
    }),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    alertData = _React$useState20[0],
    setAlertData = _React$useState20[1];
  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;
  var nonFormattedToken = localStorage.getItem("ls.auth_token");
  var token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;
  var headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");
  var model = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.model;
  });
  var categories = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.categories;
  });
  React.useEffect(function () {
    Promise.all([model]).then(function () {
      fetch("api/client-anr/".concat(numero, "/assets"), {
        headers: headers
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        var code = [];
        for (var i = 0; i < response.assets.length; i++) {
          code.push(response.assets[i].code);
        }
        setAssetsCode(code);
        console.log(response.assets);
        setAssets(response.assets);
      })["catch"](function (error) {
        return console.error(error);
      });
      fetch("api/client-anr/".concat(numero, "/rolf-tags"), {
        headers: headers
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log(response);
        var code = [];
        for (var i = 0; i < response.tags.length; i++) {
          code.push(response.tags[i].code);
        }
        setOperationalRiskTagCode(code);
        setOperationalRiskTag(response.tags);
      })["catch"](function (error) {
        return console.error(error);
      });
    });
    var handleResize = function handleResize() {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  function showFileSchema() {
    setFileSchema(!fileSchema);
  }
  function onChange(event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var _e$target;
        var fileContent = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result;
        var lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split('\n');

        // Créer la liste d'objets
        var objects = lines.map(function (line, index) {
          if (index !== 0 && index !== lines.length - 1) {
            var columns = line.split(',');
            var object = {
              name: columns[0],
              label: columns[1],
              assetTypeCode: columns[2],
              scope: Number(columns[3]),
              operational_risk_tag: columns[4],
              category: columns[5].slice(0, -1),
              categoryExist: true,
              isValid: 0
            };
            var hasMatch = categories.some(function (category) {
              var _category$name;
              console.log(category.name);
              console.log(object.category);
              if (((_category$name = category.name) === null || _category$name === void 0 ? void 0 : _category$name.trim().toLowerCase()) === object.category.trim().toLowerCase()) {
                return true;
              }
            });
            if (!hasMatch) {
              object.categoryExist = false;
            } else {
              object.categoryExist = true;
            }
            if (!assetsCode.includes(columns[2])) {
              object.isValid = 1;
              setError(true);
            } else {
              if (!operationalRiskTagCode.includes(columns[4])) {
                object.isValid = 2;
                setError(true);
              } else {
                object.isValid = 0;
              }
            }
            return object;
          }
        }).filter(function (object) {
          return object !== undefined;
        });
        setImportedAssets(objects);
      };
      reader.readAsText(file);
    }
  }
  React.useEffect(function () {
    if (!error) {
      console.log(importedAssets);
      var categoryToCreate = [];
      for (var i = 0; i < importedAssets.length; i++) {
        if (!importedAssets[i].categoryExist) {
          categoryToCreate.push(importedAssets[i]);
        }
      }
      if (categoryToCreate.length > 0) {
        if (categoryToCreate.length > 1) {
          setAlertData(_objectSpread(_objectSpread({}, alertData), {}, {
            text: "Do you want to create ".concat(categoryToCreate.length, " new categories ?"),
            data: categoryToCreate
          }));
        } else {
          setAlertData(_objectSpread(_objectSpread({}, alertData), {}, {
            text: 'Do you want to create new category ?',
            data: categoryToCreate
          }));
        }
        setPopup(true);
      }
    }
  }, [importedAssets]);
  function createAndImport() {
    var body = {
      implicitPosition: 2,
      parent: null,
      position: null
    };
    var customLabel = "label".concat(model === null || model === void 0 ? void 0 : model.language);
    var promises = [];
    var assetsTypeCode = [];
    var hasCategoryAssets = importedAssets;
    if (alertData && alertData.data) {
      var _loop = function _loop(i) {
        body[customLabel] = alertData.data[i].category;
        console.log(body);
        assetsTypeCode.push(alertData.data[i].assetTypeCode);
        var promise = fetch("api/client-anr/".concat(numero, "/objects-categories"), {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        }).then(function (response) {
          return response.json();
        })["catch"](function (error) {
          return console.error(error);
        });
        promises.push(promise);
        console.log(importedAssets);
        console.log(alertData.data);
        var assetToRemove = importedAssets.find(function (asset) {
          return asset.category === alertData.data[i].category && asset.name === alertData.data[i].name && asset.label === alertData.data[i].label;
        });
        if (assetToRemove) {
          var indexAsset = hasCategoryAssets.indexOf(assetToRemove);
          hasCategoryAssets.splice(indexAsset, 1);
        }
      };
      for (var i = 0; i < alertData.data.length; i++) {
        _loop(i);
      }
    }
    Promise.all(promises).then(function (responses) {
      var payload = [];
      for (var _i2 = 0; _i2 < assetsTypeCode.length; _i2++) {
        var assetId = void 0;
        if (assets) {
          for (var j = 0; j < assets.length; j++) {
            if (assetsTypeCode[_i2] === assets[j].code) {
              assetId = assets[_i2].uuid;
            }
          }
        }
        payload.push({
          asset: assetId,
          category: responses[_i2].categ.id,
          implicitPosition: 2,
          label1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? alertData.data[_i2].label : undefined,
          label2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? alertData.data[_i2].label : undefined,
          label3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? alertData.data[_i2].label : undefined,
          label4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? alertData.data[_i2].label : undefined,
          name1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? alertData.data[_i2].name : undefined,
          name2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? alertData.data[_i2].name : undefined,
          name3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? alertData.data[_i2].name : undefined,
          name4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? alertData.data[_i2].name : undefined,
          mode: undefined,
          scope: alertData.data[_i2].scope
        });
      }
      var _loop2 = function _loop2(_i3) {
        var pay = {
          implicitPosition: 2,
          scope: hasCategoryAssets[_i3].scope,
          label1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? hasCategoryAssets[_i3].label : undefined,
          label2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? hasCategoryAssets[_i3].label : undefined,
          label3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? hasCategoryAssets[_i3].label : undefined,
          label4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? hasCategoryAssets[_i3].label : undefined,
          name1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? hasCategoryAssets[_i3].name : undefined,
          name2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? hasCategoryAssets[_i3].name : undefined,
          name3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? hasCategoryAssets[_i3].name : undefined,
          name4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? hasCategoryAssets[_i3].name : undefined,
          rolfTag: undefined,
          asset: undefined,
          category: undefined
        };
        if (hasCategoryAssets[_i3].scope == 1) {
          var rolfTag = operationalRiskTag === null || operationalRiskTag === void 0 ? void 0 : operationalRiskTag.find(function (object) {
            return object.code.toLowerCase() === hasCategoryAssets[_i3].operational_risk_tag.toLowerCase();
          });
          pay.rolfTag = rolfTag === null || rolfTag === void 0 ? void 0 : rolfTag.id;
        }
        var asset = assets.find(function (object) {
          return object.code.toLowerCase() === hasCategoryAssets[_i3].assetTypeCode.toLowerCase();
        });
        pay.asset = asset === null || asset === void 0 ? void 0 : asset.uuid;
        var categorie = categories.find(function (object) {
          return object.name.toLowerCase() === hasCategoryAssets[_i3].category.toLowerCase();
        });
        pay.category = categorie === null || categorie === void 0 ? void 0 : categorie.id;
        payload.push(pay);
      };
      for (var _i3 = 0; _i3 < hasCategoryAssets.length; _i3++) {
        _loop2(_i3);
      }
      fetch("api/client-anr/".concat(numero, "/objects"), {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(function (response) {
        return response.json();
      }).then(function (response) {})["catch"](function (error) {
        return console.error(error);
      });
    });
    setPopup(false);
    dispatch(modalSlice.actions.showCSVFileImportModal(false));
  }
  function handleClose() {
    setPopup(false);
  }
  function importFile() {
    var payloads = [];
    var _loop3 = function _loop3(i) {
      var payload = {
        implicitPosition: 2,
        scope: importedAssets[i].scope,
        label1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? importedAssets[i].label : undefined,
        label2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? importedAssets[i].label : undefined,
        label3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? importedAssets[i].label : undefined,
        label4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? importedAssets[i].label : undefined,
        name1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? importedAssets[i].name : undefined,
        name2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? importedAssets[i].name : undefined,
        name3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? importedAssets[i].name : undefined,
        name4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? importedAssets[i].name : undefined,
        rolfTag: undefined,
        asset: undefined,
        category: undefined
      };
      if (importedAssets[i].scope == 1) {
        var rolfTag = operationalRiskTag.find(function (object) {
          return object.code.toLowerCase() === importedAssets[i].operational_risk_tag.toLowerCase();
        });
        payload.rolfTag = rolfTag === null || rolfTag === void 0 ? void 0 : rolfTag.id;
      }
      var asset = assets.find(function (object) {
        return object.code.toLowerCase() === importedAssets[i].assetTypeCode.toLowerCase();
      });
      payload.asset = asset === null || asset === void 0 ? void 0 : asset.uuid;
      var categorie = categories.find(function (object) {
        return object.name.toLowerCase() === importedAssets[i].category.toLowerCase();
      });
      payload.category = categorie === null || categorie === void 0 ? void 0 : categorie.id;
      payloads.push(payload);
    };
    for (var i = 0; i < importedAssets.length; i++) {
      _loop3(i);
    }
    fetch("api/client-anr/".concat(numero, "/objects"), {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(payloads)
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
    })["catch"](function (error) {
      return console.error(error);
    });
    dispatch(modalSlice.actions.showCSVFileImportModal(false));
  }
  function convertHeadersToCSV(headers) {
    return headers.join(',');
  }
  function downloadCSV(csvContent, fileName) {
    var blob = new Blob([csvContent], {
      type: 'text/csv'
    });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function generateAndDownloadCSV() {
    var headers = ['name', 'label', 'asset type code', 'scope', 'operational risk tag', 'category'];
    var csvContent = convertHeadersToCSV(headers);
    downloadCSV(csvContent, 'ExampleFile.csv');
  }
  var dispatch = ReactRedux.useDispatch();
  function closeCSVFileImportModal() {
    dispatch(modalSlice.actions.showCSVFileImportModal(false));
    dispatch(modalSlice.actions.showAssetImportCenterModal(true));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, popup && /*#__PURE__*/React.createElement(Popup, {
    alertData: alertData,
    onValidate: createAndImport,
    handleClose: handleClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(windowWidth > 960 ? 'modal-CSV card' : 'fullscreen-modal-CSV card')
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, i18next.t('File import center')), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2",
    onClick: closeCSVFileImportModal,
    style: {
      color: 'white'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-lg"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row m-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    title: "File types supported: .csv, .xlsx, .ods, .json",
    onChange: onChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: showFileSchema
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-info-circle-fill"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "row align-items-center"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "col"
  }, importedAssets.length, " ", i18next.t('Assets library')), /*#__PURE__*/React.createElement("button", {
    className: "col-auto btn d-flex align-items-center",
    disabled: importedAssets.length > 0 ? false : true,
    onClick: importFile
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-download icon-large pr-3"
  }), /*#__PURE__*/React.createElement("span", null, i18next.t('Import file')))), /*#__PURE__*/React.createElement("div", {
    className: "row m-2"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover table-bordered"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "name"), /*#__PURE__*/React.createElement("th", null, "label"), /*#__PURE__*/React.createElement("th", null, "asset type code"), /*#__PURE__*/React.createElement("th", null, "scope"), /*#__PURE__*/React.createElement("th", null, "operational risk tag"), /*#__PURE__*/React.createElement("th", null, "category"), error && /*#__PURE__*/React.createElement("th", null, "error"))), /*#__PURE__*/React.createElement("tbody", null, importedAssets.length > 0 && importedAssets.map(function (asset) {
    return /*#__PURE__*/React.createElement("tr", {
      key: asset.label,
      style: {
        color: asset.isValid !== 0 ? 'red' : ''
      }
    }, /*#__PURE__*/React.createElement("td", null, asset.name), /*#__PURE__*/React.createElement("td", null, asset.label), /*#__PURE__*/React.createElement("td", null, asset.assetTypeCode), /*#__PURE__*/React.createElement("td", null, asset.scope), /*#__PURE__*/React.createElement("td", null, asset.operational_risk_tag), /*#__PURE__*/React.createElement("td", null, !asset.categoryExist ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'red'
      }
    }, asset.category) : asset.category), asset.isValid !== 0 && /*#__PURE__*/React.createElement("td", null, asset.isValid === 1 ? 'the asset type code does not exist. Create it before import' : 'the operational risk tag does not exist. Create it before import'));
  }))))), fileSchema && /*#__PURE__*/React.createElement("div", {
    className: "col m-3",
    style: {
      border: 'solid'
    }
  }, /*#__PURE__*/React.createElement("h2", null, i18next.t('File Schema'), " (csv, xlsx, ods)"), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, "name"), /*#__PURE__*/React.createElement("span", null, "[text]")), /*#__PURE__*/React.createElement("div", null, i18next.t('Example : Desktop Computer, Network and Telecom'))), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, "label"), /*#__PURE__*/React.createElement("span", null, "[text]")), /*#__PURE__*/React.createElement("div", null, i18next.t('Example : Any further information'))), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, "asset type code"), /*#__PURE__*/React.createElement("span", null, "[text]")), /*#__PURE__*/React.createElement("div", null, i18next.t('Example : Asset type code must exist in the Knowledge Base'))), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, "scope"), /*#__PURE__*/React.createElement("span", null, "[1,2]")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, i18next.t('Example'), " :"), /*#__PURE__*/React.createElement("div", null, "1 : ", i18next.t('local')), /*#__PURE__*/React.createElement("div", null, "2 : ", i18next.t('global')))), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, "operational risk tag"), /*#__PURE__*/React.createElement("span", null, "[text]")), /*#__PURE__*/React.createElement("div", null, i18next.t('Example : Only one operational risk tag can be linked and must exist in the Knowledge Base'))), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'bold'
    }
  }, "category"), /*#__PURE__*/React.createElement("span", null, "[text]")), /*#__PURE__*/React.createElement("div", null, i18next.t('Multiple categories must be separated by a \"double greater than\" (>>)'))), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, "Ex : Category1/Category2/Category/3"), /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", null, i18next.t('List of categories'), ":"), categories.map(function (category) {
    return /*#__PURE__*/React.createElement("div", {
      className: "m-3",
      key: category.id
    }, category.translation);
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn d-flex align-items-center",
    onClick: generateAndDownloadCSV
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-download icon-large"
  }), i18next.t('Example file')))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end align-items-center my-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    onClick: closeCSVFileImportModal
  }, i18next.t('Cancel')))));
};
//# sourceMappingURL=CSVFileImportCenterModal.js.map
