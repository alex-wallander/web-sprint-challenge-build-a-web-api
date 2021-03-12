// Write your "actions" router here!
const express = require('express');

const router = express.Router();

const Action = require('./actions-model');

router.get('/', (req, res) => {
    Action.get(req.body)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
})

module.exports = router;