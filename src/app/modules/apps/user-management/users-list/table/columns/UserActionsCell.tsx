/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  // const {query} = useQueryResponse()
  // const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  // const deleteItem = useMutation(() => deleteUser(id), {
  //   // 💡 response of the mutation is passed to onSuccess
  //   onSuccess: () => {
  //     // ✅ update detail view directly
  //     queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
  //   },
  // })

  const deleteItem = () => {
    console.log('delete')
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
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            Open a live Profile
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => deleteItem()}
          >
            Edit Account
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => deleteItem()}
          >
            Edit Media Files
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => deleteItem()}
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
            onClick={() => deleteItem()}
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
            onClick={() => deleteItem()}
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
            onClick={() => deleteItem()}
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
