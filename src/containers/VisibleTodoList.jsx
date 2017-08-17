import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from '../components/TodoList'
import { toggleTodo } from '../actions'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'

class VisibleTodoList extends React.Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      )
    }
  }

  render() {
    return (<TodoList {...this.props}/>)
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(
      state,
      filter
    ),
    filter
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  {
    onTodoClick: toggleTodo
  }
)(VisibleTodoList))

export default VisibleTodoList