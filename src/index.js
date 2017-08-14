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

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
  }
}

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return (<span>{children}</span>)
  }
  return (
    <a href='#'
       onClick={ e => {
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
       }}
    >
      {children}
    </a>
  )
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed
        ? 'line-through' : 'none'
    }}
>{text}</li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {
      todos.map(todo =>
        (<Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
         />)
      )
    }
  </ul>
)

let nextTodoId = 0
const TodoApp = ({todos, visibilityFilter}) => {
  let input
  let visibleTodos = getVisibleTodos(todos, visibilityFilter)

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
    <TodoList
      todos={visibleTodos}
      onTodoClick={ id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />
    <p>
      Show:
      {' '}
      <FilterLink
        filter='SHOW_ALL'
        currentFilter={visibilityFilter}
      >All</FilterLink>
      {', '}
      <FilterLink
        filter='SHOW_ACTIVE'
        currentFilter={visibilityFilter}
      >Active</FilterLink>
      {', '}
      <FilterLink
        filter='SHOW_COMPLETED'
        currentFilter={visibilityFilter}
      >Completed</FilterLink>
    </p>
  </div>)
}

const render = () => {
  ReactDOM.render(
    (<TodoApp {...store.getState()}/>),
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
