import { IGetOrderSummary, SendRemainder } from "../../risk-profile/models/risk-profile-summary.model"

export const MockOrderSummaryData: IGetOrderSummary = {
        "cif": "10110000311802",
        "customerApprovalStatus": "P",
        "approvalLinkUrl": "https://www.cimbonboard.my/refId=13911293-1813-4a9a-94e0-28879bc91ed9",
        "approvalLinkStatus": "A",
        "approvalStatus": "A",
        "rpExpiry": false,
        "rpqApprovalStatus": "Y",
        transactionType: 's'
}

export const MockSendRemainderData: SendRemainder = {
        "message": "updated Successfully",
        "data": "",
        "success": true
}
