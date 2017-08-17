import { createStore } from 'redux'
import todoApp from './reducers'

const addLogginToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
  }

  return (action) => {
    console.group(action.type)
    console.log('%c pre state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch
  return (action) => {
    if (action && typeof action.then === 'function') {
      return action.then(rawDispatch)
    }
    return rawDispatch(action)
  }
}

const configureStore = () => {
  const store = createStore(
    todoApp
  )
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLogginToDispatch(store)
  }
  store.dispatch = addPromiseSupportToDispatch(store)

  return store
}

export default configureStore