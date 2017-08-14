import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker';
// import expect from 'expect'
import {createStore, combineReducers} from 'redux'
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

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(todoApp)

let nextTodoId = 0
const TodoApp = ({todos}) => {
  let input
  return (<div>
    <form
      onSubmit={ e => {
        e.preventDefault()
        let text = input.value.trim()
        if (text.length === 0) return
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
        input.value = ''
        input.focus()
      }}
    >
      <input type='text' ref={node => input = node}/>
      <button>Add Todo</button>
    </form>
    <ul>
      {
        todos.map(todo => (
          <li key={todo.id}
              onClick={
                () => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  })
                }
              }
              style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
          >{todo.text}</li>
        ))
      }
    </ul>
  </div>)
}

const render = () => {
  ReactDOM.render(
    (<TodoApp todos={store.getState().todos}/>),
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
