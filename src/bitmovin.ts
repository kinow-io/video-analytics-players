import Player from "./player"

const playerName = "bitmovin"
const playerVersion = "1.0.0"

export class Bitmovin extends Player {
  private forceReload = false

  /**
   * Change the seek in video player
   */
  set seek (seek: number) {
    if (!this.forceReload) {
      this.api.seek(seek)
    }
  }

  /**
   * returns the current seek.
   */
  get seek (): number {
    return this.api.getCurrentTime()
  }

  /**
   * Determine if video player loaded in auto play.
   */
  get autoPlay (): boolean {
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
  set autoPlay (autoPlay: boolean) {
    this.api.getConfig().playback.autoplay = autoPlay || false
  }

  /**
   * @method constructor
   */
  constructor (options: {
    playerName: string,
    playerVersion: string,
    hostingId: number,
    customerId: number,
    videoId: number,
    forceReload: boolean,
  }) {
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
      customerId: options.customerId,
    }

    this.forceReload = options.forceReload || false

    this.eventInitialized = false
  }

  /**
   * Bitmovin load the player.
   * @method onReady
   */
  onReady (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.on('ready', () => {
        resolve(true)
      })
    })
  }

  /**
   * Events from Bitmovin Video Player.
   * @method capturePlayerEvents
   */
  capturePlayerEvents () {
    if (this.eventInitialized) {
      return
    }

    const playingCallback = () => {
      this.play()
    }

    const pausedCallback = () => {
      this.pause()
    }

    const playbackfinishedCallback = () => {
      this.pause()
    }

    const caststartedCallback = () => {
      this.socket.disconnect()
    }

    const caststoppedCallback = () => {
      this.connect()
    }

    const sourceunloadedCallback = () => {
      this.socket.disconnect()
    }

    const stallstartedCallback = () => {
      if (this.api.isPlaying()) {
        this.pause()
      }
    }

    const stallendedCallback = () => {
      if (this.api.isPlaying()) {
        this.play()
      }
    }

    this.api.on('playing', playingCallback)
    this.api.on('paused', pausedCallback)
    this.api.on('playbackfinished', playbackfinishedCallback)
    this.api.on('caststarted', caststartedCallback)
    this.api.on('caststopped', caststoppedCallback)
    this.api.on('sourceunloaded', sourceunloadedCallback)
    this.api.on('stallstarted', stallstartedCallback)
    this.api.on('stallended', stallendedCallback)

    if (!this.eventInitialized && this.api.isPlaying()) {
      this.play()
    }

    this.eventInitialized = true
  }

  play () {
    if (this._socket.isConnected()) {
      super.play()
    }
  }

  /**
   * Get the duration of video player.
   */
  getDuration () {
    return this.api.getDuration()
  }
}
