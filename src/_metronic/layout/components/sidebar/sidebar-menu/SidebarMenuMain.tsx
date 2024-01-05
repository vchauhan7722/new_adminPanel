/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const loginUserId = localStorage.getItem('loginUserId')

  if (loginUserId !== '1') {
    return (
      <>
        <SidebarMenuItemWithSub
          to='/apps/anonymous-user-management'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERMANAGEMENT'})}
          icon='abstract-28'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='/apps/anonymous-user-management/users'
            icon='abstract-28'
            title='Anonymous User List'
            fontIcon='bi-layers'
          />
          <SidebarMenuItemWithSub
            to='/apps/anonymous-user-management/user-media'
            title='Anonymous User Media'
            icon='abstract-28'
            fontIcon='bi-person'
          >
            <SidebarMenuItem
              to='/apps/anonymous-user-management/user-media/photos'
              title='Photos'
              hasBullet={true}
            />
            <SidebarMenuItem
              to='/apps/anonymous-user-management/user-media/stories'
              title='Stories'
              hasBullet={true}
            />
          </SidebarMenuItemWithSub>
        </SidebarMenuItemWithSub>
      </>
    )
  } else {
    return (
      <>
        <SidebarMenuItem
          to='/dashboard'
          icon='element-11'
          title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
          fontIcon='bi-app-indicator'
        />
        {/* <SidebarMenuItem
          to='/apps/user-management/users'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.USERMANAGEMENT'})}
          fontIcon='bi-layers'
        /> */}

        {/* <SidebarMenuItem
          to='/apps/anonymous-user-management/users'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERMANAGEMENT'})}
          fontIcon='bi-layers'
        /> */}

        <SidebarMenuItemWithSub
          to='/apps/user-management'
          title={intl.formatMessage({id: 'MENU.USERMANAGEMENT'})}
          icon='abstract-28'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='/apps/user-management/users'
            icon='abstract-28'
            title='UserList'
            fontIcon='bi-person'
          />
          <SidebarMenuItemWithSub
            to='/apps/user-management/user-media'
            title='User Media'
            icon='abstract-28'
            fontIcon='bi-person'
          >
            <SidebarMenuItem
              to='/apps/user-management/user-media/photos'
              title='Photos'
              hasBullet={true}
            />
            <SidebarMenuItem
              to='/apps/user-management/user-media/stories'
              title='Stories'
              hasBullet={true}
            />
          </SidebarMenuItemWithSub>
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to='/apps/anonymous-user-management'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERMANAGEMENT'})}
          icon='abstract-28'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='/apps/anonymous-user-management/users'
            icon='abstract-28'
            title='Anonymous User List'
            fontIcon='bi-layers'
          />
          <SidebarMenuItemWithSub
            to='/apps/anonymous-user-management/user-media'
            title='Anonymous User Media'
            icon='abstract-28'
            fontIcon='bi-person'
          >
            <SidebarMenuItem
              to='/apps/anonymous-user-management/user-media/photos'
              title='Photos'
              hasBullet={true}
            />
            <SidebarMenuItem
              to='/apps/anonymous-user-management/user-media/stories'
              title='Stories'
              hasBullet={true}
            />
          </SidebarMenuItemWithSub>
        </SidebarMenuItemWithSub>

        <SidebarMenuItem
          to='/plugins'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.PLUGINS'})}
          fontIcon='bi-layers'
        />

        <SidebarMenuItem
          to='/user-verification'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.USERVERIFICATION'})}
          fontIcon='bi-layers'
        />

        <SidebarMenuItem
          to='/anonymous-user-chat'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERCHAT'})}
          fontIcon='bi-layers'
        />
      </>
    )
  }
}

export {SidebarMenuMain}
