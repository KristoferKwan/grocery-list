const mongoose = require('mongoose');

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

module.exports = mongoose.model('groceryItem', GroceryItemSchema);