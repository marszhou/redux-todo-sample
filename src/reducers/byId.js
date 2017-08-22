const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const newMapOfTodo = action.response.reduce((ret, todo) => {
        ret[todo.id] = todo
        return ret
      }, {})
      return {...state, ...newMapOfTodo}

    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response
      }

    default:
      return state
  }
}

export default byId

export const getTodo = (state, id) => state[id]