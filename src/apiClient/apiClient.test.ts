import path from 'path'

describe('BASE_URL env var is correctly loaded into apiClient.defaults.baseURL', () => {
  const OLD_ENV = process.env
  const loadApiClient = () => require(path.resolve(__dirname, 'index')).default

  beforeEach(() => {
    jest.resetModules() // clears the cache
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  test('REACT_APP_BASE_URL is loaded if present on env', () => {
    // arrange
    const baseUrlReact = 'reactjs.org'
    process.env.REACT_APP_BASE_URL = baseUrlReact

    // act
    const apiClient = loadApiClient()

    // assert
    expect(apiClient.defaults).toBeDefined()
    expect(apiClient.defaults.baseURL).toEqual(baseUrlReact)
  })

  test('NEXT_PUBLIC_BASE_URL is loaded if present on env without REACT_APP_BASE_URL being present', () => {
    // arrange
    const baseUrlNext = 'nextjs.org'
    process.env.NEXT_PUBLIC_BASE_URL = baseUrlNext

    // act
    const apiClient = loadApiClient()

    // assert
    expect(apiClient.defaults).toBeDefined()
    expect(apiClient.defaults.baseURL).toEqual(baseUrlNext)
  })

  test('REACT_APP_BASE_URL is loaded if present on env together with NEXT_PUBLIC_BASE_URL', () => {
    // arrange
    const baseUrlReact = 'reactjs.org'
    const baseUrlNext = 'nextjs.org'
    process.env.REACT_APP_BASE_URL = baseUrlReact
    process.env.NEXT_PUBLIC_BASE_URL = baseUrlNext

    // act
    const apiClient = loadApiClient()

    // assert
    expect(apiClient.defaults).toBeDefined()
    expect(apiClient.defaults.baseURL).toEqual(baseUrlReact)
  })

  test('If none of the env vars are present, baseURL should be undefined', () => {
    // act
    const apiClient = loadApiClient()

    // assert
    expect(apiClient.defaults).toBeDefined()
    expect(apiClient.defaults.baseURL).toBeUndefined()
  })
})
