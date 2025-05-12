import express from 'express';
import db from '../services/db.js';

const router = express.Router();

// http://localhost:8888/history?type=keywords
router.get('/', async (req, res) => {
    const { type } = req.query;

    if (!type || !['keywords', 'selections'].includes(type)) {
        return res
            .status(400)
            .json({ error: 'Query parameter "type" is required and must be either "keywords" or "selection".' });
    }

    const collectionName = type === 'keywords' ? 'SearchHistoryKeyword' : 'SearchHistorySelection';

    try {
        const cursor = await db.find(collectionName);
        const results = await cursor.toArray();

        // Remove MongoDB _id from response
        const cleaned = results.map(({ _id, ...rest }) => rest);
        res.json(cleaned);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
