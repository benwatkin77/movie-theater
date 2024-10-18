const express = require('express');
const showRouter = express.Router();
const {User, Show} = require('../models');

showRouter.get('/', async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shows' });
    }
});

showRouter.get('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (show) {
            res.json(show);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching show' });
    }
});

showRouter.get('/:id/users', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id, {
            include: User
        });
        if (show) {
            res.json(show.Users);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users who watched this show' });
    }
});

showRouter.put('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (show) {
            show.available = req.body.available;
            await show.save();
            res.json({ message: `Show ${show.title} updated successfully`, show });
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating show' });
    }
});

showRouter.delete('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (show) {
            await show.destroy();
            res.json({ message: `Show ${show.title} deleted successfully` });
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting show' });
    }
});

showRouter.get('/', async (req, res) => {
    try {
        // Log the query parameters for debugging
        console.log(req.query);
        
        // Check if a genre is provided and construct the query condition
        const conditions = req.query.genre ? { genre: req.query.genre } : {};

        // Fetch the shows based on the genre condition
        const shows = await Show.findAll({ where: conditions });

        // Send the result back as JSON
        res.json(shows);
    } catch (error) {
        console.error('Error fetching shows:', error.message);
        res.status(500).json({ message: 'Error fetching shows' });
    }
});


module.exports = showRouter;
