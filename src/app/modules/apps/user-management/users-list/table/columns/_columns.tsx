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
import {
  calculateTimeDifference,
  convertUserTableTime,
  convertUserTableDate,
} from '../../../../../../../utils/DateUtils'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell userId={props.data[props.row.index].userId} />,
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
    id: 'userId',
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
    id: 'updatedAt',
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
    id: 'totalCredit',
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
          <i
            className='text-primary bi bi-patch-check fa-2xl'
            data-toggle='tooltip'
            data-placement='top'
            title={'verify'}
          ></i>
        )}
        &nbsp;
        {props.data[props.row.index]?.isPremium && (
          <i
            className='text-primary fa-solid fa-award fa-2xl'
            data-toggle='tooltip'
            data-placement='top'
            title={'premium'}
          ></i>
        )}
        &nbsp;
        {props.data[props.row.index]?.isPopular && (
          <i
            className='text-primary fa-regular fa-star fa-2xl'
            data-toggle='tooltip'
            data-placement='top'
            title={'popular'}
          ></i>
        )}
        &nbsp;
        {props.data[props.row.index]?.isSpotlightUser && (
          <i
            class='text-primary fa-solid fa-fire-flame-curved fa-2xl'
            data-toggle='tooltip'
            data-placement='top'
            title={'spotlight'}
          ></i>
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
    id: 'city',
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
    id: 'createdAt',
    Cell: ({...props}) => (
      <div className='text-center'>
        {convertUserTableDate(moment(props.data[props.row.index]?.createdAt).toLocaleString())}
        <br></br>
        {convertUserTableTime(moment(props.data[props.row.index]?.createdAt).toLocaleString())}
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
    Cell: ({...props}) => <UserActionsCell userId={props.data[props.row.index].userId} />,
  },
]

export {usersColumns}
