const db = require("../data/db.json");
const { v1: uuid } = require("uuid");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

exports.resolvers = {
  Query: {
    Tweet: (parent, { id }) => {
      let resTweet = db.tweets.find((tweet) => tweet.id === id);
      resTweet = {
        ...resTweet,
        Author: getAuthor(resTweet.Author.id),
      };

      return resTweet;
    },

    Tweets: (parent, { limit, skip, sort_field, sort_order }) => {
      let resTweets = db.tweets;
      if (sort_field && sort_order) {
        if (sort_order === "asc") {
          resTweets = resTweets.sort(sortByFieldAsc(sort_field));
        } else if (sort_order === "desc") {
          resTweets = resTweets.sort(sortByFieldDesc(sort_field));
        }
      }
      if (skip) {
        resTweets = resTweets.slice(skip);
      }
      if (limit) {
        resTweets = resTweets.slice(0, limit);
      }

      resTweets = resTweets.map((tweet) => ({
        ...tweet,
        Author: getAuthor(tweet.Author.id),
      }));

      return resTweets;
    },

    TweetsMeta: () => {
      return {
        count: db.tweets.length,
      };
    },

    User: (parent, { id }) => db.users.find((user) => user.id === id),

    Notifications: (parent, { limit }) => {
      return db.notifications.slice(0, limit);
    },

    NotificationsMeta: () => {
      return {
        count: db.notifications.length,
      };
    },
  },

  Mutation: {
    createTweet: (parent, { body }) => {
      let newTweet = {
        id: String(uuid()),
        body: body,
        date: new Date(),
        Stats: { views: 0, likes: 0, retweets: 0, responses: 0 },
        Author: getAuthor(1),
      };
      console.log(db.users);
      db.tweets.push(newTweet);


      pubsub.publish("TWEETS_CREATED", {
        TweetsUpdated: newTweet,
      });

      return newTweet;
    },

    deleteTweet: (parent, { id }) => {
      let tweetToDelete = db.tweets.find((tweet) => tweet.id === id);
      if (tweetToDelete) {
        db.tweets = db.tweets.filter((tweet) => tweet.id !== id);
        
        pubsub.publish("TWEETS_DELETED", {
          TweetsUpdated: db.tweets,
        });    
        
        return "deleted the tweet";
      }
      throw new Error("Couldn't find tweet");
    },

    markTweetRead: (parent, { id }) => {
      const index = db.tweets.findIndex((tweet) => tweet.id === id);
      db.tweets[index] = {
        ...db.tweets[index],
        Stats: {
          ...db.tweets[index].Stats,
          views: db.tweets[index].Stats.views + 1,
        },
      };
      return true;
    },
  },
  Subscription: {
    TweetsUpdated: {
      subscribe: () => pubsub.asyncIterator(["TWEETS_CREATED", "TWEETS_DELETED"]),
    },
  },
  
};

function sortByFieldAsc(field) {
  return function (a, b) {
    if (a[field] > b[field]) return 1;
    else if (a[field] < b[field]) return -1;

    return 0;
  };
}

function sortByFieldDesc(field) {
  return function (a, b) {
    if (a[field] < b[field]) return 1;
    else if (a[field] > b[field]) return -1;

    return 0;
  };
}

function getAuthor(authorId) {
  const author = db.users.find((user) => (user.id = authorId));

  return author;
}
