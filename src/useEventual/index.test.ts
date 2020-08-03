import { renderHook, act } from '@testing-library/react-hooks'
import { useEventual } from './index'

const mockPromise = <T>() => {
  let resolve: ((value: T | PromiseLike<T>) => void) | null = () => {}
  const promise = new Promise<T>(_resolve => {
    resolve = _resolve
  })

  return { promise, resolve }
}

test(`only the last promise's value is used`, async () => {
  const promise1 = mockPromise<string>()
  const promise2 = mockPromise<string>()
  const promise3 = mockPromise<string>()

  // Hook will update only when dependencies change, not the promise itself, so we have to pass
  // something unique in deps each time we want to see a change.
  const { result, rerender } = renderHook(({ promise, id }) => useEventual(() => promise, [id]), {
    initialProps: { promise: promise1.promise, id: 1 },
  })

  // Hook will return {loading: true} until the most recet promise is resolved
  expect(result.current).toEqual({ loading: true })

  rerender({ promise: promise2.promise, id: 2 })
  expect(result.current).toEqual({ loading: true })

  rerender({ promise: promise3.promise, id: 3 })
  expect(result.current).toEqual({ loading: true })

  // Resolving promises in random order
  // First one is ignored because hook waits for more recent promise to resolve
  await act(async () => {
    promise1.resolve('result1')
  })
  expect(result.current).toEqual({ loading: true })

  // Third one is used because it was passed to the hook last
  await act(async () => {
    promise3.resolve('result3')
  })
  expect(result.current).toEqual({ loading: false, value: 'result3' })

  // Second one is ignored because more recent promise was used already
  await act(async () => {
    promise2.resolve('result2')
  })
  expect(result.current).toEqual({ loading: false, value: 'result3' })
})
