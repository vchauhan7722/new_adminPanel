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
          to='admin/apps/anonymous-user-management'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERMANAGEMENT'})}
          icon='abstract-28'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='admin/apps/anonymous-user-management/users'
            icon='abstract-28'
            title='Anonymous User List'
            fontIcon='bi-layers'
          />
          <SidebarMenuItemWithSub
            to='admin/apps/anonymous-user-management/user-media'
            title='Anonymous User Media'
            icon='abstract-28'
            fontIcon='bi-person'
          >
            <SidebarMenuItem
              to='admin/apps/anonymous-user-management/user-media/photos'
              title='Photos'
              hasBullet={true}
            />
            <SidebarMenuItem
              to='admin/apps/anonymous-user-management/user-media/stories'
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
          to='admin/dashboard'
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
          to='admin/apps/user-management'
          title={intl.formatMessage({id: 'MENU.USERMANAGEMENT'})}
          icon='abstract-28'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='admin/apps/user-management/users'
            icon='abstract-28'
            title='UserList'
            fontIcon='bi-person'
          />
          <SidebarMenuItemWithSub
            to='admin/apps/user-management/user-media'
            title='User Media'
            icon='abstract-28'
            fontIcon='bi-person'
          >
            <SidebarMenuItem
              to='admin/apps/user-management/user-media/photos'
              title='Photos'
              hasBullet={true}
            />
            <SidebarMenuItem
              to='admin/apps/user-management/user-media/stories'
              title='Stories'
              hasBullet={true}
            />
          </SidebarMenuItemWithSub>
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to='admin/apps/anonymous-user-management'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERMANAGEMENT'})}
          icon='abstract-28'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='admin/apps/anonymous-user-management/users'
            icon='abstract-28'
            title='Anonymous User List'
            fontIcon='bi-layers'
          />
          <SidebarMenuItemWithSub
            to='admin/apps/anonymous-user-management/user-media'
            title='Anonymous User Media'
            icon='abstract-28'
            fontIcon='bi-person'
          >
            <SidebarMenuItem
              to='admin/apps/anonymous-user-management/user-media/photos'
              title='Photos'
              hasBullet={true}
            />
            <SidebarMenuItem
              to='admin/apps/anonymous-user-management/user-media/stories'
              title='Stories'
              hasBullet={true}
            />
          </SidebarMenuItemWithSub>
        </SidebarMenuItemWithSub>

        <SidebarMenuItem
          to='admin/plugins'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.PLUGINS'})}
          fontIcon='bi-layers'
        />

        <SidebarMenuItem
          to='admin/user-verification'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.USERVERIFICATION'})}
          fontIcon='bi-layers'
        />

        <SidebarMenuItem
          to='admin/user-order'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.USERORDER'})}
          fontIcon='bi-layers'
        />

        <SidebarMenuItem
          to='admin/anonymous-user-chat'
          icon='abstract-28'
          title={intl.formatMessage({id: 'MENU.ANONYMOUSUSERCHAT'})}
          fontIcon='bi-layers'
        />
      </>
    )
  }
}

export {SidebarMenuMain}
