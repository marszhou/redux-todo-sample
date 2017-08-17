import { createStore } from 'redux'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'
import debounce from 'lodash/debounce'

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

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(
    todoApp,
    persistedState
  )
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLogginToDispatch(store)
  }

  store.subscribe(debounce(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 500))

  return store
}

export default configureStore