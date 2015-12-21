import React from 'react';
import { BootstrapTable, TableHeaderColumn, TableDataSet } from 'react-bootstrap-table';

class Customtable extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  _renderColumn = () => {
    const tableheaders = [];
    let keyCount = 0;
    for (let i = 0; i < this.props.headers.length; i++) {
      tableheaders.push(<TableHeaderColumn dataSort isKey={keyCount === 0 ? true: false} dataField={this.props.headers[i]}>{this.props.headers[i]}</TableHeaderColumn>);
      keyCount++;
    }
    return tableheaders;
  }
  render() {
    return (
      <BootstrapTable data={this.props.data} striped hover>
        {this._renderColumn()}
      </BootstrapTable>
    )
  }
}

Customtable.propTypes = {
  headers: React.PropTypes.array,
  data:React.PropTypes.arrayOf[React.PropTypes.object]
};

export default Customtable;
