import React from 'react'
import {KTCard, KTCardBody} from '../../../../../_metronic/helpers'
import ProfileQuestions from './ProfileQuestionsAndInterest/ProfileQuestions'
import ProfileInterest from './ProfileQuestionsAndInterest/ProfileInterest'

const ProfileQuestionsAndInterest = () => {
  return (
    <>
      <KTCard>
        <ProfileInterest />
      </KTCard>
      <KTCard className='mt-8'>
        <ProfileQuestions />
      </KTCard>
    </>
  )
}

export default ProfileQuestionsAndInterest
