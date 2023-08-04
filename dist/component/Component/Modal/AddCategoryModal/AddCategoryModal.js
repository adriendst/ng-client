"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AddCategoryModal = function AddCategoryModal() {
  var _React$useState = React.useState(window.innerWidth),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    windowWidth = _React$useState2[0],
    setWindowWidth = _React$useState2[1];
  var _React$useState3 = React.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    label = _React$useState4[0],
    setLabel = _React$useState4[1];
  var _React$useState5 = React.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    parentCategory = _React$useState6[0],
    setParentCategory = _React$useState6[1];
  var _React$useState7 = React.useState(),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    parentCategoryId = _React$useState8[0],
    setParentCategoryId = _React$useState8[1];
  var _React$useState9 = React.useState(''),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    previousCategory = _React$useState10[0],
    setPreviousCategory = _React$useState10[1];
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    previousCategoryPosition = _React$useState12[0],
    setPreviousCategoryPosition = _React$useState12[1];
  var _React$useState13 = React.useState(0),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    previousCategoryId = _React$useState14[0],
    setPreviousCategoryId = _React$useState14[1];
  var _React$useState15 = React.useState(2),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    location = _React$useState16[0],
    setLocation = _React$useState16[1];
  /*     const [model, setModel] = React.useState<Model>()
   */
  var _React$useState17 = React.useState([]),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    parentCategoriesOptions = _React$useState18[0],
    setParentCategoriesOptions = _React$useState18[1];
  var _React$useState19 = React.useState([]),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    previousCategoriesOptions = _React$useState20[0],
    setPreviousCategoriesOptions = _React$useState20[1];
  var _React$useState21 = React.useState(0),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    currentCategoryId = _React$useState22[0],
    setCurrentCategoryId = _React$useState22[1];
  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;
  var nonFormattedToken = localStorage.getItem("ls.auth_token");
  var token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;
  var headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || ""); // Utilisez la version formatée du token ou une chaîne vide

  var categoryModal = ReactRedux.useSelector(function (state) {
    return state.modal.categoryModal;
  });
  console.log(categoryModal);
  var model = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.model;
  });
  var categoriesOptions = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.categories;
  });
  React.useEffect(function () {
    var handleResize = function handleResize() {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    Promise.all([model]).then(function () {
      var categories = {
        value: 'Root (none)',
        translation: 'Root (none)',
        id: 0
      };
      setParentCategory(categories.value);
      setParentCategoryId(categories.id);
      var optionsCopy = Array.from(categoriesOptions);
      optionsCopy.unshift(categories);
      setParentCategoriesOptions(optionsCopy);
      if (categoryModal.categoryModalMode === 'edit') {
        fetch("api/client-anr/".concat(numero, "/objects-categories/").concat(categoryModal.categoryModalId), {
          headers: headers
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          console.log(response);
          setCurrentCategoryId(response.id);
          setLabel(response["label".concat(model.language)]);
          setParentCategory(response.parent["label".concat(model.language)]);
          setParentCategoryId(response.parent.id);
          setLocation(response.implicitPosition);
          setPreviousCategoryId(response.previous);
        })["catch"](function (error) {
          return console.error(error);
        });
      }
    });
  }, [categoryModal]);
  React.useEffect(function () {
    if (location === 3) {
      fetch("api/client-anr/".concat(numero, "/objects-categories?lock=true&parentId=").concat(parentCategoryId), {
        headers: headers
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        var categories = [];
        for (var i = 0; i < response.categories.length; i++) {
          categories.push({
            value: response.categories[i]["label".concat(model.language)],
            id: response.categories[i].id,
            translation: response.categories[i]["label".concat(model.language)],
            position: response.categories[i].position
          });
        }
        setPreviousCategoriesOptions(categories);
        if (categoryModal.categoryModalMode === 'edit') {
          console.log(categories);
          console.log(previousCategoryId);
          var previousCateg = categories.find(function (category) {
            return category.id === previousCategoryId;
          });
          console.log(previousCateg);
          if (previousCateg !== undefined) {
            setPreviousCategory(previousCateg.translation);
          }
        }
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }, [parentCategory, location]);
  function onLabelChange(event) {
    setLabel(event.target.value);
  }
  function onParentCategorySelect(event) {
    setParentCategory(event.target.value);
    setParentCategoryId(event.target.selectedOptions[0].id);
  }
  function onLocationSelect(event) {
    setLocation(Number(event.target.value));
  }
  function onPreviousCategorySelect(event) {
    console.log(event.target.selectedOptions[0].id);
    setPreviousCategory(event.target.value);
    setPreviousCategoryPosition(event.target.selectedOptions[0].attributes.position.value);
    setPreviousCategoryId(event.target.selectedOptions[0].id);
  }
  function disabledCreate() {
    if (label === '') {
      return true;
    } else {
      return false;
    }
  }
  function onCreate() {
    var payload = {
      implicitPosition: location,
      label1: (model === null || model === void 0 ? void 0 : model.language) === 1 ? label : '',
      label2: (model === null || model === void 0 ? void 0 : model.language) === 2 ? label : '',
      label3: (model === null || model === void 0 ? void 0 : model.language) === 3 ? label : '',
      label4: (model === null || model === void 0 ? void 0 : model.language) === 4 ? label : ''
    };
    if (parentCategoryId !== 0) {
      payload.parent = parentCategoryId;
      payload.path = parentCategory;
    }
    if (location === 3) {
      console.log(previousCategory);
      if (previousCategory !== null) {
        payload.previous = Number(previousCategoryId);
      }
    }
    console.log(payload);
    fetch("api/client-anr/".concat(numero, "/objects-categories").concat(categoryModal.categoryModalMode === 'edit' && "/".concat(currentCategoryId)), {
      method: "".concat(categoryModal.categoryModalMode === 'edit' ? 'PUT' : 'POST'),
      headers: headers,
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
    })["catch"](function (error) {
      return console.error(error);
    });
    closeCategoryModal();
  }
  function onDelete() {
    fetch("api/client-anr/".concat(numero, "/objects-categories/").concat(currentCategoryId), {
      method: 'DELETE',
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
    })["catch"](function (error) {
      return console.error(error);
    });
    closeCategoryModal();
  }

  /*     function onClose() {
        props.showCategoryModal()
        props.showAssetModal()
      } */

  var dispatch = ReactRedux.useDispatch();
  function closeCategoryModal() {
    dispatch(modalSlice.actions.showAddAssetModal(true));
    dispatch(modalSlice.actions.showCategoryModal([false]));
  }

  /*     console.log(location)
      console.log(previousCategory)
      console.log(previousCategoriesOptions) */

  var locationOptions = [{
    value: 2,
    translation: i18next.t('in the end')
  }, {
    value: 1,
    translation: 'at the beginning'
  }, {
    value: 3,
    translation: 'after...'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(windowWidth > 900 ? 'modal-category' : 'tiny-modal-category', " d-flex flex-column")
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, categoryModal.categoryModalMode === 'edit' ? i18next.t('Edit category') : i18next.t('Add a category')), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2",
    onClick: closeCategoryModal,
    style: {
      color: 'white'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-lg"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "m-2"
  }, /*#__PURE__*/React.createElement(InputWithIcon, {
    label: "Label",
    value: label,
    onChange: onLabelChange,
    icon: "bi bi-caret-right-fill",
    hasToBeFilled: true,
    title: "Please fill out this field."
  }), /*#__PURE__*/React.createElement(Select, {
    icon: "bi bi-bookmark-fill",
    options: parentCategoriesOptions,
    onChange: onParentCategorySelect,
    value: parentCategory,
    label: "Parent category"
  }), /*#__PURE__*/React.createElement(Select, {
    icon: "bi bi-list-task",
    options: locationOptions,
    onChange: onLocationSelect,
    value: location,
    label: "Location"
  }), location === 3 && /*#__PURE__*/React.createElement(Select, {
    icon: "bi bi-bookmark-fill",
    options: previousCategoriesOptions,
    onChange: onPreviousCategorySelect,
    value: previousCategory,
    label: "Previous category"
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end align-items-center my-3"
  }, categoryModal.categoryModalMode === 'edit' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-danger me-2",
    onClick: onDelete
  }, "Delete"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    onClick: closeCategoryModal
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-warning mx-2",
    disabled: disabledCreate(),
    onClick: onCreate
  }, categoryModal.categoryModalMode === 'edit' ? 'Save' : 'Create'))));
};
//# sourceMappingURL=AddCategoryModal.js.map
