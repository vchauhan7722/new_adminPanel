import {useQueryClient, useMutation} from 'react-query'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteSelectedUsers} from '../../core/_requests'
import {activeInactiveUser} from '../../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../../utils/ToastUtils'
import {useEffect, useState} from 'react'

const UsersListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const [status, setStatus] = useState(true)
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()

  const deleteSelectedItems = useMutation(() => deleteSelectedUsers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      clearSelected()
    },
  })

  useEffect(() => {
    let statusString = query.split('activatedUser')[1]
    //let status = true
    if (statusString === undefined) {
      //status = true
      setStatus(true)
    } else if (statusString === '=activate') {
      //status = true
      setStatus(true)
    } else if (statusString === '=deactivate') {
      // status = false
      setStatus(false)
    }
  }, [query])

  const deactivateUser = async () => {
    //console.log('status', typeof status)
    let result = await activeInactiveUser(selected, !status)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: result.message})
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      clearSelected()
    } else {
      ToastUtils({type: 'error', message: result.message})
    }
  }

  return (
    <div className='d-flex justify-content-end align-items-center mt-3'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button type='button' className='btn btn-danger me-3' onClick={deactivateUser}>
        {status === true ? `Deactivated Selected` : `Activated Selected`}
      </button>
      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => console.log('delete', selected)}
      >
        Delete Selected
      </button>
    </div>
  )
}

export {UsersListGrouping}
