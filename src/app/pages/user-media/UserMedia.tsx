import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import Photos from '../../modules/apps/user-media/Photos'
import Stories from '../../modules/apps/user-media/Stories'

const UserMediaBreadCrumbs: Array<PageLink> = [
  {
    title: 'UserMedia',
    path: 'user-media/photos',
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

const UserMedia = () => {
  return (
    <Routes>
      <Route
        path='/photos'
        element={
          <>
            <PageTitle breadcrumbs={UserMediaBreadCrumbs}>Photos</PageTitle>
            <Photos />
          </>
        }
      />
      <Route
        path='/stories'
        element={
          <>
            <PageTitle breadcrumbs={UserMediaBreadCrumbs}>Stories</PageTitle>
            <Stories />
          </>
        }
      />
    </Routes>
  )
}

export default UserMedia
