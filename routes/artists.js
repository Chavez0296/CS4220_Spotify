import express from 'express';

import * as api from '../services/api.js';
import db from '../services/db.js';

const router = express.Router();

router.get('/', async(req,res) => {
    try{
        const { keyword } = req.query;
        //http://localhost:8888/artists?keyword=Eminem
        if (!keyword) {
            return res.status(400).json({ error: 'Keyword query parameter is required' });
        }

        const data = await api.searchAPI(keyword);

        if (!data.items || data.items.length === 0) {
            return res.status(404).json({ error: 'Artist not found' });
        }

          
        const artist = data.items[0]; // get first result
          
        const result = {
            artist: artist.name,
            id: artist.id
        };

        res.json(result);
    } catch(err){
       res.status(500).json({ error: err}); 
    }
});

//http://localhost:8888/artists/id?keyword=0C0XlULifJtAgn6ZNCW2eu

router.get('/id', async (req, res) => {
    try {
    const {keyword} = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'ID missing do http://localhost:8888/artists?keyword=(Artist Name) to get an ID' });
    }
        const artistID = await api.searchID(keyword);

        res.json(artistID);
    } catch (err) {
        res.status(500).json({error: err});
    }
});
export default router;
