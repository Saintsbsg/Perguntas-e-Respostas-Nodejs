const express = require("express");
const router = express.Router();
const models = require("../Models/models");
const auth = require("../middlewares/auth");
const session = require("express-session");


router.get("/answer/:id", auth, (req, res) =>{
    let id = req.params.id;
    models.Question.findByPk(id).then(question =>{
        res.render("answers/new",{
            question:question
        });
    }).catch(() =>{
        res.redirect("/");
    })
});

router.post("/saveanswer", auth, (req, res) =>{
    let body = req.body.question;
    let userId = req.session.user.id;
    let questionId = req.body.questionId;

    models.Answer.create({
        body: body,
        userId: userId,
        perguntaId: questionId
    }).then(() =>{
        res.redirect("/");
    })
})

module.exports = router;