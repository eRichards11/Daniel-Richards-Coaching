const Post = require('../models/PostModel')
const Category = require('../models/CategoryModel').Category
const User = require('../models/userModel')
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const {isEmpty} = require('../config/customFunctions')

module.exports = {
    index: (req, res) => {
        res.render('admin/index')
    },
    getPosts: (req, res) => {
        Post.find().lean()
        .populate('category')
        .then(posts =>{
            res.render('admin/posts/index', {posts: posts})
        })
    },
    submitPost: (req, res) => {


        //check for file submission

        let filename = ''

        if(!isEmpty(req.files.uploadedFile)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir+filename, (err) => {
                if (err)
                    throw err;
            })
        }

        //check for video submission


        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            category: req.body.category,
            file: `./uploads/${filename}`,
            format: req.body.format,
            filter: req.body.filter
        })

        newPost.save().then(post => {
            console.log(post)
            req.flash('success-message', 'Post created successfully')
            res.redirect('/admin/posts')
        })
    },
    createPosts: (req,res) => {
        Category.find().lean().then(cats => {
            res.render('admin/posts/create', {categories: cats})
        })
    },

    editPostGetRoute: (req, res) => {
        const id = req.params.id;
        Post.findById(id).lean()
            .then(post => {
                Category.find().lean().then(cats => {
                    res.render('admin/posts/edit', {post: post, categories: cats});
                });


            })
    },

    editPostUpdateRoute: (req, res) => {
        const id = req.params.id;
        Post.findById(id)
            .then(post => {

                post.title = req.body.title
                post.description = req.body.description
                post.category = req.body.category
                post.url = req.body.url
                post.format = req.body.format
                post.filter = req.body.filter

                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');
                });
            });
    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts')
            })
    },

    //category methods
    getCategories: (req, res) => {
        Category.find().lean().then(cats => {
            res.render('admin/category/index', {categories: cats});
        });
    },

    createCategories: (req, res) => {
        let categoryName = req.body.name;

        if(categoryName) {
            const newCategory = new Category({
                title: categoryName
            });
            newCategory.save().then(category => {
                res.status(200).json(category);
            })
        }
    },
    
    editCategoriesGetRoute: async (req, res) => {
        const catID = req.params.id;
        const cats = await Category.find().lean()

        Category.findById(catID).lean().then(cat => {
            res.render('admin/category/edit', {category: cat, categories: cats} )
            })
    },

    editCategoriesPostRoute: (req, res) => {
        const catID = req.params.id;
        const newTitle = req.body.name;

        if(newTitle) {
            Category.findById(catID)
            .then(category => {
                category.title = newTitle;
                category.save().then(update => {
                    res.status(200).json({url: '/admin/category'})
                })
            })
        }
    }

}