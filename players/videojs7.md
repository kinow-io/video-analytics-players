# VideoJs 7 video player integration

Add the following script on your HTML:

```html
<head>

  <!-- VideoJs 6 video player -->
  <link href="https://vjs.zencdn.net/7.3.0/video-js.min.css" rel="stylesheet">
  <script src="https://vjs.zencdn.net/7.3.0/video.min.js"></script>

  <!-- Kinow Video Analytics for Clappr -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/kinow-video-analytics@latest/dist/videojs.min.js"></script>
</head>
<body>
    <video id="video-example" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264"
        <source src="video.mp4" type="video/mp4" />
    </video>
</body>
```

```javascript
// Setup your video player like that:
let videojs = videojs('video-example', { "autoplay": true });

// Kinow Video Player Analytics
let videoAnalytics = new VideoAnalytics.VideoJs({
  player: videojs, // Your VideoJs video player
  datas: {
    isoCode: "FR" // Iso code for your customer country
  },
});
```
