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
  	} else {
      e.preventDefault();
    }
  }
  isSelectionValid = (level) => {
    if (this.props.selectionlevel) {
      if (this.props.selectionlevel.indexOf(level) > -1) {
        return true
      }
      return false;
    }
    return true;
  }
  getHiglightStyle = (value) => {
    if (this.props.highlightItems && this.props.highlightItems[value]) {
      return this.props.highlightItems[value];
    }
    return {};
  }
  renderChild = (data, value, level) => {
  	let children = [];
  	if (data) {
	  	for (let i = 0; i < data.length; i++) {
        const style = {};
        const isValidSelection = this.isSelectionValid(level);
        style.paddingLeft = level * 9;
        if (data[i].value === value && isValidSelection) {
          style.fontSize = 17;
          style.fontStyle = 'italic';
        }
        const highlightstyle = this.getHiglightStyle(data[i].value);
        const newstyle = {...style, ...highlightstyle}
        if (!isValidSelection) {
          children.push(<optgroup label={data[i].value}></optgroup>);
        } else {
          children.push(<option value={data[i].value} style={newstyle}>{data[i].label}</option>);
        }
        children = children.concat(this.renderChild(data[i].children, value, level+1));
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
  onItemSelect: React.PropTypes.func,
  selectionlevel: React.PropTypes.arrayOf(React.PropTypes.number),
  highlightItems: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default ListBox;