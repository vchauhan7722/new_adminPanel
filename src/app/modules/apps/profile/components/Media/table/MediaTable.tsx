import React from 'react'
import {KTCardBody} from '../../../../../../../_metronic/helpers'

const MediaTable = () => {
  return (
    <KTCardBody className='py-4 card'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              <td>Story</td>
              <td>Date</td>
              <td>Type</td>
              <td>View</td>
              <td>Gift Card</td>
              <td>Credit</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className='text-gray-600 '>
            <tr>
              <td>
                <div className='d-flex align-items-center '>
                  <div className='symbol symbol-50px overflow-visible me-3'>
                    <img
                      src={`https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`}
                      alt='icon'
                      width='50px'
                      height='50px'
                    />
                  </div>
                </div>
              </td>
              <td>
                <div className='text-muted fw-semibold fs-6'>22 jun 2023 04:21am</div>
              </td>
              <td>
                <span>Public</span>
              </td>
              <td>
                <span>236</span>
              </td>
              <td>
                <span>20/405</span>
              </td>
              <td>
                <span>5000</span>
              </td>
              <td>
                <span>Visible</span>
              </td>
              <td>
                <div>
                  <button
                    className='btn btn-sm'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='fa-solid fa-ellipsis-vertical text-black fa-xl' />
                  </button>
                  <div
                    className='menu menu-sub menu-sub-dropdown w-150px py-4 menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold'
                    data-kt-menu='true'
                  >
                    {/* begin::Menu item */}
                    <div className='menu-item px-3'>
                      <a className='menu-link px-3'>Story Price</a>
                    </div>
                    {/* end::Menu item */}

                    {/* begin::Menu item */}
                    <div className='menu-item px-3'>
                      <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                        Delete
                      </a>
                    </div>
                    {/* end::Menu item */}

                    {/* begin::Menu item */}
                    <div className='menu-item px-3'>
                      <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                        ReUpload to story
                      </a>
                    </div>
                    {/* end::Menu item */}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </KTCardBody>
  )
}

export default MediaTable