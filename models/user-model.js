const { Schema, model } = require("mongoose");

const File = new Schema({
  id: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, default: false },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

module.exports = model("User", User);
