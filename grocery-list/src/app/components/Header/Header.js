import React, { useContext} from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from "react-router-dom"
import "./Header.css"
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../hooks/UserContext';
import Button from '@material-ui/core/Button';
import useLogout from '../../hooks/useLogout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: 'white',
    '&:hover': {
      color: 'white'
    }
  },
  header: {
    color: 'white',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function Header() {
  const classes = useStyles();
  var history = useHistory();
  const { user } = useContext(UserContext);
  const { logoutUser } = useLogout();

    return (
        <div className="header">
            <div className="header_logo">
                <h1 className={classes.header} onClick={() => {history.push('/')}}>Grocery List</h1>
            </div>
            <div className="header_right">
                {user ? 
                <>
                  <div className="item"> 
                    <Button component={Link} to={'/grocerylist'} className={classes.button}>Groceries</Button>
                  </div>
                  <div className="item logout"> 
                    <Button component={Link} onClick={logoutUser} className={classes.button}>Log out</Button>
                  </div>
                  </>: <></>
                }
                {!user ?
                <>
                  <div className="item">
                    <Button component={Link} to={'/login'} className={classes.button}>Login</Button>
                </div> 
                <div className="item">
                    <Button component={Link} to={'/signup'} className={classes.button}>Sign Up</Button>
                </div> 
                </>
                : <></>
                }
            </div>
        </div>
    )
}

export default Header