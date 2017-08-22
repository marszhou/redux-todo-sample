const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const newMapOfTodo = action.response.reduce((ret, todo) => {
        ret[todo.id] = todo
        return ret
      }, {})
      return {...state, ...newMapOfTodo}
    default:
      return state
  }
}

export default byId

export const getTodo = (state, id) => state[id]