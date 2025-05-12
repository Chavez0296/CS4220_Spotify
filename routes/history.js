import express from 'express';
import db from '../services/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { type } = req.query;

    if (!type || !['keywords', 'selections'].includes(type)) {
        return res.status(400).json({ error: 'Query parameter "type" is required and must be either "keywords" or "selectiosn".' });
    }

    try {
        const collection = type === 'keywords' ? 'SearchHistoryKeyword' : 'SearchHistorySelection';
        const results = await db.find(collection);

        const cleaned = results.map(({ _id, ...rest }) => rest);

        res.json(cleaned);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch history.' })
    }

});

export default router;