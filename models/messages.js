const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema ({
  title: {type: String ,required: true},
  text: {type:String, required: true},
  user: {type: Schema.Types.ObjectId,ref: "Users", required: true},
  time_stamp: {type:Date, required: true}
})


module.exports = mongoose.model("Messages", messageSchema);