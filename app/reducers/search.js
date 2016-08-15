import * as types from 'types';
import { combineReducers } from 'redux';

const submitted = (
  state = false,
  action
  ) => {
  switch (action.type) {
    case types.SUBMIT_SEARCH:
      return true;
    default:
      return state;
  }
};

const results = (
  state = false,
  action
  ) => {
  switch(action.type) {
    case types.GET_LOCATION_SUCCESS:
      return action.res.data;
    case types.UPDATE_BAR_SUCCESS:
      return {...state, businesses: action.payload.businesses }
    default: 
      return state;
  }
};

const input = (
    state = '',
    action
  ) => {
  switch(action.type) {
    case types.TYPING:
      return action.payload;
    default: return state; 
  }
}

const resultsRecieved = (
    state = false,
    action
  ) => {
  switch(action.type) {
    case types.GET_LOCATION_SUCCESS:
      return true;
    case types.GET_LOCATION_FAILURE:
    case types.GET_LOCATION_REQUEST:
      return false;
    default: 
      return state;
  }
}

const query = (
  state = '',
  action
  ) => {
  switch(action.type) {
    case types.SUBMIT_SEARCH :
      return action.query;
    default:
      return state;
  }
};

const searchReducer = combineReducers({
  input,
  query,
  submitted,
  results,
  resultsRecieved
});

export default searchReducer;