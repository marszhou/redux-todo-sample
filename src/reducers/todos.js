import todo from './todo'

export default (state = [], action) => {
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

export const getVisibleTodos = (
  state,
  filter
) => {
  switch (filter) {
    case 'all':
      return state
    case 'active':
      return state.filter(t => !t.completed)
    case 'completed':
      return state.filter(t => t.completed)
    default:
      throw Error(`Unknown filter [${filter}]`)
  }
}