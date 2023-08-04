"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
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
/* import {displayPlaylistModal} from 'ng_client/Slices/monarcSlice'
 */
var AnrRiskAnalysisDragNDrop = function AnrRiskAnalysisDragNDrop() {
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showRiskAnalysis = _React$useState2[0],
    setShowRiskAnalysis = _React$useState2[1];
  var _React$useState3 = React.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showAssetsLibrary = _React$useState4[0],
    setShowAssetsLibrary = _React$useState4[1];
  var _React$useState5 = React.useState(""),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    searchCategoriesAssets = _React$useState6[0],
    setSearchCategoriesAssets = _React$useState6[1];
  var _React$useState7 = React.useState([]),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    searchedCategories = _React$useState8[0],
    setSearchedCategories = _React$useState8[1];
  var _React$useState9 = React.useState(""),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    searchInstancesAssets = _React$useState10[0],
    setSearchInstancesAssets = _React$useState10[1];
  var _React$useState11 = React.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    searchedInstances = _React$useState12[0],
    setSearchedInstances = _React$useState12[1];
  var _React$useState13 = React.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    categories = _React$useState14[0],
    setCategories = _React$useState14[1];
  var _React$useState15 = React.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    instances = _React$useState16[0],
    setInstances = _React$useState16[1];

  /*     const [model, setModel] = React.useState<Model>();
   */
  var _React$useState17 = React.useState(260),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    width = _React$useState18[0],
    setWidth = _React$useState18[1];
  var _React$useState19 = React.useState(true),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    isVisible = _React$useState20[0],
    setIsVisible = _React$useState20[1];
  var url = window.location.href;
  var match = url.split('/');
  var numero = match ? match[6] : null;
  var nonFormattedToken = localStorage.getItem("ls.auth_token");
  var token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;
  var headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || ""); // Utilisez la version formatée du token ou une chaîne vide

  var model = ReactRedux.useSelector(function (state) {
    return state.riskAnalysis.model;
  });
  var dispatch = ReactRedux.useDispatch();
  React.useEffect(function () {
    if (model === undefined) {
      fetch("api/client-anr/".concat(numero), {
        headers: headers
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        dispatch(riskAnalysisSlice.actions.setModel(response));
      })["catch"](function (error) {
        console.error(error);
      });
    }
    fetch("api/client-anr/".concat(numero, "/instances"), {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      var updatedInstances = addPropertyToChildren(response.instances);
      setInstances(updatedInstances);
    })["catch"](function (error) {
      console.error(error);
    });
    fetch("api/client-anr/".concat(numero, "/library"), {
      headers: headers
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      var index = 0;

      /*                 console.log(response)
       */
      initizaliseCategories(response.categories, index);
      setCategories(response.categories);
    })["catch"](function (error) {
      console.error(error);
    });
  }, []);
  function initizaliseCategories(categories, index) {
    categories.forEach(function (category) {
      category.isShow = false;
      if (category.objects.length > 0) {
        category.objects.forEach(function (object) {
          object.index = index;
          index++;
        });
      }
      if (category.child) {
        initizaliseCategories(category.child, index);
      }
    });
  }
  function onRiskAnalysisShowChange() {
    setShowRiskAnalysis(!showRiskAnalysis);
  }
  function onAssetsLibraryShowChange() {
    setShowAssetsLibrary(!showAssetsLibrary);
  }

  //add isShow attribute to check if child of instance are shown
  function addPropertyToChildren(parent) {
    return parent.map(function (child) {
      if (child.child.length > 0) {
        var updatedChild = addPropertyToChildren(child.child);
        return _objectSpread(_objectSpread({}, child), {}, {
          isShow: false,
          child: updatedChild
        });
      } else {
        return child;
      }
    });
  }

  //set isShow of instance to true or false
  function updateInstances(id) {
    var updatedInstances = instances.map(function (instance) {
      if (instance.id === id) {
        return _objectSpread(_objectSpread({}, instance), {}, {
          isShow: !instance.isShow
        });
      } else if (instance.child && instance.child.length > 0) {
        var updatedChild = updateChildInstances(instance.child, id);
        return _objectSpread(_objectSpread({}, instance), {}, {
          child: updatedChild
        });
      }
      return instance;
    });
    setInstances(updatedInstances);
  }
  function updateChildInstances(children, id) {
    return children.map(function (child) {
      if (child.id === id) {
        return _objectSpread(_objectSpread({}, child), {}, {
          isShow: !child.isShow
        });
      } else if (child.child && child.child.length > 0) {
        var updatedChild = updateChildInstances(child.child, id);
        return _objectSpread(_objectSpread({}, child), {}, {
          child: updatedChild
        });
      }
      return child;
    });
  }
  function expandAll(instances, way) {
    var instancesUpdated = instances.map(function (instance) {
      if (instance.child && instance.child.length > 0) {
        instance.child = expandAll(instance.child, way);
        return _objectSpread(_objectSpread({}, instance), {}, {
          isShow: way
        });
      } else {
        return instance;
      }
    });
    return instancesUpdated;
  }

  //expand or wrap tree of instances
  function updateTree(way) {
    var updatedInstances = expandAll(instances, way);
    setInstances(updatedInstances);
  }

  //set isShow of category to true or false
  function updateCategories(id) {
    var updatedCategories = categories.map(function (categorie) {
      if (categorie.id === id) {
        return _objectSpread(_objectSpread({}, categorie), {}, {
          isShow: !categorie.isShow
        });
      } else if (categorie.child && categorie.child.length > 0) {
        var updatedChild = updateChildCategories(categorie.child, id);
        return _objectSpread(_objectSpread({}, categorie), {}, {
          child: updatedChild
        });
      }
      return categorie;
    });
    setCategories(updatedCategories);
  }
  function updateChildCategories(children, id) {
    return children.map(function (child) {
      if (child.id === id) {
        return _objectSpread(_objectSpread({}, child), {}, {
          isShow: !child.isShow
        });
      } else if (child.child && child.child.length > 0) {
        var updatedChild = updateChildCategories(child.child, id);
        return _objectSpread(_objectSpread({}, child), {}, {
          child: updatedChild
        });
      }
      return child;
    });
  }

  //search Categories when input is filled
  function onSearchCategoriesAssets(event) {
    setSearchCategoriesAssets(event.target.value);
    if (event.target.value !== "") {
      setSearchedCategories(searchCategories(categories, event.target.value));
    }
  }
  function searchCategories(categ, event) {
    return categ.map(function (categorie) {
      if (categorie.child) {
        if (categorie.objects) {
          var objects = [];
          categorie.objects.map(function (object) {
            if (object["name".concat(model === null || model === void 0 ? void 0 : model.language)].toLowerCase().includes(event.toLowerCase())) {
              objects.push(object);
            }
          });
          return _objectSpread(_objectSpread({}, categorie), {}, {
            objects: objects,
            child: searchCategories(categorie.child, event),
            isShow: true
          });
        }
        return _objectSpread(_objectSpread({}, categorie), {}, {
          child: searchCategories(categorie.child, event),
          isShow: true
        });
      }
      if (categorie.objects) {
        var _objects = [];
        categorie.objects.map(function (object) {
          if (object["name".concat(model === null || model === void 0 ? void 0 : model.language)].toLowerCase().includes(event.toLowerCase())) {
            _objects.push(object);
          }
        });
        return _objectSpread(_objectSpread({}, categorie), {}, {
          objects: _objects,
          isShow: true
        });
      }
    });
  }

  //Search instance when input is filled
  function onSearchInstancesAssets(event) {
    setSearchInstancesAssets(event.target.value);
    if (event.target.value !== "") {
      setSearchedInstances(searchInstances(instances, event.target.value));
    }
  }
  function searchInstances(inst, event) {
    return inst.map(function (instance) {
      if (instance.child.length > 0) {
        return _objectSpread(_objectSpread({}, instance), {}, {
          child: searchInstances(instance.child, event),
          isShow: true
        });
      } else if (instance.parent === 0) {
        return instance;
      } else {
        if (instance["name".concat(model === null || model === void 0 ? void 0 : model.language)].toLowerCase().includes(event.toLowerCase())) {
          return instance;
        }
      }
    }).filter(function (obj) {
      return obj !== undefined;
    });
  }

  //when something is drop this function is called
  function onDragEnd(result) {
    var headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Token: token
    };

    //the object is drop on project name
    if (result.over.id === "link") {
      var link;
      var body;
      var method;
      if (typeof result.active.id === "string") {
        //a category is drop
        link = "api/client-anr/".concat(numero, "/instances");
        body = JSON.stringify({
          anrId: Number(numero),
          object: result.active.id,
          parent: 0,
          position: 0
        });
        method = "POST";
      } else {
        //an instance is drop
        link = "api/client-anr/".concat(numero, "/instances/").concat(result.active.id);
        body = JSON.stringify({
          anrId: Number(numero),
          instId: result.active.id,
          parent: 0,
          position: 0
        });
        method = "PATCH";
      }
      fetch(link, {
        method: method,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Token: token || ""
        },
        body: body
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.status === "ok") {
          if (response.id) {
            //case where we dragged and dropped a category
            var id = response.id;
            fetch("api/client-anr/".concat(numero, "/instances"), {
              //we retrieve the new instance that has been created from the category
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Token: token || ""
              }
            }).then(function (response) {
              return response.json();
            }).then(function (response) {
              var newObject = response.instances.map(function (instance) {
                return getNewObject(instance, id);
              }).filter(function (obj) {
                return obj !== undefined && obj !== null;
              });
              var newInstances = _toConsumableArray(instances);
              newInstances.unshift(_objectSpread({}, newObject[0]));
              for (var i = 0; i < newInstances.length; i++) {
                newInstances[i].position = i + 1;
              }
              setInstances(newInstances);
            })["catch"](function (error) {
              console.error(error);
            });
          } else {
            var newInstances = instances.filter(function (obj) {
              return obj !== result.active.data.current;
            });
            newInstances.unshift(result.active.data.current);
            for (var i = 0; i < newInstances.length; i++) {
              newInstances[i].position = i + 1;
            }
            setInstances(newInstances);
          }
        }
      });
    } else if (result.over.id.slice(0, 2) === "on") {
      // case where we drop an object on an instance (object is added to instance childs)
      if (typeof result.active.id === "string") {
        // case where we drop a category on an instance
        fetch("api/client-anr/".concat(numero, "/instances"), {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Token: token || ""
          },
          body: JSON.stringify({
            anrId: Number(numero),
            object: result.active.id,
            parent: Number(result.over.id.slice(2)),
            position: 0
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          var id = response.id;
          if (response.status === "ok") {
            fetch("api/client-anr/".concat(numero, "/instances"), {
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Token: token || ""
              }
            }).then(function (response) {
              return response.json();
            }).then(function (response) {
              var newObject = response.instances.map(function (instance) {
                return getNewObject(instance, id);
              }).filter(function (obj) {
                return obj !== undefined && obj !== null;
              });
              var newInstance = getNewInstance(instances, newObject[0], result.over.id.slice(2));
              var newInstances = instances.map(function (instance) {
                return instance.id === newInstance.id ? newInstance : instance;
              });
              setInstances(newInstances);
            })["catch"](function (error) {
              console.error(error);
            });
          }
        })["catch"](function (error) {
          return console.error(error);
        });
      } else {
        //case where we drop an instance on an other instance
        fetch("api/client-anr/".concat(numero, "/instances/").concat(result.active.id), {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Token: token || ""
          },
          body: JSON.stringify({
            anrId: Number(numero),
            instId: result.active.id,
            parent: Number(result.over.data.current.id),
            position: 0
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.status === "ok") {
            var newInstances = instances.map(function (instance) {
              return removeInstance(instance, result.active.data.current);
            }).filter(function (obj) {
              return obj !== undefined;
            });
            newInstances = newInstances.map(function (instance) {
              return addInstance(instance, result.active.data.current, result.over.data.current);
            });
            setInstances(newInstances);
          }
        });
      }
    } else if (result.over.id.slice(0, 7) === "between") {
      // case where we drop an object beetween two instances
      if (typeof result.active.id === "string") {
        // case where we drop a category
        var previousInstancePosition = instances.map(function (instance) {
          return getPreviousInstancePosition(instance, Number(result.over.id.slice(7)));
        }).filter(function (obj) {
          return obj !== undefined;
        });
        fetch("api/client-anr/".concat(numero, "/instances"), {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Token: token || ""
          },
          body: JSON.stringify({
            anrId: Number(numero),
            object: result.active.id,
            parent: previousInstancePosition[0].parent,
            position: Number(previousInstancePosition[0].position)
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          var id = response.id;
          if (response.status === "ok") {
            fetch("api/client-anr/".concat(numero, "/instances"), {
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Token: token || ""
              }
            }).then(function (response) {
              return response.json();
            }).then(function (response) {
              var newObject = response.instances.map(function (instance) {
                return getNewObject(instance, id);
              }).filter(function (obj) {
                return obj !== undefined && obj !== null;
              });
              if (newObject[0].parent === 0) {
                var updatedInstances = _toConsumableArray(instances);
                var insertIndex = -1;
                for (var i = 0; i < updatedInstances.length; i++) {
                  if (updatedInstances[i].position === newObject[0].position) {
                    insertIndex = i;
                    break;
                  }
                }
                if (insertIndex !== -1) {
                  updatedInstances.splice(insertIndex, 0, newObject[0]);
                  for (var _i2 = insertIndex + 1; _i2 < updatedInstances.length; _i2++) {
                    updatedInstances[_i2].position += 1;
                  }
                } else {
                  updatedInstances.push(newObject[0]);
                }
                setInstances(updatedInstances);
              } else {
                var newInstances = instances.map(function (instance) {
                  return insertObject(instance, newObject[0]);
                }).filter(function (obj) {
                  return obj !== undefined;
                });
                setInstances(newInstances);
              }
            });
          }
        });
      } else {
        // case where we drop an instance
        fetch("api/client-anr/".concat(numero, "/instances/").concat(result.active.id), {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Token: token || ""
          },
          body: JSON.stringify({
            anrId: Number(numero),
            instId: result.active.id,
            parent: Number(result.over.data.current.parent),
            position: result.over.data.current.position
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.status === "ok") {
            var newInstances = instances.map(function (instance) {
              return removeInstance(instance, result.active.data.current);
            }).filter(function (obj) {
              return obj !== undefined;
            });
            for (var i = 0; i < newInstances.length; i++) {
              if (newInstances[i].id === result.over.data.current.id) {
                newInstances = [].concat(_toConsumableArray(newInstances.slice(0, result.over.data.current.position)), [result.active.data.current], _toConsumableArray(newInstances.slice(result.over.data.current.position)));
                for (var j = 0; j < newInstances.length; j++) {
                  newInstances[j].position = j;
                }
                break;
              } else {
                if (newInstances[i].child.length > 0) {
                  newInstances[i].child = changeInstance(newInstances[i].child, result.over.data.current, result.active.data.current);
                }
              }
            }
            setInstances(newInstances);
          }
        });
      }
    }
  }

  //return new instance when we drop an instance between to other instance
  function changeInstance(instance, droppable, draggable) {
    for (var i = 0; i < instance.length; i++) {
      if (instance[i].id === droppable.id) {
        instance = [].concat(_toConsumableArray(instance.slice(0, droppable.position)), [draggable], _toConsumableArray(instance.slice(droppable.position)));
        for (var j = 0; j < instance.length; j++) {
          instance[j].position = j;
        }
        break;
      } else {
        if (instance[i].child.length > 0) {
          instance[i].child = changeInstance(instance[i].child, droppable, draggable);
        }
      }
    }
    return instance;
  }

  //add instance
  function addInstance(instance, draggable, droppable) {
    if (instance.id === droppable.id) {
      instance.child.unshift(draggable);
      for (var i = 0; i < instance.child.length; i++) {
        instance.child[i].position = i;
      }
    } else if (instance.child.length > 0) {
      instance.child = instance.child.map(function (child) {
        return addInstance(child, draggable, droppable);
      });
    }
    return instance;
  }

  //remove instance
  function removeInstance(instance, result) {
    if (instance.id === result.id) {
      return undefined;
    } else if (instance.child.length > 0) {
      instance.child = instance.child.map(function (child) {
        return removeInstance(child, result);
      }).filter(function (obj) {
        return obj !== undefined;
      });
    }
    return instance;
  }

  //add category to instance
  function insertObject(instance, newObject) {
    if (instance.id === newObject.parent) {
      var insertIndex = -1;
      for (var i = 0; i < instance.child.length; i++) {
        if (instance.child[i].position === newObject.position) {
          insertIndex = i;
          break;
        }
      }
      if (insertIndex !== -1) {
        instance.child.splice(insertIndex, 0, newObject);
        for (var _i3 = insertIndex + 1; _i3 < instance.child.length; _i3++) {
          instance.child[_i3].position += 1;
        }
      } else {
        instance.child.push(newObject);
      }
    } else if (instance.child.length > 0) {
      for (var _i4 = 0; _i4 < instance.child.length; _i4++) {
        insertObject(instance.child[_i4], newObject);
      }
    }
    return instance;
  }

  //get the position of the previous instance
  function getPreviousInstancePosition(instance, id) {
    if (instance.id === id) {
      return instance;
    }
    if (instance.child && instance.child.length > 0) {
      for (var i = 0; i < instance.child.length; i++) {
        var foundInstance = getPreviousInstancePosition(instance.child[i], id);
        if (foundInstance) {
          return foundInstance;
        }
      }
    }
  }

  //get instance that has been created from the category
  function getNewObject(instance, newObjectId) {
    if (instance.child.length > 0) {
      if (instance.id === newObjectId) {
        return instance;
      } else {
        for (var i = 0; i < instance.child.length; i++) {
          var result = getNewObject(instance.child[i], newObjectId);
          if (result) {
            return result;
          }
        }
      }
    } else {
      if (instance.id === newObjectId) {
        return instance;
      } else {
        return null;
      }
    }
  }
  function getNewInstance(instance, object, destinationId) {
    for (var i = 0; i < instance.length; i++) {
      if (instance[i].id === Number(destinationId)) {
        instance[i].child.unshift(object);
        var position = 0;
        for (var j = 0; j < instance[i].child.length; j++) {
          instance[i].child[j].position = position;
          position++;
        }
        return instance[i];
      } else {
        if (instance[i].child.length > 0) {
          var result = getNewInstance(instance[i].child, object, destinationId);
          if (result) {
            return result;
          }
        }
      }
    }
  }

  //user needs to maintain mouse click for 100ms to drag an object
  var sensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 10
    }
  });
  var handleMouseDown = function handleMouseDown(event) {
    event.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  var handleMouseMove = function handleMouseMove(event) {
    var newWidth = event.clientX / 2;
    if (newWidth < 90) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setWidth(newWidth);
  };
  var handleMouseUp = function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  function showAssetModal() {
    dispatch(modalSlice.actions.showAddAssetModal(true));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: width
    },
    className: "resizable"
  }, isVisible && /*#__PURE__*/React.createElement(DndContext, {
    onDragEnd: onDragEnd,
    sensors: [sensor]
  }, /*#__PURE__*/React.createElement(DropDownMenu, {
    show: showRiskAnalysis,
    onChange: onRiskAnalysisShowChange,
    name: "Risk analysis"
  }), showRiskAnalysis && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center align-items-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn button-show btn-dnd",
    onClick: function onClick() {
      return updateTree(true);
    }
  }, i18next.t("Expand all")), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("button", {
    className: "btn button-show btn-dnd",
    onClick: function onClick() {
      return updateTree(false);
    }
  }, i18next.t("Wrap all"))), /*#__PURE__*/React.createElement(InputWithIcon, {
    className: "mx-0",
    icon: "bi bi-search",
    label: i18next.t("Search an asset") + '...',
    value: searchInstancesAssets,
    onChange: onSearchInstancesAssets
  }), /*#__PURE__*/React.createElement("div", null, model !== undefined && /*#__PURE__*/React.createElement(LinkDroppable, {
    model: model
  }), /*#__PURE__*/React.createElement("ol", {
    className: "no-list-style treeview2 instances"
  }, searchInstancesAssets !== "" ? searchedInstances.map(function (instance) {
    return Number(match[9]) === instance.id ? /*#__PURE__*/React.createElement(InstanceDraggable, {
      instance: instance,
      key: instance.id,
      updateInstances: updateInstances,
      model: model,
      isActive: true
    }) : /*#__PURE__*/React.createElement(InstanceDraggable, {
      instance: instance,
      key: instance.id,
      updateInstances: updateInstances,
      model: model
    });
  }) : instances.map(function (instance) {
    return Number(match[9]) === instance.id ? /*#__PURE__*/React.createElement(InstanceDraggable, {
      instance: instance,
      key: instance.id,
      updateInstances: updateInstances,
      model: model,
      isActive: true
    }) : /*#__PURE__*/React.createElement(InstanceDraggable, {
      instance: instance,
      key: instance.id,
      updateInstances: updateInstances,
      model: model
    });
  })))), /*#__PURE__*/React.createElement(DropDownMenu, {
    show: showAssetsLibrary,
    onChange: onAssetsLibraryShowChange,
    name: "Assets library"
  }), showAssetsLibrary && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React.createElement(InputWithIcon, {
    className: "mx-0",
    icon: "bi bi-search",
    label: i18next.t("Search an asset") + '...',
    value: searchCategoriesAssets,
    onChange: onSearchCategoriesAssets
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: showAssetModal
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-plus-square-fill primary-color icon-large"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ps-2"
  }, searchCategoriesAssets === "" ? /*#__PURE__*/React.createElement(DisplayCategories, {
    categ: categories,
    updateCategories: updateCategories,
    model: model
  }) : /*#__PURE__*/React.createElement(DisplayCategories, {
    categ: searchedCategories,
    updateCategories: updateCategories,
    model: model
  })))), /*#__PURE__*/React.createElement("div", {
    className: "resizer resizer-r rg-right",
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/React.createElement("span", null)));
};
//# sourceMappingURL=AnrRiskAnalysisDragNDrop.js.map
