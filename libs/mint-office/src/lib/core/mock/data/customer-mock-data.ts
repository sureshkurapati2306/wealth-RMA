import { CustomerProfile, CUSTOMER_TYPE } from "../../models/customer.model";

export const mockCustomerResponse = {
  "id": "1",
  "coustomer": '123',
  "refID": 1,
  "gender": "M",
  "type": "UT",
  "status": "p",
  "createdDate": "28-10-2022",
  "cifNumber": "12345",
  "customerType": CUSTOMER_TYPE.NTP
}


export const MockCustomerProfile: CustomerProfile = {
  inSanctionCountry: "N",
  rpqApprovalStatus: "N",
  accountRelation: "string",
  accountStatus: "testStatus",
  addresses: [
    {
      address1: 'test_line1',
      address2: 'test_line_2',
      address3: 'test_line_3',
      address4: '',
      addressType: 'string',
      country: 'MYS',
      postcode: '12345',
      state: '06'
    }
  ],
  birthDate: "01-march-2022",
  branchCode: "testB1",
  cardNum: "1234asdf",
  cifNo: '12345678',
  clientGroup: "A",
  cntyCitizenship: "IND",
  email: "test@cimb.com",
  gender: "M",
  homePhone: "0987654321",
  idCntyIssued: "123456",
  idNo: "09876543",
  idType: "NRIC",
  maritalStatus: "Single",
  name: "testname",
  nationality: "MY",
  occupation: "engineer",
  prStatus: "test",
  profession: "test",
  race: "test",
  religion: "H",
  staffIndicator: "N",
  casaStatus: 'Y',
  category: 'ETP',
  licenseValidity: true,
  investmentAccount: [],
  settlementAccount: [],
  emailId: [
    'test1@gmail.com'
  ],
  mobileNumber: "999999999999",
  mobileNumbers: ["999999999999"],
  offPhone: [],
  housePhone: [],
  salutation: 'M',
  industry: 'IT',
  contactDetails: []
}
