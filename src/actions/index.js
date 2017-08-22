import {v4} from 'node-uuid'
import * as api from '../api'

export const requestTodos = (filter) => ({
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

export const fetchTodos = (filter) =>
  // undefined
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  )