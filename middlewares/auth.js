function auth(req, res, next){
    if(req.session.user != undefined){
        next();
    }else{
        res.redirect("/signin");
    }
}

module.exports = auth;