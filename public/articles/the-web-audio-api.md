Being in a [band][brightly] can be pretty expensive.

It seems like it wouldn't be, in this digital age, but the reality is, it can be pretty expensive. Between studio hire, mixing, mastering, replication and distribution, it can still take a lot of people to get a song from your head to the wider universe. And that's just the music bit, without the marketing, PR and promotional costs involved in getting someone to actually listen to it.

I like the web as a tool for hacking. The idea of mashing together existing technologies into something greater than the sum of their parts. With the wealth of information on new API's, new tools and new processes, the web is a really lovely place to find inspiration and learn about new things.

Which is good, because I can never seem to pull together the £2,000 it would take to get a halfway decent video made.

So, when the going gets tough, get creative.

---

## Tweetflight and Preflight Nerves

![Preflight Nerves, affectionately titled Tweetflight.](/images/articles/the-web-audio-api/image-tweetflight.jpg)

For our first single, [Preflight Nerves][preflight-nerves], I used the Twitter API and HTML5 video to make an interactive tweet-powered [giant internet karaoke session][preflight-nerves]. With over half a million views, the response was really wild and I am proud of what it achieved. But afterwards I felt a bit lost on what to do next, so we recorded a [really stripped back EP][the-greylings] while we took some time to regroup.

Then I moved to London. [Brightly][brightly] continued via email and Dropbox, and in March I flew to Australia to record our second record. We hit the studio running, and made [Oh, Infinity][oh-infinity].

We decided on the first single, [True][true], and the question came up again: what would we do for a video? I had experimented with [gifs and Giphy][fox], Vine videos, illustrations, SVGs and wearable sensors, but it never quite seemed to click. And I had no idea what to do next.

---

## Back to the drawing board

Before Christmas I got [engaged in Iceland][engaged-in-iceland], which was pretty great. I also took a lot of footage while we drove around, weaving between snowy mountains and [huge waterfalls][gullfoss] and slow moving glaciers.

![I think that's steam?](/images/articles/the-web-audio-api/image-smoke.jpg)

![This, I know, is a road.](/images/articles/the-web-audio-api/image-road.jpg)

Such mountain. Very snow. But I digress.

I took all the footage and cut it together, created some fractal-esque visuals with filters, and used [Angular.js][angularjs] to display the lyrics as they're sung. I timed it using a [json file][true-json], watched it through, and felt... kind of disappointed. It was pretty, but it wasn't gripping. There was nothing new or interesting there, and I had spent a while fiddling with it. I felt like I was sinking time without cracking the core problem—it just wasn't that interesting.

---

## A love letter

I have spent a lot of my life talking about how incredible [Glen Maddern][glen-maddern-twitter] is. Aside from being just the raddest dude, his [work][glen-maddern-site] is incredible, groundbreaking and passionate.

I remember he had mentioned the [web audio API][web-audio-api-mdn] had been making some strides, and I was curious whether I could try and visualise the audio (taken from a video object) to display using canvas. A day later, [True][true-video] was essentially done.

At its core is this piece of code:

```javascript
//Make sure AudioContext is available (Webkit uses a vendor prefix)
window.AudioContext = window.AudioContext || window.webkitAudioContext

//createMediaElementSource means we can grab the audio from our video
context = new AudioContext()
sourceNode = context.createMediaElementSource(video[0])
```

Unfortunately Safari doesn't play nice, due to a bug in the way it returns audio data from `createMediaElementSource()`. It's [pretty widely known][safari-web-audio-bug-tweet] and it doesn't looks like it'll get fixed [any time soon][safari-web-audio-bug].

Using the [web audio API][web-audio-api-mdn], I was able to visualise the frequencies direct from the audio in the video element, in real time. And that's a simple use of the API—the possibilities for experimentation and collaboration are endless.

![The True opening visual.](/images/articles/the-web-audio-api/image-true-01.jpg)

I used [SnapSVG][snapsvg] for the opening animation, which is an incredibly robust library for manipulating and animation SVGs.

![The web audio API visualisation.](/images/articles/the-web-audio-api/image-true-02.jpg)

---

## Faith restored

When I started working on a new video for Brightly I initially struggled with finding inspiration. The web audio API, however, rescued me from that spiral of crippling self doubt.

If you're keen to delve in, [HTML5Rocks][html5rocks-tutorial] have a [great tutorial][html5rocks-tutorial] explaining the API in awesome detail, including some nifty examples.

  [brightly]: http://wearebrightly.com
  [preflight-nerves]: http://tweetflight.wearebrightly.com
  [the-greylings]: http://music.wearebrightly.com/album/the-greylings
  [true]: https://soundcloud.com/wearebrightly/true
  [oh-infinity]: http://music.wearebrightly.com/album/oh-infinity
  [engaged-in-iceland]: https://www.flickr.com/photos/superhighfives/sets/72157637091939475/
  [gullfoss]: http://en.wikipedia.org/wiki/Gullfoss
  [angularjs]: http://angularjs.org/
  [true-json]: http://true.wearebrightly.com/data/data.json
  [gifs]: http://fox.wearebrightly.com/
  [glen-maddern-twitter]: https://twitter.com/@glenmaddern
  [glen-maddern-site]: http://glenmaddern.com/
  [web-audio-api-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
  [true-video]: http://true.wearebrightly.com
  [safari-web-audio-bug]: http://trac.webkit.org/search?q=createMediaElementSource
  [safari-web-audio-bug-tweet]: https://twitter.com/marcoarment/status/489521301980069892
  [snapsvg]: http://snapsvg.io/
  [html5rocks-tutorial]: http://www.html5rocks.com/en/tutorials/webaudio/intro/