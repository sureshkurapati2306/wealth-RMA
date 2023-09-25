import { GenderList, TitleSalutations, CitizenList, CountryList, RaceList, ReligionList, MaritalList, IndustryList, OccupationList, ICustomerType, ICustomerProfileData, IUtAccountOpeningResponse, IUtAccountOpening, AddressTypeList, StateList } from '../model/new-investment.model';

export const MockCustomerType: ICustomerType[] = [
    {
        "customerTypeCode": 'NS',
        "customerTypeName": 'Non-Staff',
    },
    {
        "customerTypeCode": 'N',
        "customerTypeName": 'NonStaff',
    }
]

export const MockCustomerProfile: ICustomerProfileData = {
    "rpqApprovalStatus": "",
    "inSanctionCountry": "N",
    "branchCode": "",
    "accountRelation": "",
    "birthDate": "",
    "profession": "",
    "idNo": "",
    "idType": "",
    "idCntyIssued": "MYS",
    "name": "",
    "cntyCitizenship": "",
    "addresses": [
        {
            "addressType": "Primary",
            "address1": "RU 52",
            "address2": "TLQLJMO KJRLOL OKE",
            "address3": "TPEMLJO",
            "address4": "",
            "state": "11",
            "country": "MYS",
            "postcode": "93050"
        }
    ],
    "prStatus": "",
    "staffIndicator": "NonStaff",
    "homePhone": "",
    "nationality": "",
    "accountStatus": "",
    "cardNum": "",
    "gender": "M",
    "race": "B",
    "maritalStatus": "S",
    "religion": "",
    "email": "",
    "cifNo": "",
    "clientGroup": "N",
    "occupation": ""
}

export const MockSalutations: TitleSalutations[] = [
    {
        "salutationId": 102,
        "salutationCode": "01",
        "salutationType": "B",
        "salutationShortName": "MR",
        "salutationLongName": "Mr",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T03:07:15.000+00:00",
        "modifiedDate": "2021-10-08T03:07:15.000+00:00"

    },
    {
        "salutationId": 103,
        "salutationCode": "02",
        "salutationType": "A",
        "salutationShortName": "MR",
        "salutationLongName": "Mr",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-11-08T03:07:15.000+00:00",
        "modifiedDate": "2021-10-01T03:07:15.000+00:00"

    },
]

export const MockGenderList: GenderList[] = [
    {
        "genderId": 102,
        "genderCode": "F",
        "genderShortName": "Female",
        "genderLongName": "Female",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T02:53:02.000+00:00",
        "modifiedDate": "2021-10-08T02:53:02.000+00:00"
    },
    {
        "genderId": 101,
        "genderCode": "M",
        "genderShortName": "Male",
        "genderLongName": "Male",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-01-08T01:53:02.000+00:00",
        "modifiedDate": "2021-01-08T02:53:02.000+00:00"
    }

]

export const MockCitizens: CitizenList[] = [
    {
        "citizenId": 103,
        "citizenCode": "1",
        "citizenStatus": "Y",
        "citizenShortName": "Permanent Resident",
        "citizenLongName": "Permanent Resident",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-11T06:58:07.000+00:00",
        "modifiedDate": "2021-10-11T06:58:07.000+00:00"
    },
    {
        "citizenId": 104,
        "citizenCode": "IND",
        "citizenStatus": "Y",
        "citizenShortName": "IND",
        "citizenLongName": "IND",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2022-10-11T06:58:05.000+00:00",
        "modifiedDate": "2022-10-11T06:58:07.000+00:00"
    },
]

export const MockCoutryLIst: CountryList[] = [
    {
        "countryId": 102,
        "countryCode": "AB",
        "countryNo": 0,
        "countryShortName": "ADEN",
        "countryLongName": "Aden",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T04:03:51.000+00:00",
        "modifiedDate": "2021-10-08T04:03:51.000+00:00"
    },
    {
        "countryId": 110,
        "countryCode": "Malaysia",
        "countryNo": 5,
        "countryShortName": "Malaysia",
        "countryLongName": "Malaysia",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2023-10-08T04:03:51.000+00:00",
        "modifiedDate": "2023-10-08T04:03:51.000+00:00"
    },
]

export const MockRaceList: RaceList[] = [
    {
        "raceId": 102,
        "raceCode": "B",
        "raceShortName": "TestSN",
        "raceLongName": "TestLN",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-06-08T04:27:00.000+00:00",
        "modifiedDate": "2021-06-08T04:27:00.000+00:00"
    },
    {
        "raceId": 103,
        "raceCode": "A",
        "raceShortName": "Bumputra",
        "raceLongName": "Bumputra",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T04:27:00.000+00:00",
        "modifiedDate": "2021-10-08T04:27:00.000+00:00"
    },
]

export const MockReligionList: ReligionList[] = [
    {
        "religionId": 102,
        "religionCode": "B",
        "religionShortName": "Buddhist",
        "religionLongName": "Buddhist",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08A03:03:10.000+00:00",
        "modifiedDate": "2021-10-08A03:03:10.000+00:00"
    },
    {
        "religionId": 103,
        "religionCode": "H",
        "religionShortName": "H",
        "religionLongName": "H",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T03:03:10.000+00:00",
        "modifiedDate": "2021-10-08T03:03:10.000+00:00"
    },
]

export const MockMaritalList: MaritalList[] = [
    {
        "maritalId": 102,
        "maritalCode": "D",
        "maritalShortName": "Divorced",
        "maritalLongName": "Divorced",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T10:59:55.000+00:00",
        "modifiedDate": "2021-10-08T10:59:55.000+00:00"
    },
    {
        "maritalId": 103,
        "maritalCode": "Single",
        "maritalShortName": "Single",
        "maritalLongName": "Single",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T02:59:55.000+00:00",
        "modifiedDate": "2021-10-08T02:59:55.000+00:00"
    },
]


export const MockEmployementList: IndustryList[] = [
    {
        "employmentId": 102,
        "employmentCode": "01120",
        "employmentShortName": "Agriculture - Growing of paddy",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T07:42:28.000+00:00",
        "modifiedDate": "2021-10-08T07:42:28.000+00:00"
    },
    {
        "employmentId": 103,
        "employmentCode": "SW",
        "employmentShortName": "SW",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T06:42:28.000+00:00",
        "modifiedDate": "2021-10-08T06:42:28.000+00:00"
    },
]

export const MockOccupations: OccupationList[] = [
    {
        "occupationId": 102,
        "occupationCode": "U00X",
        "occupationShortName": "OthO/sideLabourForce",
        "occupationLongName": "Other Outside Labour Force",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2021-10-08T03:44:25.000+00:00",
        "modifiedDate": "2021-10-08T03:44:25.000+00:00"
    },
    {
        "occupationId": 103,
        "occupationCode": "E",
        "occupationShortName": "engineer",
        "occupationLongName": "engineer",
        "createdBy": "",
        "modifiedBy": "",
        "createdDate": "2020-10-08T03:44:25.000+00:00",
        "modifiedDate": "2020-10-08T03:44:25.000+00:00"
    },
]

export const MockAddressTypeList: AddressTypeList[] = [
    {
        "addressTypeCode": "1",
        "addressTypeName": "HOME ADDRESS"
    },
    {
        "addressTypeCode": "2",
        "addressTypeName": "CORRESPONDING ADDRESS"
    },
]

export const MockStatesList: StateList[] = [
    {
        "stateId": 102,
        "countryCode": "MY",
        "stateCode": "01",
        "stateShortName": "JOHOR",
        "stateLongName": "Johor Darul Takzim",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2021-10-08T00:39:48.000+00:00",
        "modifiedDate": "2021-10-08T09:39:48.000+00:00"
    },
    {
        "stateId": 103,
        "countryCode": "JR",
        "stateCode": "03",
        "stateShortName": "Jordon",
        "stateLongName": "JORDON",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2021-10-08T06:39:48.000+00:00",
        "modifiedDate": "2021-10-08T06:39:48.000+00:00"
    },
    {
        "stateId": 104,
        "countryCode": "MYS",
        "stateCode": "06",
        "stateShortName": "Malaysia",
        "stateLongName": "MALAYSIA",
        "createdBy": null,
        "modifiedBy": null,
        "createdDate": "2022-12-08T06:39:48.000+00:00",
        "modifiedDate": "2022-12-08T06:39:48.000+00:00"
    }
]

export const mockUtAccountOpeningData: IUtAccountOpeningResponse = {
    "status": '200',
    "message": 'Transaction already exist',
    "trxId": '',
    "transactionRefId": '',
    "transactionCreateDate": '',
};

export const mockUtAccountOpeningRequest: IUtAccountOpening = {
    "rmId": '3',
    "requestUid": '123',
    "clientGroup": 'test',
    "salutation": '01',
    "customerId": '111',
    "mobilePhone": '123456789',
    "housePhone": '1234',
    "workPhone": '1234',
    "gender": 'M',
    "nationality": 'I',
    "race": 'B',
    "citizen": 'C',
    "religion": 'R',
    "maritalStatus": 'S',
    "industry": 'A',
    "profession": 'B',
    "state": 'US',
    "country": 'MY',
    "postcode": '123456',
    "address1": '',
    "address2": '',
    "address3": '',
    "address4": '',
    "email": '',
    "address_line": '',
    "mailingAddress": ''
};
