import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getVisibleTodos } from '../selectors'
import TodoList from '../components/TodoList'
import { toggleTodo } from '../actions'

const mapStateToProps = (state, { params }) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      params.filter || 'all'
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    onTodoClick: toggleTodo
  }
)(TodoList))