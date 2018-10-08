module.exports = {
    identity: 'borrower',
    datastore: 'default',
    primaryKey: 'borrower_skey',

    attributes: {
        //grant usage, select on all sequences in schema simple_business_lending to simple_lending_user;
        borrower_skey: { type: 'string', autoMigrations: { autoIncrement: true } },
        application_id: { type: 'string', required: true },
        business_partner_id: { type: 'number', allowNull: true, autoMigrations: { columnType: 'INT4' } },
        business_description: { type: 'string', allowNull: true },
        is_business_in_alberta: { type: 'boolean', allowNull: true },
        company_incorporation_number: { type: 'string', allowNull: true },
        company_name: { type: 'string', allowNull: true },
        company_start_date: { type: 'string', allowNull: true, autoMigrations: { columnType: 'DATE' } },
        company_year_end_date: { type: 'string', allowNull: true, autoMigrations: { columnType: 'DATE' } },
        naics_code: { type: 'string', allowNull: true },
        naics_description: { type: 'string', allowNull: true },
        total_ownership_percentage: { type: 'number', allowNull: true, autoMigrations: { columnType: 'FLOAT8' } },
        atb_customer_since: { type: 'string', allowNull: true, autoMigrations: { columnType: 'DATE' } },
        commercialcredit_skey: { type: 'string', allowNull: true },
    }
}