const express = require('express')
const router = express.Router() 
const {Show, User} = require('../models/index')
const {db} = require('../config/db');
const { check, validationResult } = require('express-validator')

router.get('/', async (req, res) => {
    try {
       const shows = await Show.findAll()
       res.status(200).json(shows)
    } catch (error) {
       console.error(error)
       res.status(404).send('Sorry there are no shows in our database')
    }
})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const show = await Show.findByPk(id)
        res.status(200).json(show1)
    } catch (error) {
        console.error(error)
        res.status(404).send('Sorry no show was found')
    }
})


router.get('/:id/genre', async (req, res) =>{
    try{
        const specifiedGenre = await req.params.genre
        const foundShows = await Show.findAll(specifiedGenre)
        req.json(foundShows)
    }catch (error) {
        console.error(error)
        res.status(404).send('Sorry no shows were found with that genre')

    }
});


router.put("/:id/watched",[check("rating").not().isEmpty()], async (req, res) =>{
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.json({ error: errors.array()});
        };

        const id = req.params.id
        const updatedRating = req.body.rating
        const foundShow = await Show.findByPk(id)
        if (!foundShow) {
        throw new Error(`Show id: ${req.params.id} was not found or has not been watched!`);
        }
        res.json(Show.update({rating: updatedRating}));
        res.send(`Show with the id: ${req.params.id} was successfully updated!`);
    } catch (error) {
        res.send(error.message);
    }
  });

  router.put("/:id",[check("status").not().isEmpty().trim().isLength({min: 5, max:25})], async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.json({ error: errors.array()});
        };
            
        const id = req.params.id
        const updateStatus = req.body.status
        const foundShow = await Show.findByPk(id)
        if (!foundShow) {
        throw new Error(`Show id: ${req.params.id} was not found`);
        }
        res.json(Shows.update({ status: updateStatus}));
        res.send(`Show with the id: ${req.params.id}'s status was successfully updated!`);
    } catch (error) {
        res.send(error.message);
    }
  });

  
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Show.destroy({
            where: {id}
        })
        const foundShow = await Show.findByPk(id)
        if(!foundShow) {
            res.status(200).send('show has been deleted successfully!')
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Cannot delete a show') 
    }
})

module.exports = router;