/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useState} from 'react'

const UsersListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const [activePage, setActivePage] = useState(1)

  const updatePage = (page: number | undefined | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }
    setActivePage(page)
    updateState({page, items_per_page: 10})
  }

  const pageJump = (page: any) => {
    if (page.length === 0) {
      return
    }

    page = parseInt(page)

    let total_page = pagination?.total_page || 1
    if (total_page < page && total_page !== page) {
      return
    }
    setActivePage(page)
    updateState({page, items_per_page: 10})
  }

  const updatePageSize = (e: any) => {
    if (isLoading || pagination.items_per_page === e.target.value) {
      return
    }
    console.log(e.target.value)

    updateState({page: 1, items_per_page: e.target.value})
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-12'>
        <div id='kt_table_users_paginate' className='d-flex justify-content-between'>
          <div>
            <select
              className='form-select h-30px mt-2'
              data-kt-select2='true'
              data-allow-clear='true'
              defaultValue='10'
              style={{padding: '0.5rem 2rem 0.5rem 1rem'}}
              onChange={(e) => updatePageSize(e)}
            >
              <option value='10'>10</option>
              <option value='30'>30</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>
          <div className='d-flex mt-2'>
            <div className='w-25 me-5'>
              <input
                //placeholder='Birthdate'
                type='number'
                name='pageJump'
                className={clsx('form-control h-30px ms-2 ')}
                autoComplete='off'
                onChange={(e) => pageJump(e.target.value)}
                defaultValue={1}
              />
            </div>
            <div>
              <ul className='pagination'>
                <li
                  className={clsx('page-item', {
                    disabled: isLoading || pagination.page === 1,
                  })}
                >
                  <a
                    onClick={() => updatePage(1)}
                    style={{cursor: 'pointer'}}
                    className='page-link '
                  >
                    First
                  </a>
                </li>
                {Array.from({length: pagination.total_page || 1}).map((_, index) => (
                  <li
                    className={clsx('page-item', {
                      disabled: isLoading || pagination.page === pagination?.links?.length! - 2,
                    })}
                    key={index}
                  >
                    <a
                      onClick={() => updatePage(index + 1)}
                      style={{cursor: 'pointer'}}
                      className={`page-link ${clsx(activePage === index + 1 && 'active')}`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                <li
                  className={clsx('page-item', {
                    disabled: isLoading || pagination.page === pagination?.links?.length! - 2,
                  })}
                >
                  <a
                    onClick={() => updatePage(pagination.total_page)}
                    style={{cursor: 'pointer'}}
                    className='page-link'
                  >
                    Last
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {UsersListPagination}
