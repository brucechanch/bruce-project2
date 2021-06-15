
const { Router } = require('express')
const router = Router()

router.get('/', require('../controllers/pages/static/get-home'))                            // ROOT   GET /

router.get('/auth/signup', require('../controllers/pages/auth/get-signup'))                 // SIGNUP GET /signup
router.get('/auth/login', require('../controllers/pages/auth/get-login'))                   // LOGIN  GET /login

router.get('/post/', require('../controllers/pages/post/get-index'))              // INDEX  GET /post
router.get('/post/:id', require('../controllers/pages/post/get-show'))            // SHOW   GET /post/:id

router.get('/my/post/', require('../controllers/pages/my-post/get-index'))        // INDEX  GET /my/post
router.get('/my/post/new', require('../controllers/pages/my-post/get-new'))       // NEW    GET /my/post/new
router.get('/my/post/:id', require('../controllers/pages/my-post/get-show'))      // SHOW   GET /my/post/:id
router.get('/my/post/:id/edit', require('../controllers/pages/my-post/get-edit')) // EDIT   GET /my/post/:id/edit



// Error Response
router.use(function (req, res) {
  res.render('not-found', { message: "Sorry! Page does not exist!" })
})

module.exports = router
