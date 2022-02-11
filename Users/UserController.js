const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const model = require("../Models/models");

router.get("/signin", (req, res) =>{
    res.render("users/login")
});

router.post("/authenticate", (req, res) =>{
    let email = req.body.email;
    let pass = req.body.password;

    model.User.findOne({
        where:{
            email: email
        }
    }).then(user =>{
        if(user != undefined){
            let correct = bcrypt.compareSync(pass, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                res.redirect("/");
            }else{
                res.redirect("/signin");
            }
        }else{
            res.redirect("signin");
        }
        
    })
});

router.get("/signup", (req, res) =>{
    res.render("users/new");
});

router.post("/saveNewUser", (req, res) =>{
    let name = req.body.user;
    let email = req.body.email;
    let pass = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt);

    model.User.findOne({
        where:{
            email: email
        }
    }).then((user) =>{
        if(user != undefined){
            res.redirect("/login");
        }else{
            model.User.create({
                email: email,
                name: name,
                password: hash
            }).then(() =>{
                res.redirect("/");
            })
        }
    })

    

})

router.get("/logout", (req, res) =>{
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;