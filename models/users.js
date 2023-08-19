const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
      first_name: {type: String, required: true},
      last_name: {type:String, required:true},
      username: {type: String, required: true, unique: true},
      password: {type:String, required: true},
      messages: [{type: Schema.Types.ObjectId,ref: "Messages"}],
      is_member: {type:Boolean},
      is_admin: {type:Boolean},
})
userSchema.virtual("full_name").get(function () {
      return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("Users", userSchema);