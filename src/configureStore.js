import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import todoApp from './reducers'

const thunk = (store) => (next) => (action) => {
  return typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)
}

const configureStore = () => {
  const middlewares = [thunk]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  )
}

export default configureStore