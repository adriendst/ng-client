"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var Pagination = function Pagination(_ref) {
  var onPaginationChange = _ref.onPaginationChange,
    onRowPerPageChange = _ref.onRowPerPageChange,
    pagination = _ref.pagination,
    rowPerPage = _ref.rowPerPage,
    setPagination = _ref.setPagination,
    userCount = _ref.userCount;
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    paginationOptions = _React$useState2[0],
    setPaginationOptions = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    firstUser = _React$useState4[0],
    setFirstUser = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    lastUser = _React$useState6[0],
    setLastUser = _React$useState6[1];
  var rowPerPageOption = [{
    value: '10',
    translation: '10'
  }, {
    value: '25',
    translation: '25'
  }, {
    value: '50',
    translation: '50'
  }, {
    value: '100',
    translation: '100'
  }];
  React.useEffect(function () {
    var paginationOpt = [];
    var totalPages = Math.ceil(userCount / rowPerPage);
    var currentPage = Math.min(pagination, totalPages);
    for (var i = 1; i <= totalPages; i++) {
      paginationOpt.push({
        value: i.toString(),
        translation: "".concat(i)
      });
    }
    setPaginationOptions(paginationOpt);
    if (userCount === 0) {
      setFirstUser(0);
    } else {
      setFirstUser((currentPage - 1) * rowPerPage + 1);
    }
    setLastUser(Math.min(currentPage * rowPerPage, userCount));
  }, [rowPerPage, pagination, userCount]);
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end flex-wrap",
    style: {
      color: 'rgba(0,0,0,.54)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "".concat(i18next.t('Page'), ":")), /*#__PURE__*/React.createElement(Select, {
    selectClass: "pagination-select",
    divSelectClass: "d-flex justify-content-center pt-2",
    options: paginationOptions,
    value: pagination.toString(),
    onChange: onPaginationChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "ms-5 d-flex"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "".concat(i18next.t('Rows per page'), ":")), /*#__PURE__*/React.createElement(Select, {
    selectClass: "pagination-select",
    divSelectClass: "d-flex justify-content-center pt-2",
    options: rowPerPageOption,
    value: rowPerPage.toString(),
    onChange: onRowPerPageChange,
    customWidth: "100px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ms-5 d-flex"
  }, /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "".concat(firstUser, " - ").concat(lastUser, " ").concat(i18next.t('of'), " ").concat(userCount))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: function onClick() {
      return setPagination(pagination - 1);
    },
    disabled: rowPerPage > userCount || pagination === 1
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-caret-left-fill mb-2"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: function onClick() {
      return setPagination(pagination + 1);
    },
    disabled: lastUser === userCount
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-caret-right-fill"
  })))));
};
//# sourceMappingURL=Pagination.js.map
