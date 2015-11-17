import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import { connect } from 'react-redux';
class Preview extends Component {
  constructor(props) {
    super(props);
    const { state, dispatch } = this.props;
    console.log('eit mode', state);
    // if (state.selectmapping.data) {
    //   this.previewPage = state.selectmapping.data;
    //   this.delimiter = this.previewPage;
    //   console.log('adaas', this.previewPage);
    //   this.noHeader = this.previewPage.includeHeader;
    //   this.dFormat = this.previewPage.dateFormat;
    //   this.noFormat = this.previewPage.numberFormat;
    //   this.thirdStep.bind(this);
    // } else {
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
    this.includeHeader = true;
    this.noHeader = this.previewPage.noHeader;
    this.dFormat = this.previewPage.dFormat;
    this.noFormat = this.previewPage.noFormat;
    this.checkedState = true;
  // }
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
    // } else {
    //   console.log('cAME');
    // }
  }
  componentDidMount(){
    
  }
  resetPreviewSetting(e) {
    console.log('data');
    this.dFormat = "";
    this.noFormat = "";
    this.setState({});
  }

  changeColumn(e) {
    this.checkedState=!this.checkedState;
    if(e.target.checked == false) {
      this.noHeader = true;
      this.includeHeader = false;
      this.setState({});
      for(let c=1; c<=this.row1.length; c++){
        this.customHeader.push('Column'+c);
      }
      this.state.customHeader = this.customHeader;
      this.actions.handleCustomHeader(this.state);
    }
    else{
      this.customHeader = [];
      this.noHeader = false;
      this.includeHeader = true;
      this.setState({});
    }
  }
  changeDateFormat(list,format) {
    this.datFormat=format;
    console.log("list="+list);
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (isNaN(list[i])) {
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
 dateFormatt(e){
   this.dFormat=e.target.value;
     this.headers = this.splitter(this.state.headers, this.delimiter);
    let rowOne = this.splitter(this.state.rowOne, this.delimiter);
    let rowTwo = this.splitter(this.state.rowTwo, this.delimiter);
    this.row1 = this.changeDateFormat(rowOne);
    this.row2 = this.changeDateFormat(rowTwo);
    this.numberFormat(this.noFormat);
    this.setState({});
 }
  dateFormat(e){
   //console.log("00"+e.target.value);
    this.headers = this.splitter(this.state.headers, this.delimiter);
    let rowOne = this.splitter(this.state.rowOne, this.delimiter);
    let rowTwo = this.splitter(this.state.rowTwo, this.delimiter);
    this.row1 = this.changeDateFormat(rowOne);
    this.row2 = this.changeDateFormat(rowTwo);
    this.numberFormat(this.noFormat);
    this.setState({});
  }
  numberFormat(e){
    if(typeof e === 'string'){
        this.noFormat = e;
    }else{
        this.noFormat=e.target.value;
    }
    this.headers = this.splitter(this.state.headers, this.delimiter);
    let rowOne = this.splitter(this.state.rowOne, this.delimiter);
    let rowTwo = this.splitter(this.state.rowTwo, this.delimiter);
    this.row1 = this.changeNumberFormat(rowOne, this.noFormat);
    this.row2 = this.changeNumberFormat(rowTwo, e.noFormat);
    this.setState({});
  }
  delimiterFormat(e){
    console.log('Delimiter Format', e.target.value);
    this.delimiter = e.target.value;
    this.headers = this.splitter(this.state.headers, this.delimiter);
    this.row1 = this.splitter(this.state.rowOne, this.delimiter);
    this.row2 = this.splitter(this.state.rowTwo, this.delimiter);
    this.setState({});
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
        /*no selected*/
       //location.path('/mapping');
      console.log('please correct the settings to procced');
    }
    else{
      console.log('jrrrr');
     /*redirect to mapping*/
     // window.location.href = '/mapping';
     this.actions.redirectMapping([this.delimiter,this.dFormat,this.noFormat,this.noHeader]);
    }
    //location.path('/mapping');
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
              <div className="upload-container">
                <legend>File Preview</legend>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">First line include header</label>
                    <div className="col-sm-8">
                      <input type="checkbox" checked={this.checkedState}  onChange={this.changeColumn.bind(this)}/>
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
                <div className="row btn-margin">
                  <button className="btn btn-primary" onClick={this.resetPreviewSetting.bind(this)}>Reset Preview Settings</button>
                </div>
                </div>
                
              </div>

              <table className="table table-bordered">
                {
                  this.includeHeader &&
                  <thead ng-show="fileStyle.includeHeader">
                  <tr>
                    {header}
                  </tr>
                </thead>
                }
                {
                  this.noHeader &&
                  <thead ng-show="!fileStyle.includeHeader">
                  <tr>
                    {CHeader}
                  </tr>
                </thead>
                }
                <tbody>
                  {
                    this.noHeader &&
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
              <div className="btn-set button-container pull-right">
                  <Link to="/"> <button className="btn btn-primary" onClick={this.firstStep.bind(this)}>Back</button></Link>
                  <span> </span>
                  <button className="btn btn-primary" onClick={this.thirdStep.bind(this)}>Next</button>                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

Preview.propTypes = {
  attributesectionsearch: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Preview);
