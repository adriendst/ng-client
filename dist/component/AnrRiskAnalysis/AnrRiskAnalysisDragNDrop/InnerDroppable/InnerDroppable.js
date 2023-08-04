"use strict";

var InnerDroppable = function InnerDroppable(_ref) {
  var instance = _ref.instance,
    language = _ref.language,
    updateInstances = _ref.updateInstances,
    isActive = _ref.isActive;
  var _useDroppable = useDroppable({
      id: "on".concat(instance.id),
      data: instance
    }),
    isOver = _useDroppable.isOver,
    setNodeRef = _useDroppable.setNodeRef;
  var projectId = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.model.id;
  });
  var link = "/#/client/project/".concat(projectId, "/anr/inst/").concat(instance.id);

  //dropaable's style
  var style = {
    color: isOver ? '#388E3C' : 'black'
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: setNodeRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, instance.child.length > 0 && /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      return updateInstances(instance.id);
    },
    style: {
      backgroundColor: 'rgb(241,241,241)',
      minHeight: '17px',
      minWidth: '17px'
    },
    className: "d-flex align-items-center justify-content-center me-1 treeview-button"
  }, instance.isShow ? '-' : '+'), instance.scope === 2 && /*#__PURE__*/React.createElement("span", {
    className: "bi bi-globe pe-1",
    style: {
      color: 'rgba(245,124,0)'
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: link,
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "treeview ".concat(isActive && 'active-inst')
  }, instance["name".concat(language)]))));
};
//# sourceMappingURL=InnerDroppable.js.map
