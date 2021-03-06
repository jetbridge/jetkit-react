import * as React from 'react'

import { Eventual } from '../types'
import { useAsyncEffect } from '../useAsyncEffect'

/**
 * Wraps a promise and returns a type-safe `Eventual` value that properly updates if dependencies change.
 *
 * This hook has two possible return values: `{loading: true}` and `{loading: false, value}`.
 * Typechecker will make sure that you do not accidentally use a value that is not there yet.
 *
 * This hook keeps track of the order in which promises were invoked
 * (this happens each time the dependencies change), and updates the value only when the most recet
 * promise resolves. Until then, `{loading: true}` will be returned.
 *
 * @param dataSource Function that returns a promise which resolves to a desired value.
 * @param deps If present, returned value will be updated from the provided promise each
 * time the values in the list change.
 */
export const useEventual = <T>(dataSource: () => Promise<T>, deps: React.DependencyList = []): Eventual<T> => {
  const [state, setState] = React.useState<Eventual<T>>({ loading: true })
  // `stateVersion` keeps track of how many different promises were passed to this hook.
  // On each new promise the stateVersion is bumped and is attached to the promise.
  // When a promise resolves, it's version is compared to the currently expected version,
  // and promise's value is used only when the versions match. If they don't, that means there's a
  // more recent promise that should be used.
  // This helps to achieve a behavior where only the most recent promise is used, regardless of the
  // order in which they resolve.
  const stateVersion = React.useRef(0)

  const incrementVersion = React.useCallback(() => ++stateVersion.current, [])

  useAsyncEffect(async () => {
    setState({ loading: true })
    incrementVersion()

    const expectedVersion = stateVersion.current

    const result = await dataSource()

    if (stateVersion.current === expectedVersion) {
      setState({ loading: false, value: result })
    }
  }, deps)

  return state
}
