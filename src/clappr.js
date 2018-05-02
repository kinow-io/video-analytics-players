import Player from "./player.js"

const playerName = "clappr"
const playerVersion = "1.1.4"

/**
 * @class Clappr
 * @extends Player
 * @constructor
 */
export class Clappr extends Player {
  /**
   * Change de seek in video player
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
    return this.api._options.autoPlay
  }

  /**
   * Change the autoPlay status in the video player.
   * @property autoPlay
   * @type Boolean
   */
  set autoPlay(autoPlay) {
    this.api._options.autoPlay = autoPlay
  }

  /**
   * @method constructor
   * @param {Object} options
   */
  constructor(options) {

    options.playerName = playerName
    options.playerVersion = playerVersion

    if (!Number.isInteger(options.customerId)) {
      throw Error("customerId is missing.")
    }

    if (!options.token && !Number.isInteger(options.hostingId)) {
      throw Error("hostingId or token is missing.")
    }

    if (!options.token && !Number.isInteger(options.videoId)) {
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
   * Clappr load the player
   * @method onReady
   */
  onReady () {
    return new Promise((resolve, reject) => {
     if (this.api.isReady) {
        this.api.core.getCurrentContainer().on("container:loadedmetadata", data => {
          resolve(data)
        })
      } else {
        this.api.on('ready', () => {
          this.api.core.getCurrentContainer().on("container:loadedmetadata", data => {
            resolve(data)
          })
        })
      }
    })
  }

  /**
   * Events from Clappr Video Player.
   * @method capturePlayerEvents
   */
  capturePlayerEvents() {

    this.api.on("play", () => {
      // We have to disable autoPlay for the next play
      if (this.autoPlay) {
        this.autoPlay = false
      } else {
        if (this.status === "ready") {
          this.status = "play"
          this.play()
        }
      }
    })

    this.api.on("pause", () => {
      this.status = "ready"
      this.pause()
    })

    this.api.on("ended", () => {
      this.status = "ready"
      this.finish()
    })

    this.api.on("stop", () => {
      this.status = "ready"
      this.pause()
    })
  }

  /**
   * Get the duration of video player.
   * @method getDuration
   */
  getDuration() {
    this.duration = this.api.getDuration()
  }
}
