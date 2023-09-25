import { ApplicationStatus, ProductType, TransactionDataRequestDTO, TransactionDataResponseDTO, ITransactionType } from "../models/application-status.model";

export const mockResponse: TransactionDataResponseDTO = {
    action: "Success",
    totalRecords: 2,
    pageNo: 1,
    pageSize: 10,
    rmId: 1234,
    prdType: ProductType.UT,
    transactions: [
        {
            id: 5,
            customerName: "Joe",
            refId: 123456,
            creationDate: "23-12-2020,16:45",
            applicationStatus: ApplicationStatus.Confirm,
            transactionType: ITransactionType.Redeem,
            rpExpiry: false,
            rpqApprovalStatus: "Y"
        }
    ]
}


export const mockRequest: TransactionDataRequestDTO = {
    rmId: "123",
    customerId: "345",
    days: 10,
    pageNo: 1,
    pageSize: 0,
    productType: ProductType.UT,
    sortingFieldsOrder: ["createdDateTime.desc", "customerName.asc"],
    transactionStatus: [ApplicationStatus.Confirm],
    transactionType: [ITransactionType.Redeem]
}
