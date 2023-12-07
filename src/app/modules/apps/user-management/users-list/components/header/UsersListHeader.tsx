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
      <div className='mt-5'>
        <UsersListSearchComponent />
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {UsersListHeader}
