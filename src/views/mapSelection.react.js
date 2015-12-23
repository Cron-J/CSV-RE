import React from 'react';
import {Button, Glyphicon, Input} from 'react-bootstrap';

class MapSelection extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  onSelectionChange = (e) => {
    if (this.props.onSelect) {
      this.props.onSelect(e.target.value);
    }
  }
  renderoptions = () => {
    const options = [];
    if (this.props.tableobject && this.props.tableobject.length > 0) {
      options.push(<option value={this.props.tableobject}>{this.props.tableobject}</option>);
    }
    if (this.props.data) {
      for (let i = 0; i < this.props.data.length; i++) {
        options.push(<option value={this.props.data[i].value}>{this.props.data[i].label}</option>);
      }
    }
    return options;
  }
  onAdd = () => {
    if (this.props.onAdd) {
      this.props.onAdd();
    }
  }
  onRemove = () => {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }
  renderButton = () => {
    if (this.props.remove) {
      return <Button bsSize="small" bsStyle="primary" onClick={this.onRemove}><Glyphicon glyph="remove"/></Button>;
    } 
    return <Button bsSize="small" bsStyle="primary" onClick={this.onAdd}><Glyphicon glyph="plus"/></Button>;
  }
  renderValue = () => {
    if (this.props.tableobject && this.props.tableobject.length > 0) {
      return this.props.tableobject;
    }
    return this.props.value;
  }
  render() {
    return (
      <div>
        <div className="col-md-8">
          <Input type="select" placeholder="select table" value={this.renderValue()} onChange={this.onSelectionChange}>
            {this.renderoptions()}
          </Input>
        </div>
        <div className="col-md-4">
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

MapSelection.propTypes = {
  data: React.PropTypes.object,
  tableobject: React.PropTypes.string,
  value: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  remove: React.PropTypes.boolean
};

export default MapSelection;
