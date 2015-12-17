import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import { connect } from 'react-redux';
import {Modal , Button} from 'react-bootstrap';
class Preview extends Component {
  constructor(props) {
    super(props);
    const { state, mappingsection, homesection, selectmapping, dispatch } = this.props;
    this.uploadpage = state.homesection;
    this.previewPage = state.attributesectionsearch;
    this.actions = bindActionCreators(PreviewActions, dispatch);
    if(this.uploadpage.fileSelected && this.uploadpage.filedata && this.uploadpage.filedata.fileName){
        let filedata = this.uploadpage.filedata;
        this.state = filedata;
        this.state.customHeader = this.previewPage.customHeader;

    }
    this.delimiter = this.previewPage.delimiter;
    this.headers = [];
    this.customHeader = this.previewPage.customHeader;
    this.row1 = [];
    this.row2 = [];
    this.checkboxSelected = true;
    this.noHeader = this.previewPage.noHeader;
    this.dFormat = this.previewPage.dFormat;
    this.noFormat = this.previewPage.noFormat;
    this.proccessNumberFormat();
    this.proccessDateFormat();

  }
  
  componentWillMount() {
    // if (this.uploadpage) {
      let uploadpage = this.uploadpage;
      if(!(uploadpage.fileSelected && uploadpage.filedata && uploadpage.filedata.fileName)){
          console.log('No File selected redirecting to home');
          this.actions.redirectHome([this.delimiter, this.dFormat, this.noFormat, this.noHeader]);
      }
      else{
          this.dateFormat(this,'MM/dd/yyyy');
      }
      console.log('componentWillMount', this.props);
      this.props.attributesectionsearch.synonymsList = this.actions.handleSynonymsList();
      this.actions.handleSynonyms(this.props.attributesectionsearch);
  }
  componentDidMount(){
    
  }
    componentWillReceiveProps(nextProps){
      const { state, dispatch } = nextProps;
      this.previewPage = state.attributesectionsearch;
      this.customHeader = this.previewPage.customHeader;
      this.proccessNumberFormat();
      this.proccessDateFormat();
    }

    close(data) {
      console.log('data', data);
      this.props.attributesectionsearch.showModal = false;
      this.props.attributesectionsearch.autoMap = (data) ? true : false;
      if(this.dFormat==""||this.noFormat==""||this.delimiter==""){
        console.log('please correct the settings to procced');
      }
      else{
        this.actions.handleAutoUpdate(this.props.attributesectionsearch);
        this.actions.redirectMapping([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
      }
      this.setState({});
    }

    open() {
      if(!this.props.mappingsection.autoMappedOnce){
        this.props.attributesectionsearch.showModal = true;
        this.setState({});
      }else{
        this.actions.redirectMapping([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
      }
    }
    createMappingSectionReplaceObject(){
        const { state, dispatch } = this.props;
        // this object is for maintaining and destroying persistance of mapping page state;
        this.mappingsectionstate = state.mappingsection;
        this.mappingsectionstate.headers = [];
        this.mappingsectionstate.mappedData = [];
        this.mappingsectionstate.mappedFields = [];
        this.mappingsectionstate.mappingData = [];
        this.mappingsectionstate.headSelect = '';
        this.mappingsectionstate.pickedTable = '';
    }
    resetPreviewSetting(e) {
    this.delimiter=",";
    this.dFormat = "MM/dd/yyyy";
    this.noFormat = "#,###.##";
    //this.delimiterFormat(e,",");
    //this.dateFormatt(e,"MM/dd/yyyy");
    this.noHeader = true;
    this.createMappingSectionReplaceObject();
    this.actions.handleResetMappingData([this.delimiter,this.dFormat,this.noFormat,this.noHeader],this.mappingsectionstate);
  }

  changeColumn(e,p) {
    if(e.target.checked == false) {
      this.noHeader = false;
      if(this.customHeader.length === 0){
          for(let c=1; c<=this.row1.length; c++){
              this.customHeader.push('Column'+c);
          }
      }
      this.state.customHeader = this.customHeader;
        console.log('handleresetmappingcalled');
        this.createMappingSectionReplaceObject();
      this.actions.handleResetMappingData([this.delimiter,this.dFormat,this.noFormat,this.noHeader],this.mappingsectionstate);
    }
    else{
      this.customHeader = [];
      this.noHeader = true;
      this.state.customHeader = [];
        console.log('handleresetmappingcalled');
        this.createMappingSectionReplaceObject();
      this.actions.handleResetMappingData([this.delimiter,this.dFormat,this.noFormat,this.noHeader],this.mappingsectionstate);
    }
  }
  changeDateFormat(list) {
    let format = this.dFormat;
    console.log("list="+list);
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (isNaN(list[i]) && list[i].match(' ') == false) {
          var d = new Date(list[i]);
          if (d != 'Invalid Date') {
            if('dd-MM-yyyy' == this.guessDateFormat.bind(this, {fileName: this.props.fileName, headers: this.props.headers, rowOne: this.props.rowOne, rowTwo: this.props.rowTwo}, ['dd-MM-yyyy', 'MM/dd/yyyy'], ',')){
              list[i] = new Date(list[i]);
            }
            else{
              var date = d.getDate();
              if (date < 10) date = '0' + date;
              var month = d.getMonth() + 1;
              if (month < 10) month = '0' + month;
              var year = d.getFullYear();
              if (format == 'MM/dd/yyyy')
                list[i] = month + '/' + date + '/' + year;
              else
                list[i] = date + '-' + month + '-' + year;
            }
          }
        }
      };
      return list;
    }
  }
  proccessNumberFormat(){
      if(this.state){
          this.headers = this.splitter(this.state.headers, this.delimiter);
          let rowOne = this.splitter(this.state.rowOne, this.delimiter);
          let rowTwo = this.splitter(this.state.rowTwo, this.delimiter);
          this.row1 = this.changeNumberFormat(rowOne, this.noFormat);
          this.row2 = this.changeNumberFormat(rowTwo, this.noFormat);
      }else{
          console.log('Error : this.state is undefined');
      }
  }
  proccessDateFormat(){
      if(this.state) {
          //this.headers = this.splitter(this.state.headers, this.delimiter);
          //let rowOne = this.splitter(this.state.rowOne, this.delimiter);
          //let rowTwo = this.splitter(this.state.rowTwo, this.delimiter);
          this.row1 = this.changeDateFormat(this.row1);
          this.row2 = this.changeDateFormat(this.row2);
      }
      else {
          console.log('Error : this.state is undefined');
      }
  }
  guessDateFormat(text, possibleDateFormat, delimiter) {
    return possibleDateFormat.filter(testFormat);

    function testFormat(dateFormat) {
      var textArray = [];
      //textArray.push(text.headers);
      textArray.push(text.rowOne);
      textArray.push(text.rowTwo);
      return textArray.every(splitLine);

      function splitLine(line) {
        let wordArray = line.split(delimiter);
        return wordArray.some(testDateFormat);
        function testDateFormat(word) {
          if (isNaN(word)) {
            var d = new Date(word);
            if (d != "Invalid Date") {
                var patt = new RegExp("[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}");
                var patt1 = new RegExp("[d|M]{1,2}\/[d|M]{1,2}\/[y]{4}");
                var res1 = patt.test(word) && patt1.test(dateFormat);

                var patt = new RegExp("[0-9]{1,2}\-[0-9]{1,2}\-[0-9]{4}");
                var patt1 = new RegExp("[d|M]{1,2}\-[d|M]{1,2}\-[y]{4}");
                var res2 = patt.test(word) && patt1.test(dateFormat);
                return res1 || res2;
            }
          }
        }
      }
    }
  }
 dateFormatt(e,p){
    if(p==="MM/dd/yyyy")
      this.dFormat="MM/dd/yyyy";
    if(e && e.target && e.target.value){
        this.dFormat=e.target.value;
    }
     this.proccessDateFormat();
     this.actions.handleCustomHeader([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
 }
  dateFormat(e){
   //console.log("00"+e.target.value);
    this.proccessDateFormat();
    this.actions.handleCustomHeader([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
  }
  numberFormat(e,p){
    if(typeof e === 'string'){
        this.noFormat = e;
    }
    if(e && e.target && e.target.value){
        this.noFormat=e.target.value;
    }
    this.proccessNumberFormat();
    this.actions.handleCustomHeader([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
  }
  delimiterFormat(e,p){
    p==="," ? this.delimiter=",": this.delimiter = e.target.value;
    if(this.delimiter){
        this.headers = this.splitter(this.state.headers, this.delimiter);
        this.row1 = this.splitter(this.state.rowOne, this.delimiter);
        this.row2 = this.splitter(this.state.rowTwo, this.delimiter);
        console.log('handleresetmappingcalled');
        this.createMappingSectionReplaceObject();
        this.actions.handleResetMappingData([this.delimiter,this.dFormat,this.noFormat,this.noHeader],this.mappingsectionstate);
    }
  }
  splitter(data, splittype) {
    return data.split(splittype);
  }
  changeNumberFormat(list, format) {
    for (var i = 0; i < list.length; i++) {
      if (!isNaN(list[i])) {
        if (format == '#,##') {
          if(list[i].indexOf(',')<0)
            list[i] = list[i] + ',00';
        }
        if (format == '#.##') {
          if(list[i].indexOf('.')<0)
            list[i] = list[i] + '.00';
        }

        if (format == '#,###.##') {
          if (list[i].toString().length > 5) {
            list[i] = (list[i]*100 / 100);
            var str = list[i].toString().split('.');  
            if (str[0].length >= 4) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            if (str[1] && str[1].length >= 4) {
                str[1] = str[1].replace(/(\d{3})/g, '$1 ');
            }
            list[i] = str.join('.');
            if(list[i].indexOf('.') < 0){
                list[i] = list[i] + '.00'
            }
          }
        }
        if (format == '#.###,##') {
          var str = list[i].toString();
          if (str.length > 5) {
              str = list[i].slice(0, -5) + '.' + list[i].slice(-3) + '.' + list[i].slice(-3); 
              list[i] = str;
            if(list[i].indexOf(',') < 0){
                list[i] = list[i] + ',00'
            }
          }
        }
      }
    }
    return list;
  }
  thirdStep(e){
    if(this.dFormat==""||this.noFormat==""||this.delimiter==""){
      console.log('please correct the settings to procced');
    }
    else{
     this.actions.redirectMapping([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
    }
  }

  firstStep(){
      if(this.dFormat==""||this.noFormat==""||this.delimiter==""){
          /*no selected*/
          //location.path('/mapping');
          console.log('please correct the settings to procced');
      }
      else {
          this.actions.redirectHome([this.delimiter, this.dFormat, this.noFormat, this.noHeader]);
      }
  }

  reloadStep(e){
    console.log("reload="+e.datePattern+" "+e.numberPattern);
  }

  render() {
   // console.log(this.headers);
    //console.log(this.row1);
   // console.log(this.row2);\
    this.customHeader = [];
    if(!this.noHeader){
        for(let c=1; c <=this.row1.length; c++){
            this.customHeader.push('Column'+c);
        }
    }

    let CHeader = this.customHeader.map(function(head){
        return <th>{head}</th>;
    });
    let header = this.headers.map(function(head){
        return <th>{head}</th>;
    });
    let headerAsData = this.headers.map(function(head){
        return <td>{head}</td>;
    });
    let row1 = this.row1.map(function(i){
        return <td>{i}</td>;
    });
    let row2 = this.row2.map(function(i) {
      return <td>{i}</td>;
    });
    var selectedValue="";
    return (
      <div>
        <div>
          <div className='container'>
            <div className='row'>
            <div className="Preview-Container">
              <div className="upload-container">
                <legend>File Preview</legend>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">First line include header</label>
                    <div className="col-sm-8">
                      <input type="checkbox" checked={this.noHeader}  onChange={this.changeColumn.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Date Format </label>
                    <div className="col-sm-8">
                      <select name="datePattern" value={this.dFormat} className="form-control" onChange={this.dateFormatt.bind(this)} required>
                        <option value=''>select format</option>
                        <option value='dd-MM-yyyy'>dd-MM-yyyy</option>
                        <option value='MM/dd/yyyy'>MM/dd/yyyy</option>
                      </select>
                      { this.dFormat==""&&
                        <div>
                        <label className="errorMessage">Date Required</label>
                       </div>
                    }
                    </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4 control-label">Number Format</label>
                      <div className="col-sm-8">
                        <select name="numberPattern" id="number" value={this.noFormat} className="form-control" onChange={this.numberFormat.bind(this)}  required>
                          <option value="">select format</option>
                          <option value="#,###.##">#,###.##</option>
                          <option value="#.##">#.##</option>
                          <option value="#.###,##">#.###,##</option>
                          <option value="#,##">#,##</option>
                        </select>
                      
                       { this.noFormat==""&&
                        <div>
                        <label className="errorMessage">Number Format Required</label>
                       </div>
                      }

                    </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4 control-label">Delimiter Format</label>
                      <div className="col-sm-8">
                        <select name="decimalSeparator" id="delimiter" value={this.delimiter} className="form-control" onChange={this.delimiterFormat.bind(this)} required>
                          <option value="">select format</option>
                          <option value=",">Comma(,)</option>
                          <option value=";">Semicolon(;)</option>
                          <option value="|">Pipe(|)</option>
                        </select>
                      
                       { this.delimiter==""&&
                        <div>
                        <label className="errorMessage">Delimeter Required</label>
                       </div>
                        }
                     
                    </div>
                    </div>
                </div>
                <div className="row btn-margin btn-Allignment">
                  <button className="btn btn-primary" onClick={this.resetPreviewSetting.bind(this)}>Reset Preview Settings</button>
                </div>
                </div>
                
              </div>
              <div className="clearfix"></div>
              <div className="mappingtop10">
              <table className="table table-bordered ">
                  {
                      !this.noHeader &&
                      <thead>
                      <tr>
                          {CHeader}
                      </tr>
                      </thead>
                  }
                {
                  this.noHeader &&
                  <thead>
                  <tr>
                    {header}
                  </tr>
                </thead>
                }
                <tbody>
                  {
                    !this.noHeader &&
                    <tr>
                      {headerAsData}
                    </tr>
                  }
                  <tr >
                    {row1}
                  </tr>
                  <tr >
                    {row2}
                  </tr>
                </tbody>
              </table>
              </div>
              <div className="btn-set button-container pull-right">
                  <Link to="/"> <button className="btn btn-primary" onClick={this.firstStep.bind(this)}>Back</button></Link>
                  <span> </span>
                  <button className="btn btn-primary" onClick={this.open.bind(this)}>Next</button>                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

        <Modal show={this.props.attributesectionsearch.showModal} onHide={this.close.bind(this)}>

          <Modal.Body>

            <h4>Do you want to do auto mapping ?</h4>
            
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-primary" onClick={this.close.bind(this, true)}>Yes</Button>
            <Button className="btn-primary" onClick={this.close.bind(this, false)}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { mappingsection, attributesectionsearch, homesection, selectmapping } = state;
  return {
    mappingsection, attributesectionsearch, homesection, selectmapping , state
  };
}

Preview.propTypes = {
  attributesectionsearch: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Preview);
