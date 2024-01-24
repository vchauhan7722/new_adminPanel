/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {useIntl} from 'react-intl'
import Accordion from 'react-bootstrap/Accordion'
import {useEffect, useState} from 'react'
import {
  AddOrUpdateCreditByUID,
  AddOrUpdatePremiumByUID,
  UpdatePopularStatusByUID,
  UpdateSpotlightStatusByUID,
  UpdateVerifyStatusByUID,
  getPremiumPackageAmountPlans,
} from '../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../utils/ToastUtils'
import {Dropdown, Form} from 'react-bootstrap'
import {CustomToggle} from '../../../../_metronic/partials/componants/CustomToggle'

const ProfileHeader = (props) => {
  const {user, userProfilePercentage, setUserUpdateFlag, userUpdateFlag} = props

  const location = useLocation()
  const intl = useIntl()

  // for normal user -> /apps/users-profile
  // for anonymous user -> /apps/anonymous-user/users-profile
  let routeForProfileDetails =
    location.pathname.substring(6, 15) === 'anonymous'
      ? '/apps/anonymous-user/users-profile'
      : '/apps/users-profile'

  let UserID = localStorage.getItem('userId')

  const [popularDays, setPopularDays] = useState(0)
  const [spotlightDays, setspotlightDays] = useState(0)
  const [premiumAmountPackages, setPremiumAmountPackages] = useState<any>([])
  const [addUpdateCredit, setAddUpdateCredit] = useState({credit: 0, type: 'add'})
  const [addUpdatePremium, setaddUpdatePremium] = useState({days: 0, type: 'add', premiumId: 1})

  useEffect(() => {
    getPremiumAmountpackages()
  }, [])

  const verifyUser = async () => {
    let result = await UpdateVerifyStatusByUID(UserID, !user?.isVerify)
    if (result.status === 200) {
      setUserUpdateFlag(userUpdateFlag + 1)
      ToastUtils({
        type: 'success',
        message: !user?.isVerify ? 'User is Verified' : 'User Verification is Removed',
      })
    } else {
      ErrorToastUtils()
    }
  }

  const addToSpotlight = async () => {
    let result = await UpdateSpotlightStatusByUID(UserID, spotlightDays)
    if (result.status === 200) {
      setUserUpdateFlag(userUpdateFlag + 1)
      ToastUtils({
        type: 'success',
        message: `User is added in Spotlight For ${spotlightDays} days`,
      })
    } else {
      ErrorToastUtils()
    }
  }

  const setAsPopular = async () => {
    let isPopular = user.isPopular ? false : true
    let result = await UpdatePopularStatusByUID(UserID, popularDays, isPopular)
    if (result.status === 200) {
      setUserUpdateFlag(userUpdateFlag + 1)
      ToastUtils({
        type: 'success',
        message: user.isPopular
          ? 'User is removed from popular List'
          : `User is added in Popular For ${popularDays} days`,
      })
    } else {
      ErrorToastUtils()
    }
  }

  const addOrUpdateCredit = async () => {
    let result = await AddOrUpdateCreditByUID(UserID, addUpdateCredit.type, addUpdateCredit.credit)
    if (result.status === 200) {
      setAddUpdateCredit({credit: 0, type: 'add'})
      setUserUpdateFlag(userUpdateFlag + 1)
      ToastUtils({
        type: 'success',
        message: addUpdateCredit.type === 'add' ? 'User Credit is Added' : 'User Credit is Updated',
      })
    } else {
      ErrorToastUtils()
    }
  }

  const addOrUpdatePremium = async () => {
    let result = await AddOrUpdatePremiumByUID(
      UserID,
      addUpdatePremium.type,
      addUpdatePremium.days,
      addUpdatePremium.premiumId
    )
    if (result.status === 200) {
      setaddUpdatePremium({days: 0, type: 'add', premiumId: 1})
      ToastUtils({
        type: 'success',
        message:
          addUpdateCredit.type === 'add' ? 'User Premium is Added' : 'User Premium is Updated',
      })
      setUserUpdateFlag(userUpdateFlag + 1)
    } else {
      ErrorToastUtils()
    }
  }

  const getPremiumAmountpackages = async () => {
    let result = await getPremiumPackageAmountPlans()
    if (result.status === 200) {
      setPremiumAmountPackages(result.data)
    }
  }

  return (
    <Accordion defaultActiveKey='0' className='mb-5'>
      <Accordion.Item eventKey='0'>
        <div className='p-7 '>
          <div className=' pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
              <div className='me-7 mb-4'>
                <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                  <img
                    src={
                      `${process.env.REACT_APP_SERVER_URL}/${user.profileImage}` ||
                      toAbsoluteUrl('/media/avatars/300-1.jpg')
                    }
                    alt='ProfileImage'
                    loading='lazy'
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
                        {user.fullName} , {user?.age}
                      </a>
                      &nbsp;
                      {user?.isPremium && <i className='text-primary fa-solid fa-award fa-2xl'></i>}
                      &nbsp;
                      {user?.isPopular && (
                        <i className='text-primary fa-regular fa-star fa-2xl'></i>
                      )}
                      &nbsp;
                      {user?.isSpotlightUser && (
                        <i className='text-primary fa-solid fa-fire-flame-curved fa-2xl'></i>
                      )}{' '}
                      &nbsp;
                      {user?.isVerify && <i className='text-primary bi bi-patch-check fa-2xl'></i>}
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
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id='dropdown-basic'
                        className='bg-body-secondary bg-body-secondary:hover'
                        size='sm'
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          data-bs-toggle='modal'
                          data-bs-target='#add_update_credit_for_user'
                        >
                          Add/Update Credit
                        </Dropdown.Item>
                        <Dropdown.Item
                          data-bs-toggle='modal'
                          data-bs-target='#add_update_premium_for_user'
                        >
                          Add/Update Premium
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <Link
                            data-kt-users-table-filter='delete_row'
                            to={`${routeForProfileDetails}/edit-profile/${UserID}`}
                            className='text-black'
                          >
                            Edit Account{' '}
                          </Link>
                        </Dropdown.Item>

                        <Dropdown.Item data-bs-toggle='modal' data-bs-target='#kt_modal_2'>
                          <a className='text-black' data-kt-users-table-filter='delete_row'>
                            {!user.isPopular ? 'Set as Popular' : 'Remove From Popular'}
                          </a>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => verifyUser()}>
                          <a className='text-black' data-kt-users-table-filter='delete_row'>
                            {user?.isVerify ? 'Remove Verification' : 'Verify User'}
                          </a>
                        </Dropdown.Item>
                        {!user?.isSpotlightUser && (
                          <Dropdown.Item data-bs-toggle='modal' data-bs-target='#kt_modal_1'>
                            <a className='text-black' data-kt-users-table-filter='delete_row'>
                              Add To Spotlight
                            </a>
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item>
                          <a className='text-black' data-kt-users-table-filter='delete_row'>
                            Delete Account
                          </a>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => verifyUser()}>
                          <a className='text-black' data-kt-users-table-filter='delete_row'>
                            Ban Email User
                          </a>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => verifyUser()}>
                          <a className='text-black' data-kt-users-table-filter='delete_row'>
                            Ban Ip User
                          </a>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className='d-flex flex-wrap flex-stack'>
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'> {user.totalCredit}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.CREDITS'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                          <div className='fs-2 fw-bolder'>
                            {user.isPremium
                              ? user?.userPurchasePlan !== null &&
                                user?.userPurchasePlan?.days + ' days'
                              : 'No'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.PREMUIM'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                          <div className='fs-2 fw-bolder'>
                            {(user.popularDays === null ? 0 : user.popularDays) + ' days'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.MOSTPOPULAR'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                          <div className='fs-2 fw-bolder'>
                            {(user.spotLightDays === null ? 0 : user.spotLightDays) + ' days'}
                          </div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.SPOTLIGHT'})}
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className=''>
                          <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                            <span className='fw-bold fs-6 text-gray-400 me-4'>
                              Profile Completion
                            </span>
                            <span className='fw-bolder fs-6'>{userProfilePercentage}%</span>
                          </div>
                          <div className='h-5px w-100 bg-light mb-3'>
                            <div
                              className='bg-success rounded h-5px'
                              role='progressbar'
                              style={{width: `${userProfilePercentage}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*overflow-auto */}
            <div className='d-flex'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/activity/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/activity/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/overview/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/overview/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.OVERVIEW'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/edit-profile/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/edit-profile/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.EDITPROFILE'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/chat/${UserID}` && 'active')
                    }
                    to={`${routeForProfileDetails}/chat/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CHAT'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/videocall/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/videocall/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.VIDEOCALL'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/media/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/media/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.MEDIA'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/live-stream/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/live-stream/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.LIVESTREAM'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/reels/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/reels/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.REELS'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/credit/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/credit/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CREDIT'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/history/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/history/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.HISTORY'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/referrals/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/referrals/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.REFERRALS'})}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === `${routeForProfileDetails}/security/${UserID}` &&
                        'active')
                    }
                    to={`${routeForProfileDetails}/security/${UserID}`}
                  >
                    {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.SECURITY'})}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add To Spotlight</h5>
                <div
                  className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <i className='fa-solid fa-xmark'></i>
                </div>
              </div>
              <div className='modal-body'>
                <input
                  placeholder='Enter Days'
                  type='number'
                  className={'form-control form-control-solid mb-3 mb-lg-0'}
                  autoComplete='off'
                  value={spotlightDays}
                  onChange={(e) => setspotlightDays(parseInt(e.target.value))}
                />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={addToSpotlight}
                >
                  Add To Spotlight
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' tabIndex={-1} id='kt_modal_2'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add To Popular</h5>
                <div
                  className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <i className='fa-solid fa-xmark'></i>
                </div>
              </div>
              <div className='modal-body'>
                {user.isPopular ? (
                  'Current Left Days ' + user?.popularDays
                ) : (
                  <input
                    placeholder='Enter Days'
                    type='number'
                    className={'form-control form-control-solid mb-3 mb-lg-0'}
                    autoComplete='off'
                    value={popularDays}
                    onChange={(e) => setPopularDays(parseInt(e.target.value))}
                  />
                )}
                {/* <input
                  placeholder='Enter Days'
                  type='number'
                  className={'form-control form-control-solid mb-3 mb-lg-0'}
                  autoComplete='off'
                  value={popularDays}
                  onChange={(e) => setPopularDays(parseInt(e.target.value))}
                /> */}
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={setAsPopular}
                >
                  {user.isPopular ? 'Remove Popular' : 'Add To Popular'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' tabIndex={-1} id='add_update_credit_for_user'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add/Update Credits</h5>
                <div
                  className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <i className='fa-solid fa-xmark'></i>
                </div>
              </div>
              <div className='modal-body'>
                <input
                  placeholder='Enter Credit'
                  type='number'
                  className={'form-control form-control-solid mb-3 mb-lg-0'}
                  autoComplete='off'
                  value={addUpdateCredit.credit}
                  onChange={(e) =>
                    setAddUpdateCredit({
                      ...addUpdateCredit,
                      credit: Math.abs(parseInt(e.target.value)),
                    })
                  }
                />
                <br />
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-hide-search='true'
                  defaultValue={addUpdateCredit.type}
                  onChange={(e) =>
                    setAddUpdateCredit({
                      ...addUpdateCredit,
                      type: e.target.value,
                    })
                  }
                >
                  <option value='add'>Add</option>
                  <option value='update'>Update</option>
                </select>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={addOrUpdateCredit}
                >
                  Add / Update Credit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='modal fade' tabIndex={-1} id='add_update_premium_for_user'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add/Update Premium </h5>
                <div
                  className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <i className='fa-solid fa-xmark'></i>
                </div>
              </div>
              <div className='modal-body'>
                <div>
                  <p>
                    Current User Plan Name :-
                    {user?.userPurchasePlan !== null
                      ? user?.userPurchasePlan?.premiumPackageAmountDetail?.premiumPackageName
                      : 'No Premium Plan Purchased'}
                  </p>
                  {/* <p>Premium package Id : {user?.userPurchasePlan[0].premiumPackageAmountId}</p> */}
                  <p>
                    Remaining Days :{' '}
                    {user?.userPurchasePlan !== null ? user?.userPurchasePlan?.days : 0}
                  </p>
                </div>
                <br />
                <input
                  placeholder='Enter days'
                  type='number'
                  className={'form-control form-control-solid mb-3 mb-lg-0'}
                  autoComplete='off'
                  value={addUpdatePremium.days}
                  onChange={(e) =>
                    setaddUpdatePremium({
                      ...addUpdatePremium,
                      days: Math.abs(parseInt(e.target.value)),
                    })
                  }
                />
                <br />
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-hide-search='true'
                  defaultValue={addUpdatePremium.type}
                  onChange={(e) =>
                    setaddUpdatePremium({
                      ...addUpdatePremium,
                      type: e.target.value,
                    })
                  }
                >
                  <option value='add'>Add</option>
                  <option value='update'>Update</option>
                </select>
                <br />
                <Form>
                  <Form.Group>
                    <div className='row'>
                      {premiumAmountPackages.length !== 0 &&
                        premiumAmountPackages.map((premiumAmountPackage: any) => (
                          <div className='col-6'>
                            <div
                              key={`inline-${premiumAmountPackage.premiumPackageAmountId}`}
                              className='mb-3'
                            >
                              <Form.Check
                                type='radio'
                                aria-label='radio 1'
                                label={
                                  <div>
                                    <h4>{premiumAmountPackage.premiumPackageName}</h4>
                                    <div className='d-flex justify-content-between'>
                                      <h4>Rs. {premiumAmountPackage.amount}</h4>
                                      <h4>{premiumAmountPackage.days} Days</h4>
                                    </div>
                                  </div>
                                }
                                value={premiumAmountPackage.premiumPackageAmountId}
                                name='group1'
                                onChange={(e) =>
                                  setaddUpdatePremium({
                                    ...addUpdatePremium,
                                    premiumId: parseInt(e.target.value),
                                  })
                                }
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </Form.Group>
                </Form>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={addOrUpdatePremium}
                >
                  Add / Update Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  )
}

export {ProfileHeader}
