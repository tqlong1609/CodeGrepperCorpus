import React from 'react';
import axios from 'axios';
import { DATA_LIMIT } from "../const";

const index_name = 'codegrepper'
const SIZE = 5

const getQuery = (value, tag, isDesc, page) => {
  console.log("getQuery",value)
  let query
  const must = {
    "must": [
      {
        "match": {
          "title": value
        }
      }
    ]
  }
  const filter = {
    "filter": [
      {
        "term": {
          "tags": tag
        }
      }
    ]
  }
  if(value){
    if(tag){
      query = {
        "bool": {
          ...must,
          ...filter
        }
      }
    } else {
      query = {
        "bool": {
          ...must
        }
      }
    }
  } else {
    if(tag) {
      query = {
        "bool": {
          ...filter
        }
      }
    }
  }
  const from = (page-1)*SIZE
  const queryContain = {
    "from": from,
    "size": DATA_LIMIT,
    "query": {
      "function_score": {
        "query": query,
        "script_score": {
          "script": {
            "source": "((doc['vote'].value + 3)*10)/(383)"
          }
        },
        "boost_mode": "sum"
      }
    },
    "highlight": {
      "pre_tags": [
        "<em class='highlight'>"
      ],
      "post_tags": [
        "</em>"
      ],
      "fields": {
        "title": {}
      }
    }
  }
  if(isDesc !== undefined && isDesc !== null){
    const order = isDesc ? "desc" : "asc"
    return {
      ...queryContain,
      "sort": {
        "_script": {
          "type": "number",
          "script": {
            "source": "doc['date'].value.millis"
          },
          "order": order
        }
      }
    }
  }
  return queryContain
}

const getAxios = (token) => {
  const client = axios.create({
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
  })
  if (token !== undefined) {
    client.defaults.headers.common.Authorization = token
  }
  return client
}

export const connect = () => {
  axios.get(`http://localhost:9200`)
    .then(res => {
      console.log('res',res)
    })
    .catch(err => {
      console.log("err",err)
    })
}

export const searchContainValue = async ({value, tag, isDesc, page}) => {
  const client = getAxios()
  const query = getQuery(value, tag, isDesc, page)
  return client.post(`http://localhost:9200/${index_name}/_search`,query)
}

export const searchSuggest = async ({value, tag}) => {
  const client = getAxios()
  const framework = tag ? tag : 'javascript'
  const querySuggest = {
    "suggest": {
      "title-suggest-fuzzy": {
        "prefix": value,
        "completion": {
          "field": "title.completion",
          "contexts": {
            "framework": [
              framework
            ]
          },
          "fuzzy": {
            "fuzziness": 0
          }
        }
      }
    }
  }
  return client.post(`http://localhost:9200/${index_name}/_search`,querySuggest)
}

export const searchCode = () => {
  axios.get(`http://localhost:9200/${index_name}/_search`,{
    headers: {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    },
  })
    .then(res => {
      console.log('res',res)
    })
    .catch(err => {
      console.log("err",err)
    })
}

