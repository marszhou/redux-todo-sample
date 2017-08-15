import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
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

export default connect()(AddTodo)