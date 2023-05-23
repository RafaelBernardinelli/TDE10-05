const express = require("express")
const { deleteItemList, getAllLists, saveList, updateList } = require("../database/list")
const router = express.Router()

router.get('/tasks', async (req, res) => {
    const listAll = await getAllLists()
    res.json({
        toDoList: listAll
    })
})

router.post('/tasks', async (req, res) => {
    const newTask = {
        id: toDoList.length + 1,
        name: req.body.name,
        description: req.body.description,
        isDone: req.body.isDone
    }
    const newList = await saveList(newTask)

    res.json({
        newToDoList: newList
    })
})

router.put('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id)

    const newListUpdated = await updateList(id, {
        name: req.body.name,
        description: req.body.description,
        isDone: req.body.isDone
    })
    res.json({
        newListUpdated
    })
})

router.delete('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id)

    await deleteItemList(id)

    res.status(204).send()
})

router.listen(port, () => {
    console.log("server running on port", port)
})


