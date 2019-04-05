import React from 'react';

const Modal = props => {
     
   return (
         <div 
            className="modal"
            onClick={ props.selectModal }
         >
            <div 
               className="modal-content"
               onClick={ e => e.stopPropagation() }
            >
               <span 
                  className="close"
                  onClick={ props.selectModal }
               >&times;</span>
            </div>
         </div>
     );
}

export default Modal;
