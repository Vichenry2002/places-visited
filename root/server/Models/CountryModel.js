const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Country name is required"],
  },
  status: {
    //0 for visited, 1 for wishlist
    type: Number,
    required: [true, "Status is required"],
  },
  text: {
    type: String
  },
});


module.exports = mongoose.model("Country", countrySchema);