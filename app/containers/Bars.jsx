import React, { PropTypes, Component } from 'react';
import Bar from 'components/Bar'
import classNames from 'classnames/bind';
import styles from 'css/components/bars'

const cx = classNames.bind(styles)

class Bars extends Component {
  constructor(props) {
    super(props);
    this.mapBars = this.mapBars.bind(this);
  }

  mapBars() {
    const { search: { results: { businesses} }, updateBar, user } = this.props;

    return businesses.map((bar, i) => {
      return ( 
        <div  key = { i } className ={cx('bars')}>
          <Bar data = { bar } key = { i } index = { i } 
          businesses = { businesses } updateBar = { updateBar } 
          user = { user } search = { this.props.search }/>
          <hr/>
        </div>
      )
    });
  }

  componentDidMount() {
    const { animation } = this.props;
    setTimeout(() => {
        animation.set('height');
    }, 1000)
  }

  render() {
    return (
        <ul className = {cx('bars')} >
          { this.mapBars() }
        </ul>
    )
  }
}

export default Bars;