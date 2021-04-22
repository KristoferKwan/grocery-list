import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    minHeight: 500,
    margin: 'auto',
    marginTop: 100,
    marginBottom: 40,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: '90%',
    minHeight: 500,
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    fontSize: '100px !important'
  },
  groceryItem: {
    height: 50,
    borderBottom: '1px solid rgba(#000, .03)',
    boxShadow: '0 4px 2px -4px gray'
  }, 
  delete: {
    '&:hover': {
      color: 'red',
      cursor: 'pointer'
    }
  },
  grocerytitle: {
    paddingTop: '20px',
    paddingLeft: '10px'
  }
}));

export default function Grocery() {
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);
  const [newItem, setNewItem] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);
  
  const groceryUrl = '/api/groceries'

  useEffect(() => {
    const getGroceries = async() => {
      const items = (await axios.get(groceryUrl)).data
      setGroceryItems(items);
    }
    getGroceries(); 
  }, []) 

  useEffect(() => {
    const updateGroceries = async() => {
      await axios.put(groceryUrl, {groceryList: groceryItems});
    }
    updateGroceries()
  }, [groceryItems])

  const addItem = (e) => {
    e.preventDefault();
    const groceryitem = newItem
    setGroceryItems([...groceryItems, { item: groceryitem, isCompleted: false}])
    setNewItem('')
  }

  const handleToggle = (indx) => {
    let newGroceryItems = groceryItems
    newGroceryItems[indx].isCompleted = !newGroceryItems[indx].isCompleted
    setGroceryItems([...newGroceryItems]);
  };

  const deleteItem = async (indx) => {
    const newGroceryItems = groceryItems.filter((_, i) => {return indx !== i} )
    setGroceryItems([...newGroceryItems]);
  }

  return (
    <Card className={classes.root}>
    <CardContent>
    <div className={classes.grocerytitle}>
    <Typography variant="h5" component="h1">Personal Grocery List</Typography>
    </div>
    <div className={classes.list}>
    {groceryItems.length > 0 ?
      <List dense>
      {groceryItems.map((item, indx) => {
        const labelId = `checkbox-list-secondary-label-${indx}`;
        return (
          <ListItem key={labelId} onClick={() => handleToggle(indx)} className={classes.groceryItem} button>
            <ListItemText className={classes.item} style={item.isCompleted ? {textDecoration: "line-through" }: {}} primary={item.item} />
            <ListItemSecondaryAction>
              <CancelIcon className={classes.delete} onClick={() => deleteItem(indx)}/>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List> : 
    <p>Type into the input below to start your grocery list</p>
    }
    </div>
    <form>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="Add a new grocery item"
            id="newItem"
            name="newItem"
            autoComplete="newItem"
            value={newItem}
            onChange={(e) => {setNewItem(e.target.value)}}
            onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  addItem(e);
                }
              }}
            autoFocus
          />
      </form>
    </CardContent>
    </Card>
  );
}
