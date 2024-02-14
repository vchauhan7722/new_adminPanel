import {useEffect, useState} from 'react'
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers'
import MyLikesList from './MyLikesList'
import MyDisLikesList from './MyDisLikesList'
import LikesMeList from './LikesMeList'
import VisitsMeList from './VisitsMeList'
import DisLikesMeList from './DisLikesMeList'
import UndoProfileMeList from './UndoProfileMeList'
import MatchList from './matchList'
import MyVisitsList from './MyVisitsList'
import MyUndoProfileList from './MyUndoProfileList'
import {getAllInteractionCount} from '../../../../../../API/api-endpoint'
import {GetIDFromURL} from '../../../../../../utils/Utils'
import {useLocation} from 'react-router-dom'

const Interaction = () => {
  let location = useLocation()
  let userId = GetIDFromURL(location)

  const [selectedInteractionType, setSelectedInteractionType] = useState<any>(undefined)
  const [interactionCount, setInteractionCount] = useState<any>({})

  const handleChangeSelectInteractionType = (name: any) => {
    setSelectedInteractionType(name)
  }

  useEffect(() => {
    getAllLikesMeList()
  }, [])

  const getAllLikesMeList = async () => {
    let result = await getAllInteractionCount(userId)
    setInteractionCount(result.data)
  }

  return (
    // <h5>interaction</h5>
    <KTCard>
      <KTCardBody>
        {selectedInteractionType === undefined && (
          <div className='row d-flex justify-content-between'>
            <div className='col-3'>
              <div className='d-flex flex-wrap flex-stack'>
                <div className='text-center fw-bold fs-3 mb-5'>People Interaction</div>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap flex-column'>
                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('peopleLikes')}
                    >
                      <div className='d-flex align-items-center pointer'>
                        <div className='fw-bold fs-3 text-black me-2'>Likes</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.likesMe || 0}
                      </div>
                    </div>

                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('peopleVisit')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='fw-bold fs-3 text-black me-2 pointer'>Visit</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.visitMe || 0}
                      </div>
                    </div>

                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('peopleDisLikes')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='fw-bold fs-3 text-black me-2 pointer'>DisLike</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.dislikesMe || 0}
                      </div>
                    </div>

                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('peopleUndoProfile')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className=' fw-bold fs-3 text-black me-2 pointer'>Undo Profile</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.undoProfileMe || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className=' fw-bold fs-3 mb-5'>Match</div>
              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap flex-column'>
                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('match')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='fw-bold fs-3 text-black me-2 pointer'>Match</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {' '}
                        {interactionCount?.match || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='d-flex flex-wrap flex-stack'>
                <div className='text-center fw-bold fs-3 mb-5'>My Interaction</div>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap flex-column'>
                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('myLikes')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='fw-bold fs-3 text-black me-2 pointer'>Likes</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.myLikes || 0}
                      </div>
                    </div>

                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('myVisit')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='fw-bold fs-3 text-black me-2 pointer'>Visit</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.myVisits || 0}
                      </div>
                    </div>

                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('myDislike')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className='fw-bold fs-3 text-black me-2 pointer'>DisLike</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.myDislikes || 0}
                      </div>
                    </div>

                    <div
                      className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'
                      onClick={() => handleChangeSelectInteractionType('myUndoProfile')}
                    >
                      <div className='d-flex align-items-center'>
                        <div className=' fw-bold fs-3 text-black me-2 pointer'>Undo Profile</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>
                        {interactionCount?.myUndoProfile || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedInteractionType === 'peopleLikes' && (
          <LikesMeList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'peopleVisit' && (
          <VisitsMeList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'peopleDisLikes' && (
          <DisLikesMeList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'peopleUndoProfile' && (
          <UndoProfileMeList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'match' && (
          <MatchList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'myLikes' && (
          <MyLikesList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'myVisit' && (
          <MyVisitsList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'myDislike' && (
          <MyDisLikesList handleChange={handleChangeSelectInteractionType} />
        )}
        {selectedInteractionType === 'myUndoProfile' && (
          <MyUndoProfileList handleChange={handleChangeSelectInteractionType} />
        )}
      </KTCardBody>
    </KTCard>
  )
}

export default Interaction
