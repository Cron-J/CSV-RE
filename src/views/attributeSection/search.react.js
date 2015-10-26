import React from 'react';
import { Input, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as SearchActions from 'actions/attributeSection/SearchActions';
import EditDeleteForTable from '../EditDeleteForTable.react';
import { BootstrapTable, TableHeaderColumn, TableDataSet } from 'react-bootstrap-table';
import { connect } from 'react-redux';
// import styles from 'scss/_common';

class AttributeSectionSearch extends React.Component {
  constructor(props) {
    super(props);
    const { attributesectionsearch, dispatch } = this.props;
    this.state = attributesectionsearch;
    this.tableDataSet = BootstrapTable.TableDataSet;
    this.dataSet = new TableDataSet(this.state.finaldata);
    this.actions = bindActionCreators(SearchActions, dispatch);
  }
  handleChange(item, e) {
    const change = this.state;
    change[item] = e.target.value;
    this.actions.handleChanges(change);
  }
  _attributeSectionNamesFormat = (cell) => {
    if (cell.length > 0) {
      return cell[0].name;
    }
    return '';
  }
  _attributeSectionDescriptionFormat = (cell) => {
    if (cell.length > 0) {
      return cell[0].description;
    }
    return '';
  }
  _actionFormat = (cell, row) => {
    return (<EditDeleteForTable id={row.id} editAction={this._editAction} deleteAction={this._deleteAction} />);
  }
  _editAction = (id) => {
    this.actions.editPage(id);
  }
  _deleteAction = (id) => {
    this.actions.deleteId(id);
  }

  _search = () => {
    const attributeSectionId = this.props.attributesectionsearch.attributeSectionId;
    const name = this.props.attributesectionsearch.name;
    const description = this.props.attributesectionsearch.description;
    this.actions.search({
      attributeSectionId: attributeSectionId,
      name: name,
      description: description
    });
  }
  _reset = () => {
    const change = this.state;
    // attributeSectionId
    change.attributeSectionId = '';
    // name
    change.name = '';
    // description
    change.description = '';
    // final data
    change.finaldata = [];
    // record count
    change.recordCount = '';
    // hide/show table
    change.showSearchResult = 'hidden';
    this.actions.reset(change);
  }
  render() {
    return (
      <div className="container">
        <div>
          <h1>Attribute Sections</h1>
          <h3>Search Attribute Section</h3>
        </div>
        <div className="col-md-2 col-md-offset-10">
          <div className="col-md-6 col-md-offset-4" >
            <Link to="/attributeSection"><Button bsStyle="primary">New</Button></Link>
          </div>
        </div>
        <form className="form-horizontal">
         <div className="row">
          <div className="col-md-6">
            <Input type="text" label="Attribute Section ID" labelClassName="col-xs-3" wrapperClassName="col-xs-6" value={this.props.attributesectionsearch.attributeSectionId}
            onChange={this.handleChange.bind(this, 'attributeSectionId')} />
            <Input type="textarea" label="Description" labelClassName="col-xs-3" wrapperClassName="col-xs-6" value={this.props.attributesectionsearch.description}
            onChange={this.handleChange.bind(this, 'description')} rows={4} />
          </div>
          <div className="col-md-6 form-group">
            <Input type="textarea" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-6" value={this.props.attributesectionsearch.name}
            onChange={this.handleChange.bind(this, 'name')} rows={2} />
          </div>
          </div>
          <div className="col-md-2 col-md-offset-10">
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this._search}>Search</Button>
              <Button onClick={this._reset}>Reset</Button>
            </ButtonToolbar>
          </div>
        </form>
        <br/><br/>
        <div><h4>{this.props.attributesectionsearch.recordCount}</h4></div>
        <div className={this.props.attributesectionsearch.showSearchResult}>
          <BootstrapTable data={this.props.attributesectionsearch.finaldata} striped hover pagination>
            <TableHeaderColumn dataField="attributeSectionId" width="15%" isKey dataSort>Attribute Section Id</TableHeaderColumn>
            <TableHeaderColumn dataField="AttributeSectionNames" width="30%" dataFormat={this._attributeSectionNamesFormat} dataSort>Name</TableHeaderColumn>
            <TableHeaderColumn dataField="AttributeSectionDescriptions" width="30%" dataFormat={this._attributeSectionDescriptionFormat} dataSort>Description</TableHeaderColumn>
            <TableHeaderColumn dataField="orderNo" width="15%" dataSort>Order No</TableHeaderColumn>
            <TableHeaderColumn dataField="" width="10%" dataFormat={this._actionFormat}>Action</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { attributesectionsearch } = state;
  return {
    attributesectionsearch
  };
}

AttributeSectionSearch.propTypes = {
  attributesectionsearch: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(AttributeSectionSearch);
