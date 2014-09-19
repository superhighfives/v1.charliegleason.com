The older I get, the more I realise that I do not like [doing things more than once][dry].

When I first starting making the Internets, I would spend a massive amount of cognitive energy transferring things via FTP; dragging files to [Transmit](transmit), hoping I hadn't inadvertently overwritten something super important. It was dark, people. It was a dark time.

![No, FTP. No.](/images/articles/deploying-to-github-pages-with-gulp/image-no.jpg)

Fortunately, this is no longer the case. You don't have to live like this. **We** don't have to live like this.

I've been using [Github Pages][github-pages] to deploy static sites for a while now. It's quick, easy, and pretty painless. You can easily get a static site set up and hosted in no time, and it's free. Win win! I actually used it for the client side of [Tweetflight][tweetflight].

If you've run through my [Harp, Gulp and Browsersync][harp-gulp-and-browsersync] tutorial, you can use that as the basis for deployment. If you haven't, all you need is a [repo][github-new-repo] and a directory to deploy. Easy as.

First up, you'll want to install [gulp][gulp] and [gulp-gh-pages][gulp-gh-pages], which will handle the deployment.

---

## Getting started

So, you'll need a `package.json` file, to use manage the required Node packages.

```bash
npm init
```

If you don't have [Node.js][nodejs], you can install it [here][nodejs].

It will ask you some questions about your project, and it's pretty friendly. Good for you, NPM. Good. For. You.

Right. To celebrate, let's enjoy a photo of a cat in the snow.

![Yes. You are the best cat.](/images/articles/deploying-to-github-pages-with-gulp/image-snowcat.jpg)

So good.

Add [Gulp][gulp], which powers this glorious, gorgeous beast.

```bash
npm install gulp --save-dev
```

Then you'll need to add [gulp-gh-pages][gulp-gh-pages].

```bash
npm install gulp-gh-pages --save-dev
```

Now, in your `gulpfile.js`, add the following:

```js
var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});
```

## So what's going on here?

We're defining a **task**, called `deploy`. You could get gulp to run a build task here, if you needed to, prior to deploying it. To do so, just update `'deploy', function() {` to `'deploy, ['build'], function () {` (or whatever the name of you gulp build task is) and gulp will take care of it. It's one of the many reasons gulp is wild.

I used gulp four times in that paragraph. Calm down, Charlie.

`/dist` is the directory we're deploying, and `/**/*` means it will deploy recursively. All files and directories inside of `/dist` will be included.

---

## Github-ing

So, given that you're deploying to Github, you're going to need to have your site in a repository. You can see an example I set up at [testing-gulp-gh-pages][testing-gulp-gh-pages]. If you don't already have your site on [Github][github], you should anyway. It's awesome, and means you'll be using proper version control for your site. Which is a huge piece of mind. Which you obviously deserve.

You'll want to avoid pushing your whole `/node_modules` directory on Github, as it's being managed by your `package.json` file. To stop this happening, make a file called `.gitignore`. That's essentially a space where you can [list files you don't want to end up in source control][github-ignoring-files], each on a new line.

Just make sure node_modules is listed:

```
node_modules
```

That way, when you push to Github, you won't accidentally push all of your sites Node depedencies.

If you don't want to commit your `/dist`, or the folder that is holding your built site, you can add that too:

```
node_modules
dist
```

It really depends on how you're managing your folder structure. There's no wrong way, but it's worth noting that if your repo is public you should avoid putting any fancy paid fonts or similar in there.

In that case you're likely better hosting them remotely with [S3][s3] or [Rackspace][rackspace]. I use Rackspace, personally.

---

## Custom domains

If you want to use a [custom domain][github-pages-custom-domain] for your Github hosted site, you'll need to do two things first.

1. Make a text-based `CNAME` file that will end up in the root of the directory you're deploying. For example, `/dist/CNAME`. All it needs inside is the url you want to point to your new site. For me, it's `charliegleason.com`.

2. Update your DNS records. Github has a [pretty good walkthrough of how to do this][github-pages-custom-domain].

When you're ready to deploy, the folder you're pushing to Github should have CNAME in the root. As long as that's in there, you're golden.

And then you're all set.

---

## Fire away!

When you're ready to deploy, push the latest changes to your repo to Github.

```bash
git add . # Add any untracked files
git commit -va # Commit the changes
git push # Push it to Github
```

You'll also need to make sure you have a `gh-pages` branch, if you don't already.

```bash
git checkout --orphan gh-pages
git rm -rf .
touch README.md
git add README.md
git commit -m "Init gh-pages"
git push --set-upstream origin gh-pages
git checkout master
```

So, now you just need to run your deploy task.

```bash
gulp deploy
```

And voila. You can visit your fancy new site at `your-username.github.io/your-reponame`, or (if the DNS has propogated) at the custom domain you set up.

You can see [one I prepared earlier][testing-gulp-gh-pages-live], which is using the testing-gulp-gh-pages [repo][testing-gulp-gh-pages].

![Yes, Github Pages. Yes.](/images/articles/deploying-to-github-pages-with-gulp/image-yes.jpg)

You're great. Good for you. If you have any problems, I can probably help. Just [email me][email].


  [transmit]: http://panic.com/transmit/ "Which is actually a super great FTP client"
  [nodejs]: http://nodejs.org/
  [gulp]: http://gulpjs.com/
  [gulp-gh-pages]: https://github.com/rowoot/gulp-gh-pages
  [github]: http://github.com/
  [github-new-repo]: https://github.com/repositories/new
  [github-ignoring-files]: https://help.github.com/articles/ignoring-files
  [github-pages]: http://pages.github.com/
  [github-pages-custom-domain]: https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages
  [dry]: http://en.wikipedia.org/wiki/Don't_repeat_yourself
  [harp-gulp-and-browsersync]: http://charliegleason.com/articles/harp-gulp-and-browsersync
  [testing-gulp-gh-pages]: https://github.com/superhighfives/testing-gulp-gh-pages
  [testing-gulp-gh-pages-live]: http://superhighfives.github.io/testing-gulp-gh-pages/
  [tweetflight]: http://tweetflight.wearebrightly.com
  [s3]: http://aws.amazon.com/s3/
  [rackspace]: http://www.rackspace.co.uk/cloud/files
  [email]: mailto:hi@charliegleason.com