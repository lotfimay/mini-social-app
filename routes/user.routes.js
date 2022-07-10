const express = require('express');
const router = express.Router();


const userControllers = require('../controllers/user.controllers');




router.get('/' , userControllers.getUsers);

router.get('/:id' , userControllers.geUser);

router.post('/' , userControllers.createUser);

module.exports = router;