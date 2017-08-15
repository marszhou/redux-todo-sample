import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import TodoApp from './App'
import store from './store'

registerServiceWorker();
document.title = 'Redux Full Sample'

ReactDOM.render(
  (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  ),
  document.getElementById('root')
)