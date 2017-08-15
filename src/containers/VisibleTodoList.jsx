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

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList))