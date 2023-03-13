const express = require('express')
const router = express.Router()
const {User, Show} = require('../models/index')
const {db} = require('../config/db');
const { check, validationResult } = require('express-validator')

router.get('/', async (req, res) => {
    try {
       const users = await Show.findAll()
       res.status(200).json(users)
    } catch (error) {
       console.error(error)
       res.status(404).send('Sorry there are no users in our database')
    }
})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(404).send('Sorry no user was found')
    }
});
router.get('/users/:id/shows', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id);
        const shows = await user.getShows();
        
        if (!user) {
        res.status(404).json({ error: 'User not found' });
        }
        res.json(shows);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
  });

router.get('/:id/shows/:showId', async (req,res) =>{
    try{
        const id = req.params.id
        const showId = req.params.showId
        const user = await User.findByPk(id)
        const shows = await Show.findByPk(showId);
        
        if (!shows) {
            res.status(404).json({ error: 'Show not found' });
        }
        if(shows.status != 'watched'){
            res.status(404).json({error: 'User has not watched show'}) 
        }else{
            newShow = await user.addShow(shows);
            res.json(newShow);
        }
    }catch (error) {
        res.status(500).json({ error: error.message });
      }
})


module.exports = router;