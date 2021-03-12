// Write your "actions" router here!
const express = require('express');

const router = express.Router();

const Action = require('./actions-model');

router.get('/', (req, res) => {
    Action.get(req.query)
    .then(actions => {
        console.log(actions)
        res.status(200).json(actions)
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Action.get(id)
    .then(actions => {
        if(actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({ message: 'The action with the specified ID does not exist' })
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

router.post('/', (req, res) => {
    const newAction = req.body
    if(!newAction) {
        res.status(400).json({ message: 'Please provide a body' })
    } else {
        Action.insert(req.body)
        .then((actions) => {
            res.status(201).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const changes = req.body

    try {
        if(!changes) {
            res.status(400).json({message: 'Please provide changes'})
        } else {
            const updatedAction = await Action.update(id, changes)
            if(!updatedAction) {
                res.status(404).json({ message: 'The action with specified ID does not exist'})
            } else {
                res.status(200).json(updatedAction)
            }
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await Action.remove(id)
        if(!deleted) {
            res.status(404).json({ message: 'The action with the specified ID does not exist' }) 
        } else {
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;