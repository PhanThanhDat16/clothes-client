import { toast, ToastOptions } from 'react-toastify'

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
}

export const showToast = {
  success: (msg: string, options: ToastOptions = {}) => toast.success(msg, { ...defaultOptions, ...options }),
  error: (msg: string, options: ToastOptions = {}) => toast.error(msg, { ...defaultOptions, ...options }),
  info: (msg: string, options: ToastOptions = {}) => toast.info(msg, { ...defaultOptions, ...options }),
  warning: (msg: string, options: ToastOptions = {}) => toast.warning(msg, { ...defaultOptions, ...options })
}
