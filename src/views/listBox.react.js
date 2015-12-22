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
  renderChild = (selectionlevel, data, value, level) => {
  	let children = [];
  	if (data) {
	  	for (let i = 0; i < data.length; i++) {
        const style = {};
        style.paddingLeft = level * 9;
        if (data[i].value === value && (selectionlevel === level || !selectionlevel)) {
          style.fontSize = 17;
          style.fontStyle = 'italic';
        }
        children.push(<option value={data[i].value} style={style}>{data[i].label}</option>);
        children = children.concat(this.renderChild(selectionlevel, data[i].children, value, level+1));
	  	}
  	}
  	return children;
  }
  render() {
    return (
    	<select value={this.props.value} className="mapping-select" size="20" onClick={this.selectItem}>
        {this.renderChild(this.props.selectionlevel, this.props.data, this.props.value, 0)}
      </select>
   	);
  }
}

ListBox.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.string),
  value: React.PropTypes.string,
  onItemSelect: React.PropTypes.func,
  selectionlevel: React.PropTypes.number
};

export default ListBox;