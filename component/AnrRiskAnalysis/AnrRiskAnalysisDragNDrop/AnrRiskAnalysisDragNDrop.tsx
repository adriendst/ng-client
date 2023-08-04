import React from "react";
import i18next from "ng_client/node_modules/i18next/i18next.js";
import {
    useSensor,
    PointerSensor,
    DndContext,
} from "ng_client/node_modules/@dnd-kit/core/dist/core.cjs.development.js";
import DropDownMenu from "ng_client/component/Component/DropDownMenu//DropDownMenu";
import InputWithIcon from "ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon";
import LinkDroppable from "ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/LinkDroppable/LinkDroppable";
import InstanceDraggable from "ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InstanceDraggable/InstanceDraggable";
import DisplayCategories from "ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/DisplayCategories/DisplayCategories";

import modalSlice from "ng_client/Slices/modalSlice";
import riskAnalysisSlice from "ng_client/Slices/riskAnalysisSlice";

import * as ReactRedux from "react-redux";

import { Instance, Categorie, Model, State } from "ng_client/component/interface/instanceInterface"

/* import {displayPlaylistModal} from 'ng_client/Slices/monarcSlice'
 */
const AnrRiskAnalysisDragNDrop = () => {


    const [showRiskAnalysis, setShowRiskAnalysis] = React.useState(true);
    const [showAssetsLibrary, setShowAssetsLibrary] = React.useState(true);

    const [searchCategoriesAssets, setSearchCategoriesAssets] = React.useState("");
    const [searchedCategories, setSearchedCategories] = React.useState<Categorie[]>([]);

    const [searchInstancesAssets, setSearchInstancesAssets] = React.useState("");
    const [searchedInstances, setSearchedInstances] = React.useState<Instance[]>([]);

    const [categories, setCategories] = React.useState<Categorie[]>([]);
    const [instances, setInstances] = React.useState<Instance[]>([]);

    /*     const [model, setModel] = React.useState<Model>();
     */
    const [width, setWidth] = React.useState(260);
    const [isVisible, setIsVisible] = React.useState(true);

    var url = window.location.href;
    var match = url.split('/');
    var numero = match ? match[6] : null;

    const nonFormattedToken = localStorage.getItem("ls.auth_token");
    const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

    const headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    headers.append("Token", token || ""); // Utilisez la version formatée du token ou une chaîne vide

    const model: Model = ReactRedux.useSelector((state: State) => state.riskAnalysis.model)

    const dispatch = ReactRedux.useDispatch()

    React.useEffect(() => {
        if (model === undefined) {
            fetch(`api/client-anr/${numero}`, {
                headers: headers,
            })
                .then((response) => response.json())
                .then((response) => {
                    dispatch(riskAnalysisSlice.actions.setModel(response))
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetch(`api/client-anr/${numero}/instances`, {
            headers: headers,
        })
            .then((response) => response.json())
            .then((response) => {
                const updatedInstances = addPropertyToChildren(response.instances);
                setInstances(updatedInstances);
            })
            .catch((error) => {
                console.error(error);
            });


        fetch(`api/client-anr/${numero}/library`, {
            headers: headers,
        })
            .then((response) => response.json())
            .then((response) => {
                let index = 0;

/*                 console.log(response)
 */                initizaliseCategories(response.categories, index);

                setCategories(response.categories);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function initizaliseCategories(categories, index) {
        categories.forEach((category) => {
            category.isShow = false;

            if (category.objects.length > 0) {
                category.objects.forEach((object) => {
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
        return parent.map((child) => {
            if (child.child.length > 0) {
                const updatedChild = addPropertyToChildren(child.child);
                return { ...child, isShow: false, child: updatedChild };
            } else {
                return child;
            }
        });
    }

    //set isShow of instance to true or false
    function updateInstances(id) {
        const updatedInstances = instances.map((instance) => {
            if (instance.id === id) {
                return { ...instance, isShow: !instance.isShow };
            } else if (instance.child && instance.child.length > 0) {
                const updatedChild = updateChildInstances(instance.child, id);
                return { ...instance, child: updatedChild };
            }
            return instance;
        });
        setInstances(updatedInstances);
    }

    function updateChildInstances(children, id) {
        return children.map((child) => {
            if (child.id === id) {
                return { ...child, isShow: !child.isShow };
            } else if (child.child && child.child.length > 0) {
                const updatedChild = updateChildInstances(child.child, id);
                return { ...child, child: updatedChild };
            }
            return child;
        });
    }

    function expandAll(instances, way) {
        let instancesUpdated = instances.map((instance) => {
            if (instance.child && instance.child.length > 0) {
                instance.child = expandAll(instance.child, way);
                return { ...instance, isShow: way };
            } else {
                return instance;
            }
        });
        return instancesUpdated;
    }

    //expand or wrap tree of instances
    function updateTree(way) {
        let updatedInstances = expandAll(instances, way);
        setInstances(updatedInstances);
    }

    //set isShow of category to true or false
    function updateCategories(id) {
        const updatedCategories = categories.map((categorie) => {
            if (categorie.id === id) {
                return { ...categorie, isShow: !categorie.isShow };
            } else if (categorie.child && categorie.child.length > 0) {
                const updatedChild = updateChildCategories(categorie.child, id);
                return { ...categorie, child: updatedChild };
            }
            return categorie;
        });

        setCategories(updatedCategories);
    }

    function updateChildCategories(children, id) {
        return children.map((child) => {
            if (child.id === id) {
                return { ...child, isShow: !child.isShow };
            } else if (child.child && child.child.length > 0) {
                const updatedChild = updateChildCategories(child.child, id);
                return { ...child, child: updatedChild };
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

    function searchCategories(categ: Categorie[], event: string) {
        return categ.map((categorie) => {
            if (categorie.child) {
                if (categorie.objects) {
                    let objects: Categorie[] = [];
                    categorie.objects.map((object: Categorie) => {
                        if (
                            object[`name${model?.language}`]
                                .toLowerCase()
                                .includes(event.toLowerCase())
                        ) {
                            objects.push(object);
                        }
                    });
                    return {
                        ...categorie,
                        objects: objects,
                        child: searchCategories(categorie.child, event),
                        isShow: true,
                    };
                }
                return {
                    ...categorie,
                    child: searchCategories(categorie.child, event),
                    isShow: true,
                };
            }
            if (categorie.objects) {
                let objects: Categorie[] = [];
                categorie.objects.map((object) => {
                    if (
                        object[`name${model?.language}`]
                            .toLowerCase()
                            .includes(event.toLowerCase())
                    ) {
                        objects.push(object);
                    }
                });
                return { ...categorie, objects: objects, isShow: true };
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
        return inst
            .map((instance) => {
                if (instance.child.length > 0) {
                    return {
                        ...instance,
                        child: searchInstances(instance.child, event),
                        isShow: true,
                    };
                } else if (instance.parent === 0) {
                    return instance;
                } else {
                    if (
                        instance[`name${model?.language}`]
                            .toLowerCase()
                            .includes(event.toLowerCase())
                    ) {
                        return instance;
                    }
                }
            })
            .filter((obj) => obj !== undefined);
    }

    //when something is drop this function is called
    function onDragEnd(result) {
        const headers = {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Token: token,
        };

        //the object is drop on project name
        if (result.over.id === "link") {
            let link;
            let body;
            let method;

            if (typeof result.active.id === "string") {
                //a category is drop
                link = `api/client-anr/${numero}/instances`;
                body = JSON.stringify({
                    anrId: Number(numero),
                    object: result.active.id,
                    parent: 0,
                    position: 0,
                });
                method = "POST";
            } else {
                //an instance is drop
                link = `api/client-anr/${numero}/instances/${result.active.id}`;
                body = JSON.stringify({
                    anrId: Number(numero),
                    instId: result.active.id,
                    parent: 0,
                    position: 0,
                });
                method = "PATCH";
            }

            fetch(link, {
                method: method,
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Token: token || "",
                },
                body: body,
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status === "ok") {
                        if (response.id) {
                            //case where we dragged and dropped a category
                            const id = response.id;
                            fetch(`api/client-anr/${numero}/instances`, {
                                //we retrieve the new instance that has been created from the category
                                headers: {
                                    Accept: "application/json, text/plain, */*",
                                    "Content-Type": "application/json",
                                    Token: token || "",
                                },
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    const newObject = response.instances
                                        .map((instance) => {
                                            return getNewObject(instance, id);
                                        })
                                        .filter(
                                            (obj) => obj !== undefined && obj !== null
                                        );

                                    let newInstances = [...instances];
                                    newInstances.unshift({ ...newObject[0] });

                                    for (let i = 0; i < newInstances.length; i++) {
                                        newInstances[i].position = i + 1;
                                    }

                                    setInstances(newInstances);
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            let newInstances = instances.filter(
                                (obj) => obj !== result.active.data.current
                            );
                            newInstances.unshift(result.active.data.current);

                            for (let i = 0; i < newInstances.length; i++) {
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
                fetch(`api/client-anr/${numero}/instances`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        Token: token || "",
                    },
                    body: JSON.stringify({
                        anrId: Number(numero),
                        object: result.active.id,
                        parent: Number(result.over.id.slice(2)),
                        position: 0,
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        const id = response.id;

                        if (response.status === "ok") {
                            fetch(`api/client-anr/${numero}/instances`, {
                                headers: {
                                    Accept: "application/json, text/plain, */*",
                                    "Content-Type": "application/json",
                                    Token: token || "",
                                },
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    const newObject = response.instances
                                        .map((instance) => {
                                            return getNewObject(instance, id);
                                        })
                                        .filter(
                                            (obj) => obj !== undefined && obj !== null
                                        );

                                    const newInstance = getNewInstance(
                                        instances,
                                        newObject[0],
                                        result.over.id.slice(2)
                                    );

                                    const newInstances = instances.map((instance) => {
                                        return instance.id === newInstance.id
                                            ? newInstance
                                            : instance;
                                    });

                                    setInstances(newInstances);
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    })
                    .catch((error) => console.error(error));
            } else {
                //case where we drop an instance on an other instance
                fetch(`api/client-anr/${numero}/instances/${result.active.id}`, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        Token: token || "",
                    },
                    body: JSON.stringify({
                        anrId: Number(numero),
                        instId: result.active.id,
                        parent: Number(result.over.data.current.id),
                        position: 0,
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status === "ok") {
                            let newInstances = instances
                                .map((instance) => {
                                    return removeInstance(
                                        instance,
                                        result.active.data.current
                                    );
                                })
                                .filter((obj) => obj !== undefined);

                            newInstances = newInstances.map((instance) => {
                                return addInstance(
                                    instance,
                                    result.active.data.current,
                                    result.over.data.current
                                );
                            });

                            setInstances(newInstances);
                        }
                    });
            }
        } else if (result.over.id.slice(0, 7) === "between") {
            // case where we drop an object beetween two instances
            if (typeof result.active.id === "string") {
                // case where we drop a category
                const previousInstancePosition = instances
                    .map((instance) => {
                        return getPreviousInstancePosition(
                            instance,
                            Number(result.over.id.slice(7))
                        );
                    })
                    .filter((obj) => obj !== undefined);

                fetch(`api/client-anr/${numero}/instances`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        Token: token || "",
                    },
                    body: JSON.stringify({
                        anrId: Number(numero),
                        object: result.active.id,
                        parent: previousInstancePosition[0].parent,
                        position: Number(previousInstancePosition[0].position),
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        const id = response.id;

                        if (response.status === "ok") {
                            fetch(`api/client-anr/${numero}/instances`, {
                                headers: {
                                    Accept: "application/json, text/plain, */*",
                                    "Content-Type": "application/json",
                                    Token: token || "",
                                },
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    const newObject = response.instances
                                        .map((instance) => {
                                            return getNewObject(instance, id);
                                        })
                                        .filter(
                                            (obj) => obj !== undefined && obj !== null
                                        );

                                    if (newObject[0].parent === 0) {
                                        const updatedInstances = [...instances];
                                        let insertIndex = -1;

                                        for (
                                            let i = 0;
                                            i < updatedInstances.length;
                                            i++
                                        ) {
                                            if (
                                                updatedInstances[i].position ===
                                                newObject[0].position
                                            ) {
                                                insertIndex = i;
                                                break;
                                            }
                                        }

                                        if (insertIndex !== -1) {
                                            updatedInstances.splice(
                                                insertIndex,
                                                0,
                                                newObject[0]
                                            );

                                            for (
                                                let i = insertIndex + 1;
                                                i < updatedInstances.length;
                                                i++
                                            ) {
                                                updatedInstances[i].position += 1;
                                            }
                                        } else {
                                            updatedInstances.push(newObject[0]);
                                        }

                                        setInstances(updatedInstances);
                                    } else {
                                        const newInstances = instances
                                            .map((instance) => {
                                                return insertObject(
                                                    instance,
                                                    newObject[0]
                                                );
                                            })
                                            .filter((obj) => obj !== undefined);

                                        setInstances(newInstances);
                                    }
                                });
                        }
                    });
            } else {
                // case where we drop an instance
                fetch(`api/client-anr/${numero}/instances/${result.active.id}`, {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        Token: token || "",
                    },
                    body: JSON.stringify({
                        anrId: Number(numero),
                        instId: result.active.id,
                        parent: Number(result.over.data.current.parent),
                        position: result.over.data.current.position,
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status === "ok") {
                            let newInstances = instances
                                .map((instance) => {
                                    return removeInstance(
                                        instance,
                                        result.active.data.current
                                    );
                                })
                                .filter((obj) => obj !== undefined);

                            for (let i = 0; i < newInstances.length; i++) {
                                if (
                                    newInstances[i].id === result.over.data.current.id
                                ) {
                                    newInstances = [
                                        ...newInstances.slice(
                                            0,
                                            result.over.data.current.position
                                        ),
                                        result.active.data.current,
                                        ...newInstances.slice(
                                            result.over.data.current.position
                                        ),
                                    ];

                                    for (let j = 0; j < newInstances.length; j++) {
                                        newInstances[j].position = j;
                                    }

                                    break;
                                } else {
                                    if (newInstances[i].child.length > 0) {
                                        newInstances[i].child = changeInstance(
                                            newInstances[i].child,
                                            result.over.data.current,
                                            result.active.data.current
                                        );
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
        for (let i = 0; i < instance.length; i++) {
            if (instance[i].id === droppable.id) {
                instance = [
                    ...instance.slice(0, droppable.position),
                    draggable,
                    ...instance.slice(droppable.position),
                ];
                for (let j = 0; j < instance.length; j++) {
                    instance[j].position = j;
                }
                break;
            } else {
                if (instance[i].child.length > 0) {
                    instance[i].child = changeInstance(
                        instance[i].child,
                        droppable,
                        draggable
                    );
                }
            }
        }
        return instance;
    }

    //add instance
    function addInstance(instance, draggable, droppable) {
        if (instance.id === droppable.id) {
            instance.child.unshift(draggable);
            for (let i = 0; i < instance.child.length; i++) {
                instance.child[i].position = i;
            }
        } else if (instance.child.length > 0) {
            instance.child = instance.child.map((child) =>
                addInstance(child, draggable, droppable)
            );
        }
        return instance;
    }

    //remove instance
    function removeInstance(instance, result) {
        if (instance.id === result.id) {
            return undefined;
        } else if (instance.child.length > 0) {
            instance.child = instance.child
                .map((child) => removeInstance(child, result))
                .filter((obj) => obj !== undefined);
        }
        return instance;
    }

    //add category to instance
    function insertObject(instance, newObject) {
        if (instance.id === newObject.parent) {
            let insertIndex = -1;
            for (let i = 0; i < instance.child.length; i++) {
                if (instance.child[i].position === newObject.position) {
                    insertIndex = i;
                    break;
                }
            }
            if (insertIndex !== -1) {
                instance.child.splice(insertIndex, 0, newObject);

                for (let i = insertIndex + 1; i < instance.child.length; i++) {
                    instance.child[i].position += 1;
                }
            } else {
                instance.child.push(newObject);
            }
        } else if (instance.child.length > 0) {
            for (let i = 0; i < instance.child.length; i++) {
                insertObject(instance.child[i], newObject);
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
            for (let i = 0; i < instance.child.length; i++) {
                const foundInstance = getPreviousInstancePosition(
                    instance.child[i],
                    id
                );
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
                for (let i = 0; i < instance.child.length; i++) {
                    const result = getNewObject(instance.child[i], newObjectId);
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
        for (let i = 0; i < instance.length; i++) {
            if (instance[i].id === Number(destinationId)) {
                instance[i].child.unshift(object);
                let position = 0;
                for (let j = 0; j < instance[i].child.length; j++) {
                    instance[i].child[j].position = position;
                    position++;
                }
                return instance[i];
            } else {
                if (instance[i].child.length > 0) {
                    const result = getNewInstance(
                        instance[i].child,
                        object,
                        destinationId
                    );
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }

    //user needs to maintain mouse click for 100ms to drag an object
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            delay: 100,
            tolerance: 10,
        },
    });

    const handleMouseDown = (event) => {
        event.preventDefault();
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
        const newWidth = event.clientX / 2;
        if (newWidth < 90) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setWidth(newWidth);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };



    function showAssetModal() {
        dispatch(modalSlice.actions.showAddAssetModal(true))
    }
    return (
        <div style={{ width: width }} className="resizable">
            {isVisible && (
                <DndContext onDragEnd={onDragEnd} sensors={[sensor]}>
                    <DropDownMenu
                        show={showRiskAnalysis}
                        onChange={onRiskAnalysisShowChange}
                        name='Risk analysis'
                    />
                    {showRiskAnalysis && (
                        <div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button
                                    className="btn button-show btn-dnd"
                                    onClick={() => updateTree(true)}
                                >
                                    {i18next.t("Expand all")}
                                </button>
                                <span>/</span>
                                <button
                                    className="btn button-show btn-dnd"
                                    onClick={() => updateTree(false)}
                                >
                                    {i18next.t("Wrap all")}
                                </button>
                            </div>
                            <InputWithIcon
                                className="mx-0"
                                icon="bi bi-search"
                                label={i18next.t("Search an asset") + '...'}
                                value={searchInstancesAssets}
                                onChange={onSearchInstancesAssets}
                            />
                            <div>
                                {model !== undefined && <LinkDroppable model={model} />}
                                <ol className="no-list-style treeview2 instances">
                                    {searchInstancesAssets !== ""
                                        ? searchedInstances.map((instance) => (
                                            Number(match[9]) === instance.id ?
                                                <InstanceDraggable
                                                    instance={instance}
                                                    key={instance.id}
                                                    updateInstances={updateInstances}
                                                    model={model}
                                                    isActive={true}
                                                />
                                                :
                                                <InstanceDraggable
                                                    instance={instance}
                                                    key={instance.id}
                                                    updateInstances={updateInstances}
                                                    model={model}
                                                />
                                        ))
                                        : instances.map((instance) => (
                                            Number(match[9]) === instance.id ?
                                            <InstanceDraggable
                                                instance={instance}
                                                key={instance.id}
                                                updateInstances={updateInstances}
                                                model={model}
                                                isActive={true}
                                            />
                                            :
                                            <InstanceDraggable
                                                instance={instance}
                                                key={instance.id}
                                                updateInstances={updateInstances}
                                                model={model}
                                            />
                                        ))}
                                </ol>
                            </div>
                        </div>
                    )}
                    <DropDownMenu
                        show={showAssetsLibrary}
                        onChange={onAssetsLibraryShowChange}
                        name="Assets library"
                    />
                    {showAssetsLibrary && (
                        <div>
                            <div className="d-flex">
                                <InputWithIcon
                                    className="mx-0"
                                    icon="bi bi-search"
                                    label={i18next.t("Search an asset") + '...'}
                                    value={searchCategoriesAssets}
                                    onChange={onSearchCategoriesAssets}
                                />
                                <button className="btn" onClick={showAssetModal}>
                                    <i className="bi bi-plus-square-fill primary-color icon-large" />
                                </button>
                            </div>
                            <div className="ps-2">
                                {searchCategoriesAssets === "" ? (
                                    <DisplayCategories
                                        categ={categories}
                                        updateCategories={updateCategories}
                                        model={model}
                                    />
                                ) : (
                                    <DisplayCategories
                                        categ={searchedCategories}
                                        updateCategories={updateCategories}
                                        model={model}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </DndContext>
            )}
            <div className="resizer resizer-r rg-right" onMouseDown={handleMouseDown}>
                <span />
            </div>
        </div>
    );
};

export default AnrRiskAnalysisDragNDrop;
