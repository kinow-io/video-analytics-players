import Player from "./player"

const playerName = "bitmovin"
const playerVersion = "1.0.0"

/**
 * @class Bitmovin
 * @extends Player
 * @constructor
 */
export class Bitmovin extends Player {

  /**
   * Change the seek in video player
   * @property seek
   * @type Float
   */
  set seek(seek) {
    this.api.seek(seek)
  }

  /**
   * returns the current seek.
   * @property options
   * @type Float
   */
  get seek() {
    return this.api.getCurrentTime()
  }

  /**
   * Determine if video player loaded in auto play.
   * @property autoPlay
   * @type Boolean
   */
  get autoPlay() {
    if (this.api.getConfig().hasOwnProperty('playback')) {
      return this.api.getConfig().playback.autoplay
    } else {
      return false
    }
  }

  /**
   * Change the autoPlay status in the video player.
   * @property autoPlay
   * @type Boolean
   */
  set autoPlay(autoPlay) {
    this.api.getConfig().playback.autoplay = autoPlay || false
  }

  /**
   * @method constructor
   * @param {Object} options
   */
  constructor(options) {
    options.playerName = playerName
    options.playerVersion = playerVersion

    if (!options.hostingId) {
      throw Error("hostingId is missing.")
    }

    if (!options.videoId) {
      throw Error("videoId is missing.")
    }

    super(options)

    this.player.ids = {
      hostingId: options.hostingId,
      videoId: options.videoId,
      customerId: options.customerId
    }
  }

  /**
   * Bitmovin load the player.
   * @method onReady
   */
  onReady () {
    return new Promise((resolve, reject) => {
      this.api.on('ready', () => {
        resolve()
      })
    })
  }

  /**
   * Events from Bitmovin Video Player.
   * @method capturePlayerEvents
   */
  capturePlayerEvents() {
    this.api.on("play", (e, api) => {
      if (this._socket.isConnected()) {
        this.play()
      }
    })

    this.api.on("paused", () => {
      this.pause()
    })

    this.api.on("playbackfinished", () => {
      this.pause()
    })

    if (this.api.isPlaying()) {
      this.play()
    }
  }

  /**
   * Get the duration of video player.
   * @method getDuration
   */
  getDuration() {
    this.duration = this.api.getDuration()
  }
}
