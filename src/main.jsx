import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers} from 'redux'
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

class FilterLink extends React.Component {
  componentWillMount() {
    const {store} = this.props
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const props = this.props
    const {store} = props
    const state = store.getState()

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    )
  }
}

const Footer = ({store}) => {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter='SHOW_ALL'
        store={store}
      >All</FilterLink>
      {', '}
      <FilterLink
        filter='SHOW_ACTIVE'
        store={store}
      >Active</FilterLink>
      {', '}
      <FilterLink
        filter='SHOW_COMPLETED'
        store={store}
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

class VisibleTodoList extends React.Component {
  componentWillMount() {
    const {store} = this.props
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const props = this.props
    const {store} = props
    const state = store.getState()

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    )
  }
}

const AddTodo = ({
  store
}) => {
  let input

  return (
    <form
      onSubmit={ e => {
        e.preventDefault()
        let text = input.value.trim()
        if (text.length === 0) return
        store.dispatch({
          type: 'ADD_TODO',
          text,
          id: nextTodoId++
        })
        input.value = ''
        input.focus()
      }}
    >
      <input type='text' ref={node => input = node}/>
      <button>Add Todo</button>
    </form>
  )
}

let nextTodoId = 0
const TodoApp = ({store}) => {
  return (<div>
    <AddTodo store={store}/>
    <VisibleTodoList store={store}/>
    <Footer store={store}/>
  </div>)
}

ReactDOM.render(
  (<TodoApp store={createStore(todoApp)}/>),
  document.getElementById('root')
)