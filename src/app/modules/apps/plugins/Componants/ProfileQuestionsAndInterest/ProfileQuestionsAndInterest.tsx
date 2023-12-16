import {KTCard} from '../../../../../../_metronic/helpers'
import ProfileQuestions from './ProfileQuestions'
import ProfileInterest from './ProfileInterest'

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
