//IMPORT MODULES
import React from 'react';

const SelectOption = ({data}) => {
    return (
      <option 
        value={data.display_name}>{data.display_name}
      </option>
    );
}

export default SelectOption; 
