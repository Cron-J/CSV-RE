import React from 'react';

class MapSelection extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  renderoptions = () => {
    const options = [];
    if (this.props.data) {
      for (let i = 0; i < this.props.data.length; i++) {
        options.push(<option value={this.props.data[i].value}>{this.props.data[i].label}</option>);
      }
    }
    return options;
  }
  render() {
    return (
      <select value={this.props.value}>
        {this.renderoptions()}
      </select>      
    );
  }
}

MapSelection.propTypes = {
  data: React.PropTypes.object,
  value: React.PropTypes.string,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func
};

export default MapSelection;
