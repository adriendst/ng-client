"use strict";

var Droppable = function Droppable(_ref) {
  var instance = _ref.instance;
  var _useDroppable = useDroppable({
      id: "between".concat(instance.id),
      data: instance
    }),
    isOver = _useDroppable.isOver,
    setNodeRef = _useDroppable.setNodeRef;
  var style = {
    height: isOver ? '25px' : '9px',
    border: isOver ? '2px dashed #33B5E5' : 'none',
    marginTop: isOver ? '5px' : '0px',
    marginBottom: isOver ? '5px' : '0px'
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: setNodeRef,
    style: style
  });
};
//# sourceMappingURL=Droppable.js.map
