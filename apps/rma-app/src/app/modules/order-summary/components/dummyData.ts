const LE = "LOCAL EQUITY";
const ES1 = "Eastspring Investment Dana Dynamik";
const B1= "Balanced | Shariah Compliant";
const Na1= 'NAV Price (As of 7 June 2021)';
const Tu= "Total Units Held";
const Sw='Switch In Amount';
const St= 'Switch To:';
const Sw5= "Switch Fee (0.50%)";
const Swu = 'Switch In Units';

const RrData=[ 
    {
        name:Na1,
        amount: '0.8000',
        currency : 'MYR',
    },
    {
        name:Tu,
        amount: '15,000.00',
        currency : '',
    },
    {
        name:'Units To Redeem',
        amount: '2,000.00',
        currency : '',
    },
    {
        name:'Units Balance After Redemption',
        amount: '13,000.00',
        currency : '',
    },
];
const SData = [
    {
        name: Na1,
        amount: '0.6300',
        currency: 'MYR',
        important: false,
    },
    {
        name: Tu,
        amount: '22,000.00',
        currency: '',
    },
    {
        name: 'Switch Out Units',
        amount: '-8,800.00',
        currency: '',
    },
    {
        name: 'Units Balance After Switch Out',
        amount: '13,200.00',
        currency: '',
    },
]

export const SwitchSource = [
    {
        assetClass: LE,
        fundName: ES1,
        fundType: B1,
        totalAmount: '3,960.00',
        totalKey: 'Switch Out Amount',
        switchName: '#1 - Switch Out:',
        currency: 'MYR',
        fundNameBadge: '',
        assetColor: 'local',
        fundDocument: false,
        important: true,
        data: [
            {
                name: Na1,
                amount: '0.7200',
                currency: 'MYR',
                important: false,
            },
            {
                name: Tu,
                amount: '30,000.00',
                currency: '',
                important: false,
            },
            {
                name: 'Switch Out Units',
                amount: '-12,500.00',
                currency: '',
                important: false,
            },
            {
                name: 'Units Balance After Switch Out',
                amount: '17,500.00',
                currency: '',
                important: false,
            },
        ]
    },
    {
        assetClass: 'REGIONAL EQUITY',
        fundName: 'Eastspring Investment Asia Select Income Fund',
        fundType: 'DEFENSIVE',
        totalAmount: '7,200.00',
        totalKey: Sw,
        switchName: St,
        currency: 'MYR',
        fundNameBadge: '',
        assetColor: 'reg',
        fundDocument: true,
        important:true,
        data:[
                {
                    name: Na1,
                    amount: '0.5500',
                    currency : 'MYR',
                },
                {
                    name:Swu,
                    amount: '10,000.00',
                    currency : '',
                    important:true,
                },
                {
                    name:Sw5,
                    amount: '210.00',
                    currency : 'MYR',
                    important:true,
                }
            ]
        },
        {
            assetClass : LE,
            fundName: 'Eastspring Investment Asia Pacific Equity MY Fund',
            fundType: 'AGGRESSIVE',
            totalAmount: '1,800.00',
            totalKey: Sw,
            switchName:St,
            currency : 'MYR',
            fundNameBadge: '',
            assetColor : 'local',
            fundDocument: true,
            important:true,
            divider:true,
            data:[
                    {
                        name:Na1,
                        amount: '0.8800',
                        currency : 'MYR',
                    },
                    {
                        name:Swu,
                        amount: '2,500.00',
                        currency : '',
                        important:true,
                    },
                    {
                        name:Sw5,
                        amount: '54.00',
                        currency : 'MYR',
                        important:true,
                    }
            ]
        },
    {
        assetClass: 'FIXED INCOME',
        fundName: 'Affin Hwang Select Bond Fund - RM',
        fundType: B1,
        currency: 'MYR',
        fundNameBadge: '',
        assetColor: 'fixed',
        fundDocument: false,
        important: true,
        totalAmount: '3,960.00',
        totalKey: 'Switch Out Amount',
        switchName: '#2 - Switch Out:',
        data: SData
    },
    {
        assetClass: 'CASH',
        fundName: 'Affin Hwang Enhanced Deposit Fund',
        fundType: 'Defensive',
        totalAmount: '5,544.00',
        totalKey: Sw,
        switchName: St,
        currency: 'MYR',
        fundNameBadge: '',
        assetColor: 'cash',
        fundDocument: true,
        important: true,
        data: [
            {
                name: Na1,
                amount: '0.6600',
                currency: 'MYR',
            },
            {
                name: Swu,
                amount: '8,800.00',
                currency: '',
                important: true,
            },
            {
                name: Sw5,
                amount: '166.32',
                currency: 'MYR',
                important: true,
            }
        ]
    }
]
export const subscribe = [
    { 
        assetClass : "REGIONAL EQUITY", 
        fundName: 'Affin Hwang Aiiman Asia (Ex Japan) Growth Fund',
        fundType: B1,
        totalAmount: '3,000.00',
        totalKey: 'Amount',
        switchName:'',
        currency : 'MYR',
        fundNameBadge: '',
        assetColor : 'reg',
        fundDocument: true,
        reminder : false,
        important:false,
        data:[
            {
                name:'Morningstar Rating',
                amount: '',
                currency : '',
                rating : 3
            },
            {
                name:'NAV Price (As of 31 Jan 2021)',
                amount: '0.6550',
                currency : 'MYR',
            },
            {
                name:'Sales Charge (1.50%)',
                amount: '45.00',
                currency : 'MYR',
            },
        ]
    }
]
export const redeemSource = [
    { 
    assetClass : LE, 
    fundName: ES1,
    fundType: B1,
    totalAmount: '3,960.00',
    totalKey: 'Redemption Amount',
    switchName:'',
    currency : 'MYR',
    fundNameBadge: '',
    assetColor : 'local',
    fundDocument: false,
    important:true,
    data:[
            {
                name:Na1,
                amount: '0.7200',
                currency : 'MYR',
            },
            {
                name:Tu,
                amount: '30,000.00',
                currency : '',
            },
            {
                name:'Units To Redeem',
                amount: '5,544.00',
                currency : '',
            },
            {
                name:'Units Balance After Redemption',
                amount: '30,500.00',
                currency : '',
            },
    
        ]
    },
    {
        assetClass: 'FIXED INCOME',
        fundName: 'Affin Hwang Select Bond Fund - RM',
        fundType: 'Aggressive',
        fundNameBadge: '',
        assetColor : 'fixed',
        fundDocument: false,
        important: true,
        totalAmount: '1,600.00',
        totalKey: 'Redemption Amount',
        switchName:'',
        currency : 'MYR',
        data: RrData
    },
]
export const subscribeSource = [
    { 
        assetClass : LE, 
        fundName: ES1,
        fundType: B1,
        totalAmount: '3,000.00',
        totalKey: 'Amount',
        switchName:'',
        currency : 'MYR',
        fundNameBadge: '',
        assetColor : 'local',
        fundDocument: true,
        important:false,
        data: [
            {
                name:'Morningstar Rating',
                amount: '',
                currency : '',
                rating : 3
            },
            {
                name:'NAV Price (As of 31 Jan 2021)',
                amount: '0.7200',
                currency : 'MYR',
            },
            {
                name:'Sales Charge (3.00%)',
                amount: '90.00',
                currency : 'MYR',
            }
        ]
    }
]