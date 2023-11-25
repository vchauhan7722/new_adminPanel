import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    name: user.name || initialUser.name,
    email: user.email || initialUser.email,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    //validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createUser(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='row mb-6'>
            <label className='col-lg-6 required fw-bold fs-6 mb-2'>Full Name</label>
            <div className='col-lg-6'>
              {/* begin::Input */}
              <input
                placeholder='Full name'
                {...formik.getFieldProps('fullName')}
                type='text'
                name='fullName'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.fullName && formik.errors.fullName},
                  {
                    'is-valid': formik.touched.fullName && !formik.errors.fullName,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.fullName}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-6 required fw-bold fs-6 mb-2'>UserName</label>
            <div className='col-lg-6'>
              {/* begin::Input */}
              <input
                placeholder='User Name'
                {...formik.getFieldProps('userName')}
                type='text'
                name='userName'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.userName && formik.errors.userName},
                  {
                    'is-valid': formik.touched.userName && !formik.errors.userName,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.userName && formik.errors.userName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.userName}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-6 required fw-bold fs-6 mb-2'>BirthDate</label>
            <div className='col-lg-6'>
              {/* begin::Input */}
              <input
                placeholder='Birthdate'
                {...formik.getFieldProps('name')}
                type='date'
                name='birthDate'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.birthDate && formik.errors.birthDate},
                  {
                    'is-valid': formik.touched.birthDate && !formik.errors.birthDate,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.birthDate && formik.errors.birthDate && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.birthDate}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-6 form-label fs-6 fw-bold'>Gender:</label>
            <div className='col-lg-6'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='gender'
                data-hide-search='true'
              >
                <option value=''></option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='lesibian'>Lesibian</option>
                <option value='gay'>Gay</option>
              </select>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-6 required fw-bold fs-6 mb-2'>Location</label>
            <div className='col-lg-6'>
              {/* begin::Input */}
              <input
                placeholder='City'
                {...formik.getFieldProps('city')}
                type='text'
                name='city'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.city && formik.errors.city},
                  {
                    'is-valid': formik.touched.city && !formik.errors.city,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.city && formik.errors.city && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.city}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-6 required fw-bold fs-6 mb-2'>Bio</label>
            <div className='col-lg-6'>
              {/* begin::Input */}
              <input
                placeholder='Bio'
                {...formik.getFieldProps('bio')}
                type='text'
                name='bio'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.bio && formik.errors.bio},
                  {
                    'is-valid': formik.touched.bio && !formik.errors.bio,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.bio && formik.errors.bio && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.bio}</span>
                  </div>
                </div>
              )}
              {/* end::Input */}
            </div>
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
