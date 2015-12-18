import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';

import * as PreviewActions from 'actions/previewPage/PreviewActions';
class ImportView extends Component {
    constructor(props) {
        super(props);
        const { mappingsection, homesection, dispatch } = this.props;
        console.log(this.state);
        this.mappedJson="";
        this.jsonFormated="";     
        this.jsonpreview = mappingsection.mappingData.convertedJSON;
        this.stringJSon=JSON.stringify(this.jsonpreview,null,4);
        this.actions = bindActionCreators(PreviewActions, dispatch);
        
    }
 
    importJson() {

    }
    isBackToThirdStep(e){
        this.actions.redirectMapping();
    }
    componentWillReceiveProps(nextProps){
        console.log("In componentWillReceiveProps");
        this.props = nextProps;
        let mappingsection = this.props.mappingsection;
        if(mappingsection && mappingsection.mappingData && mappingsection.mappingData.convertedJSON){
            this.jsonpreview = mappingsection.mappingData.convertedJSON;
        }
        console.log("json"+this.jsonpreview);
    }
    render() {     
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
                       
                           <div>
                             <pre>{<JSONTree data={ this.jsonpreview }/>}</pre>                                                   
                           </div>
                        
                        </div>
                    </div>
                    <div className="col-lg-3 col-lg-offset-9 btn-set button-container">
                        <button className="btn btn-primary pull-right"  onClick={this.actions.redirectMapping}>Back</button>
                        <span> </span>
                        <div className="btn btn-primary pull-right" onClick={this.importJson.bind(this)}>Download</div>
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