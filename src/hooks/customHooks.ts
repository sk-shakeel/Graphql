import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";

export const GET_ALL_TWEETS = gql`
  query {
    Tweets {
      id
      Author {
        username
        avatar_url
        full_name
        id
      }
      body
      date
      Stats {
        likes
        responses
        retweets
        views
      }
    }
  }
`;
export const TWEETS_SUBSCRIPTION = gql`
  subscription TweetsUpdated {
    TweetsUpdated {
      id
      body
    }
  }
`;
export const useGetAllTweets = () => {
  const { error, data, loading, refetch } = useQuery(GET_ALL_TWEETS);
  const { data: subscriptionData } = useSubscription(TWEETS_SUBSCRIPTION);

  if (subscriptionData && subscriptionData.TweetsUpdated) {
    const updatedTweets = [...data.Tweets, subscriptionData.TweetsUpdated];
    return {
      error,
      data: { Tweets: updatedTweets },
      loading,
    };
  }

  return {
    error,
    data,
    loading,
    refetch
  };
};
