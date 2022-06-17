import socketIOClient from "socket.io-client"
import sailsIOClient from "sails.io.js"

const io = sailsIOClient(socketIOClient)
const baseUrl = "https://video-analytics-realtime.kinow.video"

io.sails.autoConnect = false

/**
 * @class Socket
 * @constructor
 */
export default class Socket {
  /**
   * @method constructor
   * @param {Object} options
   */
  constructor(options) {
    this.options = options

    let id = this.options.hostingId + '_' + this.options.customerId + '_' + this.options.videoId

    this.query = `player=${this.options.playerName}&version=${this.options.playerVersion}&id=${id}`

    if (this.options.token) {
      this.query = this.query + `&token=${this.options.token}`
    }

    this.connected = false
  }

  /**
   * Connect websocket.
   * @method connectSocket
   */
  async connectSocket() {
    this.params()
    this.connect()
  }

  /**
   * Determine if websocket is connected.
   * @method isConnected
   */
  isConnected() {
    return this.connected
  }

  /**
   * Return the current socket.
   * @method currentSocket
   */
  currentSocket() {
    return this.webSocket
  }

  /**
   * Init websocket params before connect.
   * @method init
   */
  params() {
    io.sails.url = this.options.baseUrl || baseUrl
    io.sails.reconnection = true
    io.sails.transports = ["websocket"]
    io.sails.environment = this.options.environment || "production"
    io.sails.query = this.query
  }

  /**
   * Connect websocket.
   * @method connect
   */
  connect() {
    this.webSocket = io.sails.connect()
    this.connected = true
  }

  /**
   * Disconnect websocket.
   * @method disconnect
   */
  disconnect() {
    this.webSocket.disconnect()
    this.connected = false
  }

  /**
   * Websocket get request method.
   * @method get
   */
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.webSocket.get(url, params, (result, jwr) => {
        // if (result.error) {
        //   return reject(result)
        // }
        console.log("get result", result)
        return resolve(result)
      })
    })
  }

  /**
   * Websocket post request method.
   * @method post
   */
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.webSocket.post(url, params, (result, jwr) => {
        // if (result.error) {
        //   return reject(result)
        // }
        console.log("post result", result)
        resolve(result)
      })
    })
  }

  /**
   * Websocket put request method.
   * @method put
   */
  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.webSocket.put(url, params, (result, jwr) => {
        // if (result.error) {
        //   return reject(result)
        // }
        console.log("put result", result)
        resolve(result)
      })
    })
  }

  /**
   * Websocket delete request method.
   * @method delete
   */
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.webSocket.delete(url, params, (result, jwr) => {
        // if (result.error) {
        //   return reject(result)
        // }
        console.log("delete result", result)
        resolve(result)
      })
    })
  }
}
