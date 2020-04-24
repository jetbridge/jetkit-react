import * as React from 'react'

export const useAsyncEffect = (callback: () => Promise<unknown>, deps?: React.DependencyList) => {
  React.useEffect(() => {
    callback()
  }, deps)
}
