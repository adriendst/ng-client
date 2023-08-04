"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var MonarcExportFileModal = function MonarcExportFileModal() {
  var _React$useState = React.useState('merge'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    importMethod = _React$useState2[0],
    setImportMethod = _React$useState2[1];
  var _React$useState3 = React.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    password = _React$useState4[0],
    setPassword = _React$useState4[1];
  var _React$useState5 = React.useState(),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    file = _React$useState6[0],
    setFile = _React$useState6[1];
  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;
  var nonFormattedToken = localStorage.getItem("ls.auth_token");
  var token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;
  var headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }
  function changeImportMethod() {
    if (importMethod === 'merge') {
      setImportMethod('duplicate');
    } else {
      setImportMethod('merge');
    }
  }
  function onChange(event) {
    var file = event.target.files;
    setFile(file);
  }
  function importFile() {
    var formData = new FormData();
    console.log(file);
    formData.append('mode', importMethod);
    // Loop through each file in the fileList and append them individually
    for (var i = 0; i < file.length; i++) {
      formData.append("file[".concat(i, "]"), file[i], file[i].name);
    }
    formData.append('password', password);
    fetch("api/client-anr/".concat(numero, "/objects/import"), {
      method: 'POST',
      headers: headers,
      body: formData
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    })["catch"](function (error) {
      console.error('Error uploading file:', error);
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-user-fullscreen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, i18next.t('Asset import center')), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2" /* onClick={props.showMonarcLibraryModal} */,
    style: {
      color: 'white'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-lg"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "m-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, i18next.t('Import method'), " :"), /*#__PURE__*/React.createElement("div", {
    className: "form-check"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "flexRadioDefault",
    id: "flexRadioDefault1",
    checked: importMethod === 'merge' ? false : true,
    onChange: changeImportMethod
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label",
    htmlFor: "flexRadioDefault1"
  }, i18next.t('By duplicating'))), /*#__PURE__*/React.createElement("div", {
    className: "form-check"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "flexRadioDefault",
    id: "flexRadioDefault2",
    checked: importMethod === 'merge' ? true : false,
    onChange: changeImportMethod
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label",
    htmlFor: "flexRadioDefault2"
  }, i18next.t('By merging'))), /*#__PURE__*/React.createElement("span", {
    className: "assetInfo p-3 my-3"
  }, i18next.t('Only global assets can be imported by merge'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: onChange
  }), /*#__PURE__*/React.createElement(InputWithIcon, {
    onChange: onPasswordChange,
    value: password,
    label: i18next.t('Asset password (if any)'),
    icon: 'bi bi-key-fill'
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: importFile
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-download"
  }), i18next.t('Import file'))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end align-items-center my-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary"
  }, i18next.t('Cancel'))))));
};
//# sourceMappingURL=MonarcExportFileModal.js.map
