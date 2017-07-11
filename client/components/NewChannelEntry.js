import React, { Component } from 'react';
import store, {writeChannel, postChannel} from '../store/index';
import { connect } from 'react-redux';


// receives dispatch as an argument
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleChange: function (event) {
      dispatch(writeChannel(event.target.value));
    },
    handleSubmit: function (event) {
      console.log('ownProps: ', ownProps)
      event.preventDefault();
      dispatch(postChannel({name: event.target.channelName.value}, ownProps.history));
      dispatch(writeChannel(''));
    }
  };
}

// receives state as an argument
const mapStateToProps = function (state) {
  console.log('state in NewChannelEntry: ', state);
  return {
    newChannelEntry: state.newChannelEntry,
  }
}

export function NewChannelEntry (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input
          className="form-control"
          type="text"
          value={props.newChannelEntry}
          name="channelName"
          placeholder="Enter channel name"
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

/** Write your `connect` component below! **/
const NewChannelEntryContainer = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry);

export default NewChannelEntryContainer;
