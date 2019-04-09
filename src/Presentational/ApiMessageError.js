//IMPORT MODULE
import React from 'react';

const ApiMessageError = props => {
  const error = props.msgError 

  return error
      ? <div 
        className="server-error">{error.message.message}
        </div>
      : null
  
}

export default ApiMessageError;