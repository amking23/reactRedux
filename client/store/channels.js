import axios from 'axios';
import socket from '../socket';

const initialState = {
  channels: [],
}

const GET_CHANNELS = 'GET_CHANNELS';
const ADD_CHANNEL = 'ADD_CHANNEL';
const WRITE_CHANNEL = 'WRITE_CHANNEL';

export function getChannels (channels) {
  const action = {type: GET_CHANNELS, channels};
  return action;
}

export function addChannel (channel) {
  const action = {type: ADD_CHANNEL, channel};
  return action;
}

export function writeChannel (channel) {
  const action = {type: WRITE_CHANNEL, channel};
  return action;
}

export function fetchChannels () {

  return function thunk (dispatch) {
    return axios.get('/api/channels')
    .then(res => res.data)
    .then(channels => {
      const action = getChannels(channels);
      dispatch(action)
    });
  }
}

export function postChannel (channel, history) {

  return function thunk (dispatch) {
    return axios.post('/api/channels', channel)
      .then(res => res.data)
      .then(newChannel => {
        const action = addChannel(newChannel);
        dispatch(action);
        socket.emit('new-channel', newChannel);
        history.push(`/channels/${newChannel.id}`);
      });
  }

}

export function channelReducer (state = initialState, action) {

  switch (action.type) {

    case GET_CHANNELS:
      return {
        ...state,
        channels: action.channels
      };

    case ADD_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel]
      };

    case WRITE_CHANNEL:
      return {
        ...state,
        newChannelEntry: action.channel
      };

    default:
      return state;
  }

}
