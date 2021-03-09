import { Box, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
const useCommentStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

const SingleComment = (props) => {
  const commentStyle = useCommentStyle();

  const { email, body } = props.comment;
  return (
    <Box className={commentStyle.root} component="div">
      <Typography gutterBottom component="h5" variant="subtitle2">
        {email}
      </Typography>
      <Typography gutterBottom variant="body2">
        {body}
      </Typography>
      <Divider />
    </Box>
  );
};

export default SingleComment;
