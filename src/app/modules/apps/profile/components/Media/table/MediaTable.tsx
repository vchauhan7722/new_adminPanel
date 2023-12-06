/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {KTCardBody} from '../../../../../../../_metronic/helpers'
import {getAllUserStory} from '../../../../../../../API/api-endpoint'
import {DateWithTimeFormatter} from '../../../../../../../utils/Utils'

const MediaTable = () => {
  const userId = localStorage.getItem('userId')
  const [userStoryList, setUserStoryList] = useState([])

  useEffect(() => {
    getAllUserStoryList()
  }, [])

  const getAllUserStoryList = async () => {
    let result = await getAllUserStory(userId)
    console.log('story result', result)
    setUserStoryList(result)
  }
  return (
    <KTCardBody className='py-4 card'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              <td>Story</td>
              <td>Date</td>
              <td>Type</td>
              <td>View</td>
              <td>Gift Card</td>
              <td>Credit</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className='text-gray-600 '>
            {userStoryList !== undefined &&
              userStoryList.map((story: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className='d-flex align-items-center '>
                        <div className='symbol symbol-50px overflow-visible me-3'>
                          <img
                            src={
                              `${process.env.REACT_APP_SERVER_URL}/${story.media}` ||
                              `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                            }
                            alt='icon'
                            width='50px'
                            height='50px'
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        {DateWithTimeFormatter(story?.startTime)}
                      </div>
                    </td>
                    <td>
                      <span>{story?.isPrivate ? 'private' : 'public'}</span>
                    </td>
                    <td>
                      <span>{story?.totalViews}</span>
                    </td>
                    <td>
                      <span>
                        {story?.totalGift}/{story?.totalGiftCredit}
                      </span>
                    </td>
                    <td>
                      <span>{story?.totalCredit}</span>
                    </td>
                    <td>
                      <span>{story?.status ? 'visible' : 'Not Visible'}</span>
                    </td>
                    <td>
                      <div className='d-flex my-4'>
                        <div className='d-flex my-4'>
                          <div className='me-0'>
                            <div className='dropdown'>
                              <button className='dropbtn'>
                                <i className='bi bi-three-dots fs-3'></i>
                              </button>
                              <div className='dropdown-content'>
                                <span>Like Profile</span>
                                <span>Pin Profile</span>
                                <span>Clear All Messages</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </KTCardBody>
  )
}

export default MediaTable
