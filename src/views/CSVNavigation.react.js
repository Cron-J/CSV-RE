import React from 'react';
import {Button} from 'react-bootstrap';

class CSVNavigation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  checkDisability = (buttontype) => {
    if (this.props.block.indexOf(buttontype) > -1 ){
      return true;
    }
    return false;
  }
  render() {
    return (
      <div>
      <div className="pull-left">
         <Button className="btn btn-primary" disabled={this.checkDisability('prev')} onClick={this.props.onPrev}>Prev</Button>
      </div>
      <div className="pull-right">
        <Button className="btn btn-primary" disabled={this.checkDisability('next')} onClick={this.props.onNext}>Next</Button>
      </div>
      </div>
    )
  }
}

CSVNavigation.propTypes = {
  onNext: React.PropTypes.func,
  onPrev: React.PropTypes.func,
  block: React.PropTypes.array,
};

export default CSVNavigation;
