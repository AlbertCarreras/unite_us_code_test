let library = (function () {
    return {

    //FIELD VALIDATOR
    isFieldCompleted: function isFieldCompleted(input) {
        return input !== "" ? true : false  
        },

    isEmailValid: function isEmailValid(input) {
        const regExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        return  regExp.test(input) 
        },

    isCheckboxChecked: function isCheckboxChecked(input) {
        return input ? true : false  
        },
    
    isOptionSelected: function isOptionSelected(input) {
        return input !== undefined ? true : false  
        },

    validateFields: function validateFields(fields) {
        var allowSubmission = true;
        var validationError = {}

        Object.entries(fields).forEach(field => {

            switch(field[0]) {
                case "firstName":
                    if (!library.isFieldCompleted(field[1])) {
                        allowSubmission = false;
                        validationError["firstName"] = "First Name cannot be blank."
                    }
                    break;
                case "lastName":
                    if (!library.isFieldCompleted(field[1])) {
                        allowSubmission = false;
                        validationError["lastName"] = "Last Name cannot be blank."
                    }
                    break;
                case "email":
                    if (!library.isEmailValid(field[1])) {
                        allowSubmission = false;
                        validationError["email"] = "Invalid email address format."
                    }
                    break;
                case "serviceRequest":
                    if (!library.isOptionSelected(field[1])) {
                        allowSubmission = false;
                        validationError["service"] = "A service type must be selected."
                    }
                    break;
                case "bodyRequest":
                    if (!library.isFieldCompleted(field[1])) {
                        allowSubmission = false;
                        validationError["description"] = "A description must be provided."
                }
                    break;
                case "checkboxTerms":
                    if (!library.isCheckboxChecked(field[1])) {
                        allowSubmission = false;
                        validationError["checkbox"] = "You must accept to terms and conditions."
                    }
                    break;
                default:
                  // code block
              }
        })

        return { allowSubmission, validationError }
    }

}})()

export default library;