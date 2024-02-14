/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Link} from 'react-router-dom'
import {activeInactiveUser, deleteUserAccount} from '../../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../../utils/ToastUtils'
import Swal from 'sweetalert2'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponse} from '../../core/QueryResponseProvider'
import {useQueryClient, useMutation} from 'react-query'

type Props = {
  userId: ID
  status: boolean
}

const UserActionsCell: FC<Props> = ({userId, status}) => {
  const {setItemIdForUpdate, clearSelected} = useListView()
  const {updateState} = useQueryRequest()

  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(userId)
  }

  // const deleteUser = useMutation(() => deleteUser(id), {
  //   // 💡 response of the mutation is passed to onSuccess
  //   onSuccess: () => {
  //     // ✅ update detail view directly
  //     queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
  //   },
  // })

  const deleteUser = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await deleteUserAccount([userId])
        if (result.status === 200) {
          ToastUtils({type: 'success', message: result.message})
          queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
          clearSelected()
        } else {
          ToastUtils({type: 'error', message: result.message})
        }
      }
    })
  }

  const UpdateUserStatus = async (status: any) => {
    Swal.fire({
      title: `Are you sure about to ${status === true ? 'Deactivate User' : 'Activate User'} ?`,
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await activeInactiveUser([userId], !status)

        if (result.status === 200) {
          ToastUtils({type: 'success', message: result.message})
          queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
          clearSelected()
        } else {
          ToastUtils({type: 'error', message: result.message})
        }
      }
    })
  }

  return (
    <>
      <button
        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
        data-kt-menu-flip='top-end'
      >
        <i className='bi bi-three-dots fs-3'></i>
      </button>
      {/* <div className='text-center'>
        <a
          className='btn btn-sm '
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='top-end'
        >
          <i className='bi bi-three-dots-vertical'></i>
        </a>{' '}
      </div> */}
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown w-250px py-4 menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            Open a live Profile
          </a>
        </div> */}
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={() => deleteUser()}
            to={`/admin/apps/anonymous-user/users-profile/edit-profile/${userId}`}
          >
            Edit Account
          </Link>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={() => deleteUser()}
            to={`/admin/apps/anonymous-user/users-profile/media/${userId}`}
          >
            Edit Media Files
          </Link>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={() => deleteUser()}
            to={`/admin/apps/anonymous-user/users-profile/reels/${userId}`}
          >
            Upload Reel
          </Link>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={() => deleteUser()}
          >
            Upload Reel
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => deleteUser()}
          >
            Delete Account
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => UpdateUserStatus(status)}
          >
            {status === true ? 'Deactivate User' : 'Activate User'}
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={() => deleteUser()}
          >
            Delete User And Ban Email
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            // onClick={() => deleteUser()}
          >
            Delete User And Ban Ip
          </a>
        </div>
        {/* end::Menu item */}
      </div>

      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
