import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {getUserCreditsHistoryWithPagination} from '../../../../../API/api-endpoint'
import {DateWithTimeFormatter} from '../../../../../utils/Utils'
import CustomPagination from '../../../../../_metronic/partials/componants/Pagination'

let creditFilter = [
  {name: 'Like', value: 'like', type: 'debit', flag: 'all'},
  {name: 'Undo profile', value: 'undo_profile', type: 'debit', flag: 'all'},
  {name: 'Message', value: 'message', type: 'credit', flag: 'all'},
  {name: 'Message', value: 'message', type: 'debit', flag: ''},
  {name: 'Video call', value: 'video_call', type: 'credit', flag: 'all'},
  {name: 'Video call', value: 'video_call', type: 'debit', flag: ''},
  {name: 'Gift', value: 'gift', type: 'credit', flag: 'all'},
  {name: 'Gift', value: 'gift', type: 'debit', flag: ''},
  {name: 'Live stream', value: 'live_stream', type: 'credit', flag: 'all'},
  {name: 'Live stream', value: 'live_stream', type: 'debit', flag: ''},
  {name: 'Story', value: 'story', type: 'credit', flag: 'all'},
  {name: 'Story', value: 'story', type: 'debit', flag: ''},
  {name: 'Reels', value: 'reels', type: 'credit', flag: 'all'},
  {name: 'Reels', value: 'reels', type: 'debit', flag: ''},
  {name: 'Send credit', value: 'send_credit', type: 'debit', flag: 'all'},
  {name: 'Receive credit', value: 'receive_credit', type: 'credit', flag: 'all'},
  {name: 'Spotlight', value: 'spotlight', type: 'debit', flag: 'all'},
]

const Credit = () => {
  const userId = localStorage.getItem('userId')
  const intl = useIntl()

  const [tabValue, setTabValue] = useState('all')

  const [pageSize, setPageSize] = useState(100)
  const [totalPage, setTotalPage] = useState(0)
  const [userCreditList, setUserCreditList] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [userCreditSum, setUserCreditSum] = useState({
    credit: 0,
    debit: 0,
    totalCount: 0,
  })

  const page = 1

  const handleChange = (tabName: string) => {
    setTabValue(tabName)
    setFilterValue('')
  }

  useEffect(() => {
    if (tabValue === 'all') {
      getAllUserCreditList(page, pageSize, '')
    } else {
      getAllUserCreditList(page, pageSize, tabValue)
    }
  }, [tabValue, filterValue])

  const getAllUserCreditList = async (page: any, pageSize: any, type: any) => {
    let result = await getUserCreditsHistoryWithPagination(
      userId,
      page,
      pageSize,
      type,
      filterValue
    )
    setUserCreditList(result.data?.activities)
    setUserCreditSum(result.data?.allActivityCount[0])
    setTotalPage(result?.totalPage)
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    let type = tabValue === 'all' ? '' : tabValue
    getAllUserCreditList(page, pageSize, type)
  }

  return (
    <div className='card '>
      <div className='card-title pt-8 px-9 d-flex justify-content-between'>
        <div>
          <h2>{intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CREDIT'})}</h2>
        </div>
        <div>
          <select
            className='form-select form-select-solid fw-bolder'
            data-kt-select2='true'
            data-placeholder='Select option'
            data-allow-clear='true'
            data-kt-user-table-filter='filter'
            data-hide-search='true'
            name='filter'
            defaultValue=''
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value=''>Select Filter</option>
            {creditFilter
              .filter((filter) =>
                tabValue !== 'all' ? filter.type === tabValue : filter.flag === 'all'
              )
              .map((filter, index) => {
                return (
                  <option key={index} value={filter.value}>
                    {filter.name}
                  </option>
                )
              })}
          </select>
        </div>
      </div>

      <div className=''>
        <div className='card-header border-0'>
          <div className='d-flex overflow-auto h-55px '>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'all' && 'active')
                  }
                  onClick={() => handleChange('all')}
                >
                  All ({userCreditSum?.totalCount})
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'credit' && 'active')
                  }
                  onClick={() => handleChange('credit')}
                >
                  Credit ({userCreditSum?.credit})
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'debit' && 'active')
                  }
                  onClick={() => handleChange('debit')}
                >
                  Spent ({userCreditSum?.debit})
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className='card-body py-0' style={{overflowY: 'scroll', height: '500px'}}>
          <KTCardBody className='py-4 card'>
            <div className='table-responsive'>
              <table
                id='kt_table_users'
                className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
              >
                <thead>
                  <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                    <td>Description</td>
                    {tabValue !== 'debit' && <td>Credit</td>}
                    {tabValue !== 'credit' && <td>Debit</td>}
                    <td>Date</td>
                  </tr>
                </thead>
                <tbody className='text-gray-600 '>
                  {userCreditList?.length !== 0 &&
                    userCreditList !== undefined &&
                    userCreditList.map((credit: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className='text-muted fw-semibold fs-6'>
                              <div className='d-flex flex-column'>
                                <span className='text-gray-500 fw-bold'>{credit.description}</span>
                              </div>
                            </div>
                          </td>
                          {tabValue !== 'debit' && (
                            <td>
                              <p className='text-success fw-semibold fs-6 mb-1'>
                                {credit.creditType !== 'debit' ? credit.credit + ' Credits' : '-'}{' '}
                              </p>
                            </td>
                          )}
                          {tabValue !== 'credit' && (
                            <td>
                              <p className='text-danger fw-semibold fs-6  mb-1'>
                                {credit.creditType !== 'credit' ? credit.credit + ' Credits' : '-'}
                              </p>
                            </td>
                          )}
                          <td>
                            <span>{DateWithTimeFormatter(credit?.createdAt)}</span>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </KTCardBody>
        </div>
        <div className='card-footer'>
          {userCreditList.length !== 0 && (
            <CustomPagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              setTotalPage={setTotalPage}
              cb={getPagination}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Credit
