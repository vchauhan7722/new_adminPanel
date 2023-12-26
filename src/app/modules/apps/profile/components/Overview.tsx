import React from 'react'
import {useIntl} from 'react-intl'
import {DateTimeFormatter, DateWithTimeFormatter} from '../../../../../utils/DateUtils'

export function Overview(props: any) {
  const {user} = props

  const intl = useIntl()

  console.log(user)

  return (
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <div className='row '>
            <h3 className='fw-bolder m-0'>
              {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.OVERVIEW.PROFILEDETAILS'})}
            </h3>
          </div>
        </div>
      </div>

      <div className='card-body row p-9'>
        <div className='col-lg-4'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>{user.fullName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>UserName</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>@{user.userName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark text-hover-primary'>{user.email}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Mobile Number</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bold fs-6 me-2'>
                +{user.countryCode + ' '}
                {user.mobileNo}
              </span>

              {/* <span className='badge badge-success'>Verified</span> */}
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Location</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>
                {user.city},{user.state},{user.country}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Birth Date</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{DateTimeFormatter(user.birthDate)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Gender</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{user.gender.name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Bio</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
                {user.bio === null || user.bio.length === 0 || user.bio === undefined
                  ? `Hi, i am ${user?.fullName}, ${user?.age} years old and i am
              from ${user?.city} ${user?.country}`
                  : user.bio}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>IP</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>127.0.0.1</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Joined Date</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{DateWithTimeFormatter(user.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className='col-lg-4'>
          <h3 className='mb-5'>Profile Questions</h3>
          {user?.userQuestionAnswers.map((questionAnswer: any, index: number) => {
            return (
              <>
                <div className='row mb-3'>
                  <div className='col-lg-1'>
                    <img
                      alt='Pic'
                      src={`${process.env.REACT_APP_SERVER_URL}/${questionAnswer?.questionData?.icon}`}
                      width='16px'
                      height='16px'
                      className='me-2'
                    />
                  </div>
                  <div className='col-lg-5'>
                    <span className='mb-5 fs-6 fw-bold text-muted'>
                      {questionAnswer?.questionData?.question}
                    </span>
                  </div>
                  <div className='col-lg-6'>
                    <span className='mb-5 fw-normal fs-6'>
                      {questionAnswer?.answerData?.answer}
                    </span>
                  </div>
                </div>
              </>
            )
          })}
        </div>

        <div className='col-lg-4'>
          <h3 className='mb-5'>Profile Interest</h3>
          {user?.userInterests.map((interest: any) => {
            return (
              <>
                <div className='badge badge-light text-center me-3 mb-5 fs-6  fw-bold'>
                  {interest?.interests?.name}
                </div>{' '}
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
