"use strict";

var CategorieName = function CategorieName(_ref) {
  var categId = _ref.categId,
    isShow = _ref.isShow,
    label = _ref.label,
    updateCategories = _ref.updateCategories;
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return updateCategories(categId);
    },
    id: categId.toString(),
    className: "d-flex align-items-center",
    style: {
      maxHeight: 20,
      fontWeight: 'bold'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      border: 1,
      backgroundColor: 'rgb(241,241,241)',
      minHeight: '17px',
      minWidth: '17px'
    },
    className: "d-flex align-items-center justify-content-center m-1"
  }, isShow ? '-' : '+'), /*#__PURE__*/React.createElement("span", null, label));
};
//# sourceMappingURL=CategorieName.js.map
