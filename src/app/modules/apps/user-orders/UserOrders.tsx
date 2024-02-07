import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'
import clsx from 'clsx'
import ToastUtils, {ErrorToastUtils} from '../../../../utils/ToastUtils'
import {DateTimeFormatter, TimeFormatter} from '../../../../utils/DateUtils'
import {
  getCreditAndPremiumPackageAmountPlans,
  getUserOrdersList,
} from '../../../../API/api-endpoint'
import CustomPagination from '../../../../_metronic/partials/componants/Pagination'
import {KTCardBody} from '../../../../_metronic/helpers'

const UserOrders = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(15)
  const [orderList, setOrderList] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    startDate: '',
    endDate: '',
    onlyPremium: false,
    onlyCredit: false,
    premiumPlanId: '',
    creditPlanId: '',
    OrderId: '',
  })
  const [selectedUser, setSelectedUser] = useState<any>([])
  const [orderCount, setOrderCount] = useState<any>(0)
  const [creditPackages, setCreditPackages] = useState<any>([])
  const [premiumPackages, setPremiumPackages] = useState<any>([])

  useEffect(() => {
    getAllOrderList(page, pageSize, filter)
    getAllPackages()
  }, [])

  const getAllPackages = async () => {
    let result = await getCreditAndPremiumPackageAmountPlans()
    if (result.status === 200) {
      setCreditPackages(result.data.creditsPackage)
      setPremiumPackages(result.data.premiumPackage)
    }
  }

  const getAllOrderList = async (page: any, pageSize: any, filter: any) => {
    let result = await getUserOrdersList(page, pageSize, filter)
    if (result.status === 200) {
      setOrderList(result.data)
      setTotalPage(result.totalPage)
      setOrderCount(result.count)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getAllOrderList(page, pageSize, filter)
    //getActivitiesList(page, pageSize, type)
  }

  const filterMedia = () => {
    getAllOrderList(page, pageSize, filter)
  }

  const clearFilter = () => {
    setFilter({
      search: '',
      startDate: '',
      endDate: '',
      onlyPremium: false,
      onlyCredit: false,
      premiumPlanId: '',
      creditPlanId: '',
      OrderId: '',
    })
    let filter = {
      search: '',
      startDate: '',
      endDate: '',
      onlyPremium: false,
      onlyCredit: false,
      premiumPlanId: '',
      creditPlanId: '',
      OrderId: '',
    }
    getAllOrderList(page, pageSize, filter)
  }

  return (
    <>
      <div className='accordion' id='kt_accordion_2 '>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_2'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_2'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_2'
            >
              <div className='fs-5 text-dark fw-bolder'>Filters</div>
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_2'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_2'
            data-bs-parent='#kt_accordion_2'
          >
            <div className='card py-4 px-4 accordion-body'>
              <div className='d-flex justify-content-between mt-5'>
                <div className='row'>
                  <div className='col-3'>
                    <label className='form-label fs-6 fw-bold'>Search</label>
                    <input
                      placeholder='Search'
                      type='text'
                      name='search'
                      className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                      autoComplete='off'
                      value={filter.search}
                      onChange={(e) => setFilter({...filter, search: e.target.value})}
                    />
                  </div>
                  <div className='col-3'>
                    <label className='form-label fs-6 fw-bold'>Search By OrderId</label>
                    <input
                      placeholder='Search'
                      type='text'
                      name='OrderId'
                      className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                      autoComplete='off'
                      value={filter.OrderId}
                      onChange={(e) => setFilter({...filter, OrderId: e.target.value})}
                    />
                  </div>
                  <div className='col-3'>
                    <label className='form-label fs-6 fw-bold'>Start Date</label>
                    <input
                      placeholder='StartDate'
                      type='date'
                      name='startDate'
                      className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                      autoComplete='off'
                      value={filter.startDate}
                      onChange={(e) => setFilter({...filter, startDate: e.target.value})}
                    />
                  </div>
                  <div className='col-3'>
                    <label className='form-label fs-6 fw-bold'>End Date</label>
                    <input
                      placeholder='EndDate'
                      type='date'
                      name='endDate'
                      className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                      autoComplete='off'
                      value={filter.endDate}
                      onChange={(e) => setFilter({...filter, endDate: e.target.value})}
                    />
                  </div>

                  <div className='col-4 mt-5'>
                    <label className='form-label fs-6 fw-bold'>Select Premium Plan</label>
                    <select
                      className='form-select form-select-solid fw-bolder'
                      data-kt-select2='true'
                      data-placeholder='Select option'
                      data-allow-clear='true'
                      data-kt-user-table-filter='type'
                      data-hide-search='true'
                      name='premiumPlanId'
                      value={filter.premiumPlanId}
                      onChange={(e) => setFilter({...filter, premiumPlanId: e.target.value})}
                    >
                      <option value=''></option>
                      {premiumPackages.length !== 0 &&
                        premiumPackages.map((premiumPlan: any, index: any) => {
                          return (
                            <option key={index} value={premiumPlan.premiumPackageAmountId}>
                              {premiumPlan.premiumPackageName}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                  <div className='col-4 mt-5'>
                    <label className='form-label fs-6 fw-bold'>Select Credit Plan ID</label>
                    <select
                      className='form-select form-select-solid fw-bolder'
                      data-kt-select2='true'
                      data-placeholder='Select option'
                      data-allow-clear='true'
                      data-kt-user-table-filter='type'
                      data-hide-search='true'
                      name='creditPlanId'
                      value={filter.creditPlanId}
                      onChange={(e) => setFilter({...filter, creditPlanId: e.target.value})}
                    >
                      <option value=''></option>
                      {creditPackages.length !== 0 &&
                        creditPackages.map((creditPlan: any, index: any) => {
                          return (
                            <option key={index} value={creditPlan.creditPackageAmountId}>
                              {creditPlan.creditPackageAmountId}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                  <div className='col-2 mt-5'>
                    <label className='form-label fs-6 fw-bold'>Only Credit</label>
                    <div>
                      <input
                        type='checkbox'
                        name='onlyCredit'
                        className='form-check-input'
                        autoComplete='off'
                        checked={filter.onlyCredit}
                        onChange={(e) => setFilter({...filter, onlyCredit: e.target.checked})}
                      />
                    </div>
                  </div>
                  <div className='col-2 mt-5'>
                    <label className='form-label fs-6 fw-bold'>Only Premium</label>
                    <div>
                      <input
                        placeholder='EndDate'
                        type='checkbox'
                        className='form-check-input'
                        name='endDate'
                        autoComplete='off'
                        checked={filter.onlyPremium}
                        onChange={(e) => setFilter({...filter, onlyPremium: e.target.checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer d-flex justify-content-end mt-5'>
                <div>
                  <button type='submit' className={'btn btn-secondary'} onClick={clearFilter}>
                    Reset
                    {/* <i className='fa-solid fa-close'></i> */}
                  </button>
                </div>
                &nbsp;
                <div>
                  <button
                    type='submit'
                    className={'btn btn-primary'}
                    onClick={filterMedia}
                    // disabled={!isAnyProfileChanges}
                  >
                    Apply
                    {/* <i className='fa-solid fa-rotate-right'></i> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUser.length === 0 && (
        <div className='card py-4 px-4 mb-5 mt-3'>
          <div className='d-flex justify-content-between'>
            <div className='row'>
              <h4>SEARCH RESULT {orderCount} ORDERS </h4>
            </div>
          </div>
        </div>
      )}

      <KTCardBody className='py-4 card  p-5'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer h-500 overflow-scroll'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <td>User</td>
                <td>Order Id</td>
                <td>Amount</td>
                <td>Action</td>
                <td>Gateway</td>
                <td>Date</td>
                <td>Premium`s Credit</td>
              </tr>
            </thead>
            <tbody className='text-gray-600 '>
              {orderList.map((media: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center '>
                        <div className='symbol symbol-40px symbol-circle overflow-visible me-3'>
                          <img
                            src={
                              `${process.env.REACT_APP_SERVER_URL}/${media?.userDetail?.profileImage}` ||
                              `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                            }
                            alt='icon'
                            width='50px'
                            height='50px'
                            loading='lazy'
                          />
                        </div>

                        <div className='flex-grow-1'>
                          <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                            {media?.userDetail?.fullName}
                          </a>
                          <span className='text-muted fw-semibold d-block fs-6'>
                            {media?.userDetail?.totalCredit}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {media?.orderId === null ? '-' : media?.orderId}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {media?.amount === null ? '-' : media?.amount}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {media?.creditPackageAmountId === null
                            ? `${media?.days} Days`
                            : `${media?.credit} Credit`}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {media?.paymentVia === null ? '-' : media?.paymentVia}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {DateTimeFormatter(media.createdAt)}
                          <br></br>
                          {TimeFormatter(media.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {DateTimeFormatter(media.updatedAt)}
                          <br></br>
                          {TimeFormatter(media.updatedAt)}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='card-footer'>
            <CustomPagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              cb={getPagination}
            />
          </div>
        </div>
      </KTCardBody>
    </>
  )
}

export default UserOrders
