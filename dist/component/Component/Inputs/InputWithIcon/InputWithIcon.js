"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var InputWithIcon = function InputWithIcon(_ref) {
  var hasToBeFilled = _ref.hasToBeFilled,
    icon = _ref.icon,
    label = _ref.label,
    onChange = _ref.onChange,
    value = _ref.value,
    setIsFocus = _ref.setIsFocus,
    className = _ref.className,
    title = _ref.title;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isFocus = _React$useState2[0],
    setInputIsFocus = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isFilled = _React$useState4[0],
    setIsFilled = _React$useState4[1];
  function onFocus() {
    setInputIsFocus(true);
    if (setIsFocus) {
      setIsFocus(true);
    }
  }
  function onBlur() {
    setInputIsFocus(false);
    if (value === '') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }
  function onInputChange(event) {
    onChange(event);
    if (isFilled === true) {
      setIsFilled(false);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row d-flex pb-2 ".concat(className && className)
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
    className: "".concat(isFilled && hasToBeFilled ? 'danger-input' : '')
  }, isFocus || value !== '' ? i18next.t(label) + (hasToBeFilled ? ' *' : '') : ''), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: isFocus ? undefined : i18next.t(label) + (hasToBeFilled ? ' *' : ''),
    className: "form-control custom-placeholder ".concat(isFilled && hasToBeFilled ? 'danger-input' : ''),
    value: value,
    onChange: onInputChange,
    title: title,
    onFocus: onFocus,
    onBlur: onBlur
  }))));
};
//# sourceMappingURL=InputWithIcon.js.map
