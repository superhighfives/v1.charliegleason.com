A couple of weeks ago I decided to rejig my personal site, because I hit a particularly tough patch in [Saints Row 4](saints-row-4) and what else would I spend a Saturday doing? Previously I'd had good experiences with [Pith](pith), which is a really solid Ruby based static site generator, but I'd overcomplicated the whole thing and it felt a bit clunky. Plus I wanted to try some new fanciness.

After setting up [Jekyll](jekyll), another Ruby based static site generator (we should acronym that, no?), I got a [tweet](tweet) from Glen Maddern, mentioning a deep affection for [Harp.js](harp). It made me realise that though I've admired it from afar, I hadn't really messed much with [Node.js](node), and a personal site is a pretty good place to get your hands dirty.

At the same time, I was hearing good things about [Gulp.js](gulp), the Node based streaming build system, and I'd always found it's predecessor [Grunt.js](grunt) a little verbose.

[BrowserSync](browsersync) was the final piece of the puzzle, and I was primarily curious about its much touted ability to inject CSS changes without reloading the page.

So I dug in.

---

## Setting it all up

So, we'll need [Gulp](gulp), [Harp](harp) and [BrowserSync](browsersync).

### Getting started with Gulp

The first thing I noticed, when checking out Gulp, was the simplicity. After wrestling with Grunt for so long, I was chuffed to see a single named function was all that's needed to get started.

(To be fair, I've not written anything particularly onerous in Gulp, so that's a bit harsh.)

First, make sure you've got [Gulp installed](gulp-getting-started).

```console
npm install --global gulp
```

Then you'll need a ```gulpfile.js``` at the root of your project.

```javascript
var gulp = require('gulp');

gulp.task('default', function() {
  console.log("Gulp lol look at me being rad.");
});
```

As it's the default task, just run ```gulp```.

```javascript
gulp
```

### Getting started with Harp

Similarly, Harp is super straightforward.

```console
sudo npm install -g harp
```

You can then use harp to generate the bones of a project.

```console
harp init myproject
```

That will give you the barest of projects, using [Less](less) for styles and [Jade](jade) for HTML. Personally, I prefer [Sass](sass) and [EJS](ejs), but it's not hard to change things over. Harp tends towards convention over configuration, so all you really need is a single .ejs or .jade page and you're good to go.

### Getting started with BrowserSync

Finally, [BrowserSync](browsersync).

```console
npm install -g browser-sync
```

We'll run BrowserSync via Gulp, so you don't need to do anything else at this point. You can run from the command line though, using the ```browser-sync``` command.

---

## Setting the scene

So, there are some dependencies involved. To make life a little easier, I've pulled together the cleverly titled boilerplate, called ```harp-gulp-browsersync-boilerplate```. You can use it to get the whole thing up and running straight away, and then I'll go through and explain what's happening. Cool? Cool.

Let's take a moment to look at a lolcat.

![Phew.](/images/writing/harp-gulp-and-browsersync/image-lolcat.jpg)

That was awesome.

So, Harp has a really great feature where you can use any repo as a boilerplate. To use my super-fancy repo, you just need the ```--boilerplate``` (or -b) option.

```console
harp init src --boilerplate superhighfives/harp-gulp-browsersync-boilerplate
```

Then, once it's downloaded (maybe make a tea or something?) you can jump into src and grab the dependencies.

```console
npm install
```

Maybe make another tea? You may be sick of tea by now. I'm not confident in how much tea you drink each day, so I don't want to be presumptious.

Finally, run ```gulp```.

Here's what is happening. Gulp fires up Harp on port 9000 (you can change that in the ```gulpfile.js```), and BrowserSync proxies it, usually on 3000. So just hit up <http://localhost:3000> and you're ready to party. It's worth checking the output in your console though, as it will give you the definitive address.

---

## Changing things, because you can

Now you can edit main.sass and the updates will happen in real-time. It's the same system that's currently running this blog, and you can see the full range of tasks (including deploying straight to [Github Pages](github-pages)) in the source [over on Github](charlie-source).

  [saints-row-4]: http://www.saintsrow.com/uk
  [pith]: https://github.com/mdub/pith
  [jekyll]: http://jekyllrb.com/
  [tweet]: https://twitter.com/glenmaddern/status/499330737431015425
  [harp]: http://harpjs.com/
  [node]: http://nodejs.org/
  [gulp]: http://gulpjs.com/
  [grunt]: http://gruntjs.com/
  [gulp-getting-started]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started
  [browsersync]: http://browsersync.io
  [less]: http://lesscss.org/
  [jade]: http://jade-lang.com/
  [sass]: http://sass-lang.com/
  [ejs]: http://embeddedjs.com/
  [github-pages]: https://pages.github.com/
  [charlie-source]: https://github.com/superhighfives/charlie-deux