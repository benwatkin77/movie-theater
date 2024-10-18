const express = require('express');
const userRouter = express.Router();
const {User, Show} = require('../models');

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

userRouter.get('/:id/shows', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: Show  // Including associated shows
        });
        
        if (user) {
            res.json(user.Shows);  // Return the associated shows
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching shows:', error);  // Log the error
        res.status(500).json({ message: 'Error fetching shows', error: error.message });
    }
});

userRouter.put('/:id/shows/:showId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const show = await Show.findByPk(req.params.showId);

        if (user && show) {
            await user.addShow(show); 
            res.json({ message: `User ${user.username} associated with show ${show.title}` });
        } else {
            res.status(404).json({ message: 'User or Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error associating user with show' });
    }
});

module.exports = userRouter;