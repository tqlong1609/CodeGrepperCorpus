import React, { useState, useEffect } from 'react';
import './index.css'
import Pagination from './Pagination'
import ItemSearchCode from "../ItemSearchCode";
import { AiOutlineSearch, AiFillStar, AiFillTags } from "react-icons/ai"
import {DATA_LIMIT} from '../../const'
import SortButton from "../SortButton";
import ReactHtmlParser from 'react-html-parser';

function Post(props) {
  const { _source, highlight } = props.data;
  const {code, date, posted_by, source_name, source_url, tags, vote } = _source
  const labelDetail = posted_by ? ' by ' + posted_by + ' on ' + date : date
  const allTags = tags + ""

  return (
    <div style={{marginBottom: 30, width: 1000}}>
      <span style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex'}}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 3}}>
          <AiOutlineSearch size={20}/>
          <div style={{marginLeft: 4}}> { ReactHtmlParser(highlight?.title) } </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <AiFillStar color={'gold'}/>
          <label style={{fontSize: 'small', color: 'gray'}}>
            {vote}
          </label>
        </div>
      </span>
      <ItemSearchCode codeData={code} />
      <span style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex', marginTop: 5}}>
        <div style={{display:'flex', justifyContent:'center'}}>
          <label style={{fontSize: 'small', color: 'gray'}}>
            {labelDetail}
          </label>
          <a style={{fontSize: 'small', color: 'blue', marginLeft: 3}} target="_blank" href={source_url}>{source_name && source_name}</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <AiFillTags color={'gray'}/>
          <label style={{fontSize: 'small', color: 'gray', marginLeft: 3}}>
            {allTags}
          </label>
        </div>
      </span>
    </div>
  );
}

export default function PaginationList({arrCode, getValueSort, getPageChange}) {
  return (
        <>
          {arrCode.length > 0 && <SortButton
            getValue={getValueSort}/>}
          <Pagination
            data={arrCode}
            RenderComponent={Post}
            title="Posts"
            pageLimit={4}
            dataLimit={DATA_LIMIT}
            getPageChange={getPageChange}
          />
        </>
  );
}
