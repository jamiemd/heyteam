import React from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Response from './Response';
import './convo_detail.css';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
import { getConvos, editConversation, deleteConvo } from '../../actions/convoAction';
import { ModalBody, ModalFooter, Modal, Button } from 'reactstrap';

class ViewConvo extends React.Component {
  state = {
    redirect: false,
    convoId: '',
    modal: false
  };

  componentDidMount() {
    this.props.getConvos();
    const convoId = this.props.match.params.id;
    this.setState({convoId});
    this.props.editConversation(convoId, 'resetNewMessage');
  }

  toggle(action) {
    this.setState({
      modal: !this.state.modal
    });

    if(action === 'delete'){
      this.props.deleteConvo(this.state.convoId, this.props.history);
    }
  }

  render() {
    if(this.props.convos.convos.length < 1) return null;
    const id = this.props.match.params.id;
    const convo = this.props.convos.convos.find(convo => {
      return convo._id === id;
    });
    const userNames = convo.responses.map(res=>{
      return res.username;  
    });
    const unresponded = convo.participants.filter(user=>{
      return !userNames.includes(user.name);
    });
    
    return (
      <main id='viewconvo-main'>
          {!this.props.loading ? 
          <div className="viewconvo">
            <div className="participants-edit">
              <div className="part-title">
                Participants
              </div>

              <div className="part-edit-delete">
                <Link to={`edit/${convo._id}`}>
                  {!convo.dateSent ? <span className="edit-icon"><i className="material-icons">edit</i></span> : null }
                </Link>
                <div className="delete-convo">
                  <span className="delete-icon" onClick={()=>{this.toggle()}}><i className="material-icons">delete</i></span>

                </div>
              </div>
            </div>
                <div className="participants">
                  {
                    convo.participants.map(participant => {
                      const img = participant.profile.image_32;
                      const name = participant.profile.display_name;
                      return (
                        <div key={participant.id} className="participant">
                        <div className="image" alt=""><img src={`${img}`} /></div>
                        <div className="display-name">{name}</div>
                        </div>
                      )
                    })
                  }
                </div>
                <br/>
                <div className="q-title">Question</div>
                <div className="question-box">
                  {convo.question}
                </div>
                <br/>
                <div className="schedule-title">Schedule</div>
                <div className="schedule-time">{convo.dateSent? convo.dateSent : convo.created_on}</div>
                <br/>
                <div className="schedule-title">Unresponded</div>
                <div className="participants">
                  {
                      unresponded.map(participant=>{
                        const img = participant.profile.image_32;
                        const name = participant.profile.display_name;
                        return (<div className="participant">
                        <div className="image" alt=""><img src={`${img}`} /></div>
                        <div className="display-name">{name}</div>
                        </div>)
                      })
                  }
                </div>
                <div className="res-title">Responses</div>
                <div className="response-boxes">
                  { convo.responses.length > 0 ? convo.responses.map(response => {
                      return (
                        <Response question={convo.question} response={response}/>
                      )
                    }) : 'No responses yet'
                  }
                </div>
              </div>
              :
              <div>
                <Loading />
              </div>}
            <div>
              {this.state.redirect ? <Redirect to='/404' /> : null}
            </div>
            <Card/>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            Delete this conversation?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={()=>{this.toggle('delete')}}>Delete</Button>{' '}
            <Button color="secondary" onClick={()=>{this.toggle()}}>Cancel</Button>
          </ModalFooter>
        </Modal>
          </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, {deleteConvo, getConvos, editConversation})(ViewConvo);
