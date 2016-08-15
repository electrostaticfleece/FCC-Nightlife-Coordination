import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from 'types';

polyfill();

function makeLocationRequest(method, location, data, api = 'location'){
  return request[method](api + (location ?('?' + 'location=' + location) : ''), data);
}

export function getLocation(data) {
  if(data.querys && 'location' in data.querys){
    return {
      type: types.GET_LOCATION,
      query: data.querys.location,
      promise: makeLocationRequest('get', data.querys.location)
    }
  } else {
    return {
      type: types.NO_QUERY
    }
  }
}

export function submitSearch(data) {
  return {
    type: types.SUBMIT_SEARCH,
    query: data
  }
}

export function typing(data) {
  return {
    type: types.TYPING,
    payload: data
  }
}