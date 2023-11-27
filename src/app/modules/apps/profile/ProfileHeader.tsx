/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {useIntl} from 'react-intl'
import Accordion from 'react-bootstrap/Accordion'

const ProfileHeader = (props) => {
  const {user} = props
  const location = useLocation()
  const intl = useIntl()

  let UserID = localStorage.getItem('userId')

  return (
    <Accordion defaultActiveKey='0'>
      <Accordion.Item eventKey='0'>
        {' '}
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img
                    src={
                      toAbsoluteUrl('/media/avatars/300-1.jpg') ||
                      `${process.env.REACT_APP_SERVER_URL}/${user.profileImage}`
                    }
                    alt='ProfileImage'
                  />{' '}
                  {user.isOnline && (
                    <div className='position-absolute translate-middle bottom-0 start-100 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                  )}
                </div>
              </div>

              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                        {user.fullName}
                      </a>

                      {user.isVerify && <KTIcon iconName='verify' className='fs-1 text-primary' />}
                    </div>

                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                      <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        <KTIcon iconName='profile-circle' className='fs-4 me-1' />@{user.userName}
                      </span>
                      <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        <KTIcon iconName='geolocation' className='fs-4 me-1' />
                        {`${user.city}, ${user.state}, ${user.country}`}
                      </span>
                      <span className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                        <KTIcon iconName='sms' className='fs-4 me-1' />
                        {user.email}
                      </span>
                      <span className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                        <KTIcon iconName='phone' className='fs-4 me-1' />
                        {`+${user.countryCode} ${user.mobileNo}`}
                      </span>
                    </div>
                  </div>

                  <div className='d-flex my-4'>
                    <div className='me-0'>
                      <button
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        data-kt-menu-flip='top-end'
                      >
                        <i className='bi bi-three-dots fs-3'></i>
                      </button>
                      <div
                        className='menu menu-sub menu-sub-dropdown w-200px py-4 menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold'
                        data-kt-menu='true'
                      >
                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3'>Open a live Profile</a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Edit Account
                          </a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Set as Populer
                          </a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Verify User
                          </a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Add To Spotlight
                          </a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Delete Account
                          </a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Ban Email User
                          </a>
                        </div>
                        {/* end::Menu item */}

                        {/* begin::Menu item */}
                        <div className='menu-item px-3'>
                          <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                            Ban Ip User
                          </a>
                        </div>
                        {/* end::Menu item */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'>&copy; {user.totalCredit}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.CREDITS'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                          <div className='fs-2 fw-bolder'>{user.isPremium ? 'Yes' : 'No'}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.PREMUIM'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'>{user.popularDays + ' days'}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.MOSTPOPULAR'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                          <div className='fs-2 fw-bolder'>{user.spotLightDays + ' days'}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.SPOTLIGHT'})}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                    <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                      <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                      <span className='fw-bolder fs-6'>50%</span>
                    </div>
                    <div className='h-5px mx-3 w-100 bg-light mb-3'>
                      <div
                        className='bg-success rounded h-5px'
                        role='progressbar'
                        style={{width: '50%'}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/activity/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/activity/${UserID}`} //${UserID}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/overview/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/overview/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.OVERVIEW'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/edit-profile/${UserID}` &&
                        'active')
                    }
                    to={`/apps/users-profile/edit-profile/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.EDITPROFILE'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/chat/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/chat/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CHAT'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/videocall/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/videocall/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.VIDEOCALL'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/media/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/media/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.MEDIA'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/live-stream/${UserID}` &&
                        'active')
                    }
                    to={`/apps/users-profile/live-stream/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.LIVESTREAM'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/reels/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/reels/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.REELS'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/credit/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/credit/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CREDIT'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/history/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/history/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.HISTORY'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/referrals/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/referrals/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.REFERRALS'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `/apps/users-profile/security/${UserID}` && 'active')
                    }
                    to={`/apps/users-profile/security/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.SECURITY'})}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  )
}

export {ProfileHeader}
