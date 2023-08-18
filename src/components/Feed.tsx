import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import {
  ChatBubbleOutline,
  Delete,
  FavoriteBorderOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useGetAllTweets } from "../hooks/customHooks";
import AddTweet from "./AddTweet";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const DELETE_TWEET = gql`
  mutation deleteTweet($deleteTweetId: ID!) {
    deleteTweet(id: $deleteTweetId)
  }
`;

const Feed = () => {
  const [fetch, setFetch] = useState(false);
  const { error, data, loading, refetch } = useGetAllTweets();
  const [deleteTweet] = useMutation(DELETE_TWEET);
  const handleDelete = (id: string) => {
    deleteTweet({
      variables: {
        deleteTweetId: id,
      },
    });
    setFetch(!fetch);
  };

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [fetch]);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    console.log(error);
    return <p>Some error occured</p>;
  }

  return (
    <Grid container my={3}>
      <Grid item xs={8}>
        <Stack direction="column" p={"2vw"} gap={"2vw"}>
          {data?.Tweets?.map((tweet: any) => {
            return (
              <Paper key={tweet.id} elevation={3}>
                <Grid container my={1}>
                  <Grid item xs={2}>
                    <img
                      width="128px"
                      height="128px"
                      src={tweet.Author?.avatar_url}
                      alt=""
                    ></img>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography align="left" variant="body2">
                          {tweet.Author?.full_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography align="left" variant="caption">
                          @{tweet.Author?.username}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item my={2} xs={6}>
                        <Typography align="left" variant="body2">
                          {tweet.body}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography align="right" variant="caption">
                      {new Date(tweet.date).getDate() +
                        " " +
                        new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(new Date(tweet.date))}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(tweet.id)}
                    ></Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2}>
                    <FavoriteBorderOutlined />
                    <Typography variant="caption">
                      {tweet.Stats?.likes}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <ShareOutlined />
                    <Typography variant="caption">
                      {tweet.Stats?.retweets}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <ChatBubbleOutline />
                    <Typography variant="caption">
                      {tweet.Stats?.responses}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <AddTweet fetch={fetch} setFetch={setFetch} />
      </Grid>
    </Grid>
  );
};

export default Feed;
