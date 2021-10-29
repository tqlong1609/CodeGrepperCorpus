import React, { useCallback, useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { searchSuggest } from "../restApi";
import { valueTag } from "./CheckBox";

export default function SearchBar(props) {
    const [value, setValue] = useState()
    const [dataSuggest, setDataSuggest] = useState([])
    const {getValue} = props
    const onChange = (event) => {
        setValue(event.target.value)
        getValueChange(event.target.value)
    }

    const getValueChange = useCallback(async (value) => {
        const dataSuggestApi = await searchSuggest({value, tag: valueTag})
        setDataSuggest(dataSuggestApi)
    },[])

    const changeData = (e) => {
        if(e.nativeEvent.target.innerText){
            setValue(e.nativeEvent.target.innerText)
        } else {
            setValue(e.target.defaultValue)
        }
    }

    const arrSuggest = dataSuggest?.['data']?.['suggest']?.['title-suggest-fuzzy'][0]?.['options']
    //TODO: bug choose by keyboard
    return (
        <div style={{ width: '100%', marginBottom: 20, flexDirection:'row'}}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                autoSelect={false}
                autoCorrect={false}
                onKeyPress={(e) => e.key === 'Enter' && getValue(value)}
                onChange={changeData}
                options={arrSuggest && arrSuggest.length > 0 ? arrSuggest.map((option) => option.text) : []}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        onChange={onChange}
                        // onKeyPress={enterData}
                    />
                )}
            />
        </div>
    );
}
