module.exports = (sequelize, DataTypes) => {
    return sequelize.define('lending_application',
        {
            application_id: { type: DataTypes.STRING, primaryKey: true, field: 'application_id' },
            opportunity_id: { type: DataTypes.INTEGER, required: true },
            assigned_to_name: { type: DataTypes.STRING },
            assigned_to_employee_number: { type: DataTypes.STRING },
            assigned_to_bp_number: { type: DataTypes.INTEGER, defaultValue: 0 },
            creation_date: { type: DataTypes.DATE },
            application_approval_date: { type: DataTypes.DATE, allowNull: true },
            principal_borrower_bp: { type: DataTypes.INTEGER, required: true },
            is_loan_for_third_party: { type: DataTypes.BOOLEAN, defaultValue: false },
            thirdpartytype_code: { type: DataTypes.BOOLEAN, allowNull: true },
            purpose_of_loan: { type: DataTypes.STRING, defaultValue: 'Small Business' },
            trackerpagestate_code: { type: DataTypes.STRING, defaultValue: 'Review' },
            loanapplicationtype_code: { type: DataTypes.STRING, defaultValue: 'New Monies' },
            applicationstatus_code: { type: DataTypes.STRING, defaultValue: 'New' },
            is_savings_excluded: { type: DataTypes.BOOLEAN, defaultValue: false },
            is_livings_expenses_excluded: { type: DataTypes.BOOLEAN, defaultValue: false }
        }, { // config            
            schema: 'simple_business_lending',
            tableName: 'lending_application',
            freezeTableName: true,
        }
    );
}