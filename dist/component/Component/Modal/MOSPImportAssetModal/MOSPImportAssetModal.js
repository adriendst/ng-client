"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var MOSPImportAssetModal = function MOSPImportAssetModal() {
  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;
  var nonFormattedToken = localStorage.getItem("ls.auth_token");
  var token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;
  var headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");
  var _React$useState = React.useState(window.innerWidth),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    windowWidth = _React$useState2[0],
    setWindowWidth = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    organizations = _React$useState4[0],
    setOrganizations = _React$useState4[1];
  var _React$useState5 = React.useState(),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selectedOrganization = _React$useState6[0],
    setSelectedOrganization = _React$useState6[1];
  var _React$useState7 = React.useState([]),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    assetOptions = _React$useState8[0],
    setAssetOptions = _React$useState8[1];
  var _React$useState9 = React.useState(''),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    selectedAsset = _React$useState10[0],
    setSelectedAsset = _React$useState10[1];
  var _React$useState11 = React.useState(''),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    category = _React$useState12[0],
    setCategory = _React$useState12[1];
  var _React$useState13 = React.useState(),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    categoryId = _React$useState14[0],
    setCategoryId = _React$useState14[1];
  var _React$useState15 = React.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    assets = _React$useState16[0],
    setAssets = _React$useState16[1];
  var _React$useState17 = React.useState([]),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    objects = _React$useState18[0],
    setObjects = _React$useState18[1];
  var model = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.model;
  });
  function onCategorySelect(event) {
    setCategory(event.target.value);
    setCategoryId(event.target.selectedOptions[0].id);
  }
  var categoriesOptions = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.categories;
  });
  var languages = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.languages;
  });
  React.useEffect(function () {
    var handleResize = function handleResize() {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  React.useEffect(function () {
    fetch("https://objects.monarc.lu/api/v2/organization/?per_page=500", {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
    })["catch"](function (error) {
      return console.error(error);
    });
    fetch("https://objects.monarc.lu/api/v2/object/?schema=Library%20objects&per_page=3000", {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
      setAssets(response.data);
      var organizations = [];
      var _loop = function _loop(i) {
        if (!organizations.find(function (organization) {
          return organization.id === response.data[i].organization.id;
        })) {
          organizations.push({
            id: response.data[i].organization.id,
            translation: response.data[i].organization.name,
            value: response.data[i].organization.name
          });
        }
      };
      for (var i = 0; i < response.data.length; i++) {
        _loop(i);
      }
      setOrganizations(organizations);
    })["catch"](function (error) {
      return console.error(error);
    });
    fetch("api/client-anr/".concat(numero, "/objects"), {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log(response);
      setObjects(response.objects);
    })["catch"](function (error) {
      console.error(error);
    });
  }, []);
  function onAssetSelect(option) {
    setSelectedAsset(option.value);
  }
  function onOrganizationSelect(event) {
    setSelectedOrganization(event.target.value);
    setSelectedAsset('');
    var organizationId = organizations.find(function (organization) {
      return event.target.value === organization.name;
    });
    var mosp_assets = assets.filter(function (asset) {
      return asset.organization.id == organizationId.id && !objects.map(function (object) {
        return object.uuid;
      }).includes(asset.json_object.object.object.uuid) && asset.json_object.object.object.language == languages[model.language - 1].code.toUpperCase();
    });
    var displayedAssetsMapped = mosp_assets.map(function (asset) {
      return {
        value: asset.name,
        translation: asset.name,
        id: asset.id
      };
    });
    setAssetOptions(displayedAssetsMapped);
    console.log(displayedAssetsMapped);
  }
  function addCategory() {
    /*     props.showMOSPModal()
        props.showCategoryModal() */
  }
  var dispatch = ReactRedux.useDispatch();
  function showCategoryModal(mode, id) {
    dispatch(modalSlice.actions.showCategoryModal([true, mode, id]));
  }
  function disabledImport() {
    if (selectedOrganization === undefined || category === '' || selectedAsset === '') {
      return true;
    }
    return false;
  }
  function onImport() {
    console.log(selectedOrganization, selectedAsset, category);
    console.log(objects);
    var parentCategories = [];
    var categ;
    if (category.includes('>>')) {
      var _parts = category.split('>>');
      categ = _parts[_parts.length - 1].trim();
    } else {
      categ = category;
    }
    var selectedCateg = categoriesOptions.find(function (categorie) {
      return categorie.categorie["label".concat(model.language)] === categ;
    });
    console.log(selectedCateg);
    var categoriesAll = [];
    var parts = selectedCateg.value.split('>>');
    console.log(parts, parts.length);
    for (var i = 0; i < parts.length; i++) {
      var label = "label".concat(model.language);
      var catego = [];
      catego[label] = parts[i];
      console.log(catego);
      if (i === 0) {
        catego['parent'] = null;
      } else {
        catego['parent'] = parts.length - i;
      }
      categoriesAll.push(catego);
      console.log(catego);
    }
    console.log(categoriesAll.reverse());
  }
  console.log(organizations);
  React.useEffect(function () {}, [organizations]);
  console.log(organizations);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: windowWidth > 960 ? 'modal-MOSP' : 'fullscreen-modal-MOSP d-flex flex-column'
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between primary-backgroundcolor"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "m-3"
  }, "Import an asset from MOSP"), /*#__PURE__*/React.createElement("button", {
    className: "btn me-2" /* onClick={props.showMOSPModal} */,
    style: {
      color: 'white'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-lg"
  }))), /*#__PURE__*/React.createElement(Select, {
    options: organizations,
    icon: "bi bi-bank2",
    value: selectedOrganization,
    onChange: onOrganizationSelect,
    label: "Organization"
  }), assetOptions.length > 0 && /*#__PURE__*/React.createElement(CustomSelect, {
    options: assetOptions,
    icon: "bi bi-pin-fill",
    value: selectedAsset,
    onSelect: onAssetSelect,
    label: "Asset"
  }), /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1"
  }, /*#__PURE__*/React.createElement(Select, {
    icon: "bi bi-bookmark-fill",
    options: categoriesOptions,
    onChange: onCategorySelect,
    value: category,
    label: "Category"
  })), /*#__PURE__*/React.createElement("i", {
    className: "bi bi-plus icon-large pt-3 ps-3",
    onClick: function onClick() {
      return showCategoryModal('add', 0);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end align-items-center my-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary" /* onClick={props.showMOSPModal} */
  }, i18next.t('Cancel')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-warning mx-2",
    disabled: disabledImport(),
    onClick: onImport
  }, i18next.t('Import')))));
};
//# sourceMappingURL=MOSPImportAssetModal.js.map
