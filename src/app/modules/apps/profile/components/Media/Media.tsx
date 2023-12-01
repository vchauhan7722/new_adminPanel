import React, {useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import MediaTable from './table/MediaTable'
import {updateMediaActionForUserMedia} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const Media = (props: any) => {
  const {user} = props

  const [userProfileMedia, setUserProfileMedia] = useState(user.userProfileImages)

  const userId = localStorage.getItem('userId')

  const ActionsOnMedia = async (type: any, mediaId: any) => {
    let actionType,
      typeValue = true
    if (type === 'private') {
      actionType = 'isPrivate'
    } else {
      actionType = 'isProfileImage'
    }

    let result = await updateMediaActionForUserMedia(userId, mediaId, actionType, typeValue)
    if (result.status === 200) {
      ToastUtils({
        type: 'success',
        message: `Your Media has Set as ${
          actionType === 'isPrivate' ? 'Private' : 'Profile Image'
        }`,
      })
    }
  }

  return (
    <div className='card '>
      <div className='card-title pt-8 px-9'>
        <h4>Media</h4>
      </div>

      <div>
        <div className='p-5'>
          <div className='card-header border-0 row column-gap-1'>
            {userProfileMedia
              .filter((media: any) => media.status === true)
              .map((userMedia: any, index: any) => {
                return (
                  <div className='col-2' key={index}>
                    <div className='position-relative'>
                      <img
                        alt='Pic'
                        src={`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`}
                        width='192'
                        height='189'
                        className='rounded'
                      />
                      <span className='position-absolute top-0 start-100'>
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
                            <div
                              className='menu-item px-3'
                              onClick={() => ActionsOnMedia('profile', userMedia.id)}
                            >
                              <a className='menu-link px-3'>Set profile</a>
                            </div>
                            {/* end::Menu item */}

                            {/* begin::Menu item */}
                            <div
                              className='menu-item px-3'
                              onClick={() => ActionsOnMedia('private', userMedia.id)}
                            >
                              <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                                Set private
                              </a>
                            </div>
                            {/* end::Menu item */}

                            {/* begin::Menu item */}
                            <div className='menu-item px-3'>
                              <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                                Upload to story
                              </a>
                            </div>
                            {/* end::Menu item */}

                            {/* begin::Menu item */}
                            <div className='menu-item px-3'>
                              <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                                Delete
                              </a>
                            </div>
                            {/* end::Menu item */}
                          </div>
                        </div>
                      </span>
                    </div>

                    <div className='text-muted mt-2 text-center'>07 Aug 2023 05:45pm</div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <div className='p-6'>
        <MediaTable />
      </div>
    </div>
  )
}

export default Media
