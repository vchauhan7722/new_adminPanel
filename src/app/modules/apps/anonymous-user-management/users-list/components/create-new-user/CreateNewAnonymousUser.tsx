import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../../../_metronic/layout/core'
import {Vertical} from './components/Vertical'

const wizardsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Anonymous User',
    path: '/admin/app/register-anonymous-user',
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

const CreateNewAnonymousUser = () => {
  return (
    <>
      <PageTitle breadcrumbs={wizardsBreadCrumbs}>Register</PageTitle>
      <Vertical />
    </>
  )
}

export default CreateNewAnonymousUser
