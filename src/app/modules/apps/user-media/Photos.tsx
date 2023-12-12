import React, {useState} from 'react'
import {KTCardBody} from '../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'
import clsx from 'clsx'
import CustomPagination from '../../../../_metronic/partials/componants/Pagination'

const Photos = () => {
  const UserId = localStorage.getItem('userId')

  const [pageSize, setPageSize] = useState(100)
  const [totalPage, setTotalPage] = useState(15)

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    //getActivitiesList(page, pageSize, type)
  }

  return (
    <>
      <div className='card py-4 px-4 mb-5'>
        <div className='d-flex justify-content-between'>
          <div className='row'>
            <div className='col-6'>
              <input
                placeholder='Search By User ID'
                type='text'
                name='search'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                // value={profileDetailsFormValue?.fullName}
                // onChange={(e) => handleProfileChange(e)}
              />
            </div>
            <div className='col-6'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='type'
                data-hide-search='true'
                name='type'
                // defaultValue={profileDetailsFormValue?.gender}
                // //value={profileDetailsFormValue?.gender}
                // onChange={(e) => handleProfileChange(e)}
              >
                <option value=''>All</option>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className={'btn btn-primary'}
              // onClick={updateProfile}
              // disabled={!isAnyProfileChanges}
            >
              <i className='fa-solid fa-rotate-right'></i>
            </button>
          </div>
        </div>
      </div>
      <KTCardBody className='py-4 card'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer h-500 overflow-scroll'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <td>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check-target='#kt_table_users .form-check-input'
                  />
                </td>
                <td>Media</td>
                <td>Date</td>
                <td>Type</td>
                <td>User</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className='text-gray-600 '>
              <tr>
                <td>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check-target='#kt_table_users .form-check-input'
                  />
                </td>
                <td>
                  <div className='symbol symbol-50px overflow-visible me-3'>
                    <img
                      src={`https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`}
                      alt='icon'
                      width='50px'
                      height='50px'
                    />
                  </div>
                </td>
                <td>
                  <div className='text-muted fw-semibold fs-6'>22 jun 2023 04:21am</div>
                </td>
                <td>
                  <span className='badge rounded-pill text-bg-success text-white'>
                    public / private
                  </span>
                </td>
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

                    <div className='flex-grow-1'>
                      <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                        Vinay
                      </a>
                      <span className='text-muted fw-semibold d-block fs-6'>ID : 1</span>
                    </div>
                  </div>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      id='dropdown-basic'
                      className='bg-body-secondary bg-body-secondary:hover'
                      size='sm'
                    >
                      <i className='bi bi-three-dots fs-3'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Edit Profile</Dropdown.Item>
                      <Dropdown.Item>Set Private</Dropdown.Item>
                      <Dropdown.Item>Upload to Story</Dropdown.Item>
                      <Dropdown.Item>Delete Media</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check-target='#kt_table_users .form-check-input'
                  />
                </td>
                <td>
                  <div className='symbol symbol-50px overflow-visible me-3'>
                    <img
                      src={`https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`}
                      alt='icon'
                      width='50px'
                      height='50px'
                    />
                  </div>
                </td>
                <td>
                  <div className='text-muted fw-semibold fs-6'>22 jun 2023 04:21am</div>
                </td>
                <td>
                  <span className='badge rounded-pill text-bg-success text-white'>
                    public / private
                  </span>
                </td>
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

                    <div className='flex-grow-1'>
                      <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                        Vinay
                      </a>
                      <span className='text-muted fw-semibold d-block fs-6'>ID : 1</span>
                    </div>
                  </div>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      id='dropdown-basic'
                      className='bg-body-secondary bg-body-secondary:hover'
                      size='sm'
                    >
                      <i className='bi bi-three-dots fs-3'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Edit Profile</Dropdown.Item>
                      <Dropdown.Item>Set Private</Dropdown.Item>
                      <Dropdown.Item>Upload to Story</Dropdown.Item>
                      <Dropdown.Item>Delete Media</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check-target='#kt_table_users .form-check-input'
                  />
                </td>
                <td>
                  <div className='symbol symbol-50px overflow-visible me-3'>
                    <img
                      src={`https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`}
                      alt='icon'
                      width='50px'
                      height='50px'
                    />
                  </div>
                </td>
                <td>
                  <div className='text-muted fw-semibold fs-6'>22 jun 2023 04:21am</div>
                </td>
                <td>
                  <span className='badge rounded-pill text-bg-success text-white'>
                    public / private
                  </span>
                </td>
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

                    <div className='flex-grow-1'>
                      <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                        Vinay
                      </a>
                      <span className='text-muted fw-semibold d-block fs-6'>ID : 1</span>
                    </div>
                  </div>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      id='dropdown-basic'
                      className='bg-body-secondary bg-body-secondary:hover'
                      size='sm'
                    >
                      <i className='bi bi-three-dots fs-3'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Edit Profile</Dropdown.Item>
                      <Dropdown.Item>Set Private</Dropdown.Item>
                      <Dropdown.Item>Upload to Story</Dropdown.Item>
                      <Dropdown.Item>Delete Media</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check-target='#kt_table_users .form-check-input'
                  />
                </td>
                <td>
                  <div className='symbol symbol-50px overflow-visible me-3'>
                    <img
                      src={`https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`}
                      alt='icon'
                      width='50px'
                      height='50px'
                    />
                  </div>
                </td>
                <td>
                  <div className='text-muted fw-semibold fs-6'>22 jun 2023 04:21am</div>
                </td>
                <td>
                  <span className='badge rounded-pill text-bg-success text-white'>
                    public / private
                  </span>
                </td>
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

                    <div className='flex-grow-1'>
                      <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                        Vinay
                      </a>
                      <span className='text-muted fw-semibold d-block fs-6'>ID : 1</span>
                    </div>
                  </div>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      id='dropdown-basic'
                      className='bg-body-secondary bg-body-secondary:hover'
                      size='sm'
                    >
                      <i className='bi bi-three-dots fs-3'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Edit Profile</Dropdown.Item>
                      <Dropdown.Item>Set Private</Dropdown.Item>
                      <Dropdown.Item>Upload to Story</Dropdown.Item>
                      <Dropdown.Item>Delete Media</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='card-footer'>
            {' '}
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

export default Photos
