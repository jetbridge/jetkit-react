import apiClient from '.'

export interface IAPIDescriptor {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'trace' | 'options' | 'head'
  url: string
}

export interface Pagination {
  total: number
  total_pages: number
  first_page: number
  last_page: number
  page: number
}

export interface IPaginatedResponse<T> extends Pagination {
  rows: T
}

export interface IPaginatedRequest {
  page: number
  pageSize: number
  queryParams?: object
}

/**
 * Returns a function that performs a paginated API request.
 */
export const requestPaginated = <ResponseT>({ url, method = 'get' }: IAPIDescriptor) => async ({
  page,
  pageSize,
  queryParams = {},
}: IPaginatedRequest): Promise<IPaginatedResponse<ResponseT>> => {
  // GET only
  if (method !== 'get') throw new Error('Only GET method is supported for paginated APIs right now.')

  // construct pagination params
  const paginationParams = { page, page_size: pageSize }
  const response = await apiClient.get<ResponseT>(url, { params: { ...paginationParams, ...queryParams } })

  // pagination info lives in response header
  const pagination: Pagination = JSON.parse(response.headers['x-pagination'])
  return {
    ...pagination,
    rows: response.data,
  }
}
// for adding types to wrappers of requestPaginated
export type PaginatedRequestFunc<ResponseT> = (req: IPaginatedRequest) => Promise<IPaginatedResponse<ResponseT>>
