/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {User} from '../../core/_models'
import {Link} from 'react-router-dom'
// import UsrImage from '../../../../../../../_metronic/assets/media/auth/user.png'

type Props = {
  user: User
}

const UserInfoCell = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}

    <div className='symbol symbol-circle symbol-50px overflow-visible me-3'>
      <img
        src={
          `${process.env.REACT_APP_SERVER_URL}/${user?.profileImage}` ||
          `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
        }
        alt={user?.userName}
        width='50px'
        height='50px'
      />
      {!user.isOnline && (
        <div className='position-absolute  bottom-0 end-0 bg-success rounded-circle border border-3 border-white h-15px w-15px'></div>
      )}
    </div>

    <div className='d-flex flex-column'>
      <Link
        to={`/apps/users-profile/activity/${user.userId}`}
        className='fw-bolder text-gray-800 text-hover-primary mb-1'
      >
        {user.fullName}
      </Link>

      <span className='text-gray-500 fw-bold'>
        {' '}
        @{user.userName} (ID : {user.userId})
      </span>
    </div>
  </div>
)

export {UserInfoCell}
