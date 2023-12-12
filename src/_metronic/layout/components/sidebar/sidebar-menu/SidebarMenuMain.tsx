/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title={intl.formatMessage({id: 'MENU.USERMANAGEMENT'})}
        fontIcon='bi-layers'
      />

      <SidebarMenuItem
        to='/plugins'
        icon='abstract-28'
        title={intl.formatMessage({id: 'MENU.PLUGINS'})}
        fontIcon='bi-layers'
      />
      <SidebarMenuItemWithSub
        to='/user-media'
        title='User Media'
        icon='abstract-28'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/user-media/photos' title='Photos' hasBullet={true} />
        <SidebarMenuItem to='/user-media/stories' title='Stories' hasBullet={true} />
      </SidebarMenuItemWithSub>
    </>
  )
}

export {SidebarMenuMain}
