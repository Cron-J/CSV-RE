import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PreviewActions from 'actions/previewPage/PreviewActions';
class ImportView extends Component {
    constructor(props) {
        super(props);
        const { mappingsection, homesection, dispatch } = this.props;
        console.log(this.state);
        this.mappedJson;
        this.jsonpreview = [
                    {
                        "product":"pen",
                        "ProductId":100,
                        "price":100
                    },
                    {
                        "product":"pencile",
                        "ProductId":101,
                        "price":101
                    },
                    {
                        "product":"ink",
                        "ProductId":102,
                        "price":102
                    }

            ];
        this.stringJSon=JSON.stringify(this.jsonpreview,null,4); 
        this.actions = bindActionCreators(PreviewActions, dispatch);
        console.log("json",this.stringJSon.length);
    }

    importJson() {

    }
    isBackToThirdStep(e){
        this.actions.redirectMapping();
    }
    parseJson(json){
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        return '<span>' + match + '</span>';
    });

    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        let mappingsection = this.props.mappingsection;
        if(mappingsection && mappingsection.mappingData){
            this.jsonpreview = mappingsection.mappingData;
        }
    }
    render() {     
        return (
            <div className="container">
                <div className="row">dir

                    <div className="upload-container">
                        <legend>Json Preview</legend>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div ng-hide="mappedJson">
                                <i className="fa fa-spinner fa-pulse"></i>
                            Processing Json</div>
                           <div className="panel panel-default">
                           <div className="panel-body">
                                {this.stringJSon}
                           </div>
                         
                           </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-lg-offset-9 btn-set button-container">
                        <button className="btn btn-primary pull-right"  onClick={this.actions.redirectMapping}>Back</button>
                        <span>      </span>
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