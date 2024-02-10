import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../actions/postActions";
import useStyles from "./styles";

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={4}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        style={{ margin: "1rem", fontWeight: "bold" }}
      >
        {post.title}
      </Typography>
      <div className={classes.subtitle}>
        <Typography
          gutterBottom
          variant="h6"
          color="textSecondary"
          component="h3"
          align="center"
          style={{ marginLeft: "1rem" }}
        >
          {post.tags.map((tag) => `#${tag.trim()}  `)}
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="h6"
          component="h3"
          style={{ marginLeft: "2rem" }}
        >
          Created by: {post.name}
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="h6"
          component="h3"
          style={{ marginLeft: "1rem" }}
        >
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <Grid container className={classes.card} spacing={3}>
        {/* image */}
        <Grid item className={classes.imageSection} xs={12} sm={12} lg={7}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
          <CommentSection post={post} />
        </Grid>

        {/* post content */}

        <Grid item className={classes.section} xs={12} sm={12} lg={5}>
          {/* post main content */}
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />
        </Grid>
      </Grid>
      <Divider />
      {/* ================================= */}
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            gutterBottom
            variant="h5"
          >
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <img src={selectedFile} width="200px" alt="file" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
