const express = require("express")
const router = express.Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
    Post.findAll({  
        attributes: ["id", "post_text", "content", "created_at"],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["name"]
                }
            },
            {
                model: User,
                attributes: ["name"]
            },
        ],
    })
    .then(dbPostData => {
       
        const posts = dbPostData.map(post => post.get({ plain: true }));
        
        res.render("homepage", { 
            posts,
            loggedIn: req.session.loggedIn,
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single post
router.get("/post/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "post_id", "user_id", "created_at"],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["name"],
                },
            },
            {
                model: User,
                attributes: ["name"],
            },
        ],
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "Post not found with id" });
            return;
        }

        const post = dbPostData.get({ plain: true });
        
        res.render("single-post", { 
            post,
            loggedIn: req.session.loggedIn,
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login route
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("dashboard");
        return;
    }

    res.render("login");
});

module.exports = router;