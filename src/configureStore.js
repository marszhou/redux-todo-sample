import { createStore } from 'redux'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'
import debounce from 'lodash/debounce'

const configureStore = () => {
  const persistedState = loadState()

  const store = createStore(
    todoApp,
    persistedState
  )

  store.subscribe(debounce(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 500))

  return store
}

export default configureStore