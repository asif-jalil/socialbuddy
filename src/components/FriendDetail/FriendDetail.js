import { Box, Card, CardContent, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Post from '../Post/Post';

const useStyle = makeStyles((theme) => ({
  root:{
    background: '#f8f8f8',
    minHeight: 'calc(100vh - 65px)'
  },
  containerRoot: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  cardStyle: {
    boxShadow: theme.shadows[2],
  },
  cardHeader: {
    textAlign: 'center',
  }
}))

const FriendDetail = () => {
  const classes = useStyle();
  const { friendId } = useParams()
  const [friend, setFriend] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const url = `https://jsonplaceholder.typicode.com/users/${friendId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>setFriend(data))
  }, [friendId])

  useEffect(()=>{
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${friendId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>setPosts(data))
  }, [friendId])

  const {id, name, username, email, address, phone, website, company} = friend;

  return (
    <main className={classes.root}>
      <Container className={classes.containerRoot} maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.cardStyle}>
              <CardContent className={classes.cardHeader}>
                <Typography variant="h4" component="h3">
                  Showing <Box color="info.main" component="span">{name}'s</Box> Profile
                </Typography>
                <Typography variant="h6" component="h5">
                  Works at <Box color="secondary.main" component="span">{company?.name}</Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} sm={5} xs={12}>
            <Card className={classes.cardStyle}>
              <CardContent>
                <Typography variant="h6" component="h6">
                  Intro
                </Typography>
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="body1" component="p">
                  Name: <Box display="inline" component="h4">{name}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Email: <Box display="inline" component="h4">{email}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Phone: <Box display="inline" component="h4">{phone}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Address: <Box display="inline" component="h4">{address?.street}, {address?.suite}, {address?.city}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Zip Code: <Box display="inline" component="h4">{address?.zipcode}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Username: <Box display="inline" component="h4">{username}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Website: <Box display="inline" component="h4">{website}</Box>
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  Company: <Box display="inline" component="h4">{company?.name}</Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={8} sm={7} xs={12}>
            <Grid item xs={12}>
              <Card style={{marginBottom: 20}}>
                <CardContent>
                  <Typography variant="h6" component="h5">
                  All Post from <Box color="info.main" component="span">{name}</Box>
                </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid container spacing={3}>
              {
                posts.map(post => <Post post={post} lg={6} md={12} xs={6} friendName={false}></Post>)
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default FriendDetail;