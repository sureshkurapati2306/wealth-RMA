import { IRiskProfileDataResponse, IRiskProfileDataRequest } from "../models/risk-inquiry-detail.model"

export const MockIRiskProfileDataResponse: IRiskProfileDataResponse = {
    "riskProfileStatus": "VALID",
    "rpResults": "-",
    "riskProfile": "Balanced",
    "rpTnC": "-",
    "riskProfileDescription": "BALANCED - You are concerned about the effect of erosion of real value of wealth caused by inflation on wealth accumulation and seek to establish security through a well balanced portfolio of low to high risk investments over a medium to long term investment horizon to overcome your concern.",
    "expectedReturn": 6.8870000000000005,
    "standardDeviation": 9.294163001159813,
    "lastUpdatedDate": "16-Nov-2021",
    "expiryDate": "16-Nov-2022",
    "rmManagerName": "ADMIN",
    "rmManagerId": "ADMIN1",
    "riskDescription": "",
    "potentialLosses": "",
    "potentialReturn": "",
    "riskTolerance": "",
    "riskToleranceDescription": "",
    "RPQuestionaire": {
        "disclaimer": "WARNING: THE RECOMMENDATION (IF ANY) ON THE INVESTMENT IS BASED ON INFORMATION OBTAINED FROM THE INVESTOR SUITABILITY ASSESSMENT FORM. INVESTORS ARE ADVISED TO RELY ON THEIR OWN EVALUATION TO ASSESS THE MERITS AND RISKS OF ANY INVESTMENT AND EXERCISE OWN JUDGMENT IN MAKING AN INFORMED INVESTMENT DECISION IN RELATION TO THE INVESTMENT PRODUCTS.  INVESTORS WHO ARE IN DOUBT AS TO THE ACTION TO BE TAKEN SHOULD CONSULT THEIR PROFESSIONAL ADVISERS IMMEDIATELY.",
        "PART": "A",
        "jsonFinal": [
            {
                "multiSelect": "N",
                "isCeiling": "N",
                "computationType": "MIN",
                "version": 20.0,
                "question_no": 1,
                "question_desc": "1) My investment experience or understanding covers     • Fixed income - example: - Malaysian Government Securities, US Treasury, Corporate Bond. • Sukuk - example: - Malaysian Government Investment Issue, syariahcompliant corporate sukuk. • Equities - example: - Listed share issued by public listed companies. • Collective Investment Scheme - example: - Unit Trust, Mutual funds, private retirement scheme.<font color='red'>*</font>",
                "questionnaire_code": "QT338",
                "valid_period": 12,
                "is_scoring": "Y",
                "Mandatory": "Y",
                "additional": "P",
                "previous_answer_selected": [
                    1
                ],
                "answer_options": [
                    {
                        "weightage": 1,
                        "answer_no": 1,
                        "answer_desc": "Fixed Income, Sukuk, Equities and / or Collective Investment Schemes",
                        "ISCEILING": "N",
                        "CEILINGVALUE": "",
                        "VULNERABLE": "NA"
                    },
                    {
                        "weightage": 0,
                        "answer_no":  2,
                        "answer_desc": "None of the above",
                        "ISCEILING": "N",
                        "CEILINGVALUE": "",
                        "VULNERABLE": "NA"
                    }
                ]
            }
        ]
    }
}

export const MockIRiskProfileDataRequest: IRiskProfileDataRequest = {
    "cifNumber": "10280000511312",
    "custName": "",
    "custIdType": "",
    "custIdNo": "",
    "custIdIssue": ""
}


export const MockRiskProfileRespone = {
        "status": {
            "code": "0",
            "message": "Success",
            "requestUid": "06a2366b-9021-48e8-b",
            "dateTime": "2022-07-26T14:28:48.000770"
        },
        "data": MockIRiskProfileDataResponse
}
