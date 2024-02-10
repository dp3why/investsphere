import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/postActions";
import useStyles from "./styles";

const Post = ({ post, creator, setCurrentId, userInfo }) => {
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem("profile"))?.result?._id;
  const [showDelete, setShowDelete] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost = post.likes.find((like) => like === userId);

  useEffect(() => {
    if (!userInfo) {
      setShowDelete(false);

      return;
    }

    setShowDelete(creator === userInfo?.result?._id);
  }, [creator, userInfo]);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    history.push(`/posts/${post._id}`);
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));

    // check if the current user likes the post
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      // if the user hasn't liked the post
      setLikes([...post.likes, userId]);
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {setShowDelete && (
        <div className={classes.overlay2}>
          <Button
            onClick={() => setCurrentId(post._id)}
            style={{ color: "white" }}
            size="small"
          >
            <MoreHorizIcon />
          </Button>
        </div>
      )}
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLike}>
          <Likes />
        </Button>
        {showDelete && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
