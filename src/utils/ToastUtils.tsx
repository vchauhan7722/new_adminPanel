/* eslint-disable react-hooks/exhaustive-deps */
import Swal from 'sweetalert2'

/*Icons type -> success error warning info question*/

const ToastUtils = ({type, message}) =>
  Swal.fire({
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  })

export const ErrorToastUtils = (message = 'Something Went Wrong') => {
  ToastUtils({type: 'error', message: message})
}

export default ToastUtils
