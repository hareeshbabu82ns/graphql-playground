module.exports = (sequelize, DataTypes) => {
    return sequelize.define('applicant', {
        //grant usage, select on all sequences in schema simple_business_lending to simple_lending_user;
        'applicant_skey': { type: DataTypes.STRING, primaryKey: true, },
        'borrower_skey': { type: DataTypes.STRING },
        'business_partner_id': { type: DataTypes.STRING },
        'is_excluded': { type: DataTypes.BOOLEAN, defaultValue: true },
        'exclusion_date': { type: DataTypes.DATE, allowNull: true },
        'first_name': { type: DataTypes.STRING },
        'middle_name': { type: DataTypes.STRING, allowNull: true },
        'last_name': { type: DataTypes.STRING },
        'date_of_birth': { type: DataTypes.DATE },
        'social_insurance_number': { type: DataTypes.STRING, allowNull: true },
        'is_resident_of_alberta': { type: DataTypes.BOOLEAN, defaultValue: false },
        'is_atb_employee': { type: DataTypes.BOOLEAN, defaultValue: false },
        'is_existing_atb_customer': { type: DataTypes.BOOLEAN, defaultValue: false },
        'is_alberta_private_client': { type: DataTypes.BOOLEAN, defaultValue: false },
        'atb_join_date': { type: DataTypes.DATE, allowNull: true },
        'savingstype_code': { type: DataTypes.STRING, defaultValue: 'TBD' },
        'applicanttype_code': { type: DataTypes.STRING, defaultValue: 'Primary' },
        'residentialstatus_code': { type: DataTypes.STRING, defaultValue: 'Unknown' },
        'consumercredit_skey': { type: DataTypes.INTEGER, allowNull: true },
        'role_code': { type: DataTypes.STRING, defaultValue: 'Shareholder' },
        'primary_phone': { type: DataTypes.STRING, defaultValue: '' },
        'secondary_phone': { type: DataTypes.STRING, allowNull: true },
        'email': { type: DataTypes.STRING, defaultValue: '' },
    }, {// config            
            schema: 'simple_business_lending',
            tableName: 'applicant',
            freezeTableName: true,
        });
};