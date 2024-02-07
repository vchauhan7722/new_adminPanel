/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import {getMyVisitList} from '../../../../../../API/api-endpoint'
import {DateWithTimeFormatter} from '../../../../../../utils/DateUtils'
import CustomPagination from '../../../../../../_metronic/partials/componants/Pagination'
import {GetIDFromURL} from '../../../../../../utils/Utils'
import {useLocation} from 'react-router-dom'

const MyVisitsList = ({handleChange}) => {
  let location = useLocation()
  let userId = GetIDFromURL(location)

  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [myVisitsList, setMyVisitsList] = useState([])

  const page = 1

  useEffect(() => {
    getAllMyVisitsList(page, pageSize)
  }, [])

  const getAllMyVisitsList = async (page: any, pageSize: any) => {
    let result = await getMyVisitList(userId, page, pageSize)
    setMyVisitsList(result.data)
    setTotalPage(result?.totalPage)
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getAllMyVisitsList(page, pageSize)
  }

  return (
    <div className=''>
      <div className='card-title pt-8 px-9 d-flex justify-content-between'>
        <div>
          <h2>My Visits</h2>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => handleChange(undefined)}>
            Back
          </button>
        </div>
      </div>

      <div className=''>
        <div className='card-body py-0' style={{overflowY: 'scroll', height: '500px'}}>
          <div className='table-responsive'>
            <table
              id='kt_table_users'
              className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            >
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  <td>User</td>
                  <td>Date</td>
                </tr>
              </thead>
              <tbody className='text-gray-600 '>
                {myVisitsList !== undefined &&
                  myVisitsList.map((item: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className='d-flex align-items-center '>
                            <div className='symbol symbol-40px symbol-circle overflow-visible me-3'>
                              <img
                                src={
                                  `${process.env.REACT_APP_SERVER_URL}/${item?.receiverData?.profileImage}` ||
                                  `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                                }
                                alt='icon'
                                width='50px'
                                height='50px'
                                loading='lazy'
                              />
                            </div>

                            <div className='flex-grow-1'>
                              <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                                {item?.receiverData?.fullName}
                              </a>
                              <span className='text-muted fw-semibold d-block fs-6'>
                                {item?.receiverData?.city}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{DateWithTimeFormatter(item?.createdAt)}</span>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='card-footer'>
          {myVisitsList !== undefined && (
            <CustomPagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              setTotalPage={setTotalPage}
              cb={getPagination}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MyVisitsList
