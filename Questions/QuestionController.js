const express = require("express");
const router = express.Router();
const Question = require("./Question");
const User = require("../Users/User");
const auth = require("../middlewares/auth")

router.get("/ask", auth, (req, res) =>{
    res.render("questions/new");
});


router.post("/savequestion", auth, (req, res)=>{
    User.findOne({
        where:{
            id: req.session.user.id
        }
    }).then(user =>{
        let body = req.body.question;

    Question.create({
        body: body,
        userId: user.id
    }).then(() =>{
        res.redirect("/");
    }).catch((error) =>{
        res.redirect("/ask");
    })
    })
    
});

module.exports = router;