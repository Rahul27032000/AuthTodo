const { isObjectIdOrHexString } = require("mongoose");
const Todo = require("../models/Todo");

const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.where("user").equals(req.user._id);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Controller for getting todo by id
const getTodoById = async (req, res) => {
  try {
    if (!isObjectIdOrHexString(req.params.id))
      return res.status(404).json({ message: "Invalid Id" });
    const todo = await Todo.findOne().where({
      _id: req.params.id,
      user: req.user,
    });
    if (!todo) return res.status(404).json({ message: "Todo does not exist" });
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "sever error" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!(title && description))
      return res.status(500).json({ message: "Provide enough information" });

    const user = req.user;

    const todo = await Todo.create({ title, description, user });
    console.log(todo);
    res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTodoById = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const user = req.user._id;
    console.log(title);
    console.log(description);

    const todo = await Todo.findOne().where({ _id: req.params.id, user: user });
    if (!todo) return res.status(404).json({ message: "Todo does not exist" });

    if (!(title || description))
      return res.status(500).json({ message: "Nothing to update" });

    todo.title = title || todo.title;
    todo.description = title || todo.description;
    console.log(todo.title);
    console.log(todo.description);
    todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    if (!isObjectIdOrHexString(req.params.id))
      return res.status(404).json({ message: "Invalid Id" });
    const todo = await Todo.findOne().where({
      _id: req.params.id,
      user: req.user,
    });
    if (!todo) return res.status(404).json({ message: "Todo does not exist" });
    await Todo.findByIdAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    res.status(204).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "sever error" });
  }
};

module.exports = {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
