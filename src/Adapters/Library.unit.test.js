import library from './Library';

describe('checks individual field validators', () => {

  test('checks if form field is not blank returning true', () => {
    expect(library.isFieldCompleted("hi")).toBe(true);
  });
  
  test('checks if form field is blank returning false', () => {
      expect(library.isFieldCompleted("")).toBe(false);
  });

  test('checks if email form field has valid format returning true', () => {
    expect(library.isEmailValid("name@domain.com")).toBe(true);
  });
  
  test('checks if email form field has invalid format returning false', () => {
      expect(library.isEmailValid("namedomain.com")).toBe(false);
  });

  test('checks if checkbox is checked returning true', () => {
    expect(library.isCheckboxChecked(true)).toBe(true);
  });

  test('checks if checkbox is not checked returning false', () => {
    expect(library.isCheckboxChecked(false)).toBe(false);
  });

  test('checks if option is selected from dropdown list returning true', () => {
    expect(library.isOptionSelected("value")).toBe(true);
  });

  test('checks if option is not selected from dropdown list returning false', () => {
    expect(library.isOptionSelected(undefined)).toBe(false);
  });
  
})

describe('checks form field validator', () => {

  let inputCorrect = {
    firstName: "firstName",
    lastName: "lastName",
    email: "name@domain.com",
  }

  let inputIncorrect = {
    firstName: "firstName",
    lastName: "lastName",
    email: "namedomain.com",
  }
  
  test('checks if form fields are correct returning true and empty validationError', () => {
    expect(library.validateFields(inputCorrect)).toEqual({allowSubmission: true, validationError: {} });
  });

  test('checks if form fields are incorrect returning false and validationError with error message', () => {
    expect(library.validateFields(inputIncorrect)).toEqual({allowSubmission: false, validationError: {email: "Invalid email address format."} });
  });
})