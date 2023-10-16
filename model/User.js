import mongoose from "mongoose";
let Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    account_type: { type: String },
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

let User;

if (mongoose.models.User) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", UserSchema);
}
export default User;
