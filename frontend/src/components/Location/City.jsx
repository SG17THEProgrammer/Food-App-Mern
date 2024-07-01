import React from 'react'

const City = ({cities,handleCityInput , title}) => {
  return (
    <select  style={{ marginLeft: "5px" , position:"absolute",left:title=="address"? "120%" :"135%",zIndex:"1000" ,width:title=="address"? "120px" :"90px"}} onChange={handleCityInput}>
    <option value="">Select City</option>
    {cities ? cities.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    )) : ""}
  </select>
  )
}

export default City