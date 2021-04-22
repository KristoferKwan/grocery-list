const express = require('express');
const auth  = require('../middleware/auth');
const {
  errorMessage, successMessage, status,
} = require('../helpers/status');
const GroceryList = require('../models/GroceryList');
const GroceryItem = require('../models/GroceryItem');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const user_id = req.user.id;
  try{
    
    const grocery = await GroceryList.findOne({user_id: user_id})
    if(!grocery){
      errorMessage.error = 'Grocery list does not exist';
      return res.status(status.bad).json(errorMessage)
    }
    return res.json(grocery.items);
  }catch(err){
    errorMessage.error = 'Grocery does not exist';
    return res.status(status.bad).json(errorMessage)
  }
});


router.put('/', auth, async (req, res) => {
  const user_id = req.user.id;
  const { groceryList } = req.body;
  try{
    let glist = await GroceryList.findOne({user_id: user_id})

    if(glist){
      const updatedGroceryList = await Promise.all(groceryList.map((grocery) => {
        return new GroceryItem(grocery);
      }))
      await GroceryList.findOneAndUpdate({user_id: user_id}, {items: updatedGroceryList});
    } else {
      errorMessage.error = 'GroceryList does not exist';
      return res.status(status.bad).json(errorMessage)
    }
    return res.json(await GroceryList.findOne({user_id: user_id}));
  }catch(err){
    errorMessage.error = 'Error updating grocery: ' + err.message;
    return res.status(status.bad).json(errorMessage)
  }
});


module.exports = router