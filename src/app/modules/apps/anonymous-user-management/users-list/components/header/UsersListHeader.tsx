import {Link} from 'react-router-dom'
import {useListView} from '../../core/ListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {UsersListFilter} from './UsersListFilter'
import {UsersListGrouping} from './UsersListGrouping'
import {UsersListSearchComponent} from './UsersListSearchComponent'

const UsersListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='border-0 p-4'>
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}

        <UsersListFilter />
        {selected.length > 0 && <UsersListGrouping />}
        {/* end::Group actions */}
      </div>
      <div className='d-flex justify-content-between mt-5'>
        <div>
          <UsersListSearchComponent />
        </div>
        <div>
          <Link to='/app/register-anonymous-user'>
            <button className='btn btn-primary'>Create New User</button>
          </Link>
        </div>
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {UsersListHeader}
