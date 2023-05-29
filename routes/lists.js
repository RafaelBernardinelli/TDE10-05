const express = require("express");
const {
  deleteItemList,
  getAllLists,
  saveList,
  updateList,
} = require("../database/list");
const router = express.Router();
const { auth } = require("../middlerwares/auth");

router.get("/tasks", auth, async (req, res) => {
  try {
    const listAll = await getAllLists();

    res.json({
      listAll,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/tasks", auth, async (req, res) => {
  const newTask = {
    nome: req.body.name,
    descricao: req.body.description,
    isDone: req.body.isDone,
  };
  const newList = await saveList(newTask);

  res.json({
    newToDoList: newList,
  });
});

router.put("/tasks/:id", auth, async (req, res) => {
  const id = Number(req.params.id);

  const newListUpdated = await updateList(id, {
    nome: req.body.name,
    descricao: req.body.description,
    isDone: req.body.isDone,
  });
  res.json({
    newListUpdated,
  });
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const id = Number(req.params.id);

  await deleteItemList(id);

  res.status(204).send();
});

module.exports = {
  router,
};
