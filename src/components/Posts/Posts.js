import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, CircularProgress, Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, userInfo }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  const history = useHistory();

  if (!posts?.length && !isLoading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          style={{
            marginBottom: "2rem",
          }}
        >
          Sorry, No posts found. Let's go back to the main page.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => history.push("/")}
        >
          Return
        </Button>
      </div>
    );

  return isLoading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <CircularProgress />
      <Typography component="body1">Loading</Typography>
    </div>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={4}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
          <Post
            post={post}
            creator={post.creator}
            setCurrentId={setCurrentId}
            userInfo={userInfo}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
