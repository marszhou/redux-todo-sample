import {v4} from 'node-uuid'
import * as api from '../api'
import { getIsFetching } from '../reducers'

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  text,
  id: v4()
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

const receiveTodos = (filter,response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return
  }

  dispatch(requestTodos(filter))
  return api.fetchTodos(filter).then(response =>
    dispatch(receiveTodos(filter, response))
  )
}