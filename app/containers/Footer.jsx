import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/footer';

const cx = classNames.bind(styles);

class Foot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { search } = this.props;
    if(nextProps.search.resultsRecieved !== search.resultsRecieved){
      if(nextProps.search.resultsRecieved) {
        this.setState({display: true});
        setTimeout(() => {
          this.setState({display: false})
        }, 2000);
      } 
    }
  }

  render() {
    return  (
      <footer className = {cx({hide: this.state.display})}>
        <p>
          Rendezvous is an application built as part of Free Code Camp's curriculum.<br/>
          The application uses <a href='https://www.yelp.com/developers/documentation/v2/overview'>Yelp's API</a> and the <a href='https://github.com/reactGo/reactGo'>reactGo</a> boilerplate to meet the 
          project's requirements.
        </p>
      </footer>
    )
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(mapStateToProps)(Foot);