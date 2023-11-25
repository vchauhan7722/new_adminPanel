import {io} from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SERVER_URL

const socket = io('https://backend.profun.live', {
  autoConnect: true,
  transports: ['polling'],
})

export default socket
