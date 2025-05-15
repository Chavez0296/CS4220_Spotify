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
        
        const artists = [];
        for(const artist of data.items){
         
          const result = {
              artist: artist.name,
              id: artist.id
          };
          
          const cursor = await db.find('SearchHistoryKeyword', { keyword: result.artist }); //pass keyword into 'SearchHistoryKeyword' table to retrieve data
          //cursor = {keyword: 'Linkin Park'}
          const matches = await cursor.toArray(); // convert cursor to an array 
          // if matches is emptpy aka 0 then we store keyword in DB
          if (matches.length === 0) {
              
              await db.insert('SearchHistoryKeyword', { keyword: result.artist }); 
          }
          artists.push(result);
        }
  
        res.json(artists);
    } catch(err){
       res.status(500).json({ error: err}); 
    }
});

//http://localhost:8888/artists/7dGJo4pcD2V6oG8kP0tJRR

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const artistID = await api.searchID(id);

    const cursor = await db.find('SearchHistorySelection', {id: artistID.id});
    const matches = await cursor.toArray();

    if (matches.length === 0) {
      await db.insert('SearchHistorySelection', artistID);
    }

    res.json(artistID);
  } catch (err) {
    res.status(500).json({
      error: 'ID is wrong, please try http://localhost:8888/artists?keyword=(Artist Name) for ID',
    });
  }
});

export default router;