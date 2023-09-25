import { RPQuestionnaireResponse } from "../models/risk-inquiry-detail.model";

export const MockRPQuestionnaireResponse: RPQuestionnaireResponse = {
    ExpectedReturn: 876,
    ExpiryDate: "23-09-2023",
    LastUpdateDate: "23-01-2023",
    RMId: "123",
    RMName: "rm name",
    RPClass: "yes",
    RPDesc: "desc",
    RPQuestionaire: {
        disclaimer: "",
        PART: "",
        jsonFinal: [
            {
                additional: "P",
                answer_options: [
                    {
                        weightage: 2,
                        answer_no: 23,
                        answer_desc: "answer desc",
                        ISCEILING: "is ceiling",
                        CEILINGVALUE: "celling",
                        VULNERABLE: "YES"
                    }
                ],
                previous_answer_selected: [],
                question_no: 1,
                question_desc: "New  question"
            },
            {
                additional: "null",
                answer_options: [
                    {
                        weightage: 12,
                        answer_no: 3,
                        answer_desc: "answer desc 2",
                        ISCEILING: "is ceiling 2",
                        CEILINGVALUE: "celling 2",
                        VULNERABLE: "YES"
                    }
                ],
                previous_answer_selected: [],
                question_no: 2,
                question_desc: "New  question 2"
            }
        ]
    }
}
