module.exports = (sequelize, DataTypes) => {
    return sequelize.define('borrower',
        {
            //grant usage, select on all sequences in schema simple_business_lending to simple_lending_user;
            borrower_skey: { type: DataTypes.STRING, autoIncrement: true, primaryKey: true },
            application_id: { type: DataTypes.STRING, required: true },
            business_partner_id: { type: DataTypes.INTEGER, allowNull: true },
            business_description: { type: DataTypes.STRING, allowNull: true },
            is_business_in_alberta: { type: DataTypes.BOOLEAN, allowNull: true },
            company_incorporation_number: { type: DataTypes.STRING, allowNull: true },
            company_name: { type: DataTypes.STRING, allowNull: true },
            company_start_date: { type: DataTypes.DATE, allowNull: true },
            company_year_end_date: { type: DataTypes.DATE, allowNull: true },
            naics_code: { type: DataTypes.STRING, allowNull: true },
            naics_description: { type: DataTypes.STRING, allowNull: true },
            total_ownership_percentage: { type: DataTypes.FLOAT, allowNull: true },
            atb_customer_since: { type: DataTypes.DATE, allowNull: true },
            commercialcredit_skey: { type: DataTypes.STRING, allowNull: true },
        }, {// config            
            schema: 'simple_business_lending',
            tableName: 'borrower',
            freezeTableName: true,
        });
}