// @flow

import * as React from 'react'
import GlobalContext from './context'

// $FlowFixMe
const { useContext } = React

type SharedHook = {
  Context: React.Context<*>,
  Provider: React.ComponentType<{ children: React.Node }>,
}

export const createSharedHook = (useHook: Function, ...args: any[]) => {
  const Context: React.Context<*> = React.createContext(null)

  const Provider = (props: { children: React.Node }) => {
    const result = useHook(...args)

    return <Context.Provider value={result}>{props.children}</Context.Provider>
  }

  return {
    Context,
    Provider,
  }
}

export const useSharedHooksState = <R: *>(selector: (states: Object) => R): R => {
  const globalContext = useContext(GlobalContext)
  const sharedHook = selector(globalContext.hooks)
  const result = useContext(sharedHook.Context)
  return result
}

export const withSharedHooks = (hooks: { [key: any]: SharedHook }) => (
  Component: React.ComponentType<*>,
) => {
  const hooksArray: Array<SharedHook> = Object.keys(hooks)
    .map(key => hooks[key])
    .reverse()

  const GlobalSharedHooksProvider = (props: *) => {
    const nestedProviders = hooksArray.reduce((acc, { Provider }) => {
      return <Provider>{acc}</Provider>
    }, <Component {...props} />)

    return <GlobalContext.Provider value={{ hooks }}>{nestedProviders}</GlobalContext.Provider>
  }

  return GlobalSharedHooksProvider
}
