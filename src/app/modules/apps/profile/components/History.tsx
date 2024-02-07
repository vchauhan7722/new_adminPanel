/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {getUserPurchaseHistoryWithPagination} from '../../../../../API/api-endpoint'
import {DateWithTimeFormatter} from '../../../../../utils/DateUtils'
import CustomPagination from '../../../../../_metronic/partials/componants/Pagination'
import {useLocation} from 'react-router-dom'
import {GetIDFromURL} from '../../../../../utils/Utils'

const History = () => {
  let location = useLocation()
  let userId = GetIDFromURL(location)
  //const userId = localStorage.getItem('userId')

  const [pageSize, setPageSize] = useState(100)
  const [totalPage, setTotalPage] = useState(0)
  const [userOrderList, setUserOrderList] = useState([])

  const page = 1

  useEffect(() => {
    getAllUserOrdersList(page, pageSize)
  }, [])

  const getAllUserOrdersList = async (page: any, pageSize: any) => {
    let result = await getUserPurchaseHistoryWithPagination(userId, page, pageSize)
    setUserOrderList(result.data)
    setTotalPage(result?.totalPage)
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getAllUserOrdersList(page, pageSize)
  }

  return (
    <div className='card'>
      <div className=''>
        <div className='card-body py-0' style={{overflowY: 'scroll', height: '500px'}}>
          <KTCardBody className='py-4 '>
            <div className='table-responsive'>
              <table
                id='kt_table_users'
                className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
              >
                <thead>
                  <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                    <td>Credit / Days</td>
                    <td>Amounts</td>
                    <td>PaymentVia</td>
                    <td>Date</td>
                    <td>OrderId</td>
                  </tr>
                </thead>
                <tbody className='text-gray-600 '>
                  {userOrderList?.length !== 0 &&
                    userOrderList !== undefined &&
                    userOrderList.map((order: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td>
                            <p className=' fw-semibold fs-6  mb-1'>
                              {order.creditPackageAmountId === null
                                ? `${order.days} Days`
                                : `${order.credit} Credits`}
                            </p>
                          </td>
                          <td>
                            <p className=' fw-semibold fs-6  mb-1'>
                              {order.amount === null ? '-' : order.amount}
                            </p>
                          </td>
                          <td>
                            <p className=' fw-semibold fs-6 mb-1'>
                              {order.paymentVia === null ? '-' : order.paymentVia}
                            </p>
                          </td>
                          <td>
                            <span>{DateWithTimeFormatter(order?.createdAt)}</span>
                          </td>
                          <td>
                            <div className='text-muted fw-semibold fs-6'>
                              <div className='d-flex flex-column'>
                                <span className='text-gray-500 fw-bold'>
                                  {order.orderId === null ? '-' : order.orderId}
                                </span>
                              </div>
                            </div>
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
          {userOrderList.length !== 0 && userOrderList !== undefined && (
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

export default History
