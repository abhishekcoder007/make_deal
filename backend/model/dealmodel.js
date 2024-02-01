var mongoose = require("mongoose");
// formData.append("Name", inputs.Title);
// formData.append("Price", inputs.Price);
// formData.append("Status", inputs.Status);
// formData.append("Description", inputs.Description);
// formData.append("DealShowTo"

const schema = new mongoose.Schema({
  Name : {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  DealShowTo: {
    type: Object,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },

  Images: {
    type: Object,
    required: true,
  },

  Price: {
    type: Number,
    required: true,
  },
  Imagechoose:{
    type: String,
    required: true,
  }

});
const addDealModel= mongoose.model("products", schema);

module.exports={addDealModel}