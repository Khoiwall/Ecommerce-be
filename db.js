const mongoose = require("mongoose");

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB(user, password) {
  try {
    mongoose
      .connect(
        `mongodb+srv://is334:is334123@cluster0.whbiqnx.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("DB connection successfully");
      });
    console.log("Connect sucessful!!!!!!!!");
  } catch (e) {
    console.log(e);
    console.log("Connect failed!!!!!!!!");
  }
}

module.exports = { connectDB };
