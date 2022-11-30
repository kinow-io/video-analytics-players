import Player from "./player"

const playerName = "flowplayer"
const playerVersion = "1.2.4"

/**
 * @class Flowplayer
 * @extends Player
 * @constructor
 */
export class Flowplayer extends Player {

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
    return this.api.video.time
  }

  /**
   * Determine if video player loaded in auto play.
   * @property autoPlay
   * @type Boolean
   */
  get autoPlay() {
    return this.api.conf.autoplay
  }

  /**
   * Change the autoPlay status in the video player.
   * @property autoPlay
   * @type Boolean
   */
  set autoPlay(autoPlay) {
    this.api.conf.autoplay = autoPlay
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

    this.capturePlayerEvents()
  }

  /**
   * Flowplayer load the player.
   * @method onReady
   */
  onReady () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  /**
   * Events from Flowplayer Video Player.
   * @method capturePlayerEvents
   */
  capturePlayerEvents() {
    this.api.on("resume", (e, api) => {
      // Trouble with Flowplayer autoplay, it send double plays at launch.
      if (this._socket.isConnected() && !this.api.finished) {
        this.play()
      }
    })

    this.api.on("pause", (e, api) => {
      this.pause()
    })

    this.api.on("finish", (e, api) => {
      this.finish()
    })

    this.api.on("stop", (e, api) => {
      this.stop()
    })
  }

  /**
   * Get the duration of video player.
   * @method getDuration
   */
  getDuration() {
    this.duration = this.api.video.duration
  }
}
