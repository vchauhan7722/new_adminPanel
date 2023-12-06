/* eslint-disable react-hooks/exhaustive-deps */
import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {ProfileHeader} from './ProfileHeader'
import EditProfile from './components/EditProfile'
import Activity from './components/Activity'
import {useIntl} from 'react-intl'
import {useLocation} from 'react-router-dom'
import {GetIDFromURL} from '../../../../utils/Utils'
import {getUserpProfileDetailsUsingUserID} from '../../../../API/api-endpoint'
import {useState, useEffect} from 'react'
import {Chat} from './components/Chat'
import Media from './components/Media/Media'
import Credit from './components/Credit'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/apps/users-profile/activity',
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

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<any>()
  const [userProfilePercentage, setUserProfilePercentage] = useState<any>()
  const [userUpdateFlag, setUserUpdateFlag] = useState({count: 1})

  const intl = useIntl()
  let location = useLocation()
  let UserID = GetIDFromURL(location)

  useEffect(() => {
    getUserDetails()
  }, [userUpdateFlag])

  const getUserDetails = async () => {
    let user_details = await getUserpProfileDetailsUsingUserID(UserID)
    setUserProfilePercentage(user_details.profileCompletePer)
    setUserDetails(user_details.data)
  }

  return userDetails === undefined ? (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <Routes>
      <Route
        element={
          <>
            <ProfileHeader user={userDetails} userProfilePercentage={userProfilePercentage} />
            <Outlet />
          </>
        }
      >
        <Route
          path='/activity/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY'})}
              </PageTitle>
              <Activity user={userDetails} />
            </>
          }
        />
        <Route
          path='/overview/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.OVERVIEW'})}
              </PageTitle>
              <Overview user={userDetails} />
            </>
          }
        />
        <Route
          path='/edit-profile/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.EDITPROFILE'})}
              </PageTitle>
              <EditProfile
                user={userDetails}
                setUserUpdateFlag={setUserUpdateFlag}
                userUpdateFlag={userUpdateFlag}
              />
            </>
          }
        />
        <Route
          path='/chat/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CHAT'})}
              </PageTitle>
              <Chat />
            </>
          }
        />
        <Route
          path='/videocall/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.VIDEOCALL'})}
              </PageTitle>
              <div>Videocall</div>
            </>
          }
        />
        <Route
          path='/media/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.MEDIA'})}
              </PageTitle>
              <Media user={userDetails} />
            </>
          }
        />
        <Route
          path='/live-stream/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.LIVESTREAM'})}
              </PageTitle>
              <div>Livestream</div>
            </>
          }
        />
        <Route
          path='/reels/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.REELS'})}
              </PageTitle>
              <div>Reels</div>
            </>
          }
        />
        <Route
          path='/credit/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CREDIT'})}
              </PageTitle>
              <Credit />
            </>
          }
        />
        <Route
          path='/history/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.HISTORY'})}
              </PageTitle>
              <div>History</div>
            </>
          }
        />
        <Route
          path='/referrals/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.REFERRALS'})}
              </PageTitle>
              <div>REFERRALS</div>
            </>
          }
        />
        <Route
          path='/security/:id'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>
                {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.SECURITY'})}
              </PageTitle>
              <div>Security</div>
            </>
          }
        />
        <Route index element={<Navigate to='/apps/users-profile/activity' />} />
      </Route>
    </Routes>
  )
}

export default ProfilePage
