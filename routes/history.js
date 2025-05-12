import express from 'express';
import db from '../services/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { type } = req.query;

    if (!type || !['keywords', 'selections'].includes(type)) {
        return res.status(400).json({ error: 'Query parameter "type" is required and must be either "keywords" or "selectiosn".' });
    }
    // handles "keywords" logic
    if (type === 'keywords') {
        try {
            const records = await db.find('SearchHistoryKeyword');

            const formatted = records.map((entry) => ({
                keyword: entry.keyword,
                date: entry.date,
            }));

            return res.json({ keywords: formatted });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to fetch keyword history.' })
        }
    }
    // ---------------------------------------------------------------------------

});

export default router;