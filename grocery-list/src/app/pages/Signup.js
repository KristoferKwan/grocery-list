import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  content: {
    paddingTop: "40px",
    minHeight: "90vh"
  }
}));

export default function Signup() {
  const classes = useStyles();
  const {register, handleSubmit} = useForm()
  
  const { registerUser, error } = useAuth();

  const handleRegister = async (data) => {
    const body = {
      ...data
    }
    await registerUser(body);
    
  }
  return (
    <Container component="main" maxWidth="xs" className={classes.content}>
      <CssBaseline />
      <div className={classes.paper}>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <Avatar src="https://www.w3schools.com/howto/img_avatar.png" className={classes.large} />
        </IconButton>

        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <div className="inlineForm__notif">
           {error && <FormHelperText error={true}>{error.error}</FormHelperText>}
        </div>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data)=> {
          handleRegister(data)
        })}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                {...register('email')}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register('password')}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create User
          </Button>
        </form>
      </div>
    </Container>
  );
}