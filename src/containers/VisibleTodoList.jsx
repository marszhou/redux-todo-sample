import { connect } from 'react-redux'
import { getVisibleTodos } from '../selectors'
import TodoList from '../components/TodoList'
import { toggleTodo } from '../actions'

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)