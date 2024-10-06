const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "author",
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("user", user);
