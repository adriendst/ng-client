"use strict";

var DisplayCategories = function DisplayCategories(_ref) {
  var categ = _ref.categ,
    model = _ref.model,
    updateCategories = _ref.updateCategories;
  return categ && categ.map(function (categorie) {
    return /*#__PURE__*/React.createElement("div", {
      key: categorie.id
    }, /*#__PURE__*/React.createElement(CategorieName, {
      updateCategories: updateCategories,
      isShow: categorie.isShow,
      label: categorie["label".concat(model.language)],
      categId: categorie.id
    }), categorie.isShow && categorie.objects && categorie.objects.map(function (object) {
      return /*#__PURE__*/React.createElement(CategoryDraggable, {
        object: object,
        key: object.uuid,
        model: model
      });
    }), categorie.isShow && /*#__PURE__*/React.createElement("div", {
      className: "ps-4"
    }, /*#__PURE__*/React.createElement(DisplayCategories, {
      categ: categorie.child,
      model: model,
      updateCategories: updateCategories
    })));
  });
};
//# sourceMappingURL=DisplayCategories.js.map
