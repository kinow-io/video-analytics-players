import WebSocket from "./socket"

const uri = "/players"

/**
 * @class Player
 * @constructor
 */
export default class Player {
  protected _socket: Socket
  protected api: any
  protected player: any
  protected seek: number = 0
  protected eventInitialized = false
  protected captureEventsFunction = Function

  /**
   * Instanciate the Socket class.
   */
  set socket(options) {
    this._socket = new WebSocket(options)
  }

  /**
   * Determine if video player loaded in auto play.
   */
  get socket() {
    if (!this._socket) {
      this._socket = new WebSocket(this.options)
    }

    return this._socket
  }

  /**
   * Determine if video player loaded in auto play.
   */
  set duration(duration) {
    this.player.datas.sourceDuration = duration
  }

  /**
   * Determine if video player loaded in auto play.
   */
  get duration() {
    return this.player.datas.sourceDuration || this.getDuration()
  }

  constructor(protected options: any) {
    this.api = options.player

    this.player = {
      playerId: null,
      connectionId: null,
      datas: options.datas
    }

    this.socket

    // Check if player loaded before connect socket.
    this.connect()
  }

  /**
   * Get seek from Video Analytics Realtime.
   * @method connect
   */
  async connect() {
    await this._socket.connectSocket()
    this.checkDuration()
    await this.getSeek()
    await this.init()
    await this.listenSocket()
  }

  checkDuration() {
    if (!this.duration || this.duration === 'null') {
      throw Error('Video duration does not exists or is null.')
    }
  }

  /**
   * Get seek from Video Analytics Realtime.
   * @method listenSocket
   */
  async listenSocket() {
    this._socket.currentSocket().on("connect", () => {
      console.log("[Player] => 2 - listen socket")
      this.init()
    })
  }

  /**
   * Get seek from Video Analytics Realtime.
   * @method getSeek
   */
  async getSeek(params = {}) {
    if (this.player.ids) {
      params = this.player.ids
    }

    console.log("[Player] => 1 - Seek")

    let url = `${uri}/seek`

    await this._socket
      .get(url, params)
      .then(result => {
        if (result.seek >= this.duration) {
          this.seek = 0
        } else {
          this.seek = result.seek
        }
      })
      .catch(err => {
        console.error(err)
        this._socket.disconnect()
      })
  }

  /**
   * Get init player session from Video Analytics Realtime.
   * @method init
   */
  init() {
    let url = `${uri}/init`

    return this._socket
      .get(url, this.player)
      .then(data => {
        this.player.playerId = data.playerId
        this.player.connectionId = data.playerId
        this.capturePlayerEvents()
      })
      .catch(err => {
        console.error(err)
        this._socket.disconnect()
      })
  }

  /**
   * Play from Video Analytics Realtime.
   * @method play
   */
  async play() {
    console.log("[Player] => Play")
    let url = `${uri}/play`

    await this._socket
      .put(url)
      .then(data => {})
      .catch(err => {
        console.error(err)
      })
  }

  /**
   * Pause from Video Analytics Realtime.
   * @method pause
   */
  async pause() {
    console.log("[Player] => Pause")
    let url = `${uri}/pause`

    await this._socket
      .put(url, {
        seek: this.seek
      })
      .then(data => {})
      .catch(err => {
        console.error(err)
        this._socket.disconnect()
      })
  }

  /**
   * Disconnect socket when player stopped.
   * @method stop
   */
  async stop() {
    await this._socket.disconnect()
  }

  /**
   * finish.
   * @method finish
   */
  async finish() {
    // Disable autoPlay, if we click on play, 2 events will be launched
    //this.autoPlay = false
  }
}
