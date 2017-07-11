import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import store from '../store/index';
import { connect } from 'react-redux'

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!

function ChannelList(props) {
  console.log('props: ', props)
  return (
    <ul>
      {props.channels.map((channel) =>
        <li key={channel.id}>
          <NavLink to={ `/channels/${channel.id}` } activeClassName="active">
            <span> #{channel.name} </span>
            <span className="badge">{ props.messages.filter(message => channel.id === message.channelId).length }</span>
          </NavLink>
        </li>
        )}
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}




/** Write your `connect` component below! **/

const mapStateToProps = function (state) {
  return {
    channels: state.channelReducer.channels,
    messages: state.messages
  };
};

const ChannelListContainer = withRouter(connect(mapStateToProps)(ChannelList))

export default ChannelListContainer;
