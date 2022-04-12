import Player from "./player";

const playerName = "bitmovin";
const playerVersion = "1.0.0";

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
    if (!this.forceReload) {
      this.api.seek(seek);
    }
  }

  /**
   * returns the current seek.
   * @property options
   * @type Float
   */
  get seek() {
    return this.api.getCurrentTime();
  }

  /**
   * Determine if video player loaded in auto play.
   * @property autoPlay
   * @type Boolean
   */
  get autoPlay() {
    if (this.api.getConfig().hasOwnProperty("playback")) {
      return this.api.getConfig().playback.autoplay;
    } else {
      return false;
    }
  }

  /**
   * Change the autoPlay status in the video player.
   * @property autoPlay
   * @type Boolean
   */
  set autoPlay(autoPlay) {
    this.api.getConfig().playback.autoplay = autoPlay || false;
  }

  /**
   * @method constructor
   * @param {Object} options
   */
  constructor(options) {
    options.playerName = playerName;
    options.playerVersion = playerVersion;

    if (!options.hostingId) {
      throw Error("hostingId is missing.");
    }

    if (!options.videoId) {
      throw Error("videoId is missing.");
    }

    super(options);

    this.player.ids = {
      hostingId: options.hostingId,
      videoId: options.videoId,
      customerId: options.customerId,
    };

    this.forceReload = options.forceReload || false,

    this.eventInitialized = false;
  }

  /**
   * Bitmovin load the player.
   * @method onReady
   */
  onReady() {
    return new Promise((resolve, reject) => {
      this.api.on("ready", () => {
        resolve();
      });
    });
  }

  /**
   * Events from Bitmovin Video Player.
   * @method capturePlayerEvents
   */
  capturePlayerEvents() {
    if (this.eventInitialized) {
      return;
    }

    const playingCallback = () => {
      this.play();
    };

    const pausedCallback = () => {
      this.pause();
    };

    const playbackfinishedCallback = () => {
      this.pause();
    };

    const caststartedCallback = () => {
      this.socket.disconnect();
    };

    const caststoppedCallback = () => {
      this.connect();
    };

    const sourceunloadedCallback = () => {
      this.socket.disconnect();
    };

    const stallstartedCallback = () => {
      if (this.api.isPlaying()) {
        this.pause();
      }
    };

    const stallendedCallback = () => {
      if (this.api.isPlaying()) {
        this.play();
      }
    };

    this.api.on("playing", playingCallback);
    this.api.on("paused", pausedCallback);
    this.api.on("playbackfinished", playbackfinishedCallback);
    this.api.on("caststarted", caststartedCallback);
    this.api.on("caststopped", caststoppedCallback);
    this.api.on("sourceunloaded", sourceunloadedCallback);
    this.api.on("stallstarted", stallstartedCallback);
    this.api.on("stallended", stallendedCallback);

    if (!this.eventInitialized && this.api.isPlaying()) {
      this.play();
    }

    this.eventInitialized = true;
  }

  play() {
    if (this._socket.isConnected()) {
      super.play();
    }
  }

  /**
   * Get the duration of video player.
   * @method getDuration
   */
  getDuration() {
    return this.api.getDuration();
  }
}
