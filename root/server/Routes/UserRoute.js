const { AddVisited, AddWishlist, Visited, Wishlist, DeleteVisited, DeleteWishlisted } = require('../Controllers/UserController')
const router = require('express').Router()

router.post('/addVisited/:username', AddVisited);
router.post('/addWishlist/:username', AddWishlist);
router.get('/visited/:username', Visited);
router.get('/wishlisted/:username', Wishlist);
router.delete('/deleteVisited/:username',DeleteVisited);
router.delete('/deleteWishlisted/:username',DeleteWishlisted);

module.exports = router