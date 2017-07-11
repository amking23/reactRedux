import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import the messages sub-reducer
import messages from './messages';
import {channelReducer} from './channels';
import newMessageEntry from './newMessageEntry';
import nameEntryReducer from './nameEntry'

const reducer = combineReducers({
  messages, channelReducer, nameEntryReducer, newMessageEntry
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;

export * from './messages';
export * from './channels';
export * from './newMessageEntry';
export * from './nameEntry';
