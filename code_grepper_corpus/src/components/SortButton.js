import React, { useCallback, useState } from 'react'
import { Select, InputLabel, FormControl, MenuItem, InputBase, withStyles } from "@material-ui/core";
import { AiOutlineSortDescending, AiOutlineSortAscending } from "react-icons/ai"
import {BiSortDown, BiSortUp} from 'react-icons/bi'
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const SortButton = (props) => {
  const [value, setValue] = useState('None')
  const {getValue} = props

  const handleChange = useCallback ((event) => {
    setValue(event.target.value);
    getValue(event.target.value)
  },[]);

  return (
    <div style={{marginBottom: 20}}>
      <div style={{display:'flex', justifyContent:'center'}}>
      <InputLabel id="demo-customized-select-label" style={{fontSize: 15, marginBottom: 3}}>Sort date</InputLabel>
      </div>
      <FormControl>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value ?? ""}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={'None'}>
            <em style={{fontSize: 15}}>None</em>
          </MenuItem>
          <MenuItem value={'Desc'}>
            <BiSortUp size={23}/>
          </MenuItem>
          <MenuItem value={'Esc'}>
            <BiSortDown size={23}/>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SortButton
