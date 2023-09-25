export interface IRiskProfileDataRequest {
    cifNumber: string,
    custName: string,
    custIdType: string,
    custIdNo: string,
    custIdIssue: string
}

export interface IRiskProfileDataResponse {
    riskProfileStatus: string,
    rpResults: string,
    riskProfile: string,
    rpTnC: string,
    riskProfileDescription: string,
    expectedReturn: number,
    standardDeviation: number,
    lastUpdatedDate: string,
    expiryDate: string,
    rmManagerName: string,
    rmManagerId: string,
    riskDescription: string,
    potentialLosses: string,
    potentialReturn: string,
    riskTolerance: string,
    riskToleranceDescription: string,
    RPQuestionaire: RPQuestionaire
}

export interface RPQuestionaire {
    disclaimer:string,
    PART: string,
    jsonFinal: JsonFinal[]
}

export interface JsonFinal {
    multiSelect: string,
    isCeiling: string,
    computationType: string,
    version: number,
    question_no: number,
    question_desc: string,
    questionnaire_code: string,
    valid_period: number,
    is_scoring: string,
    Mandatory: string,
    additional: string,
    previous_answer_selected: number[],
    answer_options: AnswerOption[]
}

export interface AnswerOption {
    weightage: number,
    answer_no: number,
    answer_desc: string,
    ISCEILING: string,
    CEILINGVALUE: string,
    VULNERABLE: string
}

export interface RPQuestionnaireRequest {
    cifNumber?: string;
    transactionId?: string;
    isEdit?: boolean;
}

export interface RPQuestionnaireResponse {
    ExpectedReturn: number
    ExpiryDate: string,
    LastUpdateDate: string,
    RMId: string,
    RMName: string,
    RPClass: string,
    RPDesc: string,
    RPQuestionaire: {
        PART: string,
        disclaimer: string,
        jsonFinal: RPQ[]
    }
}

export interface RPQ {
    additional?: string,
    answer_options: AnswerOption[],
    previous_answer_selected: number[],
    question_no: number,
    question_desc: string
}

export interface RPQTnxReq {
    trxId?: number
    rmId: string,
    sibsCif: string,
    requestUid : string,
    rpqQuestionAnswerDetail: RPQuestionnaireDetail[];
}

export interface RPQuestionnaireDetail {
    questionNumber: number;
    multiSelect: string;
    options: number[];
}

export interface RPQTnxResponse {
    status: number;
    message: string;
    transactionReferenceId: string;
    trxId: number;
}

export interface CustomerStatusResponse{
    rpqApprovalStatus: string,
    inSanctionCountry: string
}

export interface CustomerStatusPayload {
    cif: string
}
