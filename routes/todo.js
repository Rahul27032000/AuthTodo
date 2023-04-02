const express = require("express");
const {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controller/todo");
const authentication = require("../middleware/auth");
const router = express.Router();

router.get("", getAllTodo);
router.post("", createTodo);
router.get("/:id", getTodoById);
router.patch("/:id", updateTodoById);
router.delete("/:id", deleteTodoById);

module.exports = router;
