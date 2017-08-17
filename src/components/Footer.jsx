import React from 'react'
import FilterLink from '../containers/FilterLink'

export default () => {
  return (
    <p>
      过滤:
      {' '}
      <FilterLink
        filter='all'
      >全部</FilterLink>
      {', '}
      <FilterLink
        filter='active'
      >未完成</FilterLink>
      {', '}
      <FilterLink
        filter='completed'
      >已完成</FilterLink>
    </p>
  )
}