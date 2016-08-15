import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from 'types';

polyfill();

function makeLocationRequest(method, location, data, api = 'location'){
  return request[method](api + (location ?('?' + 'location=' + location) : ''), data);
}

export function updateBarRequest(data) {
  return {
    type: types.UPDATE_BAR_REQUEST,
    payload: {
      id: data
    }
  }
}

export function updateBarSuccess(data) {
  return {
    type: types.UPDATE_BAR_SUCCESS,
    payload: {
      businesses: data.businesses
    }
  }
}

export function updateBarFailure(data) {
  return {
    type: types.UPDATE_BAR_FAILURE,
  }
}

export function updateBar(data, businesses, index) {
  return (dispatch, getState) => {
    //First dispatch an optimistic update
    dispatch(updateBarRequest(data.id));

    return makeLocationRequest('put', null, data)
      .then((res) => {
        const goingIndex = data.going.indexOf(res.data);

        if(goingIndex === -1) {
          data.going.push(res.data);
        } else {
          data.going.splice(goingIndex, 1);
        }

        businesses[index] = data;
        dispatch(updateBarSuccess({businesses: businesses}));
        return true; 
      })
      .catch((err) => {
        console.log('Something went wrong with the request');
        return null;
      })
  }
}