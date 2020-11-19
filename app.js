const express = require("express");
const morgan = require("morgan");

const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

const app = express();

const staticMiddleWare = express.static("public");

app.use(morgan("dev")); //logging middleware
app.use(staticMiddleWare); // static middleware
app.use(express.urlencoded({ extended: true })); //body-parser

app.use("/wiki", wikiRouter);

app.get("/", (req, res) => {
  //   res.send(layout(" "));
  res.redirect("/wiki");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;
//syncing our models
const init = async () => {
  //   await Page.sync();
  //   await User.sync();
  await db.sync();
  //   await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!!`);
  });
};

init();
