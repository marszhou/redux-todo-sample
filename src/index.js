import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './configureStore'
import Root from './components/Root'

registerServiceWorker();
document.title = 'Redux Full Sample'

const store = configureStore()
ReactDOM.render(
  (
    <Root store={store} />
  ),
  document.getElementById('root')
)