# Bitmovin 8 video player integration

Add the following script on your HTML:

```html
<head>
  <!-- Bitmovin video player -->
  <script type="text/javascript" src="https://cdn.bitmovin.com/player/web/8.20.0/bitmovinplayer.js"></script>

  <!-- Kinow Video Analytics for Clappr -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/kinow-video-analytics@latest/dist/bitmovin.min.js"></script>

  <div id="player"></div>
</head>
```

```javascript
// Setup your video player like that:
const config = {
  key: 'YOUR-BITMOVIN-API-KEY',
  // playback: {
  //   autoplay: true,
  // },
};

let container = document.getElementById('player');
let bitmovin = new bitmovin.player.Player(container, config);

// Kinow Video Player Analytics
let videoAnalytics = new VideoAnalytics.Bitmovin({
  player: bitmovin, // Your Bitmovin video player
  datas: {
    isoCode: STRING, // Customer country ISO code, eg. "FR" for France (optionnal variable)
    sourceDuration: INTEGER, // Duration in second of video (mandatory variable)
    groupId: INTEGER, // To agregate data based on a customer group (optionnal variable) - CustomerGroup ID
    accessId: INTEGER // To agregate data based on an access mode (optionnal variable) - ProductAccess ID
  },
  hostingId: INTEGER, // Kinow platform ID (mandatory variable)
  videoId: INTEGER, // Video ID (mandatory variable)
  customerId: INTEGER // Customer ID (mandatory variable)
});
```
