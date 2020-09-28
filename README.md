# ssn-validation
ssn-validation validates the format of both Norwegian and Swedish social security numbers. 
They check if the date input is valid and that the control-numbers sum is correct.

# How to use
1. Create your SSN input field and add events.

Swedish ssn:
* Button | onChange | RUN clientside javascript | testSwedFnr($(this));
* Button | onBlur | RUN clientside javascript | testSwedFnr($(this));

Norwegian ssn:
* Button | onChange | RUN clientside javascript | validateSocialSecurityNumberNo($(this));
* Button | onBlur | RUN clientside javascript | validateSocialSecurityNumberNo($(this));

2. Add hidden input-field 'valid-ssn'
* Create input field. Remove label and set to hidden.
* Set expression value to 'false' and update value to render. 
* 'Use only when field is empty' toggled on.

3. Add validation to SSN input
* Validation schematron ASSERT | valid-ssn = 'true'

NOTE: Hidden input and name in validation expression must be the same. 
