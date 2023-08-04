"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var CategoryDraggable = function CategoryDraggable(_ref) {
  var model = _ref.model,
    object = _ref.object;
  var _useDraggable = useDraggable({
      id: object.uuid,
      data: object
    }),
    attributes = _useDraggable.attributes,
    listeners = _useDraggable.listeners,
    setNodeRef = _useDraggable.setNodeRef,
    transform = _useDraggable.transform;
  var style = transform ? {
    transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0)")
  } : undefined;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: setNodeRef,
    style: style
  }, listeners, attributes), /*#__PURE__*/React.createElement("div", {
    className: "ps-4 py-1"
  }, object.scope === 2 && /*#__PURE__*/React.createElement("span", {
    className: "bi bi-globe pe-1",
    style: {
      color: 'rgba(245,124,0)'
    }
  }), /*#__PURE__*/React.createElement("span", null, object["name".concat(model.language)])));
};
//# sourceMappingURL=CategoryDraggable.js.map
