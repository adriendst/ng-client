import React from 'react'
import * as ReactRedux from 'react-redux'
import i18next from "ng_client/node_modules/i18next/i18next.js";

import Select from "ng_client/component/Component/Selects/Select/Select";

import { State, Options, Model, Language, Object } from "ng_client/component/interface/instanceInterface"
import CustomSelect from 'ng_client/component/Component/Selects/CustomSelect/CustomSelect';

const MOSPImportAssetModal = () => {
  
  var url = window.location.href;
  var match = url.match(/\/(\d+)\//);
  var numero = match ? match[1] : null;

  const nonFormattedToken = localStorage.getItem("ls.auth_token");
  const token = nonFormattedToken ? nonFormattedToken.replace(/"/g, "") : null;

  const headers = new Headers();
  headers.append("Accept", "application/json, text/plain, */*");
  headers.append("Content-Type", "application/json");
  headers.append("Token", token || "");

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const [organizations, setOrganizations] = React.useState<Options[]>([])
  const [selectedOrganization, setSelectedOrganization] = React.useState()

  const [assetOptions, setAssetOptions] = React.useState<Options[]>([])
  const [selectedAsset, setSelectedAsset] = React.useState('')
  const [category, setCategory] = React.useState<string>('')
  const [categoryId, setCategoryId] = React.useState<number>()

  const [assets, setAssets] = React.useState<Object[]>([])

  const [objects, setObjects] = React.useState([])


  const model: Model = ReactRedux.useSelector((state: State) => state.riskAnalysis.model)



  function onCategorySelect(event) {
    setCategory(event.target.value)
    setCategoryId(event.target.selectedOptions[0].id)
  }

  const categoriesOptions: Options[] = ReactRedux.useSelector((state: State) => state.riskAnalysis.categories)

  const languages: Language[] = ReactRedux.useSelector((state: State) => state.riskAnalysis.languages)

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    fetch(`https://objects.monarc.lu/api/v2/organization/?per_page=500`, {
      headers: headers
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error(error));


    fetch(`https://objects.monarc.lu/api/v2/object/?schema=Library%20objects&per_page=3000`, {
      headers: headers
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)

        setAssets(response.data)

        const organizations: Options[] = [];

        for (let i = 0; i < response.data.length; i++) {
          if (!organizations.find(organization => organization.id === response.data[i].organization.id)) {
            organizations.push({ id: response.data[i].organization.id, translation: response.data[i].organization.name, value: response.data[i].organization.name })
          }
        }
        setOrganizations(organizations)
      })
      .catch(error => console.error(error));

    fetch(`api/client-anr/${numero}/objects`, {
      headers: headers
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        setObjects(response.objects)
      })
      .catch((error) => {
        console.error(error);
      });

  }, [])

  function onAssetSelect(option) {
    setSelectedAsset(option.value)
  }

  function onOrganizationSelect(event) {
    setSelectedOrganization(event.target.value);
    setSelectedAsset('')
    const organizationId = organizations.find(organization => event.target.value === organization.name)
    const mosp_assets = assets.filter(
      asset => {
        return asset.organization.id == organizationId.id &&
          !objects.map(object => object.uuid).includes(asset.json_object.object.object.uuid) &&
          asset.json_object.object.object.language == languages[model.language - 1].code.toUpperCase()
      }
    );

    const displayedAssetsMapped = mosp_assets.map(asset => ({
      value: asset.name,
      translation: asset.name,
      id: asset.id,
    })) as Options[];

    setAssetOptions(displayedAssetsMapped)
    console.log(displayedAssetsMapped)
  }

  function addCategory() {
/*     props.showMOSPModal()
    props.showCategoryModal() */
  }

  const dispatch = ReactRedux.useDispatch()
  function showCategoryModal(mode, id) {
    dispatch(modalSlice.actions.showCategoryModal([true, mode, id]))
  }

  function disabledImport() {
    if (selectedOrganization === undefined || category === '' || selectedAsset === '') {
      return true
    }
    return false
  }

  function onImport() {
    console.log(selectedOrganization, selectedAsset, category)
    console.log(objects)

    const parentCategories = []


    let categ;
    if (category.includes('>>')) {
      const parts = category.split('>>');
      categ = parts[parts.length - 1].trim();
    }
    else {
      categ = category
    }

    const selectedCateg = categoriesOptions.find(categorie => categorie.categorie[`label${model.language}`] === categ)
    console.log(selectedCateg)

      const categoriesAll = [];
      const parts = selectedCateg.value.split('>>')
      console.log(parts, parts.length)
      for (let i = 0; i < parts.length; i++) {
        const label = `label${model.language}`
        const catego = []
        catego[label] = parts[i]
        console.log(catego)
        if (i === 0) {
          catego['parent'] = null
        }
        else {
          catego['parent'] = parts.length - i
        }
        categoriesAll.push(catego)
        console.log(catego)

      }
    
      console.log(categoriesAll.reverse())

  }

  console.log(organizations)

  React.useEffect(()=> {

  }, [organizations])

  console.log(organizations)

  return (
    <div className="modal-alert">
      <div className={windowWidth > 960 ? 'modal-MOSP' : 'fullscreen-modal-MOSP d-flex flex-column'}>
        <div className="d-flex justify-content-between primary-backgroundcolor">
          <h4 className="m-3">Import an asset from MOSP</h4>
          <button className="btn me-2" /* onClick={props.showMOSPModal} */ style={{ color: 'white' }}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <Select options={organizations} icon="bi bi-bank2" value={selectedOrganization} onChange={onOrganizationSelect} label="Organization" />
        {assetOptions.length > 0 && (
          <CustomSelect options={assetOptions} icon="bi bi-pin-fill" value={selectedAsset} onSelect={onAssetSelect} label="Asset" />
        )}
        <div className="d-flex">
          <div className="flex-grow-1">
            <Select icon="bi bi-bookmark-fill" options={categoriesOptions} onChange={onCategorySelect} value={category} label="Category" />
          </div>
          <i className="bi bi-plus icon-large pt-3 ps-3" onClick={() => showCategoryModal('add', 0)} />
        </div>
        <div className="d-flex justify-content-end align-items-center my-3">
          <button className="btn btn-outline-secondary" /* onClick={props.showMOSPModal} */>
            {i18next.t('Cancel')}
          </button>
          <button className="btn btn-outline-warning mx-2" disabled={disabledImport()} onClick={onImport}>
            {i18next.t('Import')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MOSPImportAssetModal