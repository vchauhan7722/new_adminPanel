/* eslint-disable react-hooks/exhaustive-deps */
import Swal from 'sweetalert2'

/*Icons type -> success error warning info question*/

const ToastUtils = ({type, message}) =>
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000, // Adjust the time the popup stays visible
    showClass: {
      popup: 'swal2-show',
      icon: 'swal2-icon',
    },
    hideClass: {
      popup: 'swal2-hide',
      icon: 'swal2-icon',
    },
    customClass: {
      container: 'custom-swal-container',
      popup: 'custom-swal-popup',
      icon: 'custom-swal-icon',
    },
    icon: type,
    title: message,
  })

// old swal
/*Swal.fire({
    position: 'top-end',
    //icon: type,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  }) */

export const ErrorToastUtils = (message = 'Something Went Wrong') => {
  ToastUtils({type: 'error', message: message})
}

export default ToastUtils
