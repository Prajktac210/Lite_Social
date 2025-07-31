import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  user_info: {
    bio: {
      type: String
    },
    location: {
      type: String
    },
    user_profilepic: {
      type: String,
      default: "https://tse2.mm.bing.net/th/id/OIP.rXAHL2FueJfleSPsvpf-CAAAAA?pid=Api&P=0&h=180"
    }
  },
  accountType: {
    type: String,
    default: "public",
    enum: ["public", "private"]
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Posts"
  }],
  Followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]

});

const User = model("User", userSchema);
export default User; 
