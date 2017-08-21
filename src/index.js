import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { reducer as reduxFormReducer } from 'redux-form'

injectTapEventPlugin()

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)



ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
