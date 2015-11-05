import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
class ImportFile extends Component {

    constructor(props) {
        super(props);
        var { importsection,mappingsection,dispatch } = this.props;
        this.state=importsection;
        this.actions = bindActionCreators(PreviewActions, dispatch);
        console.log(this.props);
        this.importJson=[
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
           this.stringJSon=JSON.stringify(this.importJson,null,4); 
           console.log(this.parseJson(this.stringJSon));
    	
    }
    parseJson(json){
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        return '' + match + '';
    });
    }
    render(){
        var data=this.parseJson(this.stringJSon);
    	return(
    		<div className="container">
            <p>This is Import View</p>
            <div className="row">
            <div className="col-mad-6">
                <div className="panel panel-default">
                    <div className="panel-body">{data}</div>
                    </div>
                </div>
             </div>
             
            <div>
                 <Link to="/"> <button className="btn btn-primary" onClick={this.actions.redirectMapping}>Back</button></Link>
            </div>
            </div>
    		);
    }
}
function mapStateToProps(state) {
    var { importsection } = state;
    return {
        importsection
    };
}

ImportFile.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ImportFile);