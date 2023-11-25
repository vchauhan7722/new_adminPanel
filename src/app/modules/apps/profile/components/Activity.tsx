import React, {useState} from 'react'
import {useIntl} from 'react-intl'

const Activity = (props) => {
  const intl = useIntl()
  const [tabValue, setTabValue] = useState('all')

  const handleChange = (tabName) => {
    setTabValue(tabName)
  }
  return (
    <div className='card '>
      <div className='card-title pt-8 px-9'>
        <h2>{intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.LOGS'})}</h2>
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
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.All'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'system' && 'active')
                  }
                  onClick={() => handleChange('system')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.SYSTEM'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'chat' && 'active')
                  }
                  onClick={() => handleChange('chat')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.CHAT'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'videocall' && 'active')
                  }
                  onClick={() => handleChange('videocall')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.VIDEOCALL'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'undo-profile' && 'active')
                  }
                  onClick={() => handleChange('undo-profile')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.UNDOPROFILE'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'like' && 'active')
                  }
                  onClick={() => handleChange('like')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.LIKE'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'visit' && 'active')
                  }
                  onClick={() => handleChange('visit')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.VISIT'})}
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className={
                    `nav-link text-active-primary me-6 ` + (tabValue === 'match' && 'active')
                  }
                  onClick={() => handleChange('match')}
                >
                  {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.ACTIVITY.MATCH'})}
                </div>
              </li>
            </ul>
          </div>

          <div className='card-toolbar'>
            <select
              className='form-select form-select-sm form-select-solid w-125px '
              data-control='select2'
              data-placeholder='Select Hours'
              data-hide-search='true'
            >
              <option value='1'>1 Hours</option>
              <option value='2'>6 Hours</option>
              <option value='3'>12 Hours</option>
              <option value='4'>24 Hours</option>
            </select>
            <button type='button' className='btn btn-sm btn-light-primary ms-2'>
              <i className='ki-duotone ki-cloud-download fs-3'>
                <span className='path1'></span>
                <span className='path2'></span>
              </i>
              Download Report
            </button>
          </div>
        </div>

        <div className='card-body py-0' style={{overflowY: 'scroll', height: '500px'}}>
          <div className='table-responsive'>
            <table
              className='table align-middle table-row-dashed fw-semibold text-gray-600 fs-6 gy-5'
              id='kt_table_customers_logs'
            >
              <tbody>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
                <tr>
                  <td className='min-w-70px'>
                    <div className='badge badge-light-success'>200 OK</div>
                  </td>

                  <td>POST /v1/invoices/in_7239_8635/payment</td>

                  <td className='pe-0 text-end min-w-200px'>6:05 pm, 21 Feb 2023 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
