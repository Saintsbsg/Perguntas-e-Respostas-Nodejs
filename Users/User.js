const Sequelize = require("sequelize");
const connection = require("../database/database");

const Question = require("../Questions/Question");
const Answer = require("../Answers/Answer");

User = connection.define("users", {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },

    admin:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});





User.sync({force: false}).then(()=>{});
module.exports = User;

