const express = require("express");
const router = express.Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all users
router.get("/", (req, res) => {
    Post.findAll({
    where: {
        user_id: req.session.user_id,
    },
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
        {
              model: Comment,
              attributes: ["name"],
            },
        {
            model: User,
            attributes: ["name"],
        },
    ],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: true });
    })

    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Server internal error"});
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: ["id", "post_text", "title", "created_at"],
        include: {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["name"],
                    },
                },
                })
                .then((dbPostData) => {
                    if (dbPostData) {
                        const post = dbPostData.get({ plain: true });
                        res.render("edit-post", { post, loggedIn: true });
                    } else {
                        res.status(404).render("error", { message: "No post found" });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ error: "Server internal error"});
                });
            });

module.exports = router;