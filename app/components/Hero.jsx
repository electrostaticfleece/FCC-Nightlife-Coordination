import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import heroImg from 'images/rendezvous_hero.jpe';
import FullLogo from 'components/FullLogo';
import styles from 'css/components/hero';

const cx = classNames.bind(styles);


class Hero extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { search, animation } = this.props;
    return (
      <div className = { cx({heroWrapper: true, moveUp: search.submitted && !animation.getState('plane') }) }>
        <div className = { cx('hero') }>
          <FullLogo search = { search }/>
          <p className={ cx('slogan') }>Meet, Mix, Mingle</p>
        </div>
      </div>
    )
  }
}

Hero.propTypes = {
  search: PropTypes.object,
}

export default Hero; 