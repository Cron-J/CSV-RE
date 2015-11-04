import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class ImportView extends Component {
    constructor(props) {
        super(props);
        const { mappingsection, homesection, dispatch } = this.props;
        this.jsonpreview = mappingsection.mappingData;
    }

    importJson() {

    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        let mappingsection = this.props.mappingsection;
        if(mappingsection && mappingsection.mappingData){
            this.jsonpreview = mappingsection.mappingData;
        }
    }
    render() {
        console.log(this.jsonpreview);
        //<!-- <download-json-file data="{{downloadedData}}"></download-json-file> -->
        return (
            <div className="container">
                <div className="row">
                    <div className="upload-container">
                        <legend>Json Preview</legend>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">

                            <div ng-hide="mappedJson">
                                <i className="fa fa-spinner fa-pulse"></i>
                            Processing Json</div>
                            <div className="well" ng-show="mappedJson">
                                <pre></pre>
                                <json-formatter open="7" json="mappedJson"></json-formatter>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-lg-offset-9 btn-set button-container">
                        <button className="btn btn-primary pull-right"  onClick="isBackToThirdStep()">Back</button>

                        <div className="btn btn-primary pull-right" onClick={this.importJson.bind(this)}>Import</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { mappingsection, attributesectionsearch, homesection } = state;
    return {
        mappingsection, attributesectionsearch, homesection
    };
}

ImportView.propTypes = {
    mappingsection: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ImportView);