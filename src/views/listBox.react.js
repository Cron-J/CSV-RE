import React, { Component, PropTypes } from 'react';

class ListBox extends Component {
  constructor(props) {
      super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  selectItem = (e) => {
  	if (this.props.onItemSelect) {
  		this.props.onItemSelect(e.target.value);
  	}
    e.preventDefault();
  }
  renderChild = (data, value, padding) => {
  	let children = [];
  	if (data) {
	  	for (let i = 0; i < data.length; i++) {
	  		if (data[i].value === value) {
	  			children.push(<option value={data[i].value} style={{fontSize: 17, fontStyle: 'italic', paddingLeft: padding}}>{data[i].label}</option>);
	  		} else {
	  			children.push(<option value={data[i].value} style={{paddingLeft: padding}}>{data[i].label}</option>);
	  		}
        children = children.concat(this.renderChild(data[i].children, value, padding+9));
	  	}
  	}
  	return children;
  }
  render() {
    return (
    	<select value={this.props.value} className="mapping-select" size="20" onClick={this.selectItem}>
        {this.renderChild(this.props.data, this.props.value, 0)}
      </select>
   	);
  }
}

ListBox.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.string),
  value: React.PropTypes.string,
  onItemSelect: React.PropTypes.func
};

export default ListBox;