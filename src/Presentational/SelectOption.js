import React from 'react';

const SelectOption = ({item}) => {


    return (
      <option 
        value={item}>{item}
      </option>
    );
}

export default SelectOption;
