import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_TWEET = gql`
  mutation AddTweet($body: String!) {
    createTweet(body: $body) {
      id
      body
    }
  }
`;
const AddTweet = (fetch: any, setFetch: any) => {
  const [addTweet] = useMutation(ADD_TWEET);

  const [newTweet, setNewTweet] = useState("");

  const handleAddTweet = async () => {
    try {
      addTweet({
        variables: {
          body: newTweet,
        },
      });
      setNewTweet("");
      setFetch(!fetch)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container my={4} ml={4} mx={1}>
      <Grid>
        <TextField
          variant="outlined"
          multiline
          maxRows={4}
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
        />
      </Grid>
      <Grid item xs={2} mx={1}>
        <Button variant="contained" onClick={handleAddTweet}>
          Tweet
        </Button>
      </Grid>
    </Grid>
  );
};
export default AddTweet;
