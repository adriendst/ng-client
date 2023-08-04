export interface Instance {
    anr: any;
    asset: any;
    assetType: number;
    child: Instance[];
    createdAt: {
        date: string;
        timezone: string;
        timezone_type: string;
    };
    creator: string;
    d: number;
    dh: number;
    disponibility: string;
    exportable: number;
    i: number;
    id: number;
    ih: number;
    instanceConsequences: string[];
    instanceMetdatas: string[];
    instanceRisks: string[];
    isShow?: boolean;
    label1: string;
    label2: string;
    label3: string;
    label4: string;
    level: number;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    object: any[];
    parent: number;
    position: number;
    root: string | null;
    scope: number;
    updatedAt: {
        date: string;
        timezone: string;
        timezone_type: string;
    };
    updater: string;
}

export interface Object {
    asset: any,
    category: any,
    disponibility: number,
    label1?: string,
    label2?: string,
    label3?: string,
    label4?: string,
    mode: number,
    name1?: string,
    name2?: string,
    name3?: string,
    name4?: string,
    position: number,
    scope: number,
    uuid: string
    risks: Risk[]
}


export interface Categorie {
    child: Categorie[];
    id: number;
    isShow?: boolean;
    label1: string;
    label2: string;
    label3: string;
    label4: string;
    objects: any[];
    position: number;
}

export interface Model {
    cacheModelIsScaleUpdatable: number;
    cacheModelShowRolfBrut: number;
    contectAnaRisk: any | null;
    contextGestRisk: any | null;
    createdAt: {
        date: string;
        timezone: string;
        timezone_type: string;
    };
    creator: string;
    description1: string;
    description2: string;
    description3: string;
    description4: string;
    evalLivrableDone: number;
    evalPlanRisks: number;
    evalRisks: number;
    id: number;
    initAnrContext: number;
    initDefContext: number;
    initEvalContext: number;
    isSnapshot: number;
    isStatsCollected: number;
    isVisibleOnDashboard: number;
    label1: string;
    label2: string;
    label3: string;
    label4: string;
    language: number;
    manageRisks: number;
    model: number;
    modelImpacts: number;
    modelLivrableDone: number;
    modelSummary: number;
    objects: any[];
    referentials: any[];
    rwd: number;
    seuil1: number;
    seuil2: number;
    seuilRolf1: number;
    seuilRolf2: number;
    seuilTraitement: number | null;
    showRolfBrut: number;
    snapshotParent: any | null;
    status: 1;
    synthAct: any | null;
    synthThreat: any | null;
    updateAt: {
        date: string;
        timezone: string;
        timezone_type: string;
    } | null;
    updater: string | null;
    uuid: string;
}


export interface Risk {
    c_risk: string,
    c_risk_enabled: number,
    comment: string,
    d_risk: string,
    d_risk_enabled: number,
    i_risk: string,
    i_risk_enabled: number,
    id: string,
    threatDescription1: string,
    threatDescription2: string,
    threatDescription3: string,
    threatDescription4: string,
    threatLabel1: string,
    threatLabel2: string,
    threatLabel3: string,
    threatLabel4: string,
    threatRate: string,
    vulnDescription1: string,
    vulnDescription2: string,
    vulnDescription3: string,
    vulnDescription4: string,
    vulnLabel1: string,
    vulnLabel2: string,
    vulnLabel3: string,
    vulnLabel4: string,
    vulnerabilityRae: string
}

export interface RolfTag {
    anr: any,
    code: string,
    createdAt: {
        date: string;
        timezone: string;
        timezone_type: string;
    },
    creator: string,
    id: number,
    label1: string,
    label2: string,
    label3: string,
    label4: string,
    risks: any,
    updatedAt: any,
    updater: any
}

export interface Asset {
    anr: any,
    code: string,
    createdAt: {
        date: string;
        timezone: string;
        timezone_type: string;
    },
    creator: string,
    description1: string,
    description2: string,
    description3: string,
    description4: string,
    label1: string,
    label2: string,
    label3: string,
    label4: string,
    mode: number,
    status: number,
    type: number,
    updatedAt: any,
    updater: any,
    uuid: string
}

export interface Options {
    value: string,
    translation: string,
    id?: number,
    position? : number,
    name? : string,
    categorie? : Categorie,
    code? : string
}


export interface categoryModal {
    categoryModalIsShow: boolean,
    categoryModalMode: undefined | string,
    categoryModalId: undefined | number
}

export interface ModalState {
    addAssetModalIsShow: boolean,
    assetImportCenterModalIsShow: boolean,
    CSVFileImportModalIsShow: boolean,
    monarcLibraryModalIsShow: boolean,
    monarcExportFileModalIsShow : boolean
    MOSPImportAssetModalIsShow: boolean,
    categoryModal: categoryModal
}

export interface Language{
    code : string,
    flag : string, 
    name : string,
    inDB : boolean,
    index : string
}

export interface RiskAnalysisState{
    model? : Model,
    categories : Options[],
    languages : Language[]
}

export interface State {
    modal: ModalState;
    riskAnalysis : RiskAnalysisState
}

export interface Client {
    contact_email: string,
    id: number,
    model_id: number,
    name: string,
    stats: boolean
    isTwoFactorAuthEnabled?: boolean,
    firstname?: string,
    lastname?: string,
    status?: number,
    email?: string
}

export interface AlertData {
    title: string,
    actionButton: string,
    text?: string,
    data?: ImportedAsset[]
  }


  export interface ImportedAsset {
    assetTypeCode: string,
    category: string,
    categoryExist: boolean,
    isValid: number
    label: string,
    name: string,
    operational_risk_tag: string,
    scope: number
  }




  export interface Payload {
    implicitPosition: number,
    scope: number,
    label1?: string,
    label2?: string,
    label3?: string,
    label4?: string,
    name1?: string,
    name2?: string,
    name3?: string,
    name4?: string,
    rolfTag?: number,
    asset?: string,
    category?: number
    mode?: number
  }

  export interface Organization {
    name: string,
    id: number;
    translation: string;
    description: string;
    is_membership_restricted: boolean;
    last_updated: string;
    organization_type: string;
  }

  export interface Object {
    description: string,
    id: number,
    json_object: any,
    last_updated: string,
    licenses: any,
    name: string,
    org_id: number,
    organization: Organization,
    schema_id: number
  }
