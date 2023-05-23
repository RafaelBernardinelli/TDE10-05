const express = require('express')

const server = express()
server.use(express.json())

const port = 8080

let toDoList = [
    {
        id: 1,
        name: "Comprar leite",
        description: "Ir no mercado da esquina e comprar leite",
        isDone: false
    },
    {
        id: 2,
        name: "Comprar pão",
        description: "Ir no mercado da esquina e comprar pão",
        isDone: true
    },
    {
        id: 3,
        name: "Comprar carne",
        description: "Ir no mercado da esquina e comprar carne",
        isDone: false
    }
]

server.get('/tasks', (req, res) => {
    res.json({
        toDoList: toDoList
    })
})

server.post('/tasks', (req, res) => {
    const newTask = {
        id: toDoList.length + 1,
        name: req.body.name,
        description: req.body.description,
        isDone: req.body.isDone
    }
    toDoList.push(newTask)

    res.json({
        newToDoList: newTask
    })
})

server.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)

    const toList = toDoList.find((it) => it.id === id)

    toList.name = req.body.name
    toList.description = req.body.description
    toList.isDone = req.body.isDone

    if (!toList) {
        return res.status(404).json({ message: "Task not found"})    
    }

    res.json({
        toList
    })
})

server.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)

    toDoList = toDoList.filter((it) => it.id !== id)

    res.status(204).send()
})

server.listen(port, () => {
    console.log("server running on port", port)
})



