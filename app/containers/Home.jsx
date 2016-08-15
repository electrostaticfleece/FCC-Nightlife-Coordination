import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Hero from 'components/Hero';
import Spinner from 'components/Spinner';
import Search from 'containers/Search';
import Bars from 'containers/Bars';
import Foot from 'containers/Footer';
import { getLocation } from 'actions/search';
import { updateBar } from 'actions/bars';

import styles from 'css/common/layout';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Home extends Component {
  constructor(props){
    super(props);
    let finished = this.props.search.submitted;
    this.state = {
      animating: {
        plane: false,
        hero: false,
        finished: finished,
        height: false
      }
    }
    this.setAnimation = this.setAnimation.bind(this);
    this.animatingState = this.animatingState.bind(this);
  }

  static need = [ getLocation ]

  setAnimation(element, delay, cb) {

    function inverse(current) {
      current.animating[element] = !current.animating[element];
      return { animating: current.animating };
    }

    this.setState(inverse);

    if(delay) {
      setTimeout(() => {
        this.setState(inverse);
        if(cb) cb();
      }, delay);
    }
  }

  animatingState(element) {
    if(Array.isArray(element)){
      return element.some(e => this.state.animating[e]);
    }

    return this.state.animating[element];
  }

  render() {
    const { search, updateBar, user } = this.props;
    const animation = { set: this.setAnimation, getState: this.animatingState };

    return (
      <div className = { cx({bodyContent: true, heightAdj: this.state.animating.height}) }>

        { search.results && animation.getState('finished')  ? null :
          ( <Hero 
              search = { search } 
              animation = { animation } /> 
          )
        }

        <Search 
          search = { search } 
          animation = { animation } 
        />

        { !search.resultsRecieved && animation.getState('finished') ? 
          ( <Spinner />) : null
        }

        { search.results && animation.getState('finished') ? 
          ( <Bars 
              search = { search } 
              updateBar = { updateBar } 
              animation = { animation } 
              user = { user } /> 
          ) 
          : null
        }

        <Foot />

      </div>
    );
  }
}

Home.propTypes = {
  user:PropTypes.object,
  search:PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.user,
    search: state.search
  };
}

export default connect(mapStateToProps, { getLocation, updateBar })(Home);