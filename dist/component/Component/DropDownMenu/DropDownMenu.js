"use strict";

var DropDownMenu = function DropDownMenu(_ref) {
  var name = _ref.name,
    onChange = _ref.onChange,
    show = _ref.show;
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center justify-content-between ps-3 dropdown"
  }, /*#__PURE__*/React.createElement("div", null, i18next.t(name)), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: onChange
  }, /*#__PURE__*/React.createElement("i", {
    className: show ? 'bi bi-chevron-up ms-3 icon-large' : 'bi bi-chevron-down ms-3 icon-large'
  })));
};
//# sourceMappingURL=DropDownMenu.js.map
