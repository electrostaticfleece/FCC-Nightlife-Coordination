import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/fullLogo';

const cx = classNames.bind(styles);

class FullLogo extends React.Component {
  
  constructor(props){
    super(props);
  }
  
  render(){
    const { search } = this.props;
    return ( 
      <div className = { cx('logoWrapper') } >
        <h1 className = { cx('logo') } >Rendezvous</h1>
        <div className = { cx({planeWrap: search.submitted }) } >
          <i className = { cx({plane: true}) } ></i>
        </div>
      </div>
     );
  }
}

export default FullLogo;
