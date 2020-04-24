import * as React from 'react'

import { Eventual } from '../types'

/**
 * Wraps a promise and returns a type-safe `Eventual` value that properly updates if dependencies change.
 *
 * This hook has two possible return values: `{loading: true}` and `{loading: false, value}`.
 * Typechecker will make sure that you do not accidentally use a value that is not there yet.
 *
 * This hook keeps track of the order in which promises were invoked
 * (this happens each time the dependencies change), and updates the value only when the last
 * promise resolves. Until then, `{loading: true}` will be returned.
 *
 * @param dataSource Function that returns a promise which resolves to a desired value.
 * @param deps If present, returned value will be updated from the provided promise each
 * time the values in the list change.
 */
export const useEventual = <T>(dataSource: () => Promise<T>, deps: React.DependencyList = []): Eventual<T> => {
  const [state, setState] = React.useState<Eventual<T>>({ loading: true })
  const stateVersion = React.useRef(0)

  const incrementVersion = React.useCallback(() => (stateVersion.current = stateVersion.current + 1), [])

  React.useEffect(() => {
    setState({ loading: true })
    incrementVersion()

    const expectedVersion = stateVersion.current

    dataSource().then(result => {
      if (stateVersion.current === expectedVersion) {
        setState({ loading: false, value: result })
      }
    })
  }, deps)

  return state
}
