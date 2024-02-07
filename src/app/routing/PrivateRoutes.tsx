import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import Plugins from '../modules/apps/plugins/Plugins'
import UserVerification from '../modules/apps/user-verification/UserVerification'
import {AnonymousChat} from '../modules/apps/anonymous-user-chat/AnonymousChat'
import {PageLink, PageTitle, useLayout} from '../../_metronic/layout/core'
import UserOrders from '../modules/apps/user-orders/UserOrders'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/apps/profile/ProfilePage'))
  //const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const CreateNewAnonymousUser = lazy(
    () =>
      import(
        '../modules/apps/anonymous-user-management/users-list/components/create-new-user/CreateNewAnonymousUser'
      )
  )
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const AnonymousUsersPage = lazy(
    () => import('../modules/apps/anonymous-user-management/AnonymousUsersPage')
  )

  const AnonymousUserChatBreadCrumbs: Array<PageLink> = [
    {
      title: 'Anonymous User Chat',
      path: '/anonymous-user-chat',
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

  const {setSideBarType} = useLayout()

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='admin/auth/*' element={<Navigate to='/admin/dashboard' />} />
        {/* Pages */}
        <Route path='admin/dashboard' element={<DashboardWrapper />} />
        <Route path='admin/builder' element={<BuilderPageWrapper />} />
        {/* Lazy Modules */}
        <Route
          path='admin/crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='admin/apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='admin/apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='admin/apps/anonymous-user-management/*'
          element={
            <SuspensedView>
              <AnonymousUsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='admin/app/register-anonymous-user/*'
          element={
            <SuspensedView>
              <CreateNewAnonymousUser />
            </SuspensedView>
          }
        />
        {/* we have created 2 routes for profile page bcs we need a differentiate between normal user and anonymous user */}
        <Route
          path='admin/apps/users-profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='admin/apps/anonymous-user/users-profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='admin/plugins/*'
          element={
            <SuspensedView>
              <Plugins />
            </SuspensedView>
          }
        />
        <Route path='admin/user-media/*' element={<SuspensedView></SuspensedView>} />
        <Route
          path='admin/user-verification/*'
          element={
            <SuspensedView>
              <UserVerification />
            </SuspensedView>
          }
        />
        <Route
          path='admin/anonymous-user-chat/*'
          element={
            <SuspensedView>
              {/* {setSideBarType()} */}
              <PageTitle breadcrumbs={AnonymousUserChatBreadCrumbs}>Anonymous User Chat</PageTitle>
              <AnonymousChat />
            </SuspensedView>
          }
        />
        <Route
          path='admin/user-order'
          element={
            <SuspensedView>
              {/* {setSideBarType()} */}
              <PageTitle>User Orders</PageTitle>
              <UserOrders />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/admin/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
