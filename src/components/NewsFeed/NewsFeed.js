import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#f8f8f8',
    minHeight: 'calc(100vh - 65px)'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: 90,
    paddingBottom: 20,
  },
}));

const shuffle = (posts) => {
  for (let i = posts.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [posts[i - 1], posts[j]] = [posts[j], posts[i - 1]];
  }
};

const NewsFeed = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  shuffle(posts);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <main className={classes.root}>
      <Container className={classes.container} maxWidth="xl">
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Post post={post} lg={3} md={4} sm={6} friendName={true}></Post>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default NewsFeed;
