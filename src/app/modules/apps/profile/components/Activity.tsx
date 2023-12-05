import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {getUserActivityWithPagination} from '../../../../../API/api-endpoint'
import {calculateTimeDifferenceForActivity} from '../../../../../utils/Utils'
import Pagination from 'react-bootstrap/Pagination'
import clsx from 'clsx'
import CustomPagination from '../../../../../utils/Pagination'

const Activity = (props) => {
  const userId = localStorage.getItem('userId')
  const intl = useIntl()
  const [tabValue, setTabValue] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [activityList, setActivityList] = useState([])

  const [activityCount, setActivityCount] = useState(0)

  const handleChange = (tabName) => {
    setTabValue(tabName)
  }

  useEffect(() => {
    if (tabValue === 'all') {
      getActivitiesList(page, pageSize, '')
    } else {
      getActivitiesList(page, pageSize, tabValue)
    }
  }, [tabValue])

  const getActivitiesList = async (page: number, pageSize: number, type: any) => {
    let result = await getUserActivityWithPagination(page, pageSize, type, userId)
    console.log(result)
    if (result.status === 200) {
      setActivityList(result.data)
      setTotalPage(result?.totalPage)
      setActivityCount(result?.count)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    let type = tabValue === 'all' ? '' : tabValue
    getActivitiesList(page, pageSize, type)
  }

  return (
    <div className='card '>
      <div className='card-title pt-8 px-9'>
        <h2>{intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.LOGS'})}</h2>
      </div>

      <div className=''>
        <div className='card-header border-0'>
          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'all' && 'active')
                  }
                  onClick={() => handleChange('all')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.All'})}
                  {tabValue === 'all' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'system' && 'active')
                  }
                  onClick={() => handleChange('system')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.SYSTEM'})}
                  {tabValue === 'system' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'chat' && 'active')
                  }
                  onClick={() => handleChange('chat')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CHAT'})}
                  {tabValue === 'chat' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'videocall' && 'active')
                  }
                  onClick={() => handleChange('videocall')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.VIDEOCALL'})}
                  {tabValue === 'videocall' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'undo-profile' && 'active')
                  }
                  onClick={() => handleChange('undo-profile')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.UNDOPROFILE'})}
                  {tabValue === 'undo-profile' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'like-profile' && 'active')
                  }
                  onClick={() => handleChange('like-profile')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.LIKE'})}
                  {tabValue === 'like-profile' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (tabValue === 'visit-profile' && 'active')
                  }
                  onClick={() => handleChange('visit-profile')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.VISIT'})}
                  {tabValue === 'visit-profile' && ` (${activityCount})`}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'match' && 'active')
                  }
                  onClick={() => handleChange('match')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.MATCH'})}
                  {tabValue === 'match' && ` (${activityCount})`}
                </div>
              </li>
            </ul>
          </div>

          <div className='card-toolbar'>
            <select
              className='form-select form-select-sm form-select-solid w-125px '
              data-control='select2'
              data-placeholder='Select Hours'
              data-hide-search='true'
            >
              <option value='1'>1 Hours</option>
              <option value='2'>6 Hours</option>
              <option value='3'>12 Hours</option>
              <option value='4'>24 Hours</option>
            </select>
            <button type='button' className='btn btn-sm btn-light-primary ms-2'>
              <i className='ki-duotone ki-cloud-download fs-3'>
                <span className='path1'></span>
                <span className='path2'></span>
              </i>
              Download Report
            </button>
          </div>
        </div>

        <div className='card-body py-0' style={{overflowY: 'scroll', height: '500px'}}>
          <div className='table-responsive'>
            <table
              className='table align-middle table-row-dashed fw-semibold text-gray-600 fs-6 gy-5'
              id='kt_table_customers_logs'
            >
              <tbody>
                {activityList !== undefined &&
                  activityList
                    //.filter((activity: any) => activity.type !== 'credit-hisory')
                    .map((activity: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td className='min-w-70px'>
                            <div
                              className={clsx(
                                'badge badge-light-success',
                                activity?.type === 'visit-profile' && 'badge-light-danger',
                                activity?.type === 'like-profile' && 'badge-light-success',
                                activity?.type === 'chat' && 'badge-light-info',
                                activity?.type === 'videoCall' && 'badge-light-primary',
                                activity?.type === 'undo-profile' && 'badge-light-light',
                                activity?.type === 'system' && 'badge-light-warning',
                                activity?.type === 'match' && 'badge-light-dark'
                              )}
                            >
                              {activity?.type}
                            </div>
                          </td>

                          <td>
                            {`${activity?.userData?.fullName} ${activity?.description} ${activity?.receiverData?.fullName}`}
                          </td>

                          <td className='pe-0 text-end min-w-200px'>
                            {calculateTimeDifferenceForActivity(activity?.createdAt)}
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='card-footer'>
          {activityList.length !== 0 && (
            <CustomPagination
              page={page}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              setTotalPage={setTotalPage}
              activePage={activePage}
              setActivePage={setActivePage}
              cb={getPagination}
            />
          )}

          {/* <Pagination>
            {Array.from({length: totalPage}).map((page: any, index: any) => {
              return (
                <Pagination.Item
                  key={index}
                  active={activePage === index + 1}
                  onClick={() => updatePage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            })}
           
          </Pagination> */}
        </div>
      </div>
    </div>
  )
}

export default Activity
