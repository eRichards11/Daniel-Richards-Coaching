const express = require('express')
router = express.Router()
const adminController = require('../controllers/adminControllers')
const { isUserAuthenticated } = require('../config/customFunctions')


router.all('/', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})


router.route('/')
    .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);

router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPost);

router.route('/posts/edit/:id')
    .get(adminController.editPostGetRoute)
    .put(adminController.editPostUpdateRoute);

router.route('/posts/delete/:id')
    .delete(adminController.deletePost);

//ADMIN CATEGORY ROUTES

router.route('/category')
    .get(adminController.getCategories)
    .post(adminController.createCategories);

router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);


module.exports = router