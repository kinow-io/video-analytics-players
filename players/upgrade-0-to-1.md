# Upgrade Video Analytics to newest version


## Delete and replace dependencies

Delete these javascript dependencies:

```html
<script type="text/javascript" src="https://d14ehl5atmee1y.cloudfront.net/js/sails.io-latest.js"></script>
<script type="text/javascript" src="https://d14ehl5atmee1y.cloudfront.net/js/video-analytics-clappr-latest.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```

and replace only this:

```html
// new video analytics release
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/kinow-video-analytics@latest/dist/clappr.min.js"></script>
```

## Replace videoAnalytics

Old version:

```javascript

var videoAnalytics = new VideoAnalytics({
    hostingId: <integer>,
    customerId: <integer>,
    videoId: <integer>,
    datas: {
        isoCode : "<string">
    },
});
```

With new version, we automatically manage Clappr events.

These lines also can be deleted:

```javascript
onReady: function() {
    "undefined" != typeof window && window.videoAnalytics && window.videoAnalytics.setApi(this), r.gtmTrack("onReady")
},
onPlay: function() {
    "undefined" != typeof window && window.videoAnalytics && window.videoAnalytics.play(), r.gtmTrack("onPlay")
},
onPause: function() {
    "undefined" != typeof window && window.videoAnalytics && window.videoAnalytics.pause(), r.gtmTrack("onPause")
},
onStop: function() {
    "undefined" != typeof window && window.videoAnalytics && window.videoAnalytics.stop(), r.gtmTrack("onStop")
}
```

new version:

```javascript
// Setup your video player like that:
let clappr = new Clappr.Player({
  // your Clappr configuration here
});


// Kinow Video Player Analytics
let videoAnalytics = new VideoAnalytics.Clappr({
  player: clappr, // Your Clappr video player that you instantiated before
  hostingId: <integer>,
  videoId: <integer>,
  customerId: <integer>,
  datas: {
    isoCode: "<string>" // Iso code for your customer country
  },
});
```
