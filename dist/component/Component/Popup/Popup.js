"use strict";

var Popup = function Popup(_ref) {
  var alertData = _ref.alertData,
    handleClose = _ref.handleClose,
    onValidate = _ref.onValidate;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert-delete"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "m-3"
  }, /*#__PURE__*/React.createElement("h4", null, i18next.t(alertData.title)), /*#__PURE__*/React.createElement("p", null, i18next.t(alertData.text)), alertData.data && alertData.data.map(function (data) {
    return /*#__PURE__*/React.createElement("p", {
      key: data.category
    }, data.category);
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end fixed-bottom m-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-primary mr-2",
    onClick: handleClose
  }, i18next.t('Cancel')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-primary",
    onClick: onValidate
  }, i18next.t(alertData.actionButton))))));
};
//# sourceMappingURL=Popup.js.map
