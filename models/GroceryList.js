const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const GroceryListSchema = new mongoose.Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    items: [GroceryItemSchema]
});

module.exports = mongoose.model('groceryList', GroceryListSchema);