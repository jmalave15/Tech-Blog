const express = require("express")
const router = express.Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {

  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post("/api/users/login", (req, res) => {
    
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "password123") {
    res.status(200).json({ message: "Welcome you are logged in" });
  } else {
    res.status(401).json({ message: "Your email or password could be invalid" });
  }
});


router.post("/", withAuth, (req, res) => {

  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {

  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
