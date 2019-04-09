//IMPORT MODULE
import React from 'react';

const ValidationMessageError = props => {

  const { fieldName, validationError } = props

  if (validationError !== {} && validationError[fieldName]) {
    return <div className="field-notes">{validationError[fieldName]}</div>
  }
  return <div className="field-notes">required</div>

  
}

export default ValidationMessageError;