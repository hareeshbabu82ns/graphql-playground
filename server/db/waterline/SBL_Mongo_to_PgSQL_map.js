const moment = require('moment');

const transformers = {
    'numbers': (value = "0") => Number(value),
    'dates': (value) => moment(value).toISOString(),
    'yesNo': (value) => {
        if (value) {
            if (value === 'Y' || value === 'Yes') return true;
            else if (value === 'N' || value === 'No') return false;
        }
        return value;
    },
};

module.exports = {
    'application': {
        '_pgTable': 'lending_application',
        'application_id': 'applicationID',
        'opportunity_id': {
            path: 'opportunityId',
            transform: transformers.numbers
        },
        'assigned_to_name': 'applicationAssignedTo',
        'assigned_to_employee_number': 'applicationAssignedTo',
        'assigned_to_bp_number': undefined,
        'creation_date': {
            path: 'applicationCreationDate',
            transform: transformers.date
        },
        'application_approval_date': {
            path: 'applicationApprovalDate',
            transform: transformers.date
        },
        'principal_borrower_bp': {
            path: 'principalBorrowerId',
            transform: transformers.numbers
        },
        'is_loan_for_third_party': 'isLoanForThirdParty',
        'thirdpartytype_code': undefined,
        'purpose_of_loan': 'product.purposeOfLoan',
        'trackerpagestate_code': 'trackerPageState',
        'loanapplicationtype_code': 'loanApplicationType',
        'applicationstatus_code': {
            // status code is mapped with different values
            path: 'applicationStatus.applicationStatusCode',
            transform: (value) => module.exports.mappers.applicationStatus[value],
        },
        'is_savings_excluded': undefined,
        'is_livings_expenses_excluded': undefined,
    },
    'borrower': {
        'borrower_skey': undefined,
        'application_id': {
            path: 'applicationID',
            isRootPath: true,
        },
        'business_partner_id': {
            path: 'principalBorrowerId',
            isRootPath: true,
            transform: transformers.numbers,
        },
        'business_description': 'businessDescription',
        'is_business_in_alberta': {
            path: 'isBusinessInAlberta',
            transform: transformers.yesNo,
        },
        'company_incorporation_number': undefined,
        'company_name': 'companyName',
        'company_start_date': {
            path: 'companyStartDate',
            transform: transformers.date
        },
        'company_year_end_date': {
            path: 'companyYearEnd',
            transform: transformers.date
        },
        'naics_code': {
            path: 'naicsCode',
            transform: transformers.numbers,
        },
        'naics_description': 'naicsDescription',
        'total_ownership_percentage': undefined,
        'atb_customer_since': undefined,
        'commercialcredit_skey': undefined,
    },
    'applicant': {
        'applicant_skey': undefined,
        'borrower_skey': '_parentKey',
        'business_partner_id': {
            path: 'applicantBusinessPartnerId',
            transform: transformers.numbers,
        },
        'is_excluded': 'isExcluded',
        'exclusion_date': undefined,
        'first_name': 'firstName',
        'middle_name': 'middleName',
        'last_name': 'lastName',
        'date_of_birth': {
            path: 'dateOfBirth',
            transform: transformers.dates,
        },
        'social_insurance_number': 'socialInsuranceNumber',
        'is_resident_of_alberta': {
            path: 'isResidentOfAlberta',
            transform: transformers.yesNo,
        },
        'is_atb_employee': undefined,
        'is_existing_atb_customer': undefined,
        'is_alberta_private_client': undefined,
        'atb_join_date': undefined,
        'savingstype_code': undefined,
        'applicanttype_code': undefined,
        'residentialstatus_code': 'residentialStatus',
        'consumercredit_skey': undefined,
        'role_code': undefined,
        'primary_phone': undefined,
        'secondary_phone': undefined,
        'email': undefined,
    },
    'mappers': {
        'applicationStatus': {
            'newapp': 'New',
            'approvedreadyforfulfillment': 'Approved',
        },
    },


}

const oldMap = {
    '_pgTable': 'lending_application',
    '_id': undefined,
    'applicationId': 'application_id',
    'principalBorrowerId': 'principal_borrower_bp',
    'applicationCreationDate': 'creation_date',
    'applicationApprovalDate': 'application_approval_date',
    'applicationAssignedToName': 'assigned_to_name',
    'businessPartnerId': undefined,
    'loanApplicationType': 'loanapplicationtype_code',
    'applicationAssignedTo': 'assigned_to_name',
    'trackerPageState': 'trackerpagestate_code',
    'isLoanForThirdParty': 'is_loan_for_third_party',
    'createdDate': undefined,
    'opportunityId': 'opportunity_id',
    'modifiedDate': undefined,
    'applicationStatus': {
        '_pgCheckTable': 'application_status',
        '_pgTable': 'lending_application',
        'applicationStatusDescription': 'New applicationstatus_description',
        'applicationStatusCode': 'applicationstatus_code'
    },
    'borrower': {
        '_pgTable': 'borrower',
        'companyName': 'company_name',
        'companyYearEnd': 'company_year_end_date',
        'companyStartDate': 'company_start_date',
        'isBusinessInAlberta': 'is_business_in_alberta',
        'naicsCode': 'naics_code',
        'naicsDescription': 'naics_description',
        'businessDescription': 'business_description',
        'businessStructure': undefined,
        'SLCTCode': undefined,
        'borrowerContactName': undefined,
        'borrowerContactPhone': undefined,
        'companyNameOnCard': undefined,
        'applicants': {
            'applicant': {
                '_pgTable': 'applicant',
                'applicantBusinessPartnerId': 'business_partner_id',
                'firstName': 'first_name',
                'lastName': 'last_name',
                'middleName': 'middle_name',
                'roleType': 'role_code',
                'ownershipPercentage': undefined,
                'isExcluded': 'is_excluded',
                'dateOfBirth': 'date_of_birth',
                'SLCTCode': 'Y',
                'socialInsuranceNumber': 'social_insurance_number',
                'isOverEighteen': undefined,
                'isResidentOfAlberta': 'is_resident_of_alberta',
                'residentialStatus': 'residentialstatus_code',
                'applicantFinancial': {
                    'hasBankruptcy': 'Yes',
                    'applicantAssets': {
                        'MU427q4LsU': {
                            'id': 'MU427q4LsU',
                            'accountNumber': '021908129-0000000038154300',
                            'isIncluded': true,
                            'assetType': '',
                            'assetDescription': 'Basic Account',
                            'assetSource': 'ATB',
                            'assetValue': 100000
                        },
                    }, 'applicantLiabilities': {
                        'ODXPVmKeUO': {
                            'id': 'ODXPVmKeUO',
                            'loanNumber': '021909169-0000000036081300',
                            'isIncluded': true,
                            'liabilityType': '',
                            'liabilityDescription': 'Basic Account',
                            'liabilitySource': 'ATB',
                            'monthlyExpense': 0,
                            'approvedLimit': 700,
                            'balanceOwing': 700
                        },
                    },
                    'totalAssets': 768159.68,
                    'totalLiabilities': 284739599.28000003,
                    'principalNetWorthAmount': -283971439.6,
                    'grossIncome': 3333
                },
                'addresses': {
                    '0000489914': {
                        'bpId': '0000113581',
                        'addressId': '0000489914',
                        'addressType': 'MainAddress',
                        'buildingName': '',
                        'city': 'Calgary',
                        'street': 'Rundlewood Dr NE &',
                        'addressLine2': '',
                        'houseNumber': '4905',
                        'postalCode': 'T1Y 1B2',
                        'unitNumber': '',
                        'floorNumber': '',
                        'country': 'CA',
                        'region': 'AB',
                        'careOfName': '@&',
                        'email': 'JB1@johnbarrymail.com',
                        'phone': '4034221501'
                    }
                },
                'overdrawn': '3',
                'OverdrawnDaysError': '',
                'mastercardSOHO': {
                    'addressLine1': 'Rundlewood Dr NE &',
                    'addressLine2': '',
                    'city': 'Calgary',
                    'region': 'AB',
                    'cardHolderName': 'John D Barry',
                    'dateOfBirth': '1962-06-06T00:00:00.000Z',
                    'cardLimit': 3333,
                    'cardEmbossingName': 'Barry,John'
                },
                'isCardHolder': true
            },
        },
        'borrowerPerformanceHistory': {
            'maxDaysArrearsRetail': 0,
            'maxDaysArrearsBusiness': 248,
            'currentArrearsRetail': 0,
            'isPreviousApplicationDeclined': false,
            'hasPreviousImpairments': 'N',
            'hasPreviousWriteOff': 'N',
            'numberOfNSFs': 2,
            'previouslyDeclinedApplications': 'NONE'
        },
        'addresses': {
            '0000626205': {
                'bpId': '0000134084',
                'addressId': '0000626205',
                'addressType': 'MainAddress',
                'buildingName': '',
                'city': 'Calgary',
                'street': '3699 63 Ave NE',
                'addressLine2': 'ATB campus',
                'houseNumber': 'H77',
                'postalCode': 'T3J 0G7',
                'unitNumber': 'R9102',
                'floorNumber': 'F3',
                'country': 'CA',
                'region': 'AB',
                'careOfName': 'care of Mark',
                'phone': '3334445555'
            }
        },
        'borrowerHoldings': {
            'ic92hYIOS': {
                'id': 'ic92hYIOS',
                'isIncluded': true,
                'accountNumber': '021907139-0000003000354965',
                'loanType': 'ATB ACCOUNT',
                'accountDescription': 'Commercial Term Loan',
                'dunning': '08',
                'monthlyExpense': 6107.7,
                'approveLimit': 600000,
                'balanceOwing': 600000
            },
        },
        'borrowerFinancial': {
            'cashAndEquivalentsAmount': 3
        },

    },
    'product': {
        'purposeOfLoan': 'Small Business',
        'kindOfCard': 'SOHO',
        'kyc': '1',
        'productCategoryID': 'FS_NR_CREDITCARD',
        'productCategoryDescription': 'Non Retail Credit Cards',
        'fdrAgentId': '2000',
        'paymentFrequency': '0',
        'rateOperator': '+',
        'excludeAutoLimitIncrease': 'N',
        'productID': 'NR_MC_11_AGRIIND',
        'productDescription': 'Alberta Agri-Ind Business MasterCard',
        'productSubCategoryID': 'NRCARD_MC_SOHO',
        'productSubCategoryDescription': 'MasterCard (SOHO Process)',
        'fdrPrinNumber': '1120', 'product': 'NR_MC_11_AGRIIND',
        'loanAmount': '3,333',
        'rateType': 'Variable',
        'primeRate': '3.00 ',
        'bbpmPrimePlus': '3.00 ',
        'interestRate': '3.00 ',
        'approvedLimit': 3333,
        'deliveryOption': 'customer',
        'deliveryOptionDescription': 'Mail to Customer',
        'productFee': {
            'feeType': 'Annual',
            'feeAmount': '65.00',
            'waiveFirstYearAnnualFee': 'no'
        },
    },
    'collateral': {
        'frr': '6 - Unsecured'
    },
};