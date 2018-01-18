# Flowplayer 7 video player integration

Add the following script on your HTML:

```html
<head>

  <!-- Flowplayer 7 video player -->
  <link rel="stylesheet" href="//releases.flowplayer.org/7.2.1/skin/skin.css">
  <script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="//releases.flowplayer.org/7.2.1/flowplayer.min.js"></script>

 <!-- Kinow Video Analytics for Flowplayer 7 -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/kinow-video-analytics@latest/dist/flowplayer.min.js"></script>
</head>
```

Integrate video analytics with Flowplayer 7:

```javascript
// When flowplayer is ready, we call video analytics
flowplayer("#your-player-div-id", {}).on("ready", (e, api) => {
  let videoAnalytics = new VideoAnalytics.Flowplayer({
    player: api,
    token: "a-kinow-token",
    datas: {
      isoCode: "FR"
    }
  })
})
```
