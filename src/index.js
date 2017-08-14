// import React from 'react'
// import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
import expect from 'expect'
// import {createStore} from 'redux'
import deepFreeze from 'deep-freeze'
registerServiceWorker();

document.title = 'Redux Full Sample'

const toggleTodo = (todo) => {
  return {...todo, completed: !todo.completed}
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  }
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  }

  deepFreeze(todoBefore)

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo()
console.log('All tests passed')