I really like [building mashups][tweetflight] with third party API's. Smooshing together various services to make something greater than the sum of their parts allows you to experiment with a limitless pool of data. It's super fun.

The main issue I've come against is **rate limiting**. Simply put, to avoid getting too many requests, services tend to limit the number of times you can hit their API from a single account. Which makes sense. Otherwise there is nothing to stop you absuing it, and ruining the good times for everyone else.

Fortunately, there are ways around this. For example, if you were using the Twitter API to search for tweets with the world "lolcopter" in them, you could get users to sign in to their Twitter account via your application. That way you could fire the API calls using their credentials—it's unlikely they could go over the rate limit. But it's annoying to have to sign in, and it's likely you'll experience a high number of users dropping off before they've even begun.

The problem, therefore, is one of implementation. Let's say you hit the rate limit. You'll get an error on any subsequent requests until the rate limit is revoked. That could be ten minutes, an hour, half a day. Not exactly ideal. For a more practical example you can check out [twitter's rules][twitter-rate-limiting]. And if you're not caching prior successful responses, your only recourse is to display a message like "Oops, looks like we couldn't get the latest lolcopter tweets. Why not check their site?" with a link.

Ew.

---

## Do not abandon hope, all ye who enter here

So we have a problem. But fear not, there are solutions. You could store the most recent response and fall back to in case the rate limit is exceeded. I've seen this done by writing a json file to the server, and reading from that as a fallback. But it feels clunky, and you're repeatedly reading from the disk.

A better option is to set up a cron job to hit the API once every minute or so, and use **memcached** to store for easy retreival. That way you're separating your components in a meaningful way. One aspect of your application is going out, grabbing new data and storing it in memcached. Another aspect is grabbing the most recent data from memcached and serving it to the user.

You're not only avoiding rate limits, but also serving up lightning fast third party data by pre-offloading the getting to a cron job.

---

## Memwhat?

So, what is [memcached][memcached]?

It's a free, open source, high-performance distributed memory object caching system. Their words. In short, it allows you to store small chunks of data in-memory as key-value pairs. And you can pull them out super quickly, meaning everything from database calls to API results can be held on your server.

It has implementations in Ruby, Node, and a ton of other less hipster languages. And it's just great.

---

## So let's build something

We're going to build a free Heroku-hosted Ruby app, running memcached, to store and serve tweets with the word "lolcopter" in them.

Let's get started.

You'll need some files. First off, a `Gemfile`.

### Gemfile

```ruby
source 'https://rubygems.org'

gem 'thin'
gem 'sinatra'
gem 'dalli'
gem 'json'

gem 'twitter'

group :development do
  gem 'heroku'
  gem 'foreman'
end
```

That covers all our bases. **Thin**, the server, running **Sinatra**, the framework, **Dalli**, the memcache library, and a **json** gem, to serve the goods.

We'll also use the **Twitter** gem to access the Twitter API for those tasty, tasty lolcopter tweets.

On development we'll need **Heroku** to communicate with our app, and **Foreman** to test it.

You are doing great.

### Procfile

```ruby
web: bundle exec ruby app.rb -p $PORT
```

As **Heroku** themselves put it, `Procfile` is a mechanism for declaring what commands are run by your application on Heroku. It's a pretty simple process for a web server, which will run `app.rb`.

### .env

```
MEMCACHIER_SERVERS=localhost

TWITTER_CONSUMER_KEY=KEY_GOES_HERE
TWITTER_CONSUMER_SECRET=SECRET_GOES_HERE
TWITTER_OAUTH_TOKEN=TOKEN_GOES_HERE
TWITTER_OAUTH_TOKEN_SECRET=TOKEN_SECRET_GOES_HERE
```

TODO: Explain .env.

### app.rb

So `app.rb` is the heart of the application, managing the web server side of things, and accessing the tweets stored in the cache. (Which, you're correct in noticing, we haven't actually gotten around to caching yet.)

```ruby
require 'sinatra'
require 'dalli'
require 'json'
require 'newrelic_rpm'
require 'twitter'
```

**Step 1:** Let's require the libraries that we initially set out in our `Gemfile`.

```ruby
#libraries
require_relative './lib/twitter_search'
require_relative './lib/cache'
require_relative './lib/config'

configure :development do
  # Fix thin logging
  $stdout.sync = true
  require 'sinatra/reloader'
  set :allow_origin, '*'
end

helpers do
  def cache
    settings.cache
  end
  def twitter_search
    settings.twitter_search
  end
end

get '/tweets.json' do
  content_type :json
  tweets = cache.get('tweets')
  jsonp tweets
end
```

TODO: Explain app.rb. Simplify initially.

---

## So, now what?

- Get it up on Heroku
- Set up the cron job / scheduler
- Marvel at the tweets

Celebrate.

  [tweetflight]: http://tweetflight.wearebrightly.com
  [twitter-rate-limiting]: https://dev.twitter.com/rest/public/rate-limiting
  [memcached]: http://memcached.org/