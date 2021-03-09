import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Friend from "../Friend/Friend";

const useStyle = makeStyles((theme) => ({
  root: {
    background: '#f8f8f8',
    minHeight: 'calc(100vh - 65px)'
  },
  containerRoot: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const shuffle = (friends) => {
  for (let i = friends.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [friends[i - 1], friends[j]] = [friends[j], friends[i - 1]];
  }
};

const FriendList = () => {
  const classes = useStyle();
  const [friends, setFriends] = useState([])
  shuffle(friends);

  useEffect(()=>{
    const url = `https://jsonplaceholder.typicode.com/users`
    fetch(url)
    .then(res=>res.json())
    .then(data=>setFriends(data))
  }, [])
  return (
    <main className={classes.root}>
      <Container className={classes.containerRoot} maxWidth="xl">
        <Grid container spacing={3} justify="center">
          {
            friends.map(friend => <Friend friend={friend}></Friend>)
          }
        </Grid>
      </Container>
    </main>
  );
};

export default FriendList;
