import React, {useState} from 'react'
import {KTCardBody} from '../../../../_metronic/helpers/components/KTCardBody'
import PluginData from '../plugins/PluginsData'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import ProfileQuestionsAndIntrest from './Componants/ProfileQuestionsAndInterest'

const Plugins = () => {
  const intl = useIntl()
  const [pluginList, setPluginList] = useState(PluginData)
  const [selectedPlugins, setSelectedPlugins] = useState('')

  return (
    <>
      {selectedPlugins.length === 0 && (
        <KTCardBody className='py-4 card'>
          <div className='table-responsive'>
            <table
              id='kt_table_users'
              className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            >
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  <td colSpan={4}>{intl.formatMessage({id: 'PLUGINS.TABLE.PLUGINNAME'})}</td>
                  <td colSpan={4}>{intl.formatMessage({id: 'PLUGINS.TABLE.DESCRIPTION'})}</td>
                  <td colSpan={2}>{intl.formatMessage({id: 'PLUGINS.TABLE.STATUS'})}</td>
                  <td colSpan={2}>{intl.formatMessage({id: 'PLUGINS.TABLE.ACTIONS'})}</td>
                </tr>
              </thead>
              <tbody className='text-gray-600 '>
                {pluginList.map((plugin) => {
                  return (
                    <tr>
                      <td colSpan={4}>
                        <div className='d-flex align-items-center '>
                          <div className='symbol symbol-50px overflow-visible me-3'>
                            <img
                              src={`https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`}
                              alt='icon'
                              width='50px'
                              height='50px'
                            />
                          </div>

                          <div className='flex-grow-1'>
                            <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                              {plugin.name}
                            </a>
                            <span className='text-muted fw-semibold d-block fs-6'>
                              {plugin.type}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td colSpan={4}>
                        <div className='text-muted fw-semibold fs-6'>{plugin.description}</div>
                      </td>
                      <td colSpan={2}>
                        <span
                          className={clsx('badge rounded-pill  ', {
                            'text-bg-success text-white': plugin.status === 'Active',
                            'text-bg-danger text-white': plugin.status === 'Disabled',
                          })}
                        >
                          {plugin.status}
                        </span>
                      </td>
                      <td colSpan={2}>
                        <button
                          className='btn btn-sm btn-light'
                          data-kt-menu-dismiss='true'
                          onClick={() => setSelectedPlugins(plugin.name)}
                        >
                          <i className='fa-solid fa-gear'></i>
                          Setting
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      )}

      {selectedPlugins === 'Profile questions and Interest' && <ProfileQuestionsAndIntrest />}
    </>
  )
}

export default Plugins
