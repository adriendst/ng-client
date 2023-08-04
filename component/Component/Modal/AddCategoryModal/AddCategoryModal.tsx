import * as ReactRedux from 'react-redux'
import React from 'react'
import i18next from "ng_client/node_modules/i18next/i18next.js";

import InputWithIcon from "ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon";
import Select from "ng_client/component/Component/Selects/Select/Select";

import { State, Model, Options, categoryModal } from "ng_client/component/interface/instanceInterface"

const AddCategoryModal = () => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [label, setLabel] = React.useState('')

    const [parentCategory, setParentCategory] = React.useState('')
    const [parentCategoryId, setParentCategoryId] = React.useState<number>()

    const [previousCategory, setPreviousCategory] = React.useState('')
    const [previousCategoryPosition, setPreviousCategoryPosition] = React.useState(null)
    const [previousCategoryId, setPreviousCategoryId] = React.useState(0)

    const [location, setLocation] = React.useState(2)
    /*     const [model, setModel] = React.useState<Model>()
     */
    const [parentCategoriesOptions, setParentCategoriesOptions] = React.useState<Options[]>([])
    const [previousCategoriesOptions, setPreviousCategoriesOptions] = React.useState<Options[]>([])

    const [currentCategoryId, setCurrentCategoryId] = React.useState(0)

    var url = window.location.href;
    var match = url.match(/\/(\d+)\//);
    var numero = match ? match[1] : null;

    const nonFormattedToken = localStorage.getItem("ls.auth_token");
    const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

    const headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    headers.append("Token", token || ""); // Utilisez la version formatée du token ou une chaîne vide

    const categoryModal = ReactRedux.useSelector((state: State) => state.modal.categoryModal);
    console.log(categoryModal)


    const model: Model = ReactRedux.useSelector((state: State) => state.riskAnalysis.model)
    const categoriesOptions: Options[] = ReactRedux.useSelector((state: State) => state.riskAnalysis.categories)

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        Promise.all([model])
            .then(() => {
                let categories = { value: 'Root (none)', translation: 'Root (none)', id: 0 }
                setParentCategory(categories.value)
                setParentCategoryId(categories.id)

                const optionsCopy = Array.from(categoriesOptions);
                optionsCopy.unshift(categories);
                setParentCategoriesOptions(optionsCopy);


                if (categoryModal.categoryModalMode === 'edit') {
                    fetch(`api/client-anr/${numero}/objects-categories/${categoryModal.categoryModalId}`, {
                        headers: headers
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                            setCurrentCategoryId(response.id)
                            setLabel(response[`label${model.language}`])
                            setParentCategory(response.parent[`label${model.language}`])
                            setParentCategoryId(response.parent.id)
                            setLocation(response.implicitPosition)
                            setPreviousCategoryId(response.previous)
                        })
                        .catch(error => console.error(error));
                }
            });
    }, [categoryModal])

    React.useEffect(() => {
        if (location === 3) {
            fetch(`api/client-anr/${numero}/objects-categories?lock=true&parentId=${parentCategoryId}`, {
                headers: headers
            })
                .then(response => response.json())
                .then(response => {
                    let categories: Options[] = []
                    for (let i = 0; i < response.categories.length; i++) {
                        categories.push({ value: response.categories[i][`label${model.language}`], id: response.categories[i].id, translation: response.categories[i][`label${model.language}`], position: response.categories[i].position })
                    }
                    setPreviousCategoriesOptions(categories)
                    if (categoryModal.categoryModalMode === 'edit') {
                        console.log(categories)
                        console.log(previousCategoryId)
                        const previousCateg = categories.find(category => category.id === previousCategoryId)
                        console.log(previousCateg)
                        if (previousCateg !== undefined) {
                            setPreviousCategory(previousCateg.translation)
                        }
                    }
                })
                .catch(error => console.error(error));
        }
    }, [parentCategory, location])

    function onLabelChange(event) {
        setLabel(event.target.value)
    }

    function onParentCategorySelect(event) {
        setParentCategory(event.target.value)
        setParentCategoryId(event.target.selectedOptions[0].id)
    }

    function onLocationSelect(event) {
        setLocation(Number(event.target.value))
    }

    function onPreviousCategorySelect(event) {
        console.log(event.target.selectedOptions[0].id)
        setPreviousCategory(event.target.value)
        setPreviousCategoryPosition(event.target.selectedOptions[0].attributes.position.value)
        setPreviousCategoryId(event.target.selectedOptions[0].id)
    }

    function disabledCreate() {
        if (label === '') {
            return true
        }
        else { return false }
    }

    function onCreate() {
        const payload: {
            implicitPosition: number;
            label1: string;
            label2: string;
            label3: string;
            label4: string;
            parent?: number;
            path?: string;
            previous?: number;
        } = {
            implicitPosition: location,
            label1: model?.language === 1 ? label : '',
            label2: model?.language === 2 ? label : '',
            label3: model?.language === 3 ? label : '',
            label4: model?.language === 4 ? label : '',
        }; if (parentCategoryId !== 0) {
            payload.parent = parentCategoryId
            payload.path = parentCategory
        }
        if (location === 3) {
            console.log(previousCategory)
            if (previousCategory !== null) {
                payload.previous = Number(previousCategoryId)
            }
        }

        console.log(payload)

        fetch(`api/client-anr/${numero}/objects-categories${categoryModal.categoryModalMode === 'edit' && `/${currentCategoryId}`}`, {
            method: `${categoryModal.categoryModalMode === 'edit' ? 'PUT' : 'POST'}`,
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(error => console.error(error));

        closeCategoryModal()
    }

    function onDelete() {
        fetch(`api/client-anr/${numero}/objects-categories/${currentCategoryId}`, {
            method: 'DELETE',
            headers: headers
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(error => console.error(error));

        closeCategoryModal()

    }

    /*     function onClose() {
          props.showCategoryModal()
          props.showAssetModal()
        } */

    const dispatch = ReactRedux.useDispatch()

    function closeCategoryModal() {
        dispatch(modalSlice.actions.showAddAssetModal(true))
        dispatch(modalSlice.actions.showCategoryModal([false]))
    }

    /*     console.log(location)
        console.log(previousCategory)
        console.log(previousCategoriesOptions) */

    const locationOptions = [{ value: 2, translation: i18next.t('in the end') }, { value: 1, translation: 'at the beginning' }, { value: 3, translation: 'after...' }]
    return (
        <div className="modal-alert">
            <div className={`${windowWidth > 900 ? 'modal-category' : 'tiny-modal-category'} d-flex flex-column`}>
                <div className="d-flex justify-content-between primary-backgroundcolor">
                    <h4 className="m-3">{categoryModal.categoryModalMode === 'edit' ? i18next.t('Edit category') : i18next.t('Add a category')}</h4>
                    <button className="btn me-2" onClick={closeCategoryModal} style={{ color: 'white' }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className='m-2'>
                    <InputWithIcon label="Label" value={label} onChange={onLabelChange} icon="bi bi-caret-right-fill" hasToBeFilled={true} title="Please fill out this field." />
                    <Select icon="bi bi-bookmark-fill" options={parentCategoriesOptions} onChange={onParentCategorySelect} value={parentCategory} label="Parent category" />
                    <Select icon="bi bi-list-task" options={locationOptions} onChange={onLocationSelect} value={location} label="Location" />
                    {location === 3 && <Select icon="bi bi-bookmark-fill" options={previousCategoriesOptions} onChange={onPreviousCategorySelect} value={previousCategory} label="Previous category" />}
                </div>
                <div className="d-flex justify-content-end align-items-center my-3">
                    {categoryModal.categoryModalMode === 'edit' && <button className="btn btn-outline-danger me-2" onClick={onDelete}>Delete</button>}
                    <button className="btn btn-outline-secondary" onClick={closeCategoryModal}>Cancel</button>
                    <button className="btn btn-outline-warning mx-2" disabled={disabledCreate()} onClick={onCreate}>{categoryModal.categoryModalMode === 'edit' ? 'Save' : 'Create'}</button>
                </div>
            </div>
        </div>
    );
}

export default AddCategoryModal