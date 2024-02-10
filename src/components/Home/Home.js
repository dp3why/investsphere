import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPostsBySearch } from "../../actions/postActions";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ userInfo }) => {
  const classes = useStyles();
  const query = useQuery();
  // read url to see if we have a page param there
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  // why add currentID:
  // since each time we update the current post info, it will change the currentId
  // we then need to get new posts for each updating task done
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      // search post
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Container maxWidth="xl">
      <Grid
        container
        className={classes.gridContainer}
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        {/*  === Posts content === */}
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} userInfo={userInfo} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar
            className={classes.appBarSearch}
            position="static"
            color="inherit"
          >
            <TextField
              name="search"
              variant="outlined"
              label="Search a Post"
              fullWidth
              value={search}
              onKeyPress={handleKeyPress}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <ChipInput
              style={{ margin: "10px 0" }}
              value={tags}
              onAdd={handleAddChip}
              onDelete={handleDeleteChip}
              label="Search Tags"
              variant="outlined"
            />
            <Button
              onClick={searchPost}
              classes={classes.searchButton}
              color="primary"
              variant="contained"
            >
              Search
            </Button>
          </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {!searchQuery && !tags.length && (
            <Paper className={classes.pagination} elevation={2}>
              <Pagination page={page} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
