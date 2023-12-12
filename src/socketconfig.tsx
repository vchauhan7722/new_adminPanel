import {io} from 'socket.io-client'
// import WebSocket from 'ws'

const URL = process.env.REACT_APP_SERVER_URL

const socket = io(`${URL}`, {
  autoConnect: true,
  transports: ['polling'],
})
export default socket
export const ws = new WebSocket('wss://live-stream-phjd.onrender.com/')
