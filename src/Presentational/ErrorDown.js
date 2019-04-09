//IMPORT MODULE
import React from 'react';

const ErrorDown = props => {

  return (
    <div 
      className="form-container server-error">Apologies. The {props.component} is not available. <br/><br/>Our team is working to solve it. 
    </div>
  );
  
}

export default ErrorDown;