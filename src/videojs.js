import Player from "./player.js"

const playerName = "videojs"
const playerVersion = "1.0.6"

/**
 * @class VideoJs
 * @extends Player
 * @constructor
 */
export class VideoJs extends Player {
  /**
   * Change de seek in video player
   * @property seek
   * @type Float
   */
  set seek(seek) {
    this.api.currentTime(seek)
  }

  /**
   * returns the current seek.
   * @property options
   * @type Float
   */
  get seek() {
    return this.api.currentTime()
  }

  /**
   * Determine if video player loaded in auto play.
   * @property autoPlay
   * @type Boolean
   */
  get autoPlay() {
    return this.api.options_.autoplay
  }

  /**
   * Change the autoPlay status in the video player.
   * @property autoPlay
   * @type Boolean
   */
  set autoPlay(autoPlay) {
    this.api.options_.autoplay = autoPlay
  }

  /**
   * @method constructor
   * @param {Object} options
   */
  constructor(options) {
    options.playerName = playerName
    options.playerVersion = playerVersion

    if (!options.token && !options.hostingId) {
      throw Error("hostingId or token is missing.")
    }

    if (!options.token && !options.videoId) {
      throw Error("videoId or token is missing.")
    }

    super(options)

    if (!options.token) {
      this.player.ids = {
        hostingId: options.hostingId,
        videoId: options.videoId,
        customerId: options.customerId
      }
    }

    this.status = "ready"

    this.capturePlayerEvents()
  }

  /**
   * Flowplayer load the player
   * @method onReady
   */
  onReady () {
      return new Promise((resolve, reject) => {
        this.api.on('ready', () => {
          this.api.on("loadedmetadata", data => {
            resolve(data)
          })
        })

        this.api.on("loadedmetadata", data => {
          resolve(data)
        })
      })
    }

  /**
   * Events from VideoJs Video Player.
   * @method capturePlayerEvents
   */
  capturePlayerEvents() {
    this.api.on("play", (e) => {
      this.play()
    })

    this.api.on("pause", () => {
      this.pause()
    })

    this.api.on("ended", () => {
      this.status = "ready"
      this.finish()
    })

    this.api.on("stop", () => {
      this.status = "ready"
      this.stop()
    })
  }

  /**
   * Get the duration of video player.
   * @method getDuration
   */
  getDuration() {
    this.duration = this.api.duration()
  }
}
