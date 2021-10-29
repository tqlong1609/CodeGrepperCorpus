
import React, { useCallback, useRef, useState } from 'react';
import SearchBar from '../SearchBar'
import { searchContainValue, searchSuggest } from "../../restApi";
import PaginationList from "../PaginationList";
import CheckBox from "../CheckBox";
import SortButton from "../SortButton";

const Home = () => {
    const [listData, setListData] = useState([])
    const valueSearch = useRef()
    const valueTag = useRef()
    const page = useRef(1)
    const isDesc = useRef()

    const getValueSearch = useCallback(async (value) => {
        valueSearch.current = value
        const data = await searchContainValue({value, tag: valueTag.current,isDesc:isDesc.current, page: page.current})
        setListData(data?.data?.hits?.hits)
    },[])

    const getValueCheck = useCallback(async (valueCheck) => {
        valueTag.current = valueCheck
        const data = await searchContainValue({value: valueSearch.current, tag: valueCheck,isDesc:isDesc.current,  page: page.current})
        setListData(data?.data?.hits?.hits)
    },[])

    const getValueSort = useCallback(async (value) => {
        const isDescTemp = value !== 'None' ? value === 'Desc' ? false : true : null
        console.log("isDescTemp",isDescTemp)
        isDesc.current = isDescTemp
        const data = await searchContainValue({value: valueSearch.current, tag: valueTag.current, isDesc: isDescTemp, page: page.current})
        // console.log("data",data?.data?.hits?.hits)
        setListData(data?.data?.hits?.hits)
    },[])

    const getPageChange = useCallback(async (value) => {
        page.current = value
        const data = await searchContainValue({value: valueSearch.current, tag: valueTag.current,isDesc:isDesc.current, page: value})
        setListData(data?.data?.hits?.hits)
    },[])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
            }}
        >
            <CheckBox
              getValueCheck = {getValueCheck}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                padding: 20,
                width: 1000
            }}>
                <SearchBar
                  getValue={getValueSearch}
                />
                <PaginationList
                  arrCode={listData}
                  getValueSort={getValueSort}
                  getPageChange={getPageChange}
                />
            </div>
        </div>

    );
};

export default Home;
