"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var InstanceDraggable = function InstanceDraggable(_ref) {
  var instance = _ref.instance,
    model = _ref.model,
    updateInstances = _ref.updateInstances,
    isActive = _ref.isActive;
  var _useDraggable = useDraggable({
      id: instance.id,
      data: instance
    }),
    attributes = _useDraggable.attributes,
    listeners = _useDraggable.listeners,
    setNodeRef = _useDraggable.setNodeRef,
    transform = _useDraggable.transform;

  //draggable's style
  var style = transform ? {
    transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0)"),
    maxHeight: '1px'
  } : undefined;
  return /*#__PURE__*/React.createElement("li", _extends({
    key: instance.id,
    ref: setNodeRef,
    style: style
  }, listeners, attributes), /*#__PURE__*/React.createElement(InnerDroppable, {
    instance: instance,
    language: model.language,
    updateInstances: updateInstances,
    isActive: isActive
  }), instance.isShow && instance.child && instance.child.length > 0 && /*#__PURE__*/React.createElement("ol", {
    className: "no-list-style treeview2 instances pt-2"
  }, instance.child.map(function (child) {
    return /*#__PURE__*/React.createElement(InstanceDraggable, {
      instance: child,
      key: child.id,
      model: model,
      updateInstances: updateInstances
    });
  })), /*#__PURE__*/React.createElement(Droppable, {
    instance: instance
  }));
};
//# sourceMappingURL=InstanceDraggable.js.map
