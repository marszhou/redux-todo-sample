// import React from 'react'
// import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
// import expect from 'expect'
import {createStore} from 'redux'
// import deepFreeze from 'deep-freeze'
registerServiceWorker();

document.title = 'Redux Full Sample'

const todo = (state={}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        completed: state.id === action.id ?
          !state.completed : state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = (state = {}, action ) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}

const store = createStore(todoApp)

console.group('Dispatching ADD_TODO')
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
})
console.log('Current State')
console.log(store.getState())
console.groupEnd()

console.group('Dispatching another ADD_TODO')
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go Shopping'
})
console.log('Current State')
console.log(store.getState())
console.groupEnd()

console.group('Dispatching TOGGLE_TODO 1')
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
})
console.log('Current State')
console.log(store.getState())
console.groupEnd()

console.group('Dispatching SET_VISIBILITY_FILTER')
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
console.log('Current State')
console.log(store.getState())
console.groupEnd()