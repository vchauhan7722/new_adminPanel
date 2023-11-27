/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import {getUsers} from './_requests'
import {User} from './_models'
import {useQueryRequest} from './QueryRequestProvider'
import {getAllUser} from '../../../../../../API/api-endpoint'

const QueryResponseContext = createResponseContext<User>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({children}) => {
  const {state} = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    async () => {
      let response = await getAllUser(query)
      return response
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()
  //console.log('response 69', response)
  if (!response || response !== undefined) {
    let pagination = {
      page: response?.page,
      items_per_page: response?.pageSize,
      total_page: response?.totalPage,
      links: [],
    }
    return pagination
  } else {
    return defaultPaginationState
  }

  //return response.payload.pagination
}

// const useQueryResponsePagination1 = () => {
//   const defaultPaginationState: PaginationState = {
//     links: [],
//     ...initialQueryState,
//   }

//   const {response} = useQueryResponse()
//   let pagination = {}
//   console.log('response 69', response)
//   if (!response || response !== undefined) {
//     pagination = {
//       page: response?.page,
//       items_per_page: response?.pageSize,
//       total_page: response?.totalPage,
//     }
//     return pagination
//   }

//   return defaultPaginationState
// }

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
