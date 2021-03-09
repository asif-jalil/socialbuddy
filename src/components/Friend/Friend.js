import { Button, Card, CardActionArea, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[3],
  }
}))

const Friend = (props) => {
  const classes = useStyle();

  const {name, email, phone, id} = props.friend;
  return (
    <Grid item lg={3} md={4} sm={6}>
      <Link to={`/friend/${id}`}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent style={{textAlign:'center'}}>
              <Typography gutterBottom variant="h6" component="h4">
                {name}
              </Typography>
              <Typography variant="body1" component="p">
                {email}
              </Typography>
              <Typography variant="body1" component="p">
                {phone}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default Friend;