import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  getSpotlightUsers,
  removeSpotlightUser,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import CustomPagination from '../../../../../../_metronic/partials/componants/Pagination'
import Swal from 'sweetalert2'

const SpotlightPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [spotlightUsers, setSpotlightUsers] = useState<any>([])
  const [pageSize, setPageSize] = useState(100)
  const [totalPage, setTotalPage] = useState(0)
  const [spotlightConfig, setSpotlightConfig] = useState<any>({
    credit: 0,
    duration: 0,
    autoWorldwide: false,
    spotLightArea: 'city',
  })

  useEffect(() => {
    getConfiguration()
    getspotlightUserList(1, pageSize)
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'autoWorldwide') {
      setSpotlightConfig({...spotlightConfig, [name]: event.target.value})
      if (name === 'spotLightArea') {
        updateConfiguration({...spotlightConfig, [name]: event.target.value})
      }
    } else {
      setSpotlightConfig({...spotlightConfig, [name]: value})
      updateConfiguration({...spotlightConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('spotlight-users')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setSpotlightConfig({
        credit: parsedData?.credit,
        duration: parsedData?.duration,
        autoWorldwide: parsedData?.autoWorldwide,
        spotLightArea: parsedData?.spotLightArea,
      })
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(spotlightConfig)
  }

  const updateConfiguration = async (config: any) => {
    //console.log('config', config)
    let result = await updateConfigurationByConfigID(configID, config, null)
    if (result.status === 200) {
      getConfiguration()
      ToastUtils({type: 'success', message: 'Configuration Saved SuccessFully'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const getspotlightUserList = async (page: any, pageSize: any) => {
    let result = await getSpotlightUsers(page, pageSize)
    if (result.status === 200) {
      setSpotlightUsers(result?.data)
      setTotalPage(result?.totalPage)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getspotlightUserList(page, pageSize)
  }

  const removeSpotLightUserFromList = async (userId: any) => {
    Swal.fire({
      title: 'Remove from Spotlight',
      text: 'Proceed to remove this user from the spotlight',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await removeSpotlightUser(userId)
        if (result.status === 200) {
          ToastUtils({type: 'success', message: 'User is Removed From Spotlight'})
          getspotlightUserList(1, pageSize)
        }
      }
    })
  }

  return (
    <div className='card'>
      <div className='card-title p-8'>
        <h2>Spotlight settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Duration for photo in spotlight</strong>
            </p>
            <p className='text-muted'>
              How much time the photo will stay in the spotlight? add the amount in days
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Days In Spotlight
              </label>
              <input
                type='number'
                className='form-control'
                name='duration'
                value={spotlightConfig.duration}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Spotlight Credit</strong>
            </p>
            <p className='text-muted'>How much Credit are set for spotlight</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Spotlight Credit
              </label>
              <input
                type='number'
                className='form-control'
                name='credit'
                value={spotlightConfig.credit}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Worlwide spotlight</strong>
            </p>
            <p className='text-muted'>
              If there is no result in the spotlight because you selected City or Country automatic
              change to Worldwide
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='autoWorldwide'
                checked={spotlightConfig.autoWorldwide}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Filter proximity range</strong>
            </p>
            <p className='text-muted'>Select which proximity range use to search populars users</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-hide-search='true'
                //defaultValue={spotlightConfig.search}
                name='spotLightArea'
                value={spotlightConfig.spotLightArea}
                onChange={(event) => handleChange(event)}
              >
                <option value='worldwide'>WorldWide</option>
                <option value='country'>Country</option>
                <option value='state'>State</option>
                <option value='city'>City</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <td>User Info</td>
                <td>Spotlight Days</td>
                <td>Location</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className='text-gray-600 '>
              {spotlightUsers.length !== 0 &&
                spotlightUsers.map((spotlight: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-circle symbol-50px overflow-visible me-3'>
                            <img
                              src={
                                `${process.env.REACT_APP_SERVER_URL}/${spotlight?.profileImage}` ||
                                `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                              }
                              alt='logo'
                              width='50px'
                              height='50px'
                            />
                            {!spotlight.isOnline && (
                              <div className='position-absolute  bottom-0 end-0 bg-success rounded-circle border border-3 border-white h-15px w-15px'></div>
                            )}
                          </div>

                          <div className='d-flex flex-column'>
                            <Link
                              to={`/apps/users-profile/activity/${spotlight.userId}`}
                              className='fw-bolder text-gray-800 text-hover-primary mb-1'
                            >
                              {spotlight.fullName}
                            </Link>

                            <span className='text-gray-500 fw-bold'>(ID : {spotlight.userId})</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>{spotlight?.spotLightDays} days</span>
                      </td>
                      <td>
                        <span>
                          {spotlight?.city !== null
                            ? `${spotlight?.city}, ${spotlight?.state}, ${spotlight?.country}`
                            : '-'}
                        </span>
                      </td>
                      <td>
                        <div className='d-flex my-4'>
                          <button
                            className='btn btn-primary'
                            onClick={() => removeSpotLightUserFromList(spotlight?.userId)}
                          >
                            <i className='fa-solid fa-trash-can'></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </KTCardBody>
      <div className='card-footer'>
        {spotlightUsers.length !== 0 && (
          <CustomPagination
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPage={totalPage}
            cb={getPagination}
          />
        )}
      </div>
    </div>
  )
}

export default SpotlightPlugin
