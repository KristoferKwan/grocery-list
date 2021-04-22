import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  content: {
    paddingTop: theme.spacing(12),
    width: "100%",
    minHeight: "90vh"

  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.content}>
      <Card> 
        <CardContent>
          <h1>Grocery List</h1>
          <p>This site is a fairly simple app to keep track of your groceries. <br/><br/>To use, simply signup or log into your account and start adding grocery items to your list!</p>
        </CardContent>
      </Card>
    </Container>
  );
}