import {Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import {useIntl} from 'react-intl'
import Photos from './users-list/components/user-media/Photos'
import Stories from './users-list/components/user-media/Stories'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: 'admin/apps/user-management/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UserMediaBreadCrumbs: Array<PageLink> = [
  {
    title: 'User Management - UserMedia',
    path: 'admin/apps/user-management/user-media/photos',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  const intl = useIntl()
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERSLIST'})}
              </PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='user-media/photos'
          element={
            <>
              <PageTitle breadcrumbs={UserMediaBreadCrumbs}>Photos</PageTitle>
              <Photos />
            </>
          }
        />

        <Route
          path='user-media/stories'
          element={
            <>
              <PageTitle breadcrumbs={UserMediaBreadCrumbs}>Stories</PageTitle>
              <Stories />
            </>
          }
        />
        {/* <Route
          path='user-media'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERSLIST'})}
              </PageTitle>
            </>
          }
        /> */}
      </Route>
    </Routes>
  )
}

export default UsersPage
