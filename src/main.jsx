import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'

let nextTodoId = 0
const addTodo = (text) => ({
  type: 'ADD_TODO',
  text,
  id: nextTodoId++
})

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

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

const Link = ({
  active,
  onClick,
  children
}) => {
  if (active) {
    return (
      <span>
        {children}
      </span>
    )
  }
  return (
    <a href='#'
       onClick={ e => {
        e.preventDefault()
        onClick()
       }}
    >
      {children}
    </a>
  )
}

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick() {
      dispatch(
        setVisibilityFilter(ownProps.filter)
      )
    }
  }
}
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

const Footer = () => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter='SHOW_ALL'
      >All</FilterLink>
      {', '}
      <FilterLink
        filter='SHOW_ACTIVE'
      >Active</FilterLink>
      {', '}
      <FilterLink
        filter='SHOW_COMPLETED'
      >Completed</FilterLink>
    </p>
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

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <form
      onSubmit={ e => {
        e.preventDefault()
        let text = input.value.trim()
        if (text.length === 0) return
        dispatch(addTodo(text))
        input.value = ''
        input.focus()
      }}
    >
      <input type='text' ref={node => input = node}/>
      <button>Add Todo</button>
    </form>
  )
}
AddTodo = connect()(AddTodo)

const TodoApp = () => {
  return (<div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>)
}

ReactDOM.render(
  (
    <Provider store={createStore(todoApp)}>
      <TodoApp />
    </Provider>
  ),
  document.getElementById('root')
)