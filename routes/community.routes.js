const express = require('express');
const router = express.Router();

const communityControllers = require('../controllers/community.controllers');



router.get('/' , communityControllers.getCommunities);

router.get('/:id' , communityControllers.getCommunity);

router.post('/' ,communityControllers.createCommunity);



module.exports = router;
