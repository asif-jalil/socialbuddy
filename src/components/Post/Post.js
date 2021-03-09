import { Box, Button, Card, CardActions, CardContent, Grid, makeStyles, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const useCardStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: theme.shadows[3],
  },
  body: {
    height: 130,
  },
}));

const useStylesTooltip = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    boxShadow: theme.shadows[5],
    fontSize: 12,
  },
}));

const Post = (props) => {
  const cardStyle = useCardStyles();
  const tooltipStyle = useStylesTooltip();
  const { title, body, userId, id } = props.post;
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

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

  let history = useHistory();

  function handleReadMore(id) {
    history.push(`/post/${id}`);
  }

  return (
    <Grid item lg={props.lg} md={props.md} sm={props.sm}>
      <Card className={cardStyle.root}>
        <CardContent className={cardStyle.body}>
          <Tooltip classes={tooltipStyle} arrow title={title}>
            <Typography variant="h6" component="h4">
              {title.length > 23 ? `${title.slice(0, 23)}...` : title}
            </Typography>
          </Tooltip>
          {
            props.friendName && <Typography gutterBottom variant="subtitle2" component="h6">
            Posted by <Link to={`/friend/${user.id}`}>
              <Box component="span" color="info.main">
                {user.name}
              </Box>
            </Link>
          </Typography>
          }
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {props.friendName ? body.slice(0, 100) : body.slice(0, 200)}...
          </Typography>
          <Typography gutterBottom variant="caption" component="h6">
            {comments.length} comments
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleReadMore(id)} variant="contained" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Post;
