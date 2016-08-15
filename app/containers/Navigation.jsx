import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { user, logOut } = this.props;
    return (
      <header>
        <nav>
          <ul>
            <li className = { cx({logoTxt: true}) }><Link to="/"> Rendezvous </Link></li>
            <span>
              { user.authenticated ? ( 
                <Link onClick={ logOut } to="/"><li>Logout</li></Link> 
              ) : ( 
                <a href='/auth/google'><li>Google Login</li></a> )
              }
            </span>
          </ul>
        </nav>
      </header>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Nav);
