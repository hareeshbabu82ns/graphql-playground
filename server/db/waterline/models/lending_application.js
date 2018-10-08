module.exports = {
    tableName: 'lending_application',
    identity: 'lending_application',
    datastore: 'default',
    primaryKey: 'application_id',


    attributes: {
        application_id: { type: 'string', required: true, columnName: 'application_id' },
        opportunity_id: { type: 'number', required: true, columnName: 'opportunity_id', autoMigrations: { columnType: 'INT4' } },
        assigned_to_name: { type: 'string', columnName: 'assigned_to_name' },
        assigned_to_employee_number: { type: 'string', columnName: 'assigned_to_employee_number' },
        assigned_to_bp_number: { type: 'number', columnName: 'assigned_to_bp_number', autoMigrations: { columnType: 'INT4' } },
        creation_date: { type: 'string', columnName: 'creation_date', autoMigrations: { columnType: 'DATE' } },
        application_approval_date: { type: 'string', columnName: 'application_approval_date', allowNull: true, autoMigrations: { columnType: 'DATE' } },
        principal_borrower_bp: { type: 'number', required: true, columnName: 'principal_borrower_bp', autoMigrations: { columnType: 'INT4' } },
        is_loan_for_third_party: { type: 'boolean', columnName: 'is_loan_for_third_party' },
        thirdpartytype_code: { type: 'boolean', columnName: 'thirdpartytype_code', allowNull: true },
        purpose_of_loan: { type: 'string', columnName: 'purpose_of_loan', defaultsTo: 'Small Business' },
        trackerpagestate_code: { type: 'string', columnName: 'trackerpagestate_code', defaultsTo: 'Review' },
        loanapplicationtype_code: { type: 'string', columnName: 'loanapplicationtype_code', defaultsTo: 'New Monies' },
        applicationstatus_code: { type: 'string', columnName: 'applicationstatus_code', defaultsTo: 'New' },
        is_savings_excluded: { type: 'boolean', columnName: 'is_savings_excluded', defaultsTo: false },
        is_livings_expenses_excluded: { type: 'boolean', columnName: 'is_livings_expenses_excluded', defaultsTo: false }
    }
}