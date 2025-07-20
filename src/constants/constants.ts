const USERS = '/api/v1/users';
const NEXTCLOUD = '/api/v1/nextcloud';
const REPORTS = '/api/v1/reports';
const NOTIFICATIONS = '/api/v1/notifications';

export const ENDPOINTS = {
    login: USERS + '/login',
    getTemplates: NEXTCLOUD + '/files',
    downloadTemplate: NEXTCLOUD + '/files/download',
    generateAndDownload: REPORTS + '/generateForWeb',
    previewForWeb: REPORTS + '/previewForWeb',
    getReports: REPORTS + '/getReports',
    getNotifications: NOTIFICATIONS
}

export const sampleJson = [
    {
        "customer_name": "Amit Verma",
        "greeting_msg": "Thank you for banking with us.",
        "company_addr": "Ashok Nagar, Hyderabad, 500032.",
        "manager_name": "Sreehari Das",
        "item": [
            {
                "date": "2025-06-24",
                "mode": "NEFT",
                "part": "EMI",
                "depo": "32,695",
                "withdrawals": "",
                "bal": "32,695"
            },
            {
                "date": "2025-07-10",
                "mode": "NEFT",
                "part": "Refund",
                "depo": "70,797",
                "withdrawals": "",
                "bal": "103,492"
            },
            {
                "date": "2025-07-19",
                "mode": "Cash",
                "part": "Grocery",
                "depo": "38,272",
                "withdrawals": "",
                "bal": "141,764"
            },
            {
                "date": "2025-07-14",
                "mode": "Cheque",
                "part": "Rent",
                "depo": "9,257",
                "withdrawals": "",
                "bal": "151,021"
            },
            {
                "date": "2025-06-20",
                "mode": "UPI",
                "part": "EMI",
                "depo": "60,033",
                "withdrawals": "",
                "bal": "211,054"
            },
            {
                "date": "2025-07-30",
                "mode": "Cash",
                "part": "EMI",
                "depo": "49,426",
                "withdrawals": "",
                "bal": "260,480"
            },
            {
                "date": "2025-07-15",
                "mode": "Cash",
                "part": "Grocery",
                "depo": "",
                "withdrawals": "47,952",
                "bal": "212,528"
            },
            {
                "date": "2025-06-24",
                "mode": "NEFT",
                "part": "Grocery",
                "depo": "",
                "withdrawals": "31,119",
                "bal": "181,409"
            },
            {
                "date": "2025-06-11",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "",
                "withdrawals": "38,787",
                "bal": "142,622"
            },
            {
                "date": "2025-07-29",
                "mode": "IMPS",
                "part": "Rent",
                "depo": "",
                "withdrawals": "51,107",
                "bal": "91,515"
            },
            {
                "date": "2025-07-11",
                "mode": "Cash",
                "part": "Refund",
                "depo": "12,130",
                "withdrawals": "",
                "bal": "103,645"
            },
            {
                "date": "2025-06-09",
                "mode": "NEFT",
                "part": "Grocery",
                "depo": "73,164",
                "withdrawals": "",
                "bal": "176,809"
            },
            {
                "date": "2025-06-12",
                "mode": "UPI",
                "part": "Refund",
                "depo": "",
                "withdrawals": "80,858",
                "bal": "95,951"
            },
            {
                "date": "2025-07-03",
                "mode": "Cheque",
                "part": "EMI",
                "depo": "",
                "withdrawals": "73,129",
                "bal": "22,822"
            },
            {
                "date": "2025-07-30",
                "mode": "UPI",
                "part": "Grocery",
                "depo": "45,464",
                "withdrawals": "",
                "bal": "68,286"
            },
            {
                "date": "2025-06-03",
                "mode": "NEFT",
                "part": "Fuel",
                "depo": "",
                "withdrawals": "83,931",
                "bal": "-15,645"
            },
            {
                "date": "2025-06-08",
                "mode": "Cheque",
                "part": "Rent",
                "depo": "",
                "withdrawals": "63,600",
                "bal": "-79,245"
            },
            {
                "date": "2025-06-30",
                "mode": "Cash",
                "part": "Fuel",
                "depo": "",
                "withdrawals": "46,245",
                "bal": "-125,490"
            },
            {
                "date": "2025-06-27",
                "mode": "UPI",
                "part": "Fuel",
                "depo": "29,763",
                "withdrawals": "",
                "bal": "-95,727"
            },
            {
                "date": "2025-07-03",
                "mode": "Cash",
                "part": "Fuel",
                "depo": "27,062",
                "withdrawals": "",
                "bal": "-68,665"
            },
            {
                "date": "2025-06-07",
                "mode": "IMPS",
                "part": "Bonus",
                "depo": "",
                "withdrawals": "97,899",
                "bal": "-166,564"
            },
            {
                "date": "2025-06-25",
                "mode": "IMPS",
                "part": "EMI",
                "depo": "98,303",
                "withdrawals": "",
                "bal": "-68,261"
            },
            {
                "date": "2025-06-25",
                "mode": "Cash",
                "part": "Fuel",
                "depo": "84,805",
                "withdrawals": "",
                "bal": "16,544"
            },
            {
                "date": "2025-07-04",
                "mode": "Cheque",
                "part": "EMI",
                "depo": "44,044",
                "withdrawals": "",
                "bal": "60,588"
            },
            {
                "date": "2025-06-11",
                "mode": "IMPS",
                "part": "Bonus",
                "depo": "",
                "withdrawals": "12,071",
                "bal": "48,517"
            },
            {
                "date": "2025-07-31",
                "mode": "Cash",
                "part": "EMI",
                "depo": "",
                "withdrawals": "44,233",
                "bal": "4,284"
            },
            {
                "date": "2025-07-19",
                "mode": "NEFT",
                "part": "Transfer",
                "depo": "95,096",
                "withdrawals": "",
                "bal": "99,380"
            },
            {
                "date": "2025-06-01",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "17,388",
                "withdrawals": "",
                "bal": "116,768"
            },
            {
                "date": "2025-06-08",
                "mode": "NEFT",
                "part": "Dining",
                "depo": "77,298",
                "withdrawals": "",
                "bal": "194,066"
            },
            {
                "date": "2025-07-20",
                "mode": "NEFT",
                "part": "Fuel",
                "depo": "18,870",
                "withdrawals": "",
                "bal": "212,936"
            },
            {
                "date": "2025-06-11",
                "mode": "IMPS",
                "part": "Transfer",
                "depo": "",
                "withdrawals": "53,825",
                "bal": "159,111"
            },
            {
                "date": "2025-06-07",
                "mode": "UPI",
                "part": "Utilities",
                "depo": "43,972",
                "withdrawals": "",
                "bal": "203,083"
            },
            {
                "date": "2025-06-17",
                "mode": "Cheque",
                "part": "Transfer",
                "depo": "42,842",
                "withdrawals": "",
                "bal": "245,925"
            },
            {
                "date": "2025-06-22",
                "mode": "NEFT",
                "part": "Fuel",
                "depo": "46,355",
                "withdrawals": "",
                "bal": "292,280"
            },
            {
                "date": "2025-07-19",
                "mode": "NEFT",
                "part": "Refund",
                "depo": "",
                "withdrawals": "79,335",
                "bal": "212,945"
            },
            {
                "date": "2025-07-04",
                "mode": "Cash",
                "part": "Fuel",
                "depo": "29,398",
                "withdrawals": "",
                "bal": "242,343"
            },
            {
                "date": "2025-07-26",
                "mode": "Cheque",
                "part": "Transfer",
                "depo": "53,016",
                "withdrawals": "",
                "bal": "295,359"
            },
            {
                "date": "2025-06-20",
                "mode": "IMPS",
                "part": "Rent",
                "depo": "33,615",
                "withdrawals": "",
                "bal": "328,974"
            },
            {
                "date": "2025-07-07",
                "mode": "NEFT",
                "part": "Grocery",
                "depo": "",
                "withdrawals": "57,694",
                "bal": "271,280"
            },
            {
                "date": "2025-07-29",
                "mode": "UPI",
                "part": "Utilities",
                "depo": "56,370",
                "withdrawals": "",
                "bal": "327,650"
            },
            {
                "date": "2025-06-10",
                "mode": "IMPS",
                "part": "Transfer",
                "depo": "77,612",
                "withdrawals": "",
                "bal": "405,262"
            },
            {
                "date": "2025-06-25",
                "mode": "Cash",
                "part": "Rent",
                "depo": "57,746",
                "withdrawals": "",
                "bal": "463,008"
            },
            {
                "date": "2025-07-06",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "96,100",
                "withdrawals": "",
                "bal": "559,108"
            },
            {
                "date": "2025-06-29",
                "mode": "Cash",
                "part": "Salary",
                "depo": "",
                "withdrawals": "83,070",
                "bal": "476,038"
            },
            {
                "date": "2025-07-07",
                "mode": "Cheque",
                "part": "Dining",
                "depo": "",
                "withdrawals": "50,585",
                "bal": "425,453"
            },
            {
                "date": "2025-07-20",
                "mode": "UPI",
                "part": "Refund",
                "depo": "",
                "withdrawals": "77,218",
                "bal": "348,235"
            },
            {
                "date": "2025-07-28",
                "mode": "Cash",
                "part": "Salary",
                "depo": "",
                "withdrawals": "36,503",
                "bal": "311,732"
            },
            {
                "date": "2025-06-25",
                "mode": "Cash",
                "part": "Bonus",
                "depo": "92,647",
                "withdrawals": "",
                "bal": "404,379"
            },
            {
                "date": "2025-06-12",
                "mode": "UPI",
                "part": "Bonus",
                "depo": "35,303",
                "withdrawals": "",
                "bal": "439,682"
            },
            {
                "date": "2025-06-25",
                "mode": "IMPS",
                "part": "EMI",
                "depo": "16,339",
                "withdrawals": "",
                "bal": "456,021"
            },
            {
                "date": "2025-06-01",
                "mode": "IMPS",
                "part": "Dining",
                "depo": "",
                "withdrawals": "13,664",
                "bal": "442,357"
            },
            {
                "date": "2025-06-11",
                "mode": "UPI",
                "part": "EMI",
                "depo": "",
                "withdrawals": "78,846",
                "bal": "363,511"
            },
            {
                "date": "2025-07-30",
                "mode": "UPI",
                "part": "Transfer",
                "depo": "99,336",
                "withdrawals": "",
                "bal": "462,847"
            },
            {
                "date": "2025-07-22",
                "mode": "IMPS",
                "part": "Dining",
                "depo": "",
                "withdrawals": "7,394",
                "bal": "455,453"
            },
            {
                "date": "2025-07-16",
                "mode": "NEFT",
                "part": "Fuel",
                "depo": "10,015",
                "withdrawals": "",
                "bal": "465,468"
            },
            {
                "date": "2025-07-16",
                "mode": "Cash",
                "part": "Dining",
                "depo": "",
                "withdrawals": "50,322",
                "bal": "415,146"
            },
            {
                "date": "2025-06-25",
                "mode": "IMPS",
                "part": "Fuel",
                "depo": "",
                "withdrawals": "83,870",
                "bal": "331,276"
            },
            {
                "date": "2025-07-27",
                "mode": "UPI",
                "part": "Utilities",
                "depo": "38,182",
                "withdrawals": "",
                "bal": "369,458"
            },
            {
                "date": "2025-06-21",
                "mode": "Cheque",
                "part": "Transfer",
                "depo": "",
                "withdrawals": "86,891",
                "bal": "282,567"
            },
            {
                "date": "2025-06-26",
                "mode": "IMPS",
                "part": "Fuel",
                "depo": "60,098",
                "withdrawals": "",
                "bal": "342,665"
            },
            {
                "date": "2025-07-20",
                "mode": "NEFT",
                "part": "Salary",
                "depo": "",
                "withdrawals": "86,619",
                "bal": "256,046"
            },
            {
                "date": "2025-06-20",
                "mode": "Cheque",
                "part": "Rent",
                "depo": "",
                "withdrawals": "254",
                "bal": "255,792"
            },
            {
                "date": "2025-07-16",
                "mode": "NEFT",
                "part": "Dining",
                "depo": "",
                "withdrawals": "40,355",
                "bal": "215,437"
            },
            {
                "date": "2025-06-23",
                "mode": "IMPS",
                "part": "Salary",
                "depo": "",
                "withdrawals": "11,511",
                "bal": "203,926"
            },
            {
                "date": "2025-06-06",
                "mode": "Cash",
                "part": "Utilities",
                "depo": "64,013",
                "withdrawals": "",
                "bal": "267,939"
            },
            {
                "date": "2025-06-17",
                "mode": "Cash",
                "part": "Fuel",
                "depo": "3,061",
                "withdrawals": "",
                "bal": "271,000"
            },
            {
                "date": "2025-07-20",
                "mode": "NEFT",
                "part": "Fuel",
                "depo": "",
                "withdrawals": "83,013",
                "bal": "187,987"
            },
            {
                "date": "2025-06-24",
                "mode": "UPI",
                "part": "Dining",
                "depo": "81,909",
                "withdrawals": "",
                "bal": "269,896"
            },
            {
                "date": "2025-06-07",
                "mode": "NEFT",
                "part": "Refund",
                "depo": "14,898",
                "withdrawals": "",
                "bal": "284,794"
            },
            {
                "date": "2025-07-13",
                "mode": "Cash",
                "part": "Utilities",
                "depo": "28,941",
                "withdrawals": "",
                "bal": "313,735"
            },
            {
                "date": "2025-06-04",
                "mode": "IMPS",
                "part": "Dining",
                "depo": "94,473",
                "withdrawals": "",
                "bal": "408,208"
            },
            {
                "date": "2025-07-26",
                "mode": "Cash",
                "part": "Bonus",
                "depo": "",
                "withdrawals": "44,615",
                "bal": "363,593"
            },
            {
                "date": "2025-07-08",
                "mode": "Cheque",
                "part": "Grocery",
                "depo": "",
                "withdrawals": "77,397",
                "bal": "286,196"
            },
            {
                "date": "2025-06-05",
                "mode": "UPI",
                "part": "Dining",
                "depo": "",
                "withdrawals": "96,414",
                "bal": "189,782"
            },
            {
                "date": "2025-07-24",
                "mode": "Cheque",
                "part": "Transfer",
                "depo": "",
                "withdrawals": "21,681",
                "bal": "168,101"
            },
            {
                "date": "2025-07-09",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "39,546",
                "withdrawals": "",
                "bal": "207,647"
            },
            {
                "date": "2025-07-05",
                "mode": "UPI",
                "part": "Utilities",
                "depo": "86,512",
                "withdrawals": "",
                "bal": "294,159"
            },
            {
                "date": "2025-07-21",
                "mode": "UPI",
                "part": "Utilities",
                "depo": "15,989",
                "withdrawals": "",
                "bal": "310,148"
            },
            {
                "date": "2025-06-07",
                "mode": "NEFT",
                "part": "Refund",
                "depo": "74,114",
                "withdrawals": "",
                "bal": "384,262"
            },
            {
                "date": "2025-07-12",
                "mode": "IMPS",
                "part": "Transfer",
                "depo": "42,508",
                "withdrawals": "",
                "bal": "426,770"
            },
            {
                "date": "2025-06-12",
                "mode": "Cash",
                "part": "Transfer",
                "depo": "36,294",
                "withdrawals": "",
                "bal": "463,064"
            },
            {
                "date": "2025-07-23",
                "mode": "UPI",
                "part": "Refund",
                "depo": "66,492",
                "withdrawals": "",
                "bal": "529,556"
            },
            {
                "date": "2025-07-19",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "",
                "withdrawals": "27,123",
                "bal": "502,433"
            },
            {
                "date": "2025-07-15",
                "mode": "NEFT",
                "part": "Refund",
                "depo": "",
                "withdrawals": "94,546",
                "bal": "407,887"
            },
            {
                "date": "2025-07-14",
                "mode": "IMPS",
                "part": "Fuel",
                "depo": "22,033",
                "withdrawals": "",
                "bal": "429,920"
            },
            {
                "date": "2025-07-14",
                "mode": "NEFT",
                "part": "Rent",
                "depo": "",
                "withdrawals": "16,793",
                "bal": "413,127"
            },
            {
                "date": "2025-06-06",
                "mode": "IMPS",
                "part": "EMI",
                "depo": "40,271",
                "withdrawals": "",
                "bal": "453,398"
            },
            {
                "date": "2025-06-13",
                "mode": "UPI",
                "part": "Rent",
                "depo": "",
                "withdrawals": "88,465",
                "bal": "364,933"
            },
            {
                "date": "2025-06-14",
                "mode": "Cheque",
                "part": "EMI",
                "depo": "66,769",
                "withdrawals": "",
                "bal": "431,702"
            },
            {
                "date": "2025-06-05",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "",
                "withdrawals": "20,285",
                "bal": "411,417"
            },
            {
                "date": "2025-07-20",
                "mode": "Cheque",
                "part": "Rent",
                "depo": "",
                "withdrawals": "58,043",
                "bal": "353,374"
            },
            {
                "date": "2025-06-06",
                "mode": "Cheque",
                "part": "Rent",
                "depo": "",
                "withdrawals": "71,784",
                "bal": "281,590"
            },
            {
                "date": "2025-07-02",
                "mode": "Cheque",
                "part": "Refund",
                "depo": "72,047",
                "withdrawals": "",
                "bal": "353,637"
            },
            {
                "date": "2025-07-15",
                "mode": "NEFT",
                "part": "Utilities",
                "depo": "",
                "withdrawals": "34,300",
                "bal": "319,337"
            },
            {
                "date": "2025-07-15",
                "mode": "NEFT",
                "part": "Refund",
                "depo": "92,892",
                "withdrawals": "",
                "bal": "412,229"
            },
            {
                "date": "2025-06-22",
                "mode": "NEFT",
                "part": "Grocery",
                "depo": "",
                "withdrawals": "87,395",
                "bal": "324,834"
            },
            {
                "date": "2025-06-15",
                "mode": "Cash",
                "part": "Salary",
                "depo": "",
                "withdrawals": "22,091",
                "bal": "302,743"
            },
            {
                "date": "2025-06-23",
                "mode": "UPI",
                "part": "EMI",
                "depo": "",
                "withdrawals": "35,798",
                "bal": "266,945"
            },
            {
                "date": "2025-07-02",
                "mode": "Cash",
                "part": "Bonus",
                "depo": "",
                "withdrawals": "94,343",
                "bal": "172,602"
            },
            {
                "date": "2025-06-05",
                "mode": "NEFT",
                "part": "Utilities",
                "depo": "",
                "withdrawals": "41,551",
                "bal": "131,051"
            }
        ]
    }
]

export const salesReciet = [
    {
        "company_name": "Zomato Technologies Pvt. Ltd.",
        "customer_name_addr": "Naveen Kumar\nNo. 42, 5th Cross\nKoramangala, Bangalore - 560095",
        "date": "2025-07-20",
        "inv_number": "INV-2025-0742",
        "id_number": "ZT-001942",
        "c_no": "C234567",
        "payment_method": "Credit Card",
        "job": "Monthly Food Service",
        "item": [
            {
                "qty": "10",
                "item_no": "ZFOOD1001",
                "desc": "Corporate Meal Box",
                "unit_price": "$250",
                "discount": "5%",
                "line_total": "$2375"
            },
            {
                "qty": "5",
                "item_no": "ZDRINK201",
                "desc": "Premium Beverage Pack",
                "unit_price": "$150",
                "discount": "0%",
                "line_total": "$750"
            }
        ],
        "total_discount": "$125",
        "total_disc_line_total": "$3000",
        "sub_total": "$3000",
        "sales_tax": "$270",
        "tax": "$3270",
        "greetings_note": "Thank you for your business!",
        "company_addr": "Zomato HQ, Sector 5, Gurgaon, Haryana - 122002",
        "company_": "www.zomato.com"
    }
]