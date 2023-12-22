import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import Plugins from '../modules/apps/plugins/Plugins'
import UserVerification from '../modules/apps/user-verification/UserVerification'

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

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}

        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        <Route
          path='apps/anonymous-user-management/*'
          element={
            <SuspensedView>
              <AnonymousUsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='app/register-anonymous-user/*'
          element={
            <SuspensedView>
              <CreateNewAnonymousUser />
            </SuspensedView>
          }
        />
        <Route
          path='apps/users-profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='plugins/*'
          element={
            <SuspensedView>
              <Plugins />
            </SuspensedView>
          }
        />
        <Route path='user-media/*' element={<SuspensedView></SuspensedView>} />
        <Route
          path='user-verification/*'
          element={
            <SuspensedView>
              <UserVerification />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
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
