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
var ManageUser = function ManageUser(props) {
  var localToken = localStorage.getItem('ls.auth_token');
  var token;
  if (localToken !== null) {
    token = localToken.replace(/"/g, '');
  }
  var currentUserId = localStorage.getItem('ls.uid');
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    clients = _React$useState2[0],
    setClients = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    clientsCount = _React$useState4[0],
    setClientsCount = _React$useState4[1];
  var _React$useState5 = React.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    search = _React$useState6[0],
    setSearch = _React$useState6[1];
  var _React$useState7 = React.useState('1'),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    show = _React$useState8[0],
    setShow = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    modal = _React$useState10[0],
    setModal = _React$useState10[1];
  var _React$useState11 = React.useState('create'),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    modalMode = _React$useState12[0],
    setModalMode = _React$useState12[1];
  var _React$useState13 = React.useState(),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    userId = _React$useState14[0],
    setUserId = _React$useState14[1];
  var _React$useState15 = React.useState(),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    alertData = _React$useState16[0],
    setAlertData = _React$useState16[1];
  var _React$useState17 = React.useState(false),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    alert = _React$useState18[0],
    setAlert = _React$useState18[1];
  var _React$useState19 = React.useState('firstname'),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    sortField = _React$useState20[0],
    setSortField = _React$useState20[1];
  var _React$useState21 = React.useState('-'),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    sortOrder = _React$useState22[0],
    setSortOrder = _React$useState22[1];
  var _React$useState23 = React.useState(1),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    pagination = _React$useState24[0],
    setPagination = _React$useState24[1];
  var _React$useState25 = React.useState(25),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    rowPerPage = _React$useState26[0],
    setRowPerPage = _React$useState26[1];
  function showModal(value, id) {
    setModalMode(value);
    setModal(true);
    setUserId(id);
  }
  function hideModal() {
    setModal(false);
    setModalMode('create');
  }
  function showAlert(value, id) {
    if (id !== Number(currentUserId)) {
      if (value === 'delete') {
        setAlertData({
          title: 'Are you sure you want to delete user?',
          text: 'This operation is irreversible.',
          actionButton: 'Delete'
        });
      } else {
        setAlertData({
          title: 'Are you sure you want to reset the password of the user?',
          text: 'The user will have to use the password recovery feature.',
          actionButton: 'Reset'
        });
      }
      setAlert(true);
      setUserId(id);
    }
  }
  function hideAlert() {
    setAlert(false);
  }
  function onRowPerPageChange(event) {
    setRowPerPage(event.target.value);
    setPagination(1);
  }
  function onPaginationChange(event) {
    setPagination(event.target.value);
  }
  function getUsers() {
    fetch("api/users?filter=".concat(search, "&limit=").concat(rowPerPage, "&order=").concat(sortOrder).concat(sortField, "&page=").concat(pagination, "&status=").concat(show), {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Token: token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      setClients(data.users);
      setClientsCount(data.count);
    })["catch"](function (error) {
      return console.error(error);
    });
  }
  React.useEffect(function () {
    if (!modal) {
      getUsers();
    }
  }, [sortField, sortOrder, modal, pagination, rowPerPage, show, search]);
  function onSearchChange(event) {
    setSearch(event.target.value);
    setPagination(1);
  }
  function onShowChange(event) {
    setShow(event.target.value);
    setPagination(1);
  }
  function resetFilters() {
    setShow('1');
    setSearch('');
  }
  function onSortChange(field) {
    if (field === sortField) {
      setSortOrder(sortOrder === '' ? '-' : '');
    } else {
      setSortField(field);
      setSortOrder('');
    }
  }
  function changeStatus(client) {
    if (client.id !== Number(currentUserId)) {
      var updatedStatus = client.status === 1 ? 0 : 1;
      var updatedClient = _objectSpread(_objectSpread({}, client), {}, {
        status: updatedStatus
      });
      var updatedClients = clients === null || clients === void 0 ? void 0 : clients.map(function (c) {
        return c.id === client.id ? updatedClient : c;
      });
      setClients(updatedClients);
      fetch("api/users/".concat(client.id), {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Token: token
        },
        body: JSON.stringify(updatedClient)
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }

  //Status options
  var options = [{
    value: 'all',
    translation: 'Show all'
  }, {
    value: '0',
    translation: 'Show inactive only'
  }, {
    value: '1',
    translation: 'Show active only'
  }];
  function handleReset() {
    fetch("api/users/".concat(userId, "/resetPassword"), {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8',
        'Token': token
      }
    })["catch"](function (error) {
      return console.error(error);
    });
    hideAlert();
  }
  function handleDelete() {
    fetch("api/users/".concat(userId), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Token': token
      }
    })["catch"](function (error) {
      return console.error(error);
    });
    hideAlert();
    getUsers();
    setClientsCount(clientsCount - 1);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "m-2 card"
  }, modal && /*#__PURE__*/React.createElement(UserModal, {
    handleClose: hideModal,
    mode: modalMode,
    id: userId,
    modal: modal,
    clientsCount: clientsCount,
    setClientsCount: setClientsCount
  }), alert && /*#__PURE__*/React.createElement(Popup, {
    onValidate: (alertData === null || alertData === void 0 ? void 0 : alertData.actionButton) === 'Delete' ? handleDelete : handleReset,
    alertData: alertData,
    handleClose: hideAlert
  }), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex me-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mt-2 me-2"
  }, /*#__PURE__*/React.createElement("span", null, i18next.t('Users')), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: function onClick() {
      return showModal('create', 0);
    },
    title: i18next.t('Add an user')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-patch-plus-fill icon-large primary-color"
  }))), /*#__PURE__*/React.createElement(InputWithIcon, {
    label: "Search",
    onChange: onSearchChange,
    value: search,
    className: "flex-grow-1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement(Select, {
    options: options,
    value: show,
    onChange: onShowChange,
    customWidth: "200px"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: resetFilters
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-arrow-counterclockwise icon-large icon-large primary-color"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped table-hover",
    style: {
      minWidth: '700px',
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(HeaderCell, {
    onSortChange: onSortChange,
    label: "Status",
    value: "status",
    sortField: sortField,
    sortOrder: sortOrder
  }), /*#__PURE__*/React.createElement(HeaderCell, {
    onSortChange: onSortChange,
    label: "First name",
    value: "firstname",
    sortField: sortField,
    sortOrder: sortOrder
  }), /*#__PURE__*/React.createElement(HeaderCell, {
    onSortChange: onSortChange,
    label: "Last name",
    value: "lastname",
    sortField: sortField,
    sortOrder: sortOrder
  }), /*#__PURE__*/React.createElement(HeaderCell, {
    onSortChange: onSortChange,
    label: "E-mail",
    value: "email",
    sortField: sortField,
    sortOrder: sortOrder
  }), /*#__PURE__*/React.createElement(HeaderCell, {
    onSortChange: onSortChange,
    label: "2FA",
    value: "isTwoFactorAuthEnabled",
    sortField: sortField,
    sortOrder: sortOrder
  }), /*#__PURE__*/React.createElement("th", {
    className: "header-cell",
    style: {
      color: 'rgba(0,0,0,.54)'
    }
  }, "              "))), /*#__PURE__*/React.createElement("tbody", null, clients.map(function (client) {
    return /*#__PURE__*/React.createElement("tr", {
      key: client.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: function onClick() {
        changeStatus(client);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: Number(currentUserId) === client.id ? 'bi bi-check-lg icon-large' : client.status === 1 ? 'bi bi-check-lg icon-large primary-color' : 'bi bi-x-lg icon-large primary-color'
    }))), /*#__PURE__*/React.createElement("td", null, client.firstname), /*#__PURE__*/React.createElement("td", null, client.lastname), /*#__PURE__*/React.createElement("td", null, client.email), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", null, client.isTwoFactorAuthEnabled === true ? i18next.t('Enabled') : i18next.t('Not enabled'))), /*#__PURE__*/React.createElement("td", {
      style: {
        minWidth: 160
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-no-outline",
      onClick: function onClick() {
        return showModal('edit', client.id);
      },
      title: i18next.t('Edit')
    }, /*#__PURE__*/React.createElement("i", {
      className: "bi bi-pencil-fill icon-large primary-color"
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: function onClick() {
        return showAlert('reset', client.id);
      },
      title: i18next.t('Reset password')
    }, /*#__PURE__*/React.createElement("i", {
      className: Number(currentUserId) === client.id ? 'bi bi-arrow-repeat icon-large' : 'bi bi-arrow-repeat icon-large primary-color'
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: function onClick() {
        return showAlert('delete', client.id);
      },
      title: i18next.t('Delete')
    }, /*#__PURE__*/React.createElement("i", {
      className: Number(currentUserId) === client.id ? 'bi bi-trash-fill icon-large' : 'bi bi-trash-fill icon-large danger-color'
    }))));
  })))), /*#__PURE__*/React.createElement(Pagination, {
    userCount: clientsCount,
    onPaginationChange: onPaginationChange,
    onRowPerPageChange: onRowPerPageChange,
    pagination: pagination,
    rowPerPage: rowPerPage,
    setPagination: setPagination
  }));
};
//# sourceMappingURL=ManageUser.js.map
