"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var UserModal = function UserModal(_ref) {
  var clientsCount = _ref.clientsCount,
    handleClose = _ref.handleClose,
    modal = _ref.modal,
    mode = _ref.mode,
    setClientsCount = _ref.setClientsCount,
    id = _ref.id;
  var localToken = localStorage.getItem("ls.auth_token");
  var token;
  if (localToken !== null) {
    token = localToken.replace(/"/g, "");
  }
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anrs = _React$useState2[0],
    setAnrs = _React$useState2[1];
  var rolesOptions = [{
    value: "superadminfo",
    translation: "Administrator"
  }, {
    value: "userfo",
    translation: "User"
  }, {
    value: "ceo",
    translation: "Global dashboard"
  }];
  var permissionsOptions = [{
    value: "-1",
    translation: "No access"
  }, {
    value: "0",
    translation: "Read"
  }, {
    value: "1",
    translation: "Read and write"
  }];
  var _React$useState3 = React.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    firstName = _React$useState4[0],
    setFirstName = _React$useState4[1];
  var _React$useState5 = React.useState(""),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    lastName = _React$useState6[0],
    setLastName = _React$useState6[1];
  var _React$useState7 = React.useState(""),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    email = _React$useState8[0],
    setEmail = _React$useState8[1];
  var _React$useState9 = React.useState([]),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    roles = _React$useState10[0],
    setRoles = _React$useState10[1];
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    definePassword = _React$useState12[0],
    setDefinePassword = _React$useState12[1];
  var _React$useState13 = React.useState(""),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    password = _React$useState14[0],
    setPassword = _React$useState14[1];
  var _React$useState15 = React.useState(""),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    confirmPassword = _React$useState16[0],
    setConfirmPassword = _React$useState16[1];
  var _React$useState17 = React.useState([]),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    userPermissions = _React$useState18[0],
    setUserPermissions = _React$useState18[1];
  var _React$useState19 = React.useState(window.innerWidth),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    windowWidth = _React$useState20[0],
    setWindowWidth = _React$useState20[1];
  React.useEffect(function () {
    var handleResize = function handleResize() {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  React.useEffect(function () {
    var anrsClient;
    var clientAnrFetch = fetch("api/client-anr", {
      headers: {
        Accept: "application/json, text/plain, */*",
        Token: token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      setAnrs(data.anrs);
      anrsClient = data.anrs;
    })["catch"](function (error) {
      return console.error(error);
    });
    Promise.all([clientAnrFetch]).then(function (result) {
      if (mode !== "create") {
        fetch("api/users/".concat(id), {
          headers: {
            Accept: "application/json, text/plain, */*",
            Token: token
          }
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          var permissions = [];
          for (var i = 0; i < data.anrs.length; i++) {
            permissions.push({
              id: data.anrs[i].id,
              rwd: data.anrs[i].rwd
            });
          }
          setFirstName(data.firstname);
          setLastName(data.lastname);
          setEmail(data.email);
          setRoles(data.role);
          setUserPermissions(permissions);
          setDefinePassword(false);
          setPassword("");
          setConfirmPassword("");
        })["catch"](function (error) {
          return console.error(error);
        });
      } else {
        var permissions = [];
        for (var i = 0; i < anrsClient.length; i++) {
          permissions.push({
            id: anrsClient[i].id,
            rwd: -1
          });
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setRoles([]);
        setUserPermissions(permissions);
        setDefinePassword(false);
        setPassword("");
        setConfirmPassword("");
      }
    });
  }, []);
  function onFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function onLastNameChange(event) {
    setLastName(event.target.value);
  }
  function onEmailChange(event) {
    setEmail(event.target.value);
  }
  function onDefinePasswordChange() {
    setDefinePassword(!definePassword);
  }
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }
  function onConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }
  function onUserArnsChange(event, anrId) {
    console.log(event, anrId);
    var selectedRwd = event.target.value;
    var anr = {
      id: Number(anrId),
      rwd: selectedRwd
    };
    setUserPermissions(function (prevPermissions) {
      var existingAnrIndex = prevPermissions.findIndex(function (item) {
        return item.id === anrId;
      });
      if (selectedRwd === "-1") {
        if (existingAnrIndex !== -1) {
          var updatedPermissions = _toConsumableArray(prevPermissions);
          updatedPermissions[existingAnrIndex] = _objectSpread(_objectSpread({}, prevPermissions[existingAnrIndex]), {}, {
            rwd: selectedRwd
          });
          return updatedPermissions;
        }
      } else {
        if (existingAnrIndex !== -1) {
          return prevPermissions.map(function (item) {
            return item.id === anrId ? _objectSpread(_objectSpread({}, item), {}, {
              rwd: selectedRwd
            }) : item;
          });
        } else {
          return [].concat(_toConsumableArray(prevPermissions), [anr]);
        }
      }
      return prevPermissions;
    });
  }
  function onValidation() {
    if (mode === "create") {
      fetch("api/users", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Token: token
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          role: roles,
          anrs: userPermissions
        })
      }).then(function (response) {
        if (response.ok) {
          setClientsCount(clientsCount + 1);
        }
      })["catch"](function (error) {
        return console.error(error);
      });
    } else {
      fetch("api/users/".concat(id), {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Token: token
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          role: roles,
          anrs: userPermissions
        })
      })["catch"](function (error) {
        return console.error(error);
      });
    }
    handleClose();
  }
  function disabeldCreate() {
    if (firstName === "" || lastName == "" || email == "") {
      return true;
    } else {
      return false;
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(windowWidth > 960 ? "modal-user" : "modal-user-fullscreen", " d-flex flex-column")
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, mode === "create" ? i18next.t("Add an user") : i18next.t("Edit user")), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2",
    onClick: handleClose,
    style: {
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-lg"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "userForm flex-grow-1"
  }, /*#__PURE__*/React.createElement("form", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement(InputWithIcon, {
    hasToBeFilled: true,
    icon: "bi bi-person-fill",
    label: "First name",
    value: firstName,
    onChange: onFirstNameChange,
    className: "flex-grow-1",
    title: i18next.t("Please fill out this field.")
  }), /*#__PURE__*/React.createElement(InputWithIcon, {
    hasToBeFilled: true,
    label: "Last name",
    value: lastName,
    onChange: onLastNameChange,
    className: "flex-grow-1 ms-2",
    title: i18next.t("Please fill out this field.")
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputWithIcon, {
    hasToBeFilled: true,
    icon: "bi bi-envelope-fill",
    label: "E-mail",
    value: email,
    onChange: onEmailChange,
    title: i18next.t("Please fill out this field.")
  })), /*#__PURE__*/React.createElement(SearchSelect, {
    value: roles,
    label: "Permissions and roles",
    setValue: setRoles,
    options: rolesOptions,
    multiple: true,
    icon: "bi bi-card-list"
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-check form-switch my-4 pl-5"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-check-input switch-input-lg",
    type: "checkbox",
    onChange: onDefinePasswordChange
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label ps-3"
  }, i18next.t("Set password"))), definePassword && /*#__PURE__*/React.createElement("div", {
    className: "pb-4"
  }, /*#__PURE__*/React.createElement(InputWithIcon, {
    icon: "bi bi-lock-fill",
    label: "Password",
    value: password,
    onChange: onPasswordChange
  }), /*#__PURE__*/React.createElement(InputWithIcon, {
    icon: "bi bi-lock-fill",
    label: "Confirm password",
    value: confirmPassword,
    onChange: onConfirmPasswordChange
  })), /*#__PURE__*/React.createElement("table", {
    className: "table table-bordered"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, i18next.t("Risk analysis label")), /*#__PURE__*/React.createElement("th", null, i18next.t("Persmissions")))), /*#__PURE__*/React.createElement("tbody", null, anrs.map(function (anr, index) {
    return /*#__PURE__*/React.createElement("tr", {
      key: anr.id
    }, /*#__PURE__*/React.createElement("td", null, anr["label".concat(anr.language)]), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Select, {
      options: permissionsOptions,
      onChange: onUserArnsChange,
      value: userPermissions[index] ? userPermissions[index].rwd : "",
      index: anr.id
    })));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end align-items-center my-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    onClick: handleClose
  }, i18next.t("Cancel")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-warning mx-2",
    onClick: onValidation,
    disabled: disabeldCreate()
  }, mode === "create" ? i18next.t("Create") : i18next.t("Save")))));
};
//# sourceMappingURL=UserModal.js.map
