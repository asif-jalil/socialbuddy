import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, makeStyles, Paper, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleComment from "../SingleComment/SingleComment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";

const useCardStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: theme.shadows[3],
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
}));

const PostDetail = () => {
  const cardStyle = useCardStyles();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const { title, body, userId, id } = post;

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  return (
    <Container className={cardStyle.container} fixed>
      <Grid container justify="center">
        <Grid item lg={6} md={8}>
          <Card className={cardStyle.root}>
            <CardContent className={cardStyle.body}>
              <Typography gutterBottom variant="h5" component="h6">
                Posted by{" "}
                <Link to={`/friend/${user.id}`}>
                  <Box component="span" color="info.main">
                    {user.name}
                  </Box>
                </Link>
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h6" component="h4">
                {title}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {body}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body1" component="h5">
                Comments <ArrowDropDownIcon />
              </Typography>
              {comments.map((comment) => (
                <SingleComment comment={comment}></SingleComment>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostDetail;
