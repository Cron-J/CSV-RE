class ImportView extends Component {
    constructor(props) {
        super(props);
    }
    render{
    	return(
    		<div className="row">
				<div className="upload-container">
      				<legend>Json Preview</legend>
  				</div>
  				<div className="col-lg-6">
				    <div className="row">

				      <div ng-hide="mappedJson"><i className="fa fa-spinner fa-pulse"></i> Processing Json</div>
				    	<div className="well" ng-show="mappedJson">
				    	 <json-formatter open="7" json="mappedJson"></json-formatter>
				    	</div>
				    	</div>
				 	</div>
				 	<div className="col-lg-3 col-lg-offset-9 btn-set button-container">
							<button className="btn btn-primary pull-right"  onClick="isBackToThirdStep()">Back</button>
				    <!-- <download-json-file data="{{downloadedData}}"></download-json-file> -->

				    <div className="btn btn-primary pull-right" onClick={this.importJson()} >Import</a>
					</div>
				</div>
    		)
    }
}
