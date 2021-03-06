import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import { Link } from 'react-router-dom';

import { Card, CardBody,
  CardTitle, } from 'reactstrap';

class Convo extends React.Component {
  state = {
  }


  render() {
    return (
      <Card className="edge-convo">
          <div className="title">{this.props.convo.title}</div>
          <div className="convo-content">            
             {this.props.convo.question}
          </div>
          <div className="convo-status">
            <div className="delete-icon"><i className="material-icons">delete</i></div>
            <div className="responded">{this.props.convo.responses.length > 0 ? <i className="material-icons">message</i> : null}
            </div>
            {this.props.convo.newMessages > 0 ? <div className="new-messages">{this.props.convo.newMessages}</div> : null}
          </div>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(Convo);