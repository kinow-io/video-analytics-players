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
    isoCode: "FR" // Iso code for your customer country
  },
  hostingId: INTEGER,
  videoId: INTEGER,
  customerId: INTEGER,
});
```
