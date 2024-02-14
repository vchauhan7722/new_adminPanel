import {useQueryClient, useMutation} from 'react-query'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedUsers} from '../../core/_requests'
import {deleteUserAccount} from '../../../../../../../API/api-endpoint'
import Swal from 'sweetalert2'
import ToastUtils from '../../../../../../../utils/ToastUtils'

const UsersListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

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
        let result = await deleteUserAccount(selected)
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
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button type='button' className='btn btn-danger' onClick={deleteUser}>
        Delete Selected
      </button>
    </div>
  )
}

export {UsersListGrouping}
