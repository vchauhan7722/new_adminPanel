// @ts-nocheck
import {Column} from 'react-table'
import {UserCustomHeader} from './UserCustomHeader'
import {User} from '../../core/_models'
import {UserActionsCell} from './UserActionsCell'
import {UserInfoCell} from './UserInfoCell'
import moment from 'moment'
import {UserSelectionCell} from './UserSelectionCell'
import {UserSelectionHeader} from './UserSelectionHeader'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {calculateTimeDifference} from '../../../../../../../utils/Utils'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.NAME'
        className='min-w-125px'
        tooltipTitle='fullName'
      />
    ),
    id: 'fullName',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.LASTACTIVITY'
        className='min-w-125px text-center'
        tooltipTitle='Last Activity'
      />
    ),
    id: 'lastActivity',
    Cell: ({...props}) => (
      <div className='text-center '>
        <div className='badge badge-light fw-bolder'>
          {calculateTimeDifference(props.data[props.row.index]?.updatedAt)}
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.CREDITS'
        className='min-w-125px text-center'
        tooltipTitle='Credits'
      />
    ),
    id: 'credits',
    Cell: ({...props}) => (
      <div className='  text-center'>
        <div className='badge badge-light fw-bolder'>
          {props.data[props.row.index]?.totalCredit}
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.BADGE'
        className='min-w-125px text-center'
        tooltipTitle='Badge'
      />
    ),
    id: 'badge',
    Cell: ({...props}) => (
      <div className='fw-bolder text-center'>
        {/* <KTIcon iconName='verify' className='fs-1 text-primary' />{' '}
        <KTIcon iconName='cross' className='fs-1 text-secondary' />{' '}
        <KTIcon iconName='cloud-add' className='fs-1 text-primary' />{' '}
        <KTIcon iconName='setting-2' className='fs-1 text-primary' />
        <KTIcon iconName='basket' className='fs-1 text-primary' /> */}
        {props.data[props.row.index]?.isVerify && (
          <i className='text-primary bi bi-patch-check fa-2xl'></i>
        )}
        &nbsp;
        {props.data[props.row.index]?.isPremium && (
          <i className='text-primary fa-solid fa-award fa-2xl'></i>
        )}
        &nbsp;
        {props.data[props.row.index]?.isPopular && (
          <i className='text-primary fa-regular fa-star fa-2xl'></i>
        )}
        &nbsp;
        {props.data[props.row.index]?.isSpotlightUser && (
          <i className='text-primary fa-regular fa-star fa-2xl'></i>
        )}
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.LOCATION'
        className='min-w-125px'
        tooltipTitle='location'
      />
    ),
    //accessor: 'country',
    id: 'location',
    Cell: ({...props}) => (
      <div
        data-toggle='tooltip'
        data-placement='top'
        title={
          props.data[props.row.index]?.city !== null
            ? `${props.data[props.row.index]?.city}, ${props.data[props.row.index]?.state}, ${
                props.data[props.row.index]?.country
              }`
            : '-'
        }
      >
        {props.data[props.row.index]?.city !== null
          ? `${props.data[props.row.index]?.city}, ${props.data[props.row.index]?.state?.substring(
              0,
              3
            )}, ${props.data[props.row.index]?.country.substring(0, 2)}`
          : '-'}
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.JOININGDATE'
        className='min-w-125px text-center'
        tooltipTitle='Joining Date'
      />
    ),
    id: 'joiningDate',
    Cell: ({...props}) => (
      <div className='text-center'>
        {moment(props.data[props.row.index]?.updatedAt).format('DD MMM YY ')}
        <br></br>
        {moment(props.data[props.row.index]?.updatedAt).format('hh:mm a')}
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title='USERMANAGEMENT.TABLE.ACTIONS'
        className='text-end min-w-50px'
        tooltipTitle='Actions'
      />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
