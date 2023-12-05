import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {getUserCreditsHistoryWithPagination} from '../../../../../API/api-endpoint'
import {DateWithTimeFormatter} from '../../../../../utils/Utils'

const Credit = () => {
  const userId = localStorage.getItem('userId')
  const [tabValue, setTabValue] = useState('all')
  const intl = useIntl()

  const handleChange = (tabName) => {
    setTabValue(tabName)
  }

  const [userCreditList, setUserCreditList] = useState([])

  useEffect(() => {
    if (tabValue === 'all') {
      getAllUserCreditList('')
    } else {
      getAllUserCreditList(tabValue)
    }
  }, [tabValue])

  const getAllUserCreditList = async (type) => {
    let result = await getUserCreditsHistoryWithPagination(userId, 1, 100, type)
    setUserCreditList(result.data)
  }

  return (
    <div className='card '>
      <div className='card-title pt-8 px-9'>
        <h2>{intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CREDIT'})}</h2>
      </div>

      <div className=''>
        <div className='card-header border-0'>
          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'all' && 'active')
                  }
                  onClick={() => handleChange('all')}
                >
                  All
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'credit' && 'active')
                  }
                  onClick={() => handleChange('credit')}
                >
                  Credit
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'debit' && 'active')
                  }
                  onClick={() => handleChange('debit')}
                >
                  Spent
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className='card-body py-0' style={{overflowY: 'scroll', height: '500px'}}>
          <KTCardBody className='py-4 card'>
            <div className='table-responsive'>
              <table
                id='kt_table_users'
                className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
              >
                <thead>
                  <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                    <td>Description</td>
                    <td>Date</td>
                    <td>Type</td>
                  </tr>
                </thead>
                <tbody className='text-gray-600 '>
                  {userCreditList.length !== 0 &&
                    userCreditList.map((credit: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className='text-muted fw-semibold fs-6'>
                              <div className='d-flex flex-column'>
                                <span className='fw-bolder text-gray-800 text-hover-primary mb-1'>
                                  {credit.credit} Credits
                                </span>

                                <span className='text-gray-500 fw-bold'>{credit.description}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>{DateWithTimeFormatter(credit?.createdAt)}</span>
                          </td>
                          <td>
                            <span>{credit?.creditType}</span>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </KTCardBody>
        </div>
        <div className='card-footer'></div>
      </div>
    </div>
  )
}

export default Credit
