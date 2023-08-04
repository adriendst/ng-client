"use strict";

var LinkDroppable = function LinkDroppable(_ref) {
  var model = _ref.model;
  var _useDroppable = useDroppable({
      id: 'link'
    }),
    isOver = _useDroppable.isOver,
    setNodeRef = _useDroppable.setNodeRef;
  return /*#__PURE__*/React.createElement("a", {
    ref: setNodeRef,
    href: "#/client/project/".concat(model.id, "/anr"),
    className: "btn d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-house-door-fill icon-large px-3"
  }), /*#__PURE__*/React.createElement("span", null, model["label".concat(model.language)]));
};
//# sourceMappingURL=LinkDroppable.js.map
