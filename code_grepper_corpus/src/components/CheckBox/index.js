import React, { useState } from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

export let valueTag = 'javascript'

const CheckBox = (props) => {
  const [value, setValue] = useState()
  const {getValueCheck} = props

  const handleChange = (e) => {
    const valueTemp = e.target.value === 'all' ? null : e.target.value
    getValueCheck(valueTemp)
    setValue(e.target.value)
    valueTag = valueTemp
  }

  return (
    <FormControl component="fieldset" style={{marginTop: 10}}>
      <FormLabel component="legend" style={{marginLeft: 15, marginBottom: 15}}>Framework</FormLabel>
      <RadioGroup aria-label="gender" name="framework" value={value ?? ""} onChange={handleChange}>
        <FormControlLabel label="AngularJS" control={<Radio />} value="angular" />
        <FormControlLabel label="React" control={<Radio />} value="react" />
        <FormControlLabel label="Next.js" control={<Radio />} value="nextjs" />
        <FormControlLabel label="jQuery" control={<Radio />} value="jquery" />
        <FormControlLabel label="Vue" control={<Radio />} value="vue" />
        <FormControlLabel label="Node.js" control={<Radio />} value="nodejs" />
        <FormControlLabel label="Express" control={<Radio />} value="express" />
        <FormControlLabel label="Backbone" control={<Radio />} value="backbone" />
        <FormControlLabel label="Ionic" control={<Radio />} value="ionic" />
        <FormControlLabel label="Bootstrap" control={<Radio />} value="bootstrap" />
        <FormControlLabel label="Ember" control={<Radio />} value="ember" />
        <FormControlLabel label="Flutter" control={<Radio />} value="flutter" />
        <FormControlLabel label="All" control={<Radio />} value="all" />
      </RadioGroup>
    </FormControl>
  )
}
export default CheckBox

