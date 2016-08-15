import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import styles from 'css/components/bar';

const cx = classNames.bind(styles);

class Bar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { updateBar, data, businesses, index, user } = this.props;
    if(user.authenticated) {
      e.preventDefault();
      updateBar(data, businesses, index);
      
    } else {
      window.location='/auth/google';
    }
  }

  render() {
    const { data, search } = this.props;
    return (
        <li className = {cx({barListItem: true, fadeAndShrink: search.resultsRecieved})}>
          <div className = {cx('bar', 'addPad')}>
            <span className = {cx('imgWrap')}>
              <a href={ data.url } >
                <img src={data.image_url} className = {cx('barImg')} />
              </a>
            </span>
            <div className = {cx('headerTxt')}>
              <h3><a href={ data.url } >{data.name}</a></h3>
              <div className = {cx('bar', 'txtWrap')} >
                <address>
                  {data.location.display_address[0]}<br/>
                  {data.location.display_address[1]}<br/>
                  {data.location.display_address[2]}<br/>
                  {data.location.display_address[3]}
                </address>
                <span className = {cx('single')}>
                  Phone: {data.display_phone}<br/>
                  Rating: {data.rating} / 5
                </span>
              </div>
            </div>
            <button className = {cx('goingBtn')} onClick = { this.handleClick } >
              {data.going.length} {data.going.length === 1 ? 'person is ' : 'people are '} going
            </button>
          </div>
        </li>
    )
  }
}

export default Bar;