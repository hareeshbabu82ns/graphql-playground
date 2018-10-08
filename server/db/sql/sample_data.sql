/* Lending Application */	  
INSERT 
  INTO simple_business_lending.lending_application
     (
		application_id, opportunity_id, assigned_to_name,
		assigned_to_employee_number, assigned_to_bp_number,
		creation_date, application_approval_date, principal_borrower_bp,
		is_loan_for_third_party, purpose_of_loan, trackerpagestate_code,
		loanapplicationtype_code, applicationstatus_code,
		is_savings_excluded, is_livings_expenses_excluded 
      ) 
VALUES
      (
       'SL1', 1029293, 'C41011', 'C41011', 9993,
       '2018-09-10', '2018-09-14', 2000, false, 'New Monies',
       'Income & Employment', 'Pre-Approval', 'New', true, true
      );


	  
