module.exports = {
    identity: 'applicant',
    datastore: 'default',
    primaryKey: 'applicant_skey',

    attributes: {
        //grant usage, select on all sequences in schema simple_business_lending to simple_lending_user;
        'applicant_skey': { type: 'string', autoMigrations: { autoIncrement: true } },
        'borrower_skey': { type: 'string', autoMigrations: { columnType: 'INT4' } },
        'business_partner_id': { type: 'string', autoMigrations: { columnType: 'INT4' } },
        'is_excluded': { type: 'boolean', defaultsTo: true },
        'exclusion_date': { type: 'string', allowNull: true, autoMigrations: { columnType: 'DATE' } },
        'first_name': { type: 'string' },
        'middle_name': { type: 'string', allowNull: true },
        'last_name': { type: 'string' },
        'date_of_birth': { type: 'string', autoMigrations: { columnType: 'DATE' } },
        'social_insurance_number': { type: 'string', allowNull: true },
        'is_resident_of_alberta': { type: 'boolean', defaultsTo: false },
        'is_atb_employee': { type: 'boolean', defaultsTo: false },
        'is_existing_atb_customer': { type: 'boolean', defaultsTo: false },
        'is_alberta_private_client': { type: 'boolean', defaultsTo: false },
        'atb_join_date': { type: 'string', allowNull: true, autoMigrations: { columnType: 'DATE' } },
        'savingstype_code': { type: 'string', defaultsTo: 'TBD' },
        'applicanttype_code': { type: 'string', defaultsTo: 'Primary' },
        'residentialstatus_code': { type: 'string', defaultsTo: 'Unknown' },
        'consumercredit_skey': { type: 'number', allowNull: true, autoMigrations: { columnType: 'INT4' } },
        'role_code': { type: 'string', defaultsTo: 'Shareholder' },
        'primary_phone': { type: 'string', defaultsTo: '' },
        'secondary_phone': { type: 'string', allowNull: true },
        'email': { type: 'string', defaultsTo: '' },

    }
}