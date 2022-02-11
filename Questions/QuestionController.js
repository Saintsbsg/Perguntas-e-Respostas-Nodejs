const express = require("express");
const router = express.Router();
const model = require("../Models/models");
const auth = require("../middlewares/auth");

router.get("/ask", auth, (req, res) =>{
    res.render("questions/new");
});


router.post("/savequestion", auth, (req, res)=>{
    model.User.findOne({
        where:{
            id: req.session.user.id
        }
    }).then(user =>{
        let body = req.body.question;

    model.Question.create({
        body: body,
        userId: user.id
    }).then(() =>{
        res.redirect("/");
    }).catch((error) =>{
        res.redirect("/ask");
    })
    })
    
});

router.get("/question/:id", auth, (req, res) =>{
    let id = req.params.id;
    model.Question.findOne({
        id: id,
        include:[{model: model.Answer}]
    }).then(question =>{
        model.Answer.findAll({
            include:[{model: model.User}]
        }).then(answers =>{
            res.render("questions/question",{
                question: question,
                answers: answers
            });
        })
    })
})

module.exports = router;