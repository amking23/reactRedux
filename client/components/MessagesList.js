import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import store from '../store/index';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

function MessagesList(props) {
  const channelId = Number(props.match.params.channelId); // because it's a string "1", not a number!
  const filteredMessages = props.messages.filter(message => message.channelId === channelId);


  return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
  );
}




/** Write your `connect` component below! **/

const mapStateToProps = function (state, ownProps) {
  return {
    channels: state.channelReducer.channels,
    messages: state.messages
  };
};

const MessagesListContainer = withRouter(connect(mapStateToProps)(MessagesList))

export default MessagesListContainer;
