"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var EmailInput = function EmailInput(_ref) {
  var icon = _ref.icon,
    isCorrectlyFilled = _ref.isCorrectlyFilled,
    label = _ref.label,
    onChange = _ref.onChange,
    title = _ref.title,
    value = _ref.value,
    className = _ref.className;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    firstFocus = _React$useState2[0],
    setFirstFocus = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isFocus = _React$useState4[0],
    setIsFocus = _React$useState4[1];
  function onBlur() {
    if (!firstFocus) {
      setFirstFocus(true);
    }
    setIsFocus(false);
  }
  function onFocus() {
    setIsFocus(true);
  }
  function onInputChange(event) {
    onChange(event);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row mb-4 ".concat(className && className)
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: "col-auto d-flex align-items-center pt-3 pe-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: icon + ' icon-large'
  })), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: 'rgba(0,0,0,0.54)'
    },
    className: "".concat(!isCorrectlyFilled ? 'danger-input' : '')
  }, isFocus || value !== '' ? i18next.t(label) + ' *' : ''), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: isFocus ? undefined : i18next.t(label),
    className: "form-control custom-placeholder ".concat(!isCorrectlyFilled ? 'danger-input' : ''),
    defaultValue: value,
    onChange: onInputChange,
    title: title,
    onFocus: onFocus,
    onBlur: onBlur
  }))));
};
//# sourceMappingURL=EmailInput.js.map
