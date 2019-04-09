//IMPORT MODULE
import React from 'react';

//IMPORT COMPONENT
import SelectOption from './SelectOption'

const ServiceOptionsSelect = props => {

  const { serviceTypes } = props

  function buildServiceOptionList() {
    if (serviceTypes.length > 0) {
      return serviceTypes.map( item => <SelectOption key={item.id} data={item} /> )
    }
  }

  return buildServiceOptionList()

}

export default ServiceOptionsSelect;


