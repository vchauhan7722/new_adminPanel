import React, {useState} from 'react'
import {KTCardBody} from '../../../../_metronic/helpers/components/KTCardBody'
import PluginData from '../plugins/PluginsData'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import ProfileQuestionsAndInterest from './Componants/ProfileQuestionsAndInterest/ProfileQuestionsAndInterest'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Link, Route, Routes, useLocation} from 'react-router-dom'
import Gifts from './Componants/Gifts/gifts'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import ChatPlugin from './Componants/Chat/ChatPlugin'
import SitePricingPlugin from './Componants/SitePricing/SitePricingPlugin'
import RewardPlugin from './Componants/Reward/RewardPlugin'
import PopularPlugin from './Componants/Popular/popularPlugin'
import SpotlightPlugin from './Componants/Spotlight/SpotlightPlugin'
import VideocallPlugin from './Componants/Videocall/VideocallPlugin'
import LegalInformationPlugin from './Componants/LegalInformation/LegalInformationPlugin'
import DiscoverGame from './Componants/DiscoverGame/DiscoverGamePlugin'
import GeneralPlugin from './Componants/General/GeneralPlugin'
import VerificationSystemPlugin from './Componants/VerificationSystem/VerificationSystemPlugin'
import AccountPrivilegesPlugin from './Componants/AccountPrivilges/AccountPrivilgesPlugin'
import ManualPaymentGatewaysPlugin from './Componants/ManualPaymentGateways/ManualPaymentGatewaysPlugin'
import StripePaymentPlugin from './Componants/StripePayment/StripePaymentPlugin'
import OpenMoneyPaymentPlugin from './Componants/OpenMoneyPayment/OpenMoneyPaymentPlugin'
import RazorpayPaymentPlugin from './Componants/RazorpayPayment/RazorpayPaymentPlugin'
import PhonePayPlugin from './Componants/PhonePay/PhonePayPlugins'
import FolderStructurePlugin from './Componants/FolderStructure/folderStrucuturePlugin'
import AnonymousUserInteraction from './Componants/AnonymousUserInteraction/AnonymousUserInteraction'
import CreditDescriptionPlugins from './Componants/CreditDescription/CreditDescriptionPlugins'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Plugins',
    path: '/plugins',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const Plugins = () => {
  const intl = useIntl()
  const location = useLocation()
  const [pluginList, setPluginList] = useState(PluginData)

  return (
    <>
      <PageTitle breadcrumbs={usersBreadcrumbs}>
        {intl.formatMessage({id: 'MENU.PLUGINS'})}
      </PageTitle>
      {location.pathname === '/admin/plugins' && (
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
                              src={
                                toAbsoluteUrl(plugin.icon) ||
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
                        <Link to={`/admin/plugins/${plugin.path}`}>
                          <button className='btn btn-sm btn-light' data-kt-menu-dismiss='true'>
                            <i className='fa-solid fa-gear'></i>
                            Setting
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </KTCardBody>
      )}

      <Routes>
        <Route
          path='/question_answer_plugin'
          element={
            <>
              <PageTitle>Questions and Answers</PageTitle>
              <ProfileQuestionsAndInterest />
            </>
          }
        />
        <Route
          path='/gifts_plugin'
          element={
            <>
              <PageTitle>Gifts</PageTitle>
              <Gifts />
            </>
          }
        />
        <Route
          path='/chat_plugin'
          element={
            <>
              <PageTitle>Chat</PageTitle>
              <ChatPlugin />
            </>
          }
        />
        <Route
          path='/site_pricing_plugin'
          element={
            <>
              <PageTitle>Site Pricing</PageTitle>
              <SitePricingPlugin />
            </>
          }
        />
        <Route
          path='/credit_description_plugin'
          element={
            <>
              <PageTitle>Credit Package Plugin</PageTitle>
              <CreditDescriptionPlugins />
            </>
          }
        />
        <Route
          path='/reward_plugin'
          element={
            <>
              <PageTitle>Reward</PageTitle>
              <RewardPlugin />
            </>
          }
        />
        <Route
          path='/populars_plugin'
          element={
            <>
              <PageTitle>Popular</PageTitle>
              <PopularPlugin />
            </>
          }
        />
        <Route
          path='/spotlight_plugin'
          element={
            <>
              <PageTitle>Spotlight</PageTitle>
              <SpotlightPlugin />
            </>
          }
        />
        <Route
          path='/videocall_plugin'
          element={
            <>
              <PageTitle>Videocall</PageTitle>
              <VideocallPlugin />
            </>
          }
        />
        <Route
          path='/discover_game_plugin'
          element={
            <>
              <PageTitle>Discover Game</PageTitle>
              <DiscoverGame />
            </>
          }
        />
        <Route
          path='/general_plugin'
          element={
            <>
              <PageTitle>General</PageTitle>
              <GeneralPlugin />
            </>
          }
        />
        <Route
          path='/verification_system_plugin'
          element={
            <>
              <PageTitle>Verification System</PageTitle>
              <VerificationSystemPlugin />
            </>
          }
        />
        <Route
          path='/account_privileges_plugin'
          element={
            <>
              <PageTitle>Account Privileges</PageTitle>
              <AccountPrivilegesPlugin />
            </>
          }
        />
        <Route
          path='/legal_information_plugin'
          element={
            <>
              <PageTitle>Legal Information</PageTitle>
              <LegalInformationPlugin />
            </>
          }
        />
        <Route
          path='/manual_payment_gateways_plugin'
          element={
            <>
              <PageTitle>Manual Payment Gateways</PageTitle>
              <ManualPaymentGatewaysPlugin />
            </>
          }
        />
        <Route
          path='/stripe_payment_plugin'
          element={
            <>
              <PageTitle>Stripe Payment Gateways</PageTitle>
              <StripePaymentPlugin />
            </>
          }
        />
        <Route
          path='/open_money_payment_plugin'
          element={
            <>
              <PageTitle>Open Money Payment Gateways</PageTitle>
              <OpenMoneyPaymentPlugin />
            </>
          }
        />
        <Route
          path='/razor_pay_payment_plugin'
          element={
            <>
              <PageTitle>Razor Pay Payment Gateways</PageTitle>
              <RazorpayPaymentPlugin />
            </>
          }
        />
        <Route
          path='/phone_pay_payment_plugin'
          element={
            <>
              <PageTitle>Phone Pay Payment Gateways</PageTitle>
              <PhonePayPlugin />
            </>
          }
        />
        <Route
          path='/folder_structure_plugin'
          element={
            <>
              <PageTitle>Folder Structure Setting</PageTitle>
              <FolderStructurePlugin />
            </>
          }
        />
        <Route
          path='/user_interaction_plugin'
          element={
            <>
              <PageTitle>Anonymous User Interaction</PageTitle>
              <AnonymousUserInteraction />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default Plugins
