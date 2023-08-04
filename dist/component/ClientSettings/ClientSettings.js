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
var ClientSettings = function ClientSettings() {
  var localToken = localStorage.getItem('ls.auth_token');
  var token;
  if (localToken !== null) {
    token = localToken.replace(/"/g, '');
  }
  var options = [{
    value: 'true',
    translation: 'I agree'
  }, {
    value: 'false',
    translation: 'I don’t agree'
  }];
  var _React$useState = React.useState({
      contact_email: '',
      id: 0,
      model_id: 0,
      name: '',
      stats: false
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    client = _React$useState2[0],
    setClient = _React$useState2[1];
  var emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  var secondPartRegex = new RegExp('^[a-zA-Z0-9.]+$');
  var _React$useState3 = React.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isValidEmail = _React$useState4[0],
    setIsValidEmail = _React$useState4[1];
  var _React$useState5 = React.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    emailWarningMessage = _React$useState6[0],
    setEmailWarningMessage = _React$useState6[1];
  React.useEffect(function () {
    /*     console.log(client.contact_email)
        console.log(secondPartRegex.test(client.contact_email.split('@')[1])) */

    if (client.contact_email === '') {
      setIsValidEmail(false);
      setEmailWarningMessage('Please fill out this field');
    } else {
      if (emailRegex.test(client.contact_email)) {
        setIsValidEmail(true);
        setEmailWarningMessage('');
      } else {
        setIsValidEmail(false);
        /*         console.log(client.contact_email.includes('@'))
                console.log(client.contact_email.slice(-1)) */
        if (client.contact_email.includes('@')) {
          if (client.contact_email.slice(-1) === '@') {
            setEmailWarningMessage("Please enter a part following '@'. '".concat(client.contact_email, "' is complete."));
          } else if (client.contact_email.slice(-1) === '.') {
            var secondPart = client.contact_email.split('@')[1];
            setEmailWarningMessage("'.' is used at a wrong position in '".concat(secondPart, "'"));
          } else if (!secondPartRegex.test(client.contact_email.split('@')[1])) {
            var _secondPart = client.contact_email.split('@')[1];
            var invalidCharacterMatch = _secondPart.match(/[^A-Za-z0-9.]/);
            var invalidCharacter;
            if (invalidCharacterMatch !== null) {
              invalidCharacter = invalidCharacterMatch[0];
              // Continue with the rest of your code
            }
            setEmailWarningMessage("A part following '@' should not contain the symbol '".concat(invalidCharacter, "'"));
          }
        } else {
          setEmailWarningMessage("Please include an '@' in the email adress. '".concat(client.contact_email, "' is missing an '@'."));
        }
      }
    }
  }, [client.contact_email]);
  function updateClient() {
    if (client.id > 0) {
      var headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8'
      };
      if (token !== null) {
        headers['Token'] = token;
      }
      fetch('api/client/' + client.id, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(client)
      })["catch"](function (error) {
        console.error(error);
      });
      fetch('api/stats/general-settings/', {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          is_sharing_enabled: client.stats
        })
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }
  function onClientNameChange(event) {
    setClient(_objectSpread(_objectSpread({}, client), {}, {
      name: event.target.value
    }));
  }
  function onClientMailChange(event) {
    setClient(_objectSpread(_objectSpread({}, client), {}, {
      contact_email: event.target.value
    }));
  }
  function onShareStatsChange(event) {
    setClient(_objectSpread(_objectSpread({}, client), {}, {
      stats: JSON.parse(event.target.value)
    }));
  }
  React.useEffect(function () {
    /*     let tempClientData: {
          contact_email: string;
          id: number;
          model_id: number;
          name: string;
          stats: boolean;
        } = {
          contact_email: '',
          id: 0,
          model_id: 0,
          name: '',
          stats: false,
        }; */

    var tempClientData;
    var headers = {};
    if (token !== null) {
      headers['Token'] = token;
    }
    var fetchClientData = fetch('api/client', {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var dataOf = data.clients[0];
      tempClientData = _objectSpread(_objectSpread({}, tempClientData), dataOf);
    })["catch"](function (error) {
      return console.error(error);
    });
    var fetchStats = fetch('api/stats/general-settings/', {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var stats = data.data.is_sharing_enabled;
      tempClientData = _objectSpread(_objectSpread({}, tempClientData), {}, {
        stats: stats
      });
    })["catch"](function (error) {
      return console.error(error);
    });
    Promise.all([fetchClientData, fetchStats]).then(function () {
      setClient(tempClientData);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "m-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "my-3"
  }, i18next.t('General settings')), /*#__PURE__*/React.createElement("form", {
    name: "clientForm",
    onSubmit: updateClient
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-4"
  }, i18next.t('Organization information')), /*#__PURE__*/React.createElement(InputWithIcon, {
    hasToBeFilled: true,
    icon: "bi bi-caret-right-fill",
    label: "Name",
    value: client.name,
    onChange: onClientNameChange
  }), /*#__PURE__*/React.createElement(EmailInput, {
    isCorrectlyFilled: isValidEmail,
    icon: "bi bi-envelope-fill",
    label: "Contact e-mail",
    value: client.contact_email,
    onChange: onClientMailChange,
    title: emailWarningMessage
  }), /*#__PURE__*/React.createElement("h2", {
    className: "mb-4"
  }, i18next.t('Sharing statistics')), /*#__PURE__*/React.createElement(Select, {
    icon: "bi bi-bar-chart-fill",
    label: "Do you agree to share the statistics ?",
    value: client.stats.toString(),
    onChange: onShareStatsChange,
    options: options
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    disabled: client.name === '' || client.contact_email === '' || !isValidEmail
  }, i18next.t('Update settings')))))));
};
//# sourceMappingURL=ClientSettings.js.map
