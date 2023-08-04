"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var MonarcLibraryModal = function MonarcLibraryModal() {
  var _selectedObject$risks, _selectedObject$risks2;
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    search = _React$useState2[0],
    setSearch = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    objects = _React$useState4[0],
    setObjects = _React$useState4[1];
  var _React$useState5 = React.useState(undefined),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selectedObject = _React$useState6[0],
    setSelectedObject = _React$useState6[1];
  var _React$useState7 = React.useState('merge'),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    importMethod = _React$useState8[0],
    setImportMethod = _React$useState8[1];
  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;
  var nonFormattedToken = localStorage.getItem("ls.auth_token");
  var token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;
  var headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");
  function onSearchChange(event) {
    setSearch(event.target.value);
  }
  React.useEffect(function () {
    fetch("api/client-anr/".concat(numero, "/objects/import?filter=").concat(search), {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
      setObjects(response.objects);
    })["catch"](function (error) {
      return console.error(error);
    });
  }, [search]);
  function selectAsset(object) {
    fetch("api/client-anr/".concat(numero, "/objects/import/").concat(object.uuid), {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
      setSelectedObject(response);
    })["catch"](function (error) {
      return console.error(error);
    });
  }
  function importAsset() {
    fetch("api/client-anr/".concat(numero, "/objects/import/").concat(selectedObject.uuid), {
      headers: headers,
      method: 'PATCH',
      body: JSON.stringify({
        object: selectedObject.uuid,
        mode: importMethod
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
    })["catch"](function (error) {
      return console.error(error);
    });
    setSelectedObject(undefined);
  }
  function changeImportMethod() {
    if (importMethod === 'merge') {
      setImportMethod('duplicate');
    } else {
      setImportMethod('merge');
    }
  }
  console.log(selectedObject);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-user-fullscreen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, i18next.t('Asset import center')), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2" /* onClick={props.showMonarcLibraryModal}  */,
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
  }, i18next.t('Only global assets can be imported by merge'))), selectedObject === undefined ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, i18next.t('List of common MONARC assets')), /*#__PURE__*/React.createElement(InputWithIcon, {
    value: search,
    onChange: onSearchChange,
    label: i18next.t('Search an asset') + "..."
  }), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover table-bordered"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, i18next.t('Name')), /*#__PURE__*/React.createElement("th", null, i18next.t('Category')), /*#__PURE__*/React.createElement("th", null, i18next.t('Asset Type')), /*#__PURE__*/React.createElement("th", null, i18next.t('Actions')))), /*#__PURE__*/React.createElement("tbody", null, objects && objects.map(function (object) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, object.name1), /*#__PURE__*/React.createElement("td", null, object.category.label1), /*#__PURE__*/React.createElement("td", null, object.asset.description1), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-outline",
      onClick: function onClick() {
        return selectAsset(object);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "bi bi-arrow-up-right-square icon-large"
    }))));
  })))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: function onClick() {
      return setSelectedObject(undefined);
    }
  }, i18next.t('Back to the list')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: importAsset
  }, i18next.t('Import asset'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, selectedObject.name1), /*#__PURE__*/React.createElement("span", null, (_selectedObject$risks = selectedObject.risks) === null || _selectedObject$risks === void 0 ? void 0 : _selectedObject$risks.length, " ", i18next.t('information risks')), /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover table-bordered"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, i18next.t('Threat')), /*#__PURE__*/React.createElement("th", null, i18next.t('Vulnerability')))), /*#__PURE__*/React.createElement("tbody", null, (_selectedObject$risks2 = selectedObject.risks) === null || _selectedObject$risks2 === void 0 ? void 0 : _selectedObject$risks2.map(function (risk) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, risk.threatLabel1), /*#__PURE__*/React.createElement("td", null, risk.vulnLabel1));
  }))))))));
};
//# sourceMappingURL=MonarcLibraryModal.js.map
