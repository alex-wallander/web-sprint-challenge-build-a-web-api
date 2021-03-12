// Write your "projects" router here!
const express = require('express');

const router = express.Router();

const Project = require('./projects-model');

router.get('/', (req, res) => {
    const id = req.params.id
    Project.get(id, req.query)
    .then(projects => {
        if(!projects) {
            res.status(404).json({ message: 'The project could not be found'})
        } else {
            res.status(200).json(projects)
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Project.get(id)
    .then(projects => {
        if(projects) {
            res.status(200).json(projects)
        } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist' })
        }
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

router.post('/', (req, res) => {
    const newProject = req.body
    if(!newProject.description || !newProject.name) {
        res.status(400).json({ message: 'Please provide a body' })
    } else {
        Project.insert(req.body)
        .then((projects) => {
            res.status(201).json(projects)
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
        if(!changes.description || !changes.name) {
            res.status(400).json({message: 'Please provide changes'})
        } else {
            const updatedProject = await Project.update(id, changes)
            if(!updatedProject) {
                res.status(404).json({ message: 'The project with specified ID does not exist'})
            } else {
                res.status(200).json(updatedProject)
            }
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await Project.remove(id)
        if(!deleted) {
            res.status(404).json({ message: 'The project with the specified ID does not exist' }) 
        } else {
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    Project.getProjectActions(id)
    .then(projects => {
        if(!projects) {
            res.status(404).json({ message: 'The project with the specified ID does not exist' })
        } else {
            res.status(200).json(projects)
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})


module.exports = router