# react-shared-hooks

POC of global react hooks. Makes it possible to use global states based on hooks.

## Usage:

```js
import * as React from 'react'
import { createSharedHook, useSharedHook, withSharedHooks } from 'react-shared-hooks'

const { useState } = React

const counter = createSharedHook(useState, { count: 0 })

const Counter = () => {
  const [state, setState] = useSharedHook(hooks => hooks.counter)

  return (
    <div>
      {state.count}
      <button onClick={() => setState({ count: state.count + 1 })}>+</button>
    </div>
  )
}

const App = () => (
  <React.Fragment>
    <Counter />
    <Counter />
  </React.Fragment>
)

export default withSharedHooks({ counter })(App)

```

## API

### `createSharedHooks(hook, ...args)`
- `hook`: *function* - react hook
- `...args`: *any* - arguments that will be passed at the time of the hook initialization

### withSharedHooks(hooks)(Component)
- `hooks`: *object* - object of created hooks
- `Component`: *React Component* - wrapped component

### useSharedHook(selector)
- `selector`: *function* - selector function that receives object of all hooks

## Examples

* Simple `useState` - https://codesandbox.io/s/9zy9jwkyj4
* Inputs - https://codesandbox.io/s/kw43p7m0vr
* With `useReducer` - https://codesandbox.io/s/7yrzn42w8x
