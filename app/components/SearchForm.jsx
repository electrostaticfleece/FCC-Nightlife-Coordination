import { polyfill } from 'es6-promise';
import React, { PropTypes, Component} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/searchForm';

polyfill();

const cx = classNames.bind(styles);

class SearchForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(e){
    const { submitSearch, getLocation, animation, search } = this.props;
    e.preventDefault();
    const query = search.input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      .trim().replace(/\s{1,}/g,"+");
    const data = { querys: { location: query }};

    if(!animation.getState('finished')){
      animation.set('plane', 1000);
      animation.set('hero', 2200, () => animation.set('finished'));
    }

    submitSearch(search.input);
    getLocation(data);
  }

  onChange(e) {
    const { typing } = this.props;
    typing(e.target.value);
  }

  render(){
    const { search, animation } = this.props;
    return (
      <div className = { cx({searchWrap: true, noGrow: search.results && !animation.getState(['plane', 'hero'])}) } >
        <form className = { cx( { 
          verticalAlign: true, 
          repositionForm: search.submitted && !(animation.getState(['plane'])), 
          stableReposition: animation.getState('finished') && search.results } )} 
          onSubmit = { this.handleSubmit }>

            <input ref = 'search' type = 'text' 
            placeholder='Search for your city, state, or neighborhood'
            className = { cx('searchBar') } value = { search.input } 
            onChange = { this.onChange }/>

            <input type = 'submit' hidden />

        </form>
      </div>
    );
  }
}

export default SearchForm;