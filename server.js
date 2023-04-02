const express = require("express");
const { db, port } = require("./config/config");
const authRouter = require("./routes/auth");
const authentication = require("./middleware/auth");
const todoRouter = require("./routes/todo");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api", authRouter);
app.use("/api/todos", authentication, todoRouter);

app.listen(port, () => {
  console.log(port);
  db();
});
