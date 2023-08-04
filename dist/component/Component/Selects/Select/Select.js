"use strict";

var Select = function Select(_ref) {
  var options = _ref.options,
    customWidth = _ref.customWidth,
    icon = _ref.icon,
    divSelectClass = _ref.divSelectClass,
    label = _ref.label,
    selectClass = _ref.selectClass,
    value = _ref.value,
    index = _ref.index,
    onChange = _ref.onChange,
    title = _ref.title;
  if (!options || options.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row pb-2",
    style: {
      width: "".concat(customWidth)
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: "col-auto d-flex align-items-center pt-3 pe-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: icon + ' icon-large'
  })), /*#__PURE__*/React.createElement("div", {
    className: "col ".concat(divSelectClass)
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      color: 'rgba(0,0,0,0.54)'
    }
  }, i18next.t(label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("select", {
    className: "form-select ".concat(selectClass, " p-0"),
    value: value,
    onChange: index ? function (event) {
      return onChange(event, index);
    } : onChange,
    title: i18next.t(title)
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement("option", {
      value: option.value,
      className: "selectOption",
      key: option.value ? option.value : option.id,
      id: option.id && option.id.toString() /*  position={option.position} */
    }, i18next.t(option.translation));
  })))));
};
//# sourceMappingURL=Select.js.map
