"use strict";

var HeaderCell = function HeaderCell(_ref) {
  var label = _ref.label,
    onSortChange = _ref.onSortChange,
    sortField = _ref.sortField,
    sortOrder = _ref.sortOrder,
    value = _ref.value;
  return /*#__PURE__*/React.createElement("th", {
    className: "header-cell",
    onClick: function onClick() {
      return onSortChange(value);
    },
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-cell-content"
  }, /*#__PURE__*/React.createElement("span", {
    style: sortField === value ? {} : {
      color: 'rgba(0,0,0,.54)'
    }
  }, i18next.t(label)), sortField === value ? sortOrder === '' ? /*#__PURE__*/React.createElement("i", {
    className: "bi bi-arrow-up-short icon-large"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "bi bi-arrow-down-short icon-large"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "bi bi-arrow-up-short icon-large arrow-icon",
    style: {
      color: 'grey'
    }
  })));
};
//# sourceMappingURL=HeaderCell.js.map
