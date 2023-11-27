import {io} from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SERVER_URL

const socket = io(`${URL}`, {
  autoConnect: true,
  transports: ['polling'],
})

// const socket = io(`${URL}`)

export default socket
