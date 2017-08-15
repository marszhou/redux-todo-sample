import todos from './reducers/todos'
import visibilityFilter from './reducers/visibilityFilter'
import { createStore, combineReducers } from 'redux'

export default createStore(
  combineReducers({
    todos,
    visibilityFilter
  })
)