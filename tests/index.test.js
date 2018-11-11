import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import { createSharedHook, withSharedHooks, useSharedHooksState } from '../src'

test('should update shared state in all dependent components', () => {
  const counter = createSharedHook(useState, { count: 0 })

  const Counter = () => {
    const [state] = useSharedHooksState(state => state.counter)
    return state.count.toString()
  }

  const Increment = () => {
    const [, setState] = useSharedHooksState(state => state.counter)

    return <button onClick={() => setState({ count: 1 })}>+</button>
  }

  const Component = () => (
    <React.Fragment>
      <Increment />
      <Counter />
      <Counter />
    </React.Fragment>
  )

  const WithSharedHooks = withSharedHooks({ counter })(Component)

  const component = renderer.create(<WithSharedHooks />)
  const instance = component.root

  const [, ...before] = component.toJSON()
  expect(before).toEqual(['0', '0'])

  const button = instance.find(el => el.type === 'button')
  button.props.onClick()

  const [, ...after] = component.toJSON()
  expect(after).toEqual(['1', '1'])
})
