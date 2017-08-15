import todos, * as fromTodos from './todos'
import { combineReducers } from 'redux'

export default combineReducers({
  todos,
})

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter)