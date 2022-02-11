const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

//database models
/*const User = require("./Users/User");
const Question = require("./Questions/Question");
const Answer = require("./Answers/Answer");*/

const models = require("./Models/models")
const connection = require("./database/database");

//controllers
const UserController = require("./Users/UserController");
const QuestionController = require("./Questions/QuestionController");




app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'sleeping cat',
    cookie: {maxAge: 300000}
}));
app.use("/", UserController);
app.use("/", QuestionController);


connection
         .authenticate()
         .then(() =>{
             console.log("Conectado ao BD");
         }).catch((error) =>{
             console.log(error);
         })
         

app.get("/", (req, res) =>{
    models.Question.findAll({
        include:[{
            model: User,
            atributtes:['id', 'name']
        }]
    }).then(questions =>{
        res.render("index", {
            questions: questions
        });
    })
    
})

app.listen(8280, (error) =>{
    if(error){
        console.log(error);
    }else{
        console.log("Servidor rodando");
    }
})
