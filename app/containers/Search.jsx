import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SearchForm from 'components/SearchForm';
import classNames from 'classnames/bind';
import { submitSearch, getLocation, typing } from 'actions/search';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search, getLocation, submitSearch, animation, typing } = this.props;
    return (
      <SearchForm search = { search } getLocation = { getLocation } 
      submitSearch = { submitSearch } animation = { animation } typing = { typing }/>
    );
  }
}

function mapStateToProps(state){
  return {
    search: state.search
  };
}

export default connect(mapStateToProps, { submitSearch, getLocation, typing })(Search);