const express = require("express");
const router = express.Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "comment_text",
            "post_text",
            "created_at"
        ],
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
                attributes: ["name"]
              },
        ],
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// get one user
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
                attributes: ["name"]
              },
        ],
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "Post not found with id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// create a post
router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id,
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// update a post
router.put("/:id", withAuth, (req, res) => {
    Post.update(
        {
            post_text: req.body.post_text,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "Post not found with id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// delete a post
router.delete("/:id", withAuth, (req, res) => {
    console.log("id", req.params.id);
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "Post not found with id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;