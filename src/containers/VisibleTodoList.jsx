import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import TodoList from '../components/TodoList'
import * as actions from '../actions'
import { getVisibleTodos } from '../reducers'

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    const { filter, fetchTodos} = this.props
    fetchTodos(filter)
  }

  render() {
    const { toggleTodo, ...rest } = this.props
    return (
      <TodoList
        onTodoClick={toggleTodo}
        {...rest}
      />
    )
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
  actions
)(VisibleTodoList))

export default VisibleTodoList