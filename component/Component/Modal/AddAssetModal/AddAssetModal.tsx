import * as ReactRedux from "react-redux";
import React from 'react'

import InputWithIcon from "ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon";
import Select from "ng_client/component/Component/Selects/Select/Select";
import CustomSelect from "ng_client/component/Component/Selects/CustomSelect/CustomSelect";
import i18next from "ng_client/node_modules/i18next/i18next.js";

import {Options, Asset, RolfTag, Model, State} from "ng_client/component/interface/instanceInterface"


const AddAssetModal = () => {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

/*     const [model, setModel] = React.useState<Model>()
 */    /* const [categoriesOptions, setCategoriesOptions] = React.useState<Options[]>() */

    var url = window.location.href;
    var match = url.match(/\/(\d+)\//);
    var numero = match ? match[1] : null;

    const nonFormattedToken = localStorage.getItem("ls.auth_token");
    const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

    let language;

    const headers = new Headers();
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    headers.append("Token", token || ""); // Utilisez la version formatée du token ou une chaîne vide

    const model : Model = ReactRedux.useSelector((state : State) => state.riskAnalysis.model)
    const categoriesOptions : Options[] = ReactRedux.useSelector((state : State) => state.riskAnalysis.categories)

    const dispatch = ReactRedux.useDispatch()
    React.useEffect(() => {

      Promise.all([model])
      .then(() => {
          fetch(`api/client-anr/${numero}/assets?filter=&order=label${model.language}`, {
            headers: headers
          })
            .then(response => response.json())
            .then(response => {
              setAssetTypeOptions(response.assets as Asset[])
            })
            .catch(error => console.error(error));


              fetch(`api/client-anr/${numero}/objects-categories`, {
                headers: headers
              })
                .then(response => response.json())
                .then(response => {
                  let categories : Options [] = []
                  for (let i = 0; i < response.categories.length; i++) {
                    if (i === 0) {
                      setCategory(response.categories[i][`label${model.language}`])
                      setCategoryId(response.categories[i].id)
                    }
                    categories.push({ value: response.categories[i][`label${model.language}`], translation: response.categories[i][`label${model.language}`], id: response.categories[i].id, name : response.categories[i][`label${model.language}`], categorie: response.categories[i] })
                    initializeCategories(categories, response.categories[i][`label${model.language}`], response.categories[i], model.language)
                  }
                  dispatch(riskAnalysisSlice.actions.setCategories(categories))
                })
                .catch(error => console.error(error));
        });


      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    function initializeCategories(categories, parentLabel, parent, language) {
      if (parent.child) {
        for (let i = 0; i < parent.child.length; i++) {
          categories.push({ value: parentLabel + ' >> ' + parent.child[i][`label${language}`], translation: parentLabel + ' >> ' + parent.child[i][`label${language}`], id: parent.child[i].id, name : parent.child[i][`label${language}`], categorie : parent.child[i] })
          initializeCategories(categories, parentLabel + ' >> ' + parent.child[i][`label${language}`], parent.child[i], language)
        }
      }
    }

    const [name, setName] = React.useState('')
    const [label, setLabel] = React.useState('')

    const [scope, setScope] = React.useState('global')

    const [assetType, setAssetType] = React.useState('')
    const [assetTypeId, setAssetTypeId] = React.useState()
    const [searchAssetType, setSearchAssetType] = React.useState('')
    const [assetTypeOptions, setAssetTypeOptions] = React.useState<Asset[]>([])
    const [searchedAssetType, setSearchedAssetType] = React.useState<Asset[]>()

    const [category, setCategory] = React.useState('')
    const [categoryId, setCategoryId] = React.useState()

    const [isRolfTag, setIsRolfTag] = React.useState(false)

    const [rolfTag, setRolfTag] = React.useState('')
    const [rolfTagId, setRolfTagId] = React.useState(0)
    const [searchRolfTag, setSearchRolfTag] = React.useState('')
    const [rolfTagOptions, setRolfTagOptions] = React.useState<RolfTag[]>([])
    const [searchedRolfTag, setSearchedRolfTag] = React.useState<RolfTag[]>()

    const scopeOptions = [
      { value: 'global', translation: 'Global' },
      { value: 'local', translation: 'Local' }
    ]

    React.useEffect(() => {
      const isAssetType = assetTypeOptions.find(option => {
        for (let i = 1; i < 5; i++) {
          if (searchAssetType === option[`label${i}`])
            return option
        }
      })

      if (isAssetType !== undefined) {
/*         if (isAssetType.type === 1) { */
          setIsRolfTag(true)
          fetch(`api/client-anr/${numero}/rolf-tags?filter=`, {
            headers: headers
          })
            .then(response => response.json())
            .then(response => {
              setRolfTagOptions(response.tags)
            })
            .catch(error => console.error(error));
/*         }
 */      }
      else {
        setIsRolfTag(false)
        setRolfTag('')
        setSearchRolfTag('')
      }
    }, [searchAssetType])

    function onNameChange(event) {
      setName(event.target.value)
    }

    function onLabelChange(event) {
      setLabel(event.target.value)
    }


    function onSearchAssetTypeChange(event) {
      let label;
      if (event.target !== undefined) {
        label = event.target.value
      }
      else {
        label = event
      }
      setSearchedAssetType(assetTypeOptions.filter(option => {
        const name = [option.label1, option.label2, option.label3, option.label4]
        for (let i = 0; i < name.length; i++) {
          if (name[i] !== null && name[i].toLowerCase().includes(label.toLowerCase())) {
            return option
          }
        }
      }))
      setSearchAssetType(label)
    }

    function onSearchRolfTagChange(event) {
      let label;
      if (event.target !== undefined) {
        label = event.target.value
      }
      else {
        label = event
      }
      setSearchedRolfTag(rolfTagOptions.filter(option => {
        const name = [option.label1, option.label2, option.label3, option.label4]
        for (let i = 0; i < name.length; i++) {
          if (name[i].toLowerCase().includes(label.toLowerCase())) {
            return option
          }
        }
      }))
      setSearchRolfTag(label)
    }


    function onAssetTypeSelect(option) {
      onSearchAssetTypeChange(option[`label${model?.language}`])
      setAssetType(option[`label${model?.language}`])
      setAssetTypeId(option.uuid)
      if (option.type === 1) {
        setScope('local')
      }
    }

    function onRolfTagSelect(option) {
      onSearchRolfTagChange(option[`label${model?.language}`])
      setRolfTag(option[`label${model?.language}`])
      setRolfTagId(option.id)
    }

    function onScopeSelect(event) {
      setScope(event.target.value)
    }

    function onCategorySelect(event) {
      console.log(event.target.selectedOptions[0].id)
      setCategory(event.target.value)
      setCategoryId(event.target.selectedOptions[0].id)
    }

    function onValidation() {
      console.log(language)
      const payload = { asset: assetTypeId, category: categoryId, implicitPosition: 2, label1: model?.language === 1 ? label : '', label2: model?.language === 2 ? label : '', label3: model?.language === 3 ? label : '', label4: model?.language === 4 ? label : '', mode: 0, name1: model?.language === 1 ? name : '', name2: model?.language === 2 ? name : '', name3: model?.language === 3 ? name : '', name4: model?.language === 4 ? name : '', previous: null, rolfTag: rolfTag === '' ? null : rolfTagId, scope: scope === 'global' ? 2 : 1 }
      fetch(`api/client-anr/${numero}/objects`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      })

        .then(response => {

        })
        .catch(error => console.error(error));
    }

    function onCreate() {
      onValidation()
/*       props.showAssetModal()
 */    }

    function onCreateAndContinue() {
      onValidation()
/*       props.showAssetModal()
      props.showAssetModal() */
    }


    function disabledCreate() {
      if (name === '' || label === '' || assetType === '') {
        return true
      }
      else { return false }
    }

    function onRolfTagClear() {
      setSearchRolfTag('')
      setRolfTag('')
      setRolfTagId(0)
    }


    function closeAssetModal() {
      dispatch(modalSlice.actions.showAddAssetModal(false))
    }

    function showCategoryModal(mode, id) {
      dispatch(modalSlice.actions.showCategoryModal([true, mode, id]))
      closeAssetModal()
    }

    function showAssetImportCenterModal() {
      dispatch(modalSlice.actions.showAssetImportCenterModal(true))
      closeAssetModal()
    }

    function showMOSPImportAssetModal() {
      dispatch(modalSlice.actions.showMOSPImportAssetModal(true))
      closeAssetModal()
    }


    return (
      <div className="modal-alert">
        <div className={`${windowWidth > 900 ? 'modal-asset' : 'tiny-modal-asset'} d-flex flex-column`}>
          <div className="d-flex justify-content-between primary-backgroundcolor">
            <h4 className="m-3">{i18next.t("Add an asset")}</h4>
            <button className="btn me-2" onClick={closeAssetModal} style={{ color: 'white' }}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="px-3">
            <div className="import-asset-card d-flex justify-content-evenly m-3">
              <button className="btn button-show m-1" onClick={showAssetImportCenterModal}>
                <i className="bi bi-download pe-3"></i>
                <span>{i18next.t("Asset import center")}</span>
              </button>
              <button className="btn button-show m-1" onClick={showMOSPImportAssetModal}>
                <i className="bi bi-cloud-arrow-down pe-3"></i>
                <span>{i18next.t("Import from MOSP")}</span>
              </button>
            </div>
            <div style={{ backgroundColor: 'rgb(250,250,250)', color: 'rgba(0,0,0,0.54)' }} className="m-2 p-2">
              <span className="m-2">{i18next.t("Label and descriptions")}</span>
            </div>
            <InputWithIcon icon="bi bi-caret-right-fill" hasToBeFilled={true} label="Name" value={name} onChange={onNameChange} title={i18next.t('Please fill out this field.')} />
            <InputWithIcon icon="bi bi-caret-right-fill" hasToBeFilled={true} label="Label" value={label} onChange={onLabelChange} title={i18next.t('Please fill out this field.')} />
            <div style={{ backgroundColor: 'rgb(250,250,250)', color: 'rgba(0,0,0,0.54)' }} className="m-2 p-2">
              <span className="m-2">{i18next.t("General information")}</span>
            </div>
            <Select icon="bi bi-list-task" options={scopeOptions} onChange={onScopeSelect} value={scope} label="Scope" />
            <CustomSelect icon="bi bi-bookmark-fill" label="Asset Type" value={searchAssetType} onChange={onSearchAssetTypeChange} options={searchAssetType === '' ? assetTypeOptions : searchedAssetType} onSelect={onAssetTypeSelect} language={model?.language} />
            <div className="d-flex">
              <div className="flex-grow-1">
                <Select icon="bi bi-bookmark-fill" options={categoriesOptions} onChange={onCategorySelect} value={category} label="Category" />
              </div>
              <i className="bi bi-pencil-fill icon-large pt-3 ps-3" onClick={() => showCategoryModal('edit', categoryId)}></i>
              <i className="bi bi-plus icon-large pt-3 ps-3" onClick={() => showCategoryModal('add', 0)}></i>
            </div>
            {isRolfTag && (
              <CustomSelect
                isClearable={true}
                icon="bi bi-bookmark-fill"
                value={searchRolfTag}
                onChange={onSearchRolfTagChange}
                label="Operationnal risk Tag"
                options={searchRolfTag === '' ? rolfTagOptions : searchedRolfTag}
                onSelect={onRolfTagSelect}
                language={model?.language}
                onClear={onRolfTagClear}
              />
            )}
            <div className="d-flex justify-content-end align-items-center my-3">
              <button className="btn btn-outline-secondary" onClick={closeAssetModal}>
                {i18next.t('Cancel')}
              </button>
              <button className="btn btn-outline-warning mx-2" disabled={disabledCreate()} onClick={onCreate}>
                {i18next.t('Create')}
              </button>
              <button className="btn btn-outline-warning me-2" disabled={disabledCreate()} onClick={onCreateAndContinue}>
                {i18next.t('Create and continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default AddAssetModal